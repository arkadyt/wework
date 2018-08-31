const isEmpty = require('./utils').isEmpty
const validator = require('validator')

module.exports = data => {
    let errors = {}

    // Cant verify this way since {} empty object comes in if form isn't filled
    // console.log('BEFAR', data)
    // Object.keys(data).map(key => {
    //     console.log('REPARN', data, key, data[key])
    //     data[key] = isEmpty(data[key]) ? '' : data[key]
    // })

    data.name = isEmpty(data.name) ? '' : data.name
    data.email = isEmpty(data.email) ? '' : data.email
    data.password = isEmpty(data.password) ? '' : data.password
    data.passwordConfirm = isEmpty(data.passwordConfirm) ? '' : data.passwordConfirm

    if (!validator.isLength(data.name, { min: 2, max: 30 }))
        errors.name = 'Name must be between 2 and 30 characters'
    if (validator.isEmpty(data.name + ''))
        errors.name = 'Name is required'

    if (!validator.isEmail(data.email))
        errors.email = 'Please enter the correct email'
    if (validator.isEmpty(data.email))
        errors.email = 'Email is required'

    if (!validator.isLength(data.password, { min: 6, max: 30 }))
        errors.password = 'Password must be between 6 and 30 characters'
    if (validator.isEmpty(data.password))
        errors.password = 'Password is required'

    if (!validator.equals(data.passwordConfirm, data.password))
        errors.passwordConfirm = 'Passwords don\'t match'
    if (validator.isEmpty(data.passwordConfirm))
        errors.passwordConfirm = 'Please re-enter your password'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}