import React from 'react'
import ProfileView from '../../ProfileView/ProfileView'
import { connect } from 'react-redux'
import { fetchUsersProfile } from '../../../state/actions/profileActions'
import './Profile.css'

const Profile = ({
    fetchUsersProfile,
    profile: {
        loading,
        data: profileData
    }
}) => {
    let content = <h3>Loading...</h3>
    if (!profileData && !loading) {
        fetchUsersProfile()
    } else if (profileData && !loading) {
        content = <ProfileView {...profileData} />
    }

    return (
        <div className="Profile-container">
            {content}
        </div>
    )
}

export default connect(state => ({
    profile: state.profile.usersProfile
}), { fetchUsersProfile })(Profile)