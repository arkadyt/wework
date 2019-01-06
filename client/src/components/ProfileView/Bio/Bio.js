import React from 'react'
import { string } from 'prop-types'

const bio = ({
  bio
}) => bio ? (
  <section className="bio">
    <p className="header">About Me:</p>
    <p>{bio}</p>
  </section>
) : null

bio.propTypes = {
  bio: string.isRequired
}

export default bio
