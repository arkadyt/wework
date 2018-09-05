import React from 'react';
import Field from '../../Field/Field'
import { dismissOverlay } from '../../../state/actions/overlayActions'
import * as overlayTypes from '../../../helpers/overlayTypes'
import { updateUsersProfile } from '../../../state/actions/profileActions'
import { connect } from 'react-redux'

class CreateProfile extends React.Component {
    state = {
        handle: 'techguy',
        company: 'Facebook',
        website: 'http://mywebsite.com',
        location: 'Seattle, WA',
        title: 'Marketing Analyst',
        status: 'Actively Applying',
        skills: ['Java', 'C++'],
        bio: 'Bragging... Bragging... Bragging... Bragging...',
        githubusername: 'coder123',
        social: undefined
    }

    render() {
        const { dismissOverlay, updateUsersProfile, errors } = this.props

        return (
            <form onSubmit={e => {
                e.preventDefault()
                updateUsersProfile(this.state, () => {
                    dismissOverlay(overlayTypes.CREATING_PROFILE)
                })
            }}>
                <h1>Create profile</h1>
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
                    placeholder="Facebook" />
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
                    list={['Not open', 'Available for Employment', 'Actively Seeking']}
                    value={this.state.value}
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
                    type="text"
                    name="githubusername"
                    label="Github username:"
                    value={this.githubusername}
                    onChange={e => this.setState({ githubusername: e.target.value })}
                    error={errors.githubusername}
                    placeholder="coder123" />
                <Field
                    type="submit"
                    label="Create" />
                <Field
                    type="button"
                    label="Cancel"
                    onClick={() => dismissOverlay(overlayTypes.CREATING_PROFILE)} />
            </form>
        )
    }
}

export default connect(state => ({
    errors: state.err.formErrors,
    overlay: state.overlay
}), { 
    dismissOverlay, 
    updateUsersProfile 
})(CreateProfile)