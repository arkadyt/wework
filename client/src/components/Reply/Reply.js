import React from 'react'
import { withFormik, Form } from 'formik'
import './Reply.css'

const reply = ({
    values,
    handleChange
}) => {
    return <Form className="Reply-container">
        <textarea rows="5" name="message" placeholder="Say something..."
            value={values.message} onChange={handleChange} />
        <button type="submit">Submit</button>
    </Form>
}

export default withFormik({
    mapPropsToValues() { },
    handleSubmit(values, { props }) {
        props.callback(values)
    }
})(reply)