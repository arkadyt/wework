import React from 'react'
import './ProfileView.css'
import ava_placeholder from '../../images/avatar_placeholder.png'
import Field from '../Field/Field'
import { connect } from 'react-redux'
import * as overlayTypes from '../../helpers/overlayTypes'
import { addOverlay } from '../../state/actions/overlayActions'
import {
    FaFacebook as IcoFacebook,
    FaInstagram as IcoInstagram,
    FaYoutube as IcoYoutube,
    FaGithub as IcoGithub,
    FaTwitter as IcoTwitter,
    FaLinkedin as IcoLinkedin,
    FaMapMarkerAlt as IcoLocation,
    FaPencilAlt as IcoEdit
} from 'react-icons/fa'

const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const NodeHeader = ({
    title,
    from,
    to,
    current
}) => {
    from = new Date(from).toLocaleDateString('en-US', dateFormatOptions)
    to = current
        ? 'Current'
        : new Date(to).toLocaleDateString('en-US', dateFormatOptions)
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{title}</h3>
            <span>{from} — {to}</span>
        </div>
    )
}

const profileView = ({
    image,
    user: { name },
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
    twitter,
    addOverlay
}) => {
    return <div className="ProfileView-container">
        <section className="intro">
            <img src={image || ava_placeholder} alt="" />
            <div className="info">
                <h2>{name}</h2>
                <p>{title} at {company}</p>
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
                <div>
                    <span style={{ fontSize: '.8rem' }}><IcoEdit /></span>
                    <Field
                        type="linkButton"
                        label="Edit Profile"
                        containerStyle={{ margin: '0 0 0 .3rem' }}
                        inline
                        style={{ color: 'white' }}
                        onClick={() => addOverlay(overlayTypes.UPDATING_PROFILE)} />
                </div>
            </div>
        </section>
        {bio
            ? <section className="bio">
                <p className="header">About Me:</p>
                <p>{bio}</p>
            </section>
            : null}
        {skills
            ? <section className="skills">
                <p className="header">Skill Set:</p>
                <div className="skills-list">
                    {skills.map((skill, idx) => {
                        return <span className="tag" key={`skill-${idx}`}>{skill}</span>
                    })}
                </div>
            </section>
            : null}
        {experience
            ? <section className="experience">
                <p className="header">Experience:</p>
                <div className="nodes">
                    {Object.keys(experience).map((key, idx) => {
                        const {
                            title,
                            company,
                            location,
                            from,
                            to,
                            current,
                            description
                        } = experience[key]
                        return <div className="node" key={`exp-entry-${idx}`}>
                            <NodeHeader title={company} from={from} to={to} current={current} />
                            <p><b>Position:</b> {title}</p>
                            <p><b>Location:</b> {location}</p>
                            {description
                                ? <p><b>Description:</b> {description}</p>
                                : null}
                        </div>
                    })}
                </div>
                <div />
                <Field
                    type="linkButton"
                    label="Add Experience"
                    onClick={() => addOverlay(overlayTypes.ADDING_EXPERIENCE)} />
            </section>
            : null}
        {education
            ? <section className="education">
                <p className="header">Education:</p>
                <div className="nodes">
                    {Object.keys(education).map((key, idx) => {
                        const {
                            school,
                            degree,
                            fieldOfStudy,
                            from,
                            to,
                            current,
                            description
                        } = education[key]
                        return <div className="node" key={`edu-entry-${idx}`}>
                            <NodeHeader title={school} from={from} to={to} current={current} />
                            <p><b>Degree:</b> {degree}</p>
                            <p><b>Field of study:</b> {fieldOfStudy}</p>
                            {description
                                ? <p><b>Description:</b> {description}</p>
                                : null}
                        </div>
                    })}
                </div>
                <div />
                <Field
                    type="linkButton"
                    label="Add Education"
                    onClick={() => addOverlay(overlayTypes.ADDING_EDUCATION)} />
            </section>
            : null}
        <section>
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
                onClick={() => addOverlay(overlayTypes.DELETING_PROFILE)} />
        </section>
    </div>
}

export default connect(null, { addOverlay })(profileView)