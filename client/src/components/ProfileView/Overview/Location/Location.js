import React from 'react'
import {
    FaMapMarkerAlt as IcoLocation
} from 'react-icons/fa'

const location = ({
  profile: {
    location
  }
}) => {
  return location
    ? <p>
        <span style={{ fontSize: '.7rem' }}><IcoLocation /></span>
        &nbsp;{location}
    </p>
    : null
}

export default location
