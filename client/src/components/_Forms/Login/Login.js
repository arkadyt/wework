import React from 'react'
import { connect } from 'react-redux'
import Field from '../../Field/Field'
import { Link, withRouter } from 'react-router-dom'
import './Login.css'
import {
    loginUser, 
    fetchFollowers, 
    fetchSubscriptions
} from '../../../state/actions/userActions'

class Login extends React.Component {
    state = {
        email: 'techguyinfo17@gmail.com',
        // email: 'lika.reus@gmail.com',
        password: '12345678'
    }

    render() {
        return <div className="Login-container">
            <form onSubmit={e => {
                e.preventDefault()
                this.props.loginUser(this.state, userId => {
                    this.props.fetchSubscriptions(userId)
                    this.props.fetchFollowers(userId)        
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
                <Field
                    type="submit"
                    label="Log In" />
            </form>
            <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
    }
}

export default withRouter(connect(state => ({
    errors: state.err.formErrors
}), { loginUser, fetchFollowers, fetchSubscriptions })(Login))