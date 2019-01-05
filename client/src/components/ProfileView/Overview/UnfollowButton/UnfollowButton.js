import React from 'react'
import Field from '../../../Field/Field'
import {
    FaUserMinus as IcoUnfollow
} from 'react-icons/fa'

const unfollowButton = ({
  unfollowAPerson,
  profileOwnerId
}) => (
  <Field
    type="button"
    containerStyle={{ margin: 0 }}
    onClick={() => unfollowAPerson(profileOwnerId)}>
    <span style={{ fontSize: '.8rem' }}>
        <IcoUnfollow />
    </span>
    &nbsp;
    Unfollow
  </Field>
)

export default unfollowButton
