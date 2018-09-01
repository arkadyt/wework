import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Field from '../../Field/Field'
import { Link, Redirect } from 'react-router-dom'
import './Login.css'
import { loginUser } from '../../../state/actions/authActions'
// import * as types from '../../../state/actions/types'

class Login extends React.Component {
    state = {
        email: 'techguyinfo17@gmail.com',
        password: '12345678'
    }

    render() {
        if (this.props.auth.user.token) {
            return <Redirect to='/profile' />
        }

        return <div className="Login-container">
            <form onSubmit={e => {
                e.preventDefault()
                this.props.loginUser(this.state)
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

const mapStateToProps = state => ({
    errors: state.err,
    auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(Login)