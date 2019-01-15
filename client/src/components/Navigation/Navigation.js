import React from 'react'
import './Navigation.scss'
import { connect } from 'react-redux'
import { logoutUser } from '../../state/actions/userActions'
import { withRouter } from 'react-router-dom'
import Dropdown from './Dropdown/Dropdown'
import ProtectedLinks from './ProtectedLinks/ProtectedLinks'
import ProfileButton from './ProfileButton/ProfileButton'

class Navigation extends React.Component {
  state = {
    showDropdown: false
  }

  toggleDropdown(e, state) {
    this.setState(prevState => ({ 
      showDropdown: state || !prevState.showDropdown
    }))
  }

  render() {
    const { 
      history, 
      logoutUser,
      authedUser
    } = this.props

    return <div className="Navigation-container">
      <div className="Navigation-logo">
        <span>We</span><span>Work</span>
      </div>
      <nav>
        <a 
          href="https://arkadyt.com"
          className="Navigation-semi-transparent"
          target="_blank" rel="noopener noreferrer">
          App Author
        </a>
        <ProtectedLinks 
          isAuthenticated={authedUser.isAuthenticated} />
        <ProfileButton 
          toggleDropdown={this.toggleDropdown.bind(this)}
          isAuthenticated={authedUser.isAuthenticated} />
        <Dropdown 
          showDropdown={this.state.showDropdown}
          toggleDropdown={this.toggleDropdown.bind(this)}
          history={history}
          logoutUser={logoutUser} />
      </nav>
    </div>
  }
}

export { Navigation as _UnconnectedNavigation }
export default withRouter(connect(state => ({
  authedUser: state.user
}), { logoutUser  })(Navigation))
