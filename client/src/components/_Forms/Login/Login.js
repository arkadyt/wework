import React, { Fragment } from 'react'
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
      email: 'test.account@gmail.com',
      password: '12345678', // my bank password
      reqSent: false
    }

    render() {
        const { reqSent } = this.state;

        return <div className="Login-container">
            <form onSubmit={e => {
                e.preventDefault()
                const payload = { 
                  email: this.state.email,
                  password: this.state.password
                };
                this.setState({ reqSent: true });
                this.props.loginUser(payload, userId => {
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
                    error={this.props.errors.email} 
                    placeholder="Your email"
                />
                <Field
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    label="Password:"
                    error={this.props.errors.password} 
                    placeholder="Your password"
                />
                <div className="Login-buttons">
                    <span className="Login-options-info">
                        {reqSent ? "Loading..." : (
                            <Fragment>Don't have an account? <Link to="/signup">Sign Up</Link></Fragment>
                        )}
                    </span>
                    <Field
                        type="submit"
                        name="submit"
                        inline
                        containerStyle={{ 
                            margin: 0,
                            pointerEvents: reqSent ? 'none' : 'unset',
                            cursor: reqSent ? 'wait' : 'unset'
                        }}
                        label="Log In"
                    />
                </div>
            </form>
        </div>
    }
}

Login.propTypes = {
  loginUser: func.isRequired,
  history: object.isRequired,
  fetchFollowers: func.isRequired,
  fetchSubscriptions: func.isRequired,
  fetchUsersProfile: func.isRequired,
  errors: object.isRequired
}

export { Login as _UnconnectedLogin }
export default withRouter(connect(state => ({
  errors: state.err.formErrors
}), { loginUser, fetchFollowers, fetchSubscriptions, fetchUsersProfile })(Login))
