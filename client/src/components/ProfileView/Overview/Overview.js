import React from 'react'
import Name from './Name/Name'
import Links from './Links/Links'
import Location from './Location/Location'
import EditButton from './EditButton/EditButton'
import FollowButton from './FollowButton/FollowButton'
import UnfollowButton from './UnfollowButton/UnfollowButton'

const overview = ({
  profile: {
    user: {
      _id: profileOwnerId,
      avatar
    },
    status
  },
  profile,
  profileBelongsToAuthedUser,
  isFollowingProfileOwner,
  baseUrl,
  history,
  followAPerson,
  unfollowAPerson,
  quitEntryDeletingMode
}) => {
  const navTo = where => history.push(`${baseUrl}/${where}`)

  let buttons
  if (profileBelongsToAuthedUser) {
    buttons = (
      <EditButton 
        quitEntryDeletingMode={quitEntryDeletingMode}
        navTo={navTo} />
    )
  } else {
    if (isFollowingProfileOwner) {
      buttons = (
        <UnfollowButton 
          unfollowAPerson={unfollowAPerson}
          quitEntryDeletingMode={quitEntryDeletingMode}
          profileOwnerId={profileOwnerId} />
      )
    } else {
      buttons = (
        <FollowButton 
          followAPerson={followAPerson}
          quitEntryDeletingMode={quitEntryDeletingMode}
          profileOwnerId={profileOwnerId} />
      )
    }
  }
  
  return (
    <section className="intro">
      <img src={avatar} alt="" />

      <div className="info">
        <Name profile={profile} />
        <Location profile={profile} />
        <p>{status}</p>
        <Links profile={profile} />
      </div>

      <div className="info-buttons">
        {buttons}
      </div>
    </section>
  )
}

export default overview
