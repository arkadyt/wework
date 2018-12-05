import React from 'react'
import { connect } from 'react-redux'
import Field from '../../Field/Field'
import { Link, withRouter } from 'react-router-dom'
import './Login.scss'
import {
    loginUser,
    fetchFollowers,
    fetchSubscriptions,
} from '../../../state/actions/userActions'
import { fetchUsersProfile } from '../../../state/actions/profileActions'
import { func, object } from 'prop-types'

class Login extends React.Component {
    state = {
      email: '',
      password: ''
    }

    render() {
        return <div className="Login-container">
            <form onSubmit={e => {
                e.preventDefault()
                this.props.loginUser(this.state, userId => {
                    this.props.fetchSubscriptions(userId)
                    this.props.fetchFollowers(userId)
                    this.props.fetchUsersProfile()
                    this.props.history.push('/feed')
                })
            }}>
                <Field
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    label="Email:"
                    error={this.props.errors.email} />
                <Field
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    label="Password:"
                    error={this.props.errors.password} />
                <div className="Login-buttons">
                    <span className="Login-options-info">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </span>
                    <Field
                        type="submit"
                        inline
                        containerStyle={{ margin: 0 }}
                        label="Log In" />
                </div>
            </form>
        </div>
    }
}

Login.propTypes = {
  loginUser: func.isRequired,
  fetchFollowers: func.isRequired,
  fetchSubscriptions: func.isRequired,
  fetchUsersProfile: func.isRequired,
  errors: object.isRequired
}

export const _UnconnectedLogin = Login
export default withRouter(connect(state => ({
    errors: state.err.formErrors
}), { loginUser, fetchFollowers, fetchSubscriptions, fetchUsersProfile })(Login))
