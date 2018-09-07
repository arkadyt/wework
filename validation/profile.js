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
        })
    })
})

module.exports = (profile, options = {
    onlyEducation: false,
    onlyExperience: false
}) => new Promise((resolve, reject) => {
    let schema = {}

    if (options.onlyExperience) {
        schema = Yup.object().shape({
            title: Yup.string().required("Please specify your title"),
            company: Yup.string().required("Please enter the company name"),
            location: Yup.string(),
            from: Yup.string().required("Please specify the start date"),
            to: Yup.string().when('current', {
                is: undefined,
                then: Yup.string().required("Do you still work here?"),
                otherwise: Yup.string().notRequired()
            }),
            current: Yup.bool(),
            description: Yup.string().min(300, "Please enter at least 300 characters")
        })
    } else if (options.onlyEducation) {
        schema = Yup.object().shape({
            school: Yup.string().required("Please enter a school name"),
            degree: Yup.string().required("Please specify the degree type"),
            fieldOfStudy: Yup.string().required("Please specify your field of study"),
            from: Yup.string().required("Please enter the start date"),
            to: Yup.string().when('current', {
                is: undefined,
                then: Yup.string().required("Do you still study here?"),
                otherwise: Yup.string().notRequired()
            }),
            current: Yup.bool(),
            description: Yup.string().min(300, "Minimum of 300 characters is required!")
        })
    } else { /* For whole profile with the exclusion of above described fields */
        schema = Yup.object().shape({
            handle: Yup.string()
                .required('Please enter your profile handle')
                .min(2, 'A minimum of 2 characters is required')
                .max(40, 'Maximum allowed characters is 40')
                .unoccupied(profile.user, 'Handle is already taken'),
            status: Yup.string()
                .required('Please specify your job seeker status'),
            title: Yup.string()
                .required('Please specify your job title'),
            skills: Yup.array().of(Yup.string().typeError('Elements must be strings'))
                .min(3, 'Please enter at least ${min} skills')
                .max(40, 'Skills limit of ${max} has been reached')
                .required('Please specify your skills'),
            youtube: Yup.string().url('Please enter a valid URL address'),
            twitter: Yup.string().url('Please enter a valid URL address'),
            facebook: Yup.string().url('Please enter a valid URL address'),
            linkedin: Yup.string().url('Please enter a valid URL address'),
            instagram: Yup.string().url('Please enter a valid URL address'),
            githubusername: Yup.string()
                .matches(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
                    'Please enter a valid github username')
        })
    }

    // strict flag ensures that value coercion and object transformation would not happen
    // this way db stays clean of empty fields 
    schema.validate(profile, { abortEarly: false, strict: true })
        .then(profile => resolve(profile))
        .catch(err => {
            const errors = {}
            for (let i of err.inner)
                errors[i.path] = i.message
            reject(errors)
        })
})