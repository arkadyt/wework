const Yup = require('yup')

module.exports = profile => new Promise((resolve, reject) => {
    const schema = Yup.object().shape({
        text: Yup.string()
            .min(10, "Minimum of 10 characters is required")
            .max(300, "Maximum of 300 characters is allowed")
            .required("Please enter some text here")
    })

    schema.validate(profile, { abortEarly: false, strict: true })
        .then(profile => resolve(profile))
        .catch(err => {
            const errors = {}
            for (let i of err.inner)
                errors[i.path] = i.message
            reject(errors)
        })
})