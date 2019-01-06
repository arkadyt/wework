import React from 'react'
import Field from '../../../Field/Field'
import { func } from 'prop-types'
import {
    FaPencilAlt as IcoEdit
} from 'react-icons/fa'

const editButton = ({
  navTo,
  quitEntryDeletingMode
}) => (
  <Field
    type="button"
    containerStyle={{ margin: 0 }}
    onClick={() => {
      quitEntryDeletingMode()
      navTo('update-profile')
    }}>
    <span style={{ fontSize: '.8rem' }}><IcoEdit /></span>
    &nbsp;
    Edit Profile
  </Field>
)

editButton = {
  navTo: func.isRequired,
  quitEntryDeletingMode: func.isRequired
}

export default editButton
