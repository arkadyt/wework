import React from 'react'
import Field from '../../Field/Field'
import { Link, Redirect } from 'react-router-dom'
import { registerUser } from '../../../state/actions/authActions'
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
        if (this.props.auth.user.token) {
            return <Redirect to='/profile' />
        }

        return <div className="Signup-container">
            <form onSubmit={e => {
                e.preventDefault()
                this.props.registerUser(this.state)
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
                <Field type="submit" label="Sign Up" />
            </form>
            <span>Already have an account? <Link to="/login">Log In</Link></span>
        </div>
    }
}

const mapStateToProps = state => ({
    errors: state.err,
    auth: state.auth
})

export default connect(mapStateToProps, { registerUser })(Signup)