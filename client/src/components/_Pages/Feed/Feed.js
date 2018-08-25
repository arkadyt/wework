import React from 'react'
import './Feed.css'
import mockPosts from '../../../mocks/posts'
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
            {mockPosts.map(({ user, text, likes, comments }, idx) => {
                return <div className="node" key={`feed-node-${idx}`}>
                    <p className="header">{user.name} said:</p>
                    <p className="text">{text}</p>
                    <p className="buttons">{comments.length} comments | {likes.length} [like post!]</p>
                </div>
            })}
        </div>
    </div>
}

export default withFormik({
    mapPropsToValues() { },
    handleSubmit({ message }) { 
        console.log(message)
    }
})(feed)