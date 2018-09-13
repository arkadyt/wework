import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../state/actions/postsActions'
import './Reply.css'

import Field from '../Field/Field'

class Reply extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    clearFields = () => {
        this.setState({ text: '' })
    }

    render() {
        const { addPost, errors } = this.props

        return <form className="Reply-container" onSubmit={e => {
            e.preventDefault()
            addPost(this.state, () => {
                this.clearFields()
            })
        }}>
            <Field
                type="textarea"
                rows="5"
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                error={errors.text} />
            <Field
                type="submit"
                inline
                label="Submit" />
        </form>
    }
}

export default connect(state => ({
    errors: state.err.formErrors
}), { addPost })(Reply)