import React from 'react'
import { connect } from 'react-redux'
import { addExperience } from '../../../state/actions/profileActions'
import 'react-widgets/dist/css/react-widgets.css'
import './AddExp.css'

import Field from '../../Field/Field'
import Overlay from '../../Overlay/Overlay'

class AddExp extends React.Component {
    state = {}

    handleDismiss = () => {
        const { history } = this.props
        history.goBack()
    }

    render() {
        const { addExperience, errors } = this.props

        return (
            <Overlay onBackdropClick={() => this.handleDismiss()}>
                <form className="AddExp-container" onSubmit={e => {
                    e.preventDefault()
                    addExperience(this.state, () => this.handleDismiss())
                }}>
                    <h1>Add Experience</h1>
                    <Field type="text"
                        name="title"
                        placeholder="Software Developer"
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                        label="Title:"
                        error={errors.title} />
                    <Field type="text"
                        name="company"
                        placeholder="Facebook"
                        value={this.state.company}
                        onChange={e => this.setState({ company: e.target.value })}
                        label="Company:"
                        error={errors.company} />
                    <Field type="text"
                        name="location"
                        placeholder="San Francisco, CA"
                        value={this.state.location}
                        onChange={e => this.setState({ location: e.target.value })}
                        label="Location:"
                        error={errors.location} />
                    <Field type="date"
                        name="from"
                        value={this.state.from}
                        onChange={value => this.setState({ from: value })}
                        label="From:"
                        error={errors.from} />
                    <Field
                        type="date"
                        name="to"
                        value={this.state.to}
                        onChange={value => this.setState({ to: value })}
                        disabled={this.state.current}
                        label="To:"
                        error={errors.to} />
                    <Field
                        type="checkbox"
                        name="current"
                        value={this.state.current}
                        onChange={e => this.setState({ current: e.target.checked })}
                        label="Current?" />
                    <Field
                        type="textarea"
                        name="description"
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                        label="Description"
                        rows="2"
                        error={errors.description} />
                    <Field
                        type="submit"
                        label="Add" />
                    <Field
                        type="button"
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

export default connect(state => ({
    errors: state.err.formErrors
}), { addExperience })(AddExp)