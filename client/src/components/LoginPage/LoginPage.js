import React from 'react'
import { withFormik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import './LoginPage.css'

const loginPage = () => {
    return <div className="LoginPage-container">
        <Form>
            <label htmlFor="email">Your email</label>
            <Field type="email" name="email" id="email" placeholder="your.name@mail.com" />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" placeholder="123456" />

            <Field type="submit" name="submit" value="Log In" />
        </Form>
        <span>Already have an account? <Link to="/login">Log In</Link></span>
    </div>
}

export default withFormik({
    handleSubmit({ email, password }) {
        
    }
})(loginPage)