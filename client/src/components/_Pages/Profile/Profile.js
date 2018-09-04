import React from 'react'
import ProfileView from '../../ProfileView/ProfileView'
import Field from '../../Field/Field'
import CreateProfile from '../../_Forms/CreateProfile/CreateProfile'
import Overlay from '../../Overlay/Overlay'
import { connect } from 'react-redux'
import { fetchUsersProfile } from '../../../state/actions/profileActions'
import { addOverlay } from '../../../state/actions/overlayActions'
import * as overlayTypes from '../../../helpers/overlayTypes'
import './Profile.css'

const Profile = ({
    fetchUsersProfile, addOverlay,
    profile: { loading, data: profileData },
    errors: { noprofile },
    overlay: { CREATING_PROFILE }
}) => {
    let content = null
    if (noprofile) {
        content = (
            <div className="content">
                <h3>You don't yet have a profile. Would you like to create one now?</h3>
                <Field type="button" label="Create" onClick={() => {
                    addOverlay(overlayTypes.CREATING_PROFILE)
                }} />
                {CREATING_PROFILE
                    ? <Overlay><CreateProfile /></Overlay>
                    : null}
            </div>
        )
    } else if (loading) {
        content = <h3>Loading...</h3>
    } else if (profileData) {
        content = <ProfileView {...profileData} />
    } else {
        fetchUsersProfile()
    }

    return (
        <div className="Profile-container">
            {content}
        </div>
    )
}

export default connect(state => ({
    profile: state.profile.usersProfile,
    errors: state.err,
    overlay: state.overlay
}), { fetchUsersProfile, addOverlay })(Profile)