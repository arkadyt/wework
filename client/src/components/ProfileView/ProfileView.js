import React from 'react'
import './ProfileView.css'
import ava_placeholder from '../../images/avatar_placeholder.png'
import {
    FaFacebook as IcoFacebook,
    FaInstagram as IcoInstagram,
    FaYoutube as IcoYoutube,
    FaGithub as IcoGithub,
    FaTwitter as IcoTwitter,
    FaLinkedin as IcoLinkedin,
    FaMapMarkerAlt as IcoLocation
} from 'react-icons/fa'

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
    twitter
}) => {
    return <div className="ProfileView-container">
        <section className="intro">
            <img src={image || ava_placeholder} alt="" />
            <div className="info">
                <h2>{name}</h2>
                <p>{title} at {company}</p>
                <p><IcoLocation /> {location}</p>
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
            </div>
        </section>
        <section className="bio">
            <p className="header">About Me:</p>
            <p>{bio}</p>
        </section>
        <section className="skills">
            <p className="header">Skill Set:</p>
            <div className="skills-list">
                {skills.map((skill, idx) => {
                    return <span key={`skill-${idx}`}>{skill}</span>
                })}
            </div>
        </section>
        <section className="exp">
            <p className="header">Experience:</p>
            <div className="jobs nodes">
                {Object.keys(experience).map((key, idx) => {
                    const {
                        title, company, location, from, to, current, description
                    } = experience[key]
                    return <div key={`exp-entry-${idx}`}>
                        <h3>{company}</h3>
                        <p>{from} -- {current ? 'Current' : to}</p>
                        <p>Position: {title}</p>
                        <p>Location: {location}</p>
                        <p>Description: {description}</p>
                    </div>
                })}
            </div>
        </section>
        <section className="edu">
            <p className="header">Education:</p>
            <div className="schools nodes">
                {Object.keys(education).map((key, idx) => {
                    const {
                        school, degree, fieldOfStudy, from, to, current, description
                    } = education[key]
                    return <div key={`edu-entry-${idx}`}>
                        <h3>{school}</h3>
                        <p>{from} -- {current ? 'Current' : to}</p>
                        <p>Degree: {degree}</p>
                        <p>Field of study: {fieldOfStudy}</p>
                        <p>Description: {description}</p>
                    </div>
                })}
            </div>
        </section>
    </div>
}

export default profileView