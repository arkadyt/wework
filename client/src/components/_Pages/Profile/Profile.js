import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import './Profile.css'

import ProfileView from '../../ProfileView/ProfileView'
import UpdateProfile from '../../_Forms/UpdateProfile/UpdateProfile'
import AddEdu from '../../_Forms/AddEdu/AddEdu'
import AddExp from '../../_Forms/AddExp/AddExp'
import Modal from '../../Modal/Modal'
import { fetchUsersProfile, deleteProfile } from '../../../state/actions/profileActions'

class Profile extends React.Component {
    render() {
        const {
            history,
            match,
            fetchUsersProfile,
            deleteProfile,
            profile: profileData,
            errors: {
                noprofile
            }
        } = this.props

        const baseUrl = match.url || ''

        let content = <div>
            <h2>Please wait, loading...</h2>
        </div>
        if (noprofile) {
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

        return (
            <div className="Profile-container">
                {content}
            </div>
        )
    }
}

export default connect(state => ({
    profile: state.profile,
    errors: state.err
}), { fetchUsersProfile, deleteProfile })(Profile)