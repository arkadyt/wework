import React from 'react'

const skills = ({
  skills
}) => skills && skills.length !== 0 ? (
  <section className="skills">
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
) : null

export default skills
