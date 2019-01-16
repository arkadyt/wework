import React, { Component } from 'react'
import './ProfileView.scss'
import { shape, string, func, arrayOf } from 'prop-types'
import { followerType, profileType } from '../../types/index'
import { connect } from 'react-redux'
import { deleteExperience, deleteEducation } from '../../state/actions/profileActions'
import { followAPerson, unfollowAPerson } from '../../state/actions/userActions'
import Bio from './Bio/Bio'
import DangerZone from './DangerZone/DangerZone'
import Education from './Education/Education'
import Experience from './Experience/Experience'
import Overview from './Overview/Overview'
import Skills from './Skills/Skills'

class ProfileView extends Component {
  defaultDeletingState = {
    deletingExpEntries: false,
    deletingEduEntries: false
  }

  constructor(props) {
    super(props)
    this.state = {
        ...this.defaultDeletingState
    }
  }

  quitEntryDeletingMode() {
    this.setState(this.defaultDeletingState)
  }

  setExpDeleting(bool) {
    this.setState({
      deletingExpEntries: bool
    })
  }

  setEduDeleting(bool) {
    this.setState({
      deletingEduEntries: bool
    })
  }

  navTo(where) {
    const {
      history,
      match
    } = this.props

    const baseUrl = match.url || ''
    return history.push(`${baseUrl}/${where}`)
  }

  isFollowingProfileOwner() {
    const { 
      profile: {
        user: {
          _id
        }
      },
      authedUser: {
        following
      }
    } = this.props

    return !!following.find(item => item.user === _id)
  }

  // what a bad naming! wheres your <is>???
  profileBelongsToAuthedUser() {
    const { 
      profile: {
        user: {
          _id
        }
      },
      authedUser: {
        id: authedUserId
      }
    } = this.props

    return authedUserId === _id
  }

  render() {
    const {
      profile: {
        bio,
        skills,
        experience,
        education
      },
      profile,
      deleteExperience,
      deleteEducation,
      followAPerson,
      unfollowAPerson
    } = this.props

    const commonProps = {
      navTo: this.navTo.bind(this),
      profileBelongsToAuthedUser: this.profileBelongsToAuthedUser(),
      quitEntryDeletingMode: this.quitEntryDeletingMode.bind(this)
    }

    return (
      <div className="ProfileView-container">
        <Overview 
          profile={profile} 
          isFollowingProfileOwner={this.isFollowingProfileOwner()}
          unfollowAPerson={unfollowAPerson}
          followAPerson={followAPerson} 
          {...commonProps} />
        <Bio bio={bio} />
        <Skills skills={skills} />
        <Experience 
          experience={experience}
          deleteExperience={deleteExperience}
          isDeleting={this.state.deletingExpEntries}
          setDeleting={this.setExpDeleting.bind(this)}
          {...commonProps} />
        <Education 
          education={education} 
          deleteEducation={deleteEducation}
          isDeleting={this.state.deletingEduEntries}
          setDeleting={this.setEduDeleting.bind(this)}
          {...commonProps} />
        <DangerZone 
          {...commonProps} />
      </div>
    )
  }
}

ProfileView.propTypes = {
  authedUser: shape({
    id: string.isRequired,
    following: arrayOf(followerType).isRequired
  }).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  match: shape({
    url: string.isRequired
  }).isRequired,
  deleteEducation: func.isRequired,
  deleteExperience: func.isRequired,
  followAPerson: func.isRequired,
  unfollowAPerson: func.isRequired,
  profile: profileType.isRequired             
}

export const mapStateToProps = state => ({
  authedUser: state.user
})

export { ProfileView as _UnconnectedProfileView }
export default connect(mapStateToProps, { 
  deleteEducation, 
  deleteExperience, 
  followAPerson, 
  unfollowAPerson 
})(ProfileView)
