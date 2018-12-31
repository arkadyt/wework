import React from 'react'
import NodeHeader from '../NodeHeader/NodeHeader'
import Field from '../../Field/Field'

const education = ({
  education,
  deleteEducation,
  profileBelongsToAuthedUser,
  history,
  baseUrl
}) => { 
  return education.length === 0 && !profileBelongsToAuthedUser ? null : (
    <section className="education">
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
    </section>
  )
}

export default education
