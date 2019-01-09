import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import StatsChart from './StatsChart/StatsChart'
import NoProfileMessage from './NoProfileMessage/NoProfileMessage'
import { withEither } from '../../hocs/conditionalRendering'
import FBSpinner from '../FBSpinner/FBSpinner'
import { fetchUsersStats } from '../../state/actions/userActions'
import './QuickStats.scss'

class QuickStats extends Component {
  isLoadingFn({
    stats,
    authedUser,
    usersProfile,
  }) {
    return !stats || !usersProfile || !authedUser
  } 

  hasNoProfile({
    errors: { noProfile }
  }) {
   return !!noProfile
  }

  withCondRendering() {
    return compose(
      withEither(this.hasNoProfile, NoProfileMessage),
      withEither(this.isLoadingFn, FBSpinner)
    )
  } 

  render() {
    const StatsWithCondRendering = this.withCondRendering(StatsChart)
    const { authedUser, usersProfile, stats, errors, history } = this.props

    return (
      <div className="QuickStats-container">
        <StatsWithCondRendering
          stats={stats}
          errors={errors}
          history={history}
          authedUser={authedUser}
          usersProfile={usersProfile} />
      </div>
    )
  }

  componentDidMount() {
    const { fetchUsersStats } = this.props
    fetchUsersStats()
  }
}

export const mapStateToProps = state => ({
  authedUser: state.user,
  usersProfile: state.profile,
  stats: state.user.stats,
  errors: state.err
})

export { QuickStats as _UnconnectedQuickStats }
export default withRouter(connect(mapStateToProps, { fetchUsersStats }))(QuickStats)
