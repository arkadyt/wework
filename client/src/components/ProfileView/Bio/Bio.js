import React from 'react'

const bio = ({
  bio
}) => bio ? (
  <section className="bio">
    <p className="header">About Me:</p>
    <p>{bio}</p>
  </section>
) : null

export default bio
