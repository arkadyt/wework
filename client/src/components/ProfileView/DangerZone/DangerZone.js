import React from 'react'
import Field from '../../Field/Field'
import { func, bool } from 'prop-types'

const dangerZone = ({
  navTo,
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
                navTo('delete-profile')
            }} />
    </section>
  ) : null
}

dangerZone.propTypes = {
  navTo: func.isRequired,
  profileBelongsToAuthedUser: bool.isRequired,
  quitEntryDeletingMode: func.isRequired
}

export default dangerZone
