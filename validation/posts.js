const Yup = require('yup')

module.exports = (profile, options = {
    onlyComment: false
}) => new Promise((resolve, reject) => {
    let schema = {}

    if (options.onlyComment) {
        schema = Yup.object().shape({
            text: Yup.string()
                .min(15, "Enter at least ${min} characters")
                .max(200, "Maximum of ${max} characters is allowed")
                .required("Please enter some text here!")
        })
    } else {
        schema = Yup.object().shape({
            text: Yup.string()
                .min(10, "Minimum of ${min} characters is required")
                .max(300, "Maximum of ${max} characters is allowed")
                .required("Please enter some text here")
        })
    }

    schema.validate(profile, { abortEarly: false, strict: true })
        .then(data => resolve(data))
        .catch(err => {
            const errors = {}
            for (let i of err.inner)
                errors[i.path] = i.message
            reject(errors)
        })
})