import React, { Fragment } from 'react'
import Field from '../../Field/Field'

const NoProfileMessage = ({ history }) => (
    <Fragment>
        <h2>You don't yet have a profile, create one now!</h2>
        <Field 
            type="button"
            label="Create"
            onClick={() => {
                history.push('/profile/create-profile')
            }} />
    </Fragment>
)

export default NoProfileMessage
