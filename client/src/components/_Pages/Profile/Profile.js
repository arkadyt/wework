import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import './Profile.css'

import ProfileView from '../../ProfileView/ProfileView'
import UpdateProfile from '../../_Forms/UpdateProfile/UpdateProfile'
import AddEdu from '../../_Forms/AddEdu/AddEdu'
import AddExp from '../../_Forms/AddExp/AddExp'
import Modal from '../../Modal/Modal'
import FBSpinner from '../../FBSpinner/FBSpinner'
import { fetchUsersProfile, deleteProfile } from '../../../state/actions/profileActions'
import { fetchAProfile, forgetNotFoundError } from '../../../state/actions/viewedProfileActions'

class Profile extends React.Component {
    render() {
        const {
            history,
            match,
            fetchUsersProfile,
            deleteProfile,
            fetchAProfile,
            viewedProfile,
            profile: profileData,
            errors: {
                noProfile
            }
        } = this.props

        const baseUrl = match.url || ''

        let content = <FBSpinner />

        if (baseUrl.includes('/id/')) {
            if (noProfile) {
                content = (
                    <h1>User does not appear to have a profile.</h1>
                )
            } else if (viewedProfile && match.params.userId === viewedProfile.user._id) {
                content = (
                    <div className="Profile-content">
                        <Route render={props => (
                            <ProfileView {...props} profile={viewedProfile} />
                        )} />
                    </div>
                )
            } else {
                fetchAProfile(match.params.userId)
            }
        } else {
            if (noProfile) {
                content = (
                    <div className="Profile-content">
                        <Route path={baseUrl} exact render={() => (
                            <Modal
                                question="You don't yet have a profile. Would you like to create one now?"
                                onConfirm={() => history.push(`${baseUrl}/create-profile`)}
                                onDismiss={() => history.push('/feed')}
                                actionColor="green" />
                        )} />
                        <Route path={`${baseUrl}/create-profile`} render={props => (
                            <UpdateProfile {...props} />
                        )} />
                    </div>
                )
            } else if (profileData) {
                content = (
                    <div className="Profile-content">
                        <Route path={baseUrl} render={props => (
                            <ProfileView {...props} profile={profileData} />
                        )} />
                        <Route path={`${baseUrl}/update-profile`} render={props => (
                            <UpdateProfile {...props} profile={profileData} />
                        )} />
                        <Route path={`${baseUrl}/add-experience`} render={props => (
                            <AddExp {...props} />
                        )} />
                        <Route path={`${baseUrl}/add-education`} render={props => (
                            <AddEdu {...props} />
                        )} />
                        <Route path={`${baseUrl}/delete-profile`} render={() => (
                            <Modal
                                question="Are you sure you want to delete your profile?"
                                onConfirm={() => deleteProfile(() => history.push(baseUrl))}
                                onDismiss={() => history.goBack()}
                                actionColor="red" />
                        )} />
                    </div>
                )
            } else {
                fetchUsersProfile()
            }
        }

        return (
            <div className="Profile-container">
                {content}
            </div>
        )
    }

    componentWillUnmount() {
        const { forgetNotFoundError } = this.props
        forgetNotFoundError()
    }
}

export default connect(state => ({
    profile: state.profile,
    errors: state.err,
    viewedProfile: state.viewedProfile
}), { fetchUsersProfile, deleteProfile, fetchAProfile, forgetNotFoundError })(Profile)