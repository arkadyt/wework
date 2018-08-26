import React from 'react'
import './Feed.css'
import mockPosts from '../../../mocks/posts'
import Post from '../../Post/Post'
import { withFormik, Form } from 'formik'

const feed = ({
    values,
    handleChange
}) => {
    return <div className="Feed-container">
        <Form className="input">
            <textarea rows="4" name="message" placeholder="Say something..." 
                value={values.message} onChange={handleChange} />
            <input type="submit" value="Submit" />
        </Form>
        <div className="feed">
            {mockPosts.map(item => <Post {...item} />)}
        </div>
    </div>
}

export default withFormik({
    mapPropsToValues() { },
    handleSubmit({ message }) { 
        console.log(message)
    }
})(feed)