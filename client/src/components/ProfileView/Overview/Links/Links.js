import React from 'react'
import {
    FaFacebook as IcoFacebook,
    FaInstagram as IcoInstagram,
    FaYoutube as IcoYoutube,
    FaGithub as IcoGithub,
    FaTwitter as IcoTwitter,
    FaLinkedin as IcoLinkedin,
} from 'react-icons/fa'

const links = ({
  profile: {
    facebook,
    twitter,
    linkedin,
    youtube,
    website,
    githubusername,
    instagram
  }
}) => {
  return (
    <div className="Profile-View-Links-container">
      <div className="links">
          {facebook ? <a href={facebook} target="_blank" rel="noopener noreferrer"><IcoFacebook /></a> : null}
          {linkedin ? <a href={linkedin} target="_blank" rel="noopener noreferrer"><IcoLinkedin /></a> : null}
          {twitter ? <a href={twitter} target="_blank" rel="noopener noreferrer"><IcoTwitter /></a> : null}
          {youtube ? <a href={youtube} target="_blank" rel="noopener noreferrer"><IcoYoutube /></a> : null}
          {githubusername ? <a href={`https://github.com/${githubusername}`} target="_blank" rel="noopener noreferrer">
              <IcoGithub />
          </a> : null}
          {instagram ? <a href={instagram} target="_blank" rel="noopener noreferrer"><IcoInstagram /></a> : null}
      </div>
      {website && <a href={website} target="_blank" rel="noopener noreferrer" className="website-link">{website}</a>}
    </div>
  )
}

export default links
