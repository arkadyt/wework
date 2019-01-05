import React from 'react'

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

export default name
