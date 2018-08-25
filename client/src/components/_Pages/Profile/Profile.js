import React from 'react'
import './Profile.css'
import ava_placeholder from '../../../images/avatar_placeholder.png'

const profile = ({
    image, name, title, status, location, social, company, bio, skills, experience, education
}) => {
    return <div className="Profile-container">
        <div className="content">
            <section className="intro">
                <img src={image || ava_placeholder} alt="" />
                <h2>{name}</h2>
                <p>{title} at {company}</p>
                <p>Job seeker status: {status}</p>
                <p>{location}</p>
                {social ? Object.keys(social).map((key, idx) => {
                    return <a href={social[key]}
                        key={`soc-med-link-${idx}`}>[ICO]</a>
                }) : null}
            </section>
            <section className="bio">
                <h3>Bio</h3>
                <p>{bio}</p>
            </section>
            <section className="skills">
                <h3>Skill Set</h3>
                {skills.map((skill, idx) => {
                    return <span key={`skill-${idx}`}>{skill}</span>
                })}
            </section>
            <section className="exp-edu">
                <div>
                    <h3>Experience</h3>
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
                <div>
                    <h3>Education</h3>
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
    </div>
}

export default profile