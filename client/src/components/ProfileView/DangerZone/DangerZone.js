import React from 'react'
import Field from '../../Field/Field'

const dangerZone = ({
  history,
  baseUrl,
  quitEntryDeletingMode,
  profileBelongsToAuthedUser
}) => {
  return profileBelongsToAuthedUser ? (
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
            onClick={() => {
                quitEntryDeletingMode()
                history.push(`${baseUrl}/delete-profile`)
            }} />
    </section>
  ) : null
}

export default dangerZone
