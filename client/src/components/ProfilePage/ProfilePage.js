import React from 'react'

const profilePage = props => {
    return <div className="ProfilePage-container">
        <section>
            <img src={props.image} alt="" />
            <h2>{props.name}</h2>
            <p>{props.status} at {props.company}</p>
            <p>{props.location}</p>
            {props.social ? Object.keys(props.social).map((key, idx) => {
                return <a href={props.social[key]}
                    key={`soc-med-link-${idx}`}>[ICO]</a>
            }) : null}
        </section>
        <section>
            <h3>Bio</h3>
            <p>{props.bio}</p>
        </section>
        <section>
            <h3>Skill Set</h3>
            {props.skills.map((skill, idx) => {
                return <span key={`skill-${idx}`}>{skill}</span>
            })}
        </section>
        <section>
            <div>
                <h3>Experience</h3>
                {Object.keys(props.experience).map((key, idx) => {
                    const {
                        title, company, location, from, to, current, description
                    } = props.experience[key]
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
                {Object.keys(props.education).map((key, idx) => {
                    const {
                        school, degree, fieldOfStudy, from, to, current, description
                    } = props.education[key]
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

export default profilePage