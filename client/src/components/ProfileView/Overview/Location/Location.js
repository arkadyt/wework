import React from 'react'
import { profileType } from '../../../../types/index'
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

location.propTypes = {
  profile: profileType.isRequired
}

export default location
