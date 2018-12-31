import React from 'react'
import Field from '../../Field/Field'
import {
    FaFacebook as IcoFacebook,
    FaInstagram as IcoInstagram,
    FaYoutube as IcoYoutube,
    FaGithub as IcoGithub,
    FaTwitter as IcoTwitter,
    FaLinkedin as IcoLinkedin,
    FaMapMarkerAlt as IcoLocation,
    FaPencilAlt as IcoEdit,
    FaUserCheck as IcoFollow,
    FaUserMinus as IcoUnfollow
} from 'react-icons/fa'

const overview = ({
  profileBelongsToAuthedUser,
  isFollowingProfileOwner,
  profile: {
    company,
    title,
    location,
    website,
    status,
    user: {
      _id,
      avatar,
      name
    },
    youtube,
    facebook,
    linkedin,
    twitter,
    instagram,
    githubusername,
  },
  history,
  baseUrl,
  unfollowAPerson,
  followAPerson
}) => {
  return (
    <section className="intro">
        <img src={avatar} alt="" />
        <div className="info">
            <h2>{name}</h2>
            <p>{title}{company ? ` at ${company}` : ''}</p>
            {location
                ? <p>
                    <span style={{ fontSize: '.7rem' }}><IcoLocation /></span>
                    &nbsp;{location}
                </p>
                : null}
            <p>{status}</p>
            <div className="links">
                {facebook ? <a href={facebook}><IcoFacebook /></a> : null}
                {linkedin ? <a href={linkedin}><IcoLinkedin /></a> : null}
                {twitter ? <a href={twitter}><IcoTwitter /></a> : null}
                {youtube ? <a href={youtube}><IcoYoutube /></a> : null}
                {githubusername ? <a href={`https://github.com/${githubusername}`}>
                    <IcoGithub />
                </a> : null}
                {instagram ? <a href={instagram}><IcoInstagram /></a> : null}
            </div>
            {website && <a href={website} className="website-link">{website}</a>}
        </div>
        <div className="info-buttons">
            {profileBelongsToAuthedUser
                ? <Field
                    type="button"
                    containerStyle={{ margin: 0 }}
                    onClick={() => {
                        this.quitEntryDeletingMode()
                        history.push(`${baseUrl}/update-profile`)
                    }}>
                    <span style={{ fontSize: '.8rem' }}><IcoEdit /></span>
                    &nbsp;
                    Edit Profile
                </Field>
                : isFollowingProfileOwner
                    ? <Field
                        type="button"
                        containerStyle={{ margin: 0 }}
                        onClick={() => unfollowAPerson(_id)}>
                        <span style={{ fontSize: '.8rem' }}>
                            <IcoUnfollow />
                        </span>
                        &nbsp;
                        Unfollow
                    </Field>
                    : <Field
                        type="button"
                        containerStyle={{ margin: 0 }}
                        onClick={() => followAPerson(_id)}>
                        <span style={{ fontSize: '.8rem' }}>
                            <IcoFollow />
                        </span>
                        &nbsp;
                        Follow
                    </Field>}
        </div>
    </section>
  )
}

export default overview
