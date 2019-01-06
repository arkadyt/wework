import React from 'react'
import Field from '../../../Field/Field'
import { func, string } from 'prop-types'
import {
    FaUserCheck as IcoFollow
} from 'react-icons/fa'

const followButton = ({
  followAPerson,
  profileOwnerId
}) => (
  <Field
    type="button"
    containerStyle={{ margin: 0 }}
    onClick={() => followAPerson(profileOwnerId)}>
    <span style={{ fontSize: '.8rem' }}>
        <IcoFollow />
    </span>
    &nbsp;
    Follow
  </Field>
)

followButton = {
  followAPerson: func.isRequired,
  profileOwnerId: string.isRequired
}

export default followButton
