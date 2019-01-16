import React from 'react'
import Node from '../Node/Node'
import ActionLine from '../ActionLine/ActionLine'
import { arrayOf, bool, func } from 'prop-types'
import { educationEntryType } from '../../../types/index'

const education = ({
  navTo,
  profileBelongsToAuthedUser,
  education,
  deleteEducation,
  quitEntryDeletingMode,
  isDeleting,
  setDeleting
}) => { 
  let actionLine
  if (profileBelongsToAuthedUser) {
    actionLine = (
      <ActionLine 
        addBtnLabel="Add Education"
        onAddBtnClk={() => {
          quitEntryDeletingMode()
          navTo('add-education')
        }}
        setDeleting={setDeleting}
        nodes={education}
        isDeleting={isDeleting} />
    )
  }

  return education.length === 0 && !profileBelongsToAuthedUser ? null : (
    <section className="education">
        <p className="header">Education:</p>
        <div className="nodes">
          {education.map(item => {
            const headers = [
              item.school,
              item.fieldOfStudy,
              item.degree
            ]
            return (
              <Node {...item}
                key={item._id}
                headers={headers}
                isDeleting={isDeleting}
                onDelBtnClick={deleteEducation} />
            )
          })}
          {actionLine}
        </div>
    </section>
  )
}

education.propTypes = {
  navTo: func.isRequired,
  profileBelongsToAuthedUser: bool.isRequired,
  education: arrayOf(educationEntryType).isRequired,
  deleteEducation: func.isRequired,
  quitEntryDeletingMode: func.isRequired,
  isDeleting: bool.isRequired,
  setDeleting: func.isRequired
}

export default education
