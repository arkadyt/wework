import React from 'react'
import Node from '../Node/Node'
import ActionLine from '../ActionLine/ActionLine'
import { arrayOf, bool, func } from 'prop-types'
import { experienceEntryType } from '../../../types/index'

const experience = ({
  navTo,
  profileBelongsToAuthedUser,
  experience,
  deleteExperience,
  quitEntryDeletingMode,
  isDeleting,
  setDeleting
}) => {
  let actionLine
  if (profileBelongsToAuthedUser) {
    actionLine = (
      <ActionLine 
        addBtnLabel="Add Experience"
        onAddBtnClk={() => {
          quitEntryDeletingMode()
          navTo('add-experience')
        }}
        setDeleting={setDeleting}
        nodes={experience}
        isDeleting={isDeleting} />
    )
  }

  return experience.length === 0 && !profileBelongsToAuthedUser ? null : (
    <section className="experience">
      <p className="header">Experience:</p>
      <div className="nodes">
        {experience.map(item => {
          const headers = [
            item.company,
            item.title,
            item.location
          ]
          return (
            <Node {...item} 
              key={item._id}
              headers={headers}
              isDeleting={isDeleting}
              onDelBtnClick={deleteExperience} />
          )
        })}
        {actionLine}
      </div>
    </section>
  )
}

experience.propTypes = {
  navTo: func.isRequired,
  profileBelongsToAuthedUser: bool.isRequired,
  experience: arrayOf(experienceEntryType).isRequired,
  deleteExperience: func.isRequired,
  quitEntryDeletingMode: func.isRequired,
  isDeleting: bool.isRequired,
  setDeleting: func.isRequired
}

export default experience
