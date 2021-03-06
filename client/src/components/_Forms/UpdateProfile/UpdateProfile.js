import React from 'react';
import { connect } from 'react-redux'
import './UpdateProfile.scss'
import Field from '../../Field/Field'
import Overlay from '../../Overlay/Overlay'
import { updateUsersProfile } from '../../../state/actions/profileActions'
import { func, object } from 'prop-types'

class UpdateProfile extends React.Component {
    initialState = {
      showSocial: false,
      creatingProfile: true,
      handle: '',
      company: '',
      title: '',
      location: '',
      website: '',
      youtube: '',
      twitter: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      githubusername: ''
    }

    constructor(props) {
        super(props)
        const { profile } = props

        if (profile) {
            this.state = {
                ...this.initialState,
                creatingProfile: false,
                ...profile
            }
        } else {
            this.state = this.initialState
        }
    }
  
    isDropdownHidden(dd) {
        if (!dd.classList) 
            // we don't know what that is, allow to navigate back.
            return true
        else 
            return dd.classList.contains("rw-popup-transition-exited")
    }

    handleDismiss = () => {
        const dropdowns = document.querySelector(".rw-popup-container")

        if (Array.isArray(dropdowns)) {
            for (let dd of dropdowns) {
                if (!this.isDropdownHidden(dd)) {
                    return
                }
            }
        } else if (dropdowns) {
            if (!this.isDropdownHidden(dropdowns)) {
                return
            }
        }

        const { history } = this.props
        history.goBack()
    }

    handleSubmit = e => {
        const { history, updateUsersProfile } = this.props
        const { showSocial, creatingProfile, ...data } = this.state
        e.preventDefault()
        updateUsersProfile(data, () => history.replace('/profile'))
    }

    render() {
        const { errors } = this.props

        return (
            <Overlay onBackdropClick={this.handleDismiss}>
                <form className="UpdateProfile-container" onSubmit={this.handleSubmit}>
                    <h1>{this.state.creatingProfile ? 'Create' : 'Update'} profile</h1>
                    <Field
                        type="text"
                        name="handle"
                        label="Profile handle:"
                        value={this.state.handle}
                        onChange={e => this.setState({ handle: e.target.value })}
                        error={errors.handle}
                        placeholder="someperson123" />
                    <Field
                        type="text"
                        name="company"
                        label="Company:"
                        value={this.state.company}
                        onChange={e => this.setState({ company: e.target.value })}
                        error={errors.company}
                        placeholder="Company name" />
                    <Field
                        type="text"
                        name="website"
                        label="Personal Website:"
                        value={this.state.website}
                        onChange={e => this.setState({ website: e.target.value })}
                        error={errors.website}
                        placeholder="http://mywebsite.com" />
                    <Field
                        type="text"
                        name="location"
                        label="Location:"
                        value={this.state.location}
                        onChange={e => this.setState({ location: e.target.value })}
                        error={errors.location}
                        placeholder="Seattle, WA" />
                    <Field
                        type="text"
                        name="title"
                        label="Job title:"
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                        error={errors.title}
                        placeholder="Marketing Analyst" />
                    <Field
                        type="list"
                        name="status"
                        label="Job seeker status:"
                        list={['Not open for Employment', 'Available for Employment', 'Actively Seeking']}
                        value={this.state.status}
                        onChange={value => this.setState({ status: value })}
                        error={errors.status} />
                    <Field
                        type="multiselect"
                        name="skills"
                        label="Skills:"
                        list={['Python', 'Java', 'C++', 'Hospitality', 'Whatnot else']}
                        value={this.state.skills}
                        onChange={value => this.setState({ skills: value })}
                        error={errors.skills} />
                    <Field
                        type="textarea"
                        name="bio"
                        label="Bio:"
                        value={this.state.bio}
                        onChange={e => this.setState({ bio: e.target.value })}
                        error={errors.bio}
                        placeholder="It's okay to brag here.." />
                    <Field
                        type="button"
                        name="toggle"
                        label="Toggle social media section"
                        onClick={e => {
                            e.preventDefault()
                            this.setState(prevState => ({ showSocial: !prevState.showSocial }))
                        }} />
                    <div style={{ display: this.state.showSocial ? 'block' : 'none' }}>
                        <Field
                            type="text"
                            name="youtube"
                            label="Youtube:"
                            value={this.state.youtube}
                            onChange={e => this.setState({ youtube: e.target.value })}
                            error={errors.youtube}
                            placeholder="Please enter full channel URL" />
                        <Field
                            type="text"
                            name="twitter"
                            label="Twitter:"
                            value={this.state.twitter}
                            onChange={e => this.setState({ twitter: e.target.value })}
                            error={errors.twitter}
                            placeholder="Twitter profile URL" />
                        <Field
                            type="text"
                            name="instagram"
                            label="Instagram:"
                            value={this.state.instagram}
                            onChange={e => this.setState({ instagram: e.target.value })}
                            error={errors.instagram}
                            placeholder="Instagram URL" />
                        <Field
                            type="text"
                            name="facebook"
                            label="Facebook:"
                            value={this.state.facebook}
                            onChange={e => this.setState({ facebook: e.target.value })}
                            error={errors.facebook}
                            placeholder="Facebook profile URL" />
                        <Field
                            type="text"
                            name="linkedin"
                            label="LinkedIn:"
                            value={this.state.linkedin}
                            onChange={e => this.setState({ linkedin: e.target.value })}
                            error={errors.linkedin}
                            placeholder="LinkedIn URL" />
                        <Field
                            type="text"
                            name="githubusername"
                            label="Github:"
                            value={this.state.githubusername}
                            onChange={e => this.setState({ githubusername: e.target.value })}
                            error={errors.githubusername}
                            placeholder="Github username only" />
                    </div>
                    <Field
                        type="submit"
                        name="submit"
                        label={this.state.creatingProfile ? 'Create' : 'Update'} />
                    <Field
                        type="button"
                        name="cancel"
                        label="Cancel"
                        onClick={e => {
                            e.preventDefault()
                            this.handleDismiss()
                        }} />
                </form>
            </Overlay>
        )
    }
}

UpdateProfile.propTypes = {
  errors: object.isRequired,
  updateUsersProfile: func.isRequired,
  history: object.isRequired,
  profile: object
}

export const mapStateToProps = state => ({
    errors: state.err.formErrors
})

export { UpdateProfile }
export default connect(mapStateToProps, { updateUsersProfile })(UpdateProfile)
