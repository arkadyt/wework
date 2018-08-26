import React from 'react'
import Post from '../../Post/Post'
import Comment from '../../Comment/Comment'
import { mockPost } from '../../../mocks/posts'
import { withFormik, Form } from 'formik'

const comments = ({
    values,
    handleChange
}) => {
    return <div className="Comments-container">
        <Post {...mockPost} />
        <Form>
            <textarea rows="5" name="message" placeholder="Say something..."
                value={values.message} onChange={handleChange} />
            <button type="submit">Submit</button>
        </Form>
        {mockPost.comments.map(item => <Comment {...item} />)}
    </div>
}

export default withFormik({
    mapPropsToValues() { },
    handleSubmit() { }
})(comments)