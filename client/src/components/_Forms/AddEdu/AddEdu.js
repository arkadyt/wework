import React from 'react'
import { withFormik, Form, Field } from 'formik'
import './AddEdu.css'

const addEdu = () => {
    return <div className="AddEdu-container">
        <Form>
            <label htmlFor="school">School:</label>
            <Field type="text" name="school" id="school" placeholder="UCLA" />

            <label htmlFor="degree">Degree:</label>
            <Field type="text" name="degree" id="degree" placeholder="Bachelor of Science" />

            <label htmlFor="fos">Field of Study:</label>
            <Field type="text" name="fos" id="fos" placeholder="Bioeconomics" />

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

            <button type="submit">Add</button>
        </Form>
    </div>
}

export default withFormik({
    handleSubmit() {

    }
})(addEdu)