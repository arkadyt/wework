import React from 'react'
import Field from '../../Field/Field'
import { Link, Redirect, withRouter } from 'react-router-dom'
import {
    registerUser,
    fetchFollowers,
    fetchSubscriptions,
} from '../../../state/actions/userActions'
import { fetchUsersProfile } from '../../../state/actions/profileActions'
import { connect } from 'react-redux'
import './Signup.css'

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }

    render() {
        if (this.props.authedUser.isAuthenticated) {
            return <Redirect to='/profile' />
        }

        return <div className="Signup-container">
            <form onSubmit={e => {
                e.preventDefault()
                this.props.registerUser(this.state, userId => {
                    this.props.fetchSubscriptions(userId)
                    this.props.fetchFollowers(userId)
                    this.props.fetchUsersProfile()
                    this.props.history.push('/feed')
                })
            }}>
                <Field
                    type="text"
                    name="name"
                    label="Your name:"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    placeholder="John Doe"
                    error={this.props.errors.name} />
                <Field
                    type="text"
                    name="email"
                    label="Your email:"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    placeholder="your.name@mail.com"
                    error={this.props.errors.email} />
                <Field
                    type="password"
                    name="password"
                    label="Password:"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="Min. 6 characters"
                    error={this.props.errors.password} />
                <Field
                    type="password"
                    name="passwordConfirm"
                    label="Confirm password:"
                    value={this.state.passwordConfirm}
                    onChange={e => this.setState({ passwordConfirm: e.target.value })}
                    placeholder="Type in your password again"
                    error={this.props.errors.passwordConfirm} />
                <br />
                <span>By creating an account, you agree to Conditions of Use and Privacy Notice of this Website</span>
                <div className="Signup-buttons">
                    <span className="Signup-options-info">
                        Already have an account? <Link to="/login">Log In</Link>
                    </span>
                    <Field
                        type="submit"
                        inline
                        containerStyle={{ margin: 0 }}
                        label="Sign Up" />
                </div>
            </form>
        </div>
    }
}

const mapStateToProps = state => ({
    errors: state.err.formErrors,
    authedUser: state.user
})

export default withRouter(connect(mapStateToProps, {
    registerUser,
    fetchFollowers,
    fetchSubscriptions,
    fetchUsersProfile
})(Signup))