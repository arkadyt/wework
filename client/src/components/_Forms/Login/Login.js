import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Field from '../../Field/Field'
import { Link } from 'react-router-dom'
import './Login.css'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            email: '',
            password: ''
        }
    }

    render() {
        return <div className="Login-container">
            <form onSubmit={e => {
                e.preventDefault()
                axios.post('/api/users/login', {
                    email: this.state.email,
                    password: this.state.password
                 })
                    .then(res => res.data.token && alert('Success!'))
                    .catch(err => this.setState({ errors: err.response.data }))
            }}>
                <Field
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    label="Email:"
                    error={this.state.errors.email} />
                <Field
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    label="Password:"
                    error={this.state.errors.password} />
                <Field
                    type="submit"
                    label="Log In" />
            </form>
            <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
    }
}

const mapStateToProps = () => {

}

const mapDispatchToProps = () => {

}

export default connect()(Login)