import React from 'react'
import { withFormik, Form, Field } from 'formik'
import './AddExp.css'

const addExp = () => {
    return <div className="AddExp-container">
        <Form>
            <label htmlFor="title">Job title:</label>
            <Field type="text" name="title" id="title" placeholder="Marketing Analyst" />

            <label htmlFor="company">Company:</label>
            <Field type="text" name="company" id="company" placeholder="Facebook" />

            <label htmlFor="location">Location:</label>
            <Field type="text" name="_location" id="location" placeholder="Seattle, WA" />

            <label htmlFor="from">From:</label>
            <Field type="text" name="from" id="from" />

            <label htmlFor="to">To:</label>
            <Field type="text" name="to" id="to" />

            <label>
                <Field type="checkbox"
                    name="current"
                    id="current" /> Current?
            </label>

            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" rows="5" />

            <button type="submit">Save</button>
        </Form>
    </div>
}

export default withFormik({
    handleSubmit() {

    }
})(addExp)