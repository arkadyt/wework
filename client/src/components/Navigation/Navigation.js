import React from 'react'
import './Navigation.css'
import { connect } from 'react-redux'
import { logoutUser } from '../../state/actions/userActions'
import { Link, withRouter } from 'react-router-dom'

class Navigation extends React.Component {
    state = {
        showDropdown: false
    }

    toggleDropdown = (e, state) => {
        this.setState(prevState => {
            return { showDropdown: state || !prevState.showDropdown }
        })
    }

    render() {
        const profileButton = this.props.authedUser.isAuthenticated ?
            <button className="Navigation-button" onClick={this.toggleDropdown}>
                <span>Account</span>
            </button> :
            <Link to="/login">
                <span>Log In</span>
            </Link>

        const protectedLinks = this.props.authedUser.isAuthenticated ?
            <React.Fragment>
                <Link to="/feed"><span>Feed</span></Link>
            </React.Fragment> : null

        const dropdown = (
            <React.Fragment>
                <ul onClick={() => this.toggleDropdown(false)}
                    className={["account-menu",
                        this.state.showDropdown && "account-menu-open"].join(' ')}>
                    <li><Link to="/profile"><span>My Profile</span></Link></li>
                    <li>
                        <button className="Navigation-menu-button"
                            onClick={() => this.props.logoutUser(() => {
                                this.props.history.push('/login')
                            })}>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
                {this.state.showDropdown &&
                    <div className="backdrop" onClick={() => this.toggleDropdown(false)} />}
            </React.Fragment>
        )

        return <div className="Navigation-container">
            <div className="Navigation-logo">
                <span>We</span><span>Work</span>
            </div>
            <nav>
                {protectedLinks}
                {profileButton}
                {dropdown}
            </nav>
        </div>
    }
}

const mapStateToProps = state => ({
    authedUser: state.user
})

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation))