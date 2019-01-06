import React from 'react'
import { profileType } from '../../../../types/index'

const name = ({
  profile: {
    user: {name},
    title,
    company
  }
}) => {
  return (
    <React.Fragment>
      <h2>{name}</h2>
      <p>{title}{company ? ` at ${company}` : ''}</p>
    </React.Fragment>
  )
}

name.propTypes = {
  profile: profileType.isRequired
}

export default name
