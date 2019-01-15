import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Reply.scss'

import Field from '../Field/Field'
import { fetchUsersStats } from '../../state/actions/userActions'

class Reply extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleSubmit() {
        this.setState({ text: '' })
        this.props.fetchUsersStats()
    }

    render() {
        const { onSubmit, flat, rows, errors, authedUser } = this.props
        const flatStyle = {
            borderRadius: 'unset',
            boxShadow: 'unset',
            marginTop: 'unset',
        }

        return <form
            className="Reply-container"
            style={flat ? flatStyle : null}
            onSubmit={e => {
                e.preventDefault()
                onSubmit(this.state, this.handleSubmit.bind(this))
            }}>
            <p className="Reply-header">Post as <b>{authedUser.name}:</b></p>
            <Field
                type="textarea"
                rows={rows || "3"}
                style={{ fontSize: '1.3rem' }}
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                error={errors.text} />
            <Field
                type="submit"
                containerStyle={{ marginTop: '.5rem' }}
                label="Submit" />
        </form>
    }
}

export const mapStateToProps = state => ({
    authedUser: state.user,
    errors: state.err.formErrors
})

export const _UnconnectedReply = Reply
export default connect(mapStateToProps, { fetchUsersStats })(Reply)
