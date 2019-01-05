import React from 'react'
import Node from '../Node/Node'
import ActionLine from '../ActionLine/ActionLine'

const experience = ({
  history,
  baseUrl,
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
          history.push(`${baseUrl}/add-experience`)}
        }
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

export default experience
