import React from 'react'
import NodeHeader from '../NodeHeader/NodeHeader'
import Field from '../../Field/Field'

const experience = ({
  experience,
  deleteExperience,
  baseUrl,
  profileBelongsToAuthedUser,
  history
}) => {
  return experience.length === 0 && !profileBelongsToAuthedUser ? null : (
    <section className="experience">
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
    </section>
  )
}

export default experience
