import React from 'react'
import './ProfileView.css'
import placeholderImage from '../../images/avatar_placeholder.png'
import Field from '../Field/Field'
import { connect } from 'react-redux'
import { deleteExperience, deleteEducation } from '../../state/actions/profileActions'
import {
    FaFacebook as IcoFacebook,
    FaInstagram as IcoInstagram,
    FaYoutube as IcoYoutube,
    FaGithub as IcoGithub,
    FaTwitter as IcoTwitter,
    FaLinkedin as IcoLinkedin,
    FaMapMarkerAlt as IcoLocation,
    FaPencilAlt as IcoEdit,
    FaRss as IcoActivity,
    FaComment as IcoMessage
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

class ProfileView extends React.Component {
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
            authedUserId,
            history,
            match,
            deleteEducation,
            deleteExperience,
            profile: {
                user: { _id, name },
                image,
                title,
                status,
                location,
                company,
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

        return (
            <div className="ProfileView-container">
                <section className="intro">
                    <img src={image || placeholderImage} alt="" />
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
                        {profileBelongsToAuthedUser
                            ? <div>
                                <span style={{ fontSize: '.8rem' }}><IcoEdit /></span>
                                <Field
                                    type="linkButton"
                                    label="Edit Profile"
                                    containerStyle={{ margin: '0 0 0 .3rem' }}
                                    inline
                                    style={{ color: 'white' }}
                                    onClick={() => {
                                        this.quitEntryDeletingMode()
                                        history.push(`${baseUrl}/update-profile`)
                                    }} />
                            </div>
                            : <div>
                                <span style={{ fontSize: '.8rem' }}>
                                    <IcoActivity />
                                </span>
                                <Field
                                    type="linkButton"
                                    label="See Activity"
                                    containerStyle={{ margin: '0 0 0 .3rem' }}
                                    inline
                                    style={{ color: 'white' }}
                                    onClick={() => alert('To be completed later.')} />
                                <span style={{ fontSize: '.8rem', marginLeft: '.8rem' }}>
                                    <IcoMessage />
                                </span>
                                <Field
                                    type="linkButton"
                                    label="Send a Message"
                                    containerStyle={{ margin: '0 0 0 .3rem' }}
                                    inline
                                    style={{ color: 'white' }}
                                    onClick={() => alert('To be completed later.')} />
                            </div>}
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
                                                style={{ color: 'darkred' }}
                                                containerStyle={{ margin: 0 }}
                                                onClick={() => this.setState({ deletingExpEntries: false })} />
                                            : <Field
                                                type="linkButton"
                                                label="Delete an entry"
                                                style={{ color: 'darkred' }}
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
                                                style={{ color: 'darkred' }}
                                                containerStyle={{ margin: 0 }}
                                                onClick={() => this.setState({ deletingEduEntries: false })} />
                                            : <Field
                                                type="linkButton"
                                                label="Delete an entry"
                                                style={{ color: 'darkred' }}
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
    authedUserId: state.user.id
}), { deleteEducation, deleteExperience })(ProfileView)