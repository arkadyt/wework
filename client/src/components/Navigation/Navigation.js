import React from 'react'
import './Navigation.css'
import { connect } from 'react-redux'
import { logoutUser } from '../../state/actions/authActions'
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
        const profileButton = this.props.auth.isAuthenticated ?
            <a href="#" onClick={this.toggleDropdown}>
                <span>Account</span>
            </a> :
            <Link to="/login">
                <span>Log In / Sign Up</span>
            </Link>

        const protectedLinks = this.props.auth.isAuthenticated ?
            <React.Fragment>
                <Link to="/feed"><span>Feed</span></Link>
                <Link to="/discover"><span>Discover</span></Link>
            </React.Fragment> : null

        const dropdown = this.state.showDropdown ?
            <React.Fragment>
                <ul onClick={() => this.toggleDropdown(false)}
                    className={'account-menu'}>
                    <li><Link to="/profile"><span>My Profile</span></Link></li>
                    <li>
                        <a href="javascript:void"
                            onClick={() => this.props.logoutUser(() => {
                                this.props.history.push('/login')
                            })}>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
                <div className="backdrop" onClick={() => this.toggleDropdown(false)} />
            </React.Fragment> : null

        return <div className="Navigation-container">
            <nav>
                {protectedLinks}
                {profileButton}
                {dropdown}
            </nav>
        </div>
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation))