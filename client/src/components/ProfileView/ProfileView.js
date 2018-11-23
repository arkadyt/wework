/**
 * WARNING:
 * 
 * I do realize that this component is just a wall of shitcode,
 * and I do realize how many mistakes have been made here.
 * 
 * Don't judge my skills based on what you see here. 
 * This code will be refactored in the soon time.
 * In the meanwhile you can checkout the ../_Pages/Feed.js component!
 * 
 * Happy reading!
 */


import React, { Component } from 'react'
import './ProfileView.scss'
import Field from '../Field/Field'
import { connect } from 'react-redux'
import { deleteExperience, deleteEducation } from '../../state/actions/profileActions'
import { followAPerson, unfollowAPerson } from '../../state/actions/userActions'
import {
    FaFacebook as IcoFacebook,
    FaInstagram as IcoInstagram,
    FaYoutube as IcoYoutube,
    FaGithub as IcoGithub,
    FaTwitter as IcoTwitter,
    FaLinkedin as IcoLinkedin,
    FaMapMarkerAlt as IcoLocation,
    FaPencilAlt as IcoEdit,
    // FaRss as IcoActivity,
    // FaComment as IcoMessage,
    FaUserCheck as IcoFollow,
    FaUserMinus as IcoUnfollow
} from 'react-icons/fa'

/**
 * Header for experience & education nodes.
 * Outputs {company} name with {timespan} or {delButton} 
 */
const NodeHeader = ({
    title,
    from,
    to,
    current,
    showDelButton,
    onDelBtnClick
}) => {
    // Month ##, ####
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    from = new Date(from).toLocaleDateString('en-US', dateFormatOptions)
    to = current
        ? 'Current'
        : new Date(to).toLocaleDateString('en-US', dateFormatOptions)
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{title}</h3>
            {showDelButton
                ? <Field
                    type="linkButton"
                    label="Delete"
                    containerStyle={{ margin: 0, width: 'auto' }}
                    onClick={() => onDelBtnClick()} />
                : <span>{from} — {to}</span>}
        </div>
    )
}

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

    /**
     * Quit 'entry deleting' mode (experience and education nodes).
     */
    quitEntryDeletingMode() {
        this.setState(this.defaultDeletingState)
    }

    render() {
        const {
            authedUser: {
                id: authedUserId,
                following
            },
            history,
            match,
            deleteEducation,
            deleteExperience,
            followAPerson,
            unfollowAPerson,
            profile: {
                user: { _id, name, avatar },
                title,
                status,
                location,
                company,
                website,
                bio,
                skills,
                experience,
                education,
                youtube,
                facebook,
                linkedin,
                githubusername,
                instagram,
                twitter
            }
        } = this.props

        const baseUrl = match.url || ''

        const profileBelongsToAuthedUser = authedUserId === _id

        const isFollowingProfileOwner = !!following.find(item => item.user === _id)

        console.log(isFollowingProfileOwner)

        return (
            <div className="ProfileView-container">
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
                {bio
                    ? <section className="bio">
                        <p className="header">About Me:</p>
                        <p>{bio}</p>
                    </section>
                    : null}
                {skills && skills.length !== 0
                    ? <section className="skills">
                        <p className="header">Skill Set:</p>
                        <div className="skills-list">
                            {skills.map((skill, idx) => {
                                return (
                                    <span className="tag"
                                        key={`skill-${idx}`}>
                                        {skill}
                                    </span>
                                )
                            })}
                        </div>
                    </section>
                    : null}
                {experience.length === 0 && !profileBelongsToAuthedUser
                    ? null
                    : <section className="experience">
                        <p className="header">Experience:</p>
                        <div className="nodes">
                            {Object.keys(experience).map(key => {
                                const {
                                    _id,
                                    title,
                                    company,
                                    location,
                                    from,
                                    to,
                                    current,
                                    description
                                } = experience[key]
                                return <div className="node" key={`exp-entry-${_id}`}>
                                    <NodeHeader
                                        title={company}
                                        from={from}
                                        to={to}
                                        current={current}
                                        showDelButton={this.state.deletingExpEntries}
                                        onDelBtnClick={() => {
                                            deleteExperience(_id)
                                        }} />
                                    <p><b>Position:</b> {title}</p>
                                    <p><b>Location:</b> {location}</p>
                                    {description
                                        ? <p><b>Description:</b> {description}</p>
                                        : null}
                                </div>
                            })}
                            {profileBelongsToAuthedUser
                                ? <div style={{ display: 'flex', width: '100%' }}>
                                    <Field
                                        type="linkButton"
                                        label="Add Experience"
                                        containerStyle={{ flexBasis: '9rem', margin: 0 }}
                                        onClick={() => {
                                            this.quitEntryDeletingMode()
                                            history.push(`${baseUrl}/add-experience`)
                                        }} />
                                    {experience.length !== 0
                                        ? this.state.deletingExpEntries
                                            ? <Field
                                                type="linkButton"
                                                label="Cancel"
                                                containerStyle={{ margin: 0 }}
                                                onClick={() => this.setState({ deletingExpEntries: false })} />
                                            : <Field
                                                type="linkButton"
                                                label="Delete an entry"
                                                containerStyle={{ margin: 0 }}
                                                onClick={() => this.setState({ deletingExpEntries: true })} />
                                        : null}
                                </div>
                                : null}
                        </div>
                    </section>}
                {education.length === 0 && !profileBelongsToAuthedUser
                    ? null
                    : <section className="education">
                        <p className="header">Education:</p>
                        <div className="nodes">
                            {Object.keys(education).map(key => {
                                const {
                                    _id,
                                    school,
                                    degree,
                                    fieldOfStudy,
                                    from,
                                    to,
                                    current,
                                    description
                                } = education[key]
                                return <div className="node" key={`edu-entry-${_id}`}>
                                    <NodeHeader
                                        title={school}
                                        from={from}
                                        to={to}
                                        current={current}
                                        showDelButton={this.state.deletingEduEntries}
                                        onDelBtnClick={() => {
                                            deleteEducation(_id)
                                        }} />
                                    <p><b>Degree:</b> {degree}</p>
                                    <p><b>Field of study:</b> {fieldOfStudy}</p>
                                    {description
                                        ? <p><b>Description:</b> {description}</p>
                                        : null}
                                </div>
                            })}
                            {profileBelongsToAuthedUser
                                ? <div style={{ display: 'flex', width: '100%' }}>
                                    <Field
                                        type="linkButton"
                                        label="Add Education"
                                        containerStyle={{ flexBasis: '9rem', margin: 0 }}
                                        onClick={() => {
                                            this.quitEntryDeletingMode()
                                            history.push(`${baseUrl}/add-education`)
                                        }} />
                                    {education.length !== 0
                                        ? this.state.deletingEduEntries
                                            ? <Field
                                                type="linkButton"
                                                label="Cancel"
                                                containerStyle={{ margin: 0 }}
                                                onClick={() => this.setState({ deletingEduEntries: false })} />
                                            : <Field
                                                type="linkButton"
                                                label="Delete an entry"
                                                containerStyle={{ margin: 0 }}
                                                onClick={() => this.setState({ deletingEduEntries: true })} />
                                        : null}
                                </div>
                                : null}
                        </div>
                    </section>}
                {profileBelongsToAuthedUser
                    ? <section>
                        <div />
                        <Field
                            type="button"
                            label="Delete Profile"
                            inline
                            style={{
                                backgroundColor: 'red',
                                borderColor: 'red',
                                color: 'white'
                            }}
                            containerStyle={{ margin: 0 }}
                            onClick={() => {
                                this.quitEntryDeletingMode()
                                history.push(`${baseUrl}/delete-profile`)
                            }} />
                    </section>
                    : null}
            </div>
        )
    }
}

export default connect(state => ({
    authedUser: state.user
}), { deleteEducation, deleteExperience, followAPerson, unfollowAPerson })(ProfileView)
