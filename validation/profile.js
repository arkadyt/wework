const Yup = require('yup')
const Profile = require('../models/Profile')

/**
 * Check to see if value (by its pathname) exists in the database.
 * 'user' ObjectID is required to see if it belongs to the current user,
 * in which case there is no error --> user is updating his profile. 
 */
Yup.addMethod(Yup.mixed, 'unoccupied', function (user, message) {
    return this.test('unoccupied', message, function (value) {
        const { path, createError } = this;
        return new Promise((resolve, reject) => {
            // check to see if any profile has already taken the value
            Profile.findOne({ [path]: value }).then(profile => {
                // compare mongoose's ObjectIDs with mongoose's .equals()
                if (profile && !profile.user.equals(user))
                    reject(createError({ path, message }))
                // else value is free, or it belongs to the current user
                else resolve(true)
            })
        }).then(result => result).catch(error => error)
    })
})

module.exports = profile => new Promise((resolve, reject) => {
    const errors = {}

    const validationSchema = Yup.object().shape({
        handle: Yup.string()
            .required('Please enter your profile handle')
            .min(2, 'A minimum of 2 characters is required')
            .max(40, 'Maximum allowed characters is 40')
            .unoccupied(profile.user, 'Handle is already taken'),
        social: Yup.object().shape({
            youtube: Yup.string().url('Please enter a link'),
            twitter: Yup.string().url('Please enter a link'),
            facebook: Yup.string().url('Please enter a link'),
            linkedin: Yup.string().url('Please enter a link'),
            instagram: Yup.string().url('Please enter a link'),
        }),
    })

    validationSchema.validate(profile, { abortEarly: false, strict: true })
        .then(profile => resolve(profile))
        .catch(err => {
            for (let i of err.inner)
                errors[i.path] = i.message
            reject(errors)
        })
})