import React from 'react'
import { withFormik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import './Signup.css'

const signup = () => {
    return <div className="Signup-container">
        <Form>
            <label htmlFor="name">Your name</label>
            <Field type="text" name="name" id="name" placeholder="John Doe" />

            <label htmlFor="email">Your email</label>
            <Field type="email" name="email" id="email" placeholder="your.name@mail.com" />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" placeholder="123456" />

            <label htmlFor="passwordConfirm">Confirm Password</label>
            <Field type="passwordConfirm" name="passwordConfirm" id="passwordConfirm" />

            <span>By creating an account, you agree to [SITENAME] Conditions of Use and Privacy Notice.</span>
            <Field type="submit" name="submit" value="Sign Up" />
        </Form>
        <span>Already have an account? <Link to="/login">Log In</Link></span>
    </div>
}

export default withFormik({
    handleSubmit({ name, email, password }) {

    }
})(signup)