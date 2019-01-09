import React from 'react'
import { connect } from 'react-redux'
import { addExperience } from '../../../state/actions/profileActions'
import './AddExp.scss'
import 'react-widgets/lib/scss/react-widgets.scss'
import { object, func } from 'prop-types'
import Field from '../../Field/Field'
import Overlay from '../../Overlay/Overlay'

class AddExp extends React.Component {
    state = {
      title: '',
      company: '',
      location: ''
    }

    handleDismiss = () => {
        const { history } = this.props
        history.goBack()
    }

    render() {
        const { addExperience, errors } = this.props

        return (
            <Overlay onBackdropClick={this.handleDismiss}>
                <form className="AddExp-container" onSubmit={e => {
                    e.preventDefault()
                    addExperience(this.state, this.handleDismiss)
                }}>
                    <h1>Add Experience</h1>
                    <Field 
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={e => this.setState({ title: e.target.value })}
                      label="Title:"
                      error={errors.title}
                      placeholder="Software Developer" />
                    <Field 
                      type="text"
                      name="company"
                      value={this.state.company}
                      onChange={e => this.setState({ company: e.target.value })}
                      label="Company:"
                      error={errors.company}
                      placeholder="Company name" />
                    <Field 
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={e => this.setState({ location: e.target.value })}
                      label="Location:"
                      error={errors.location}
                      placeholder="San Francisco, CA" />
                    <Field 
                      type="date"
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
                      name="submit"
                      label="Add" />
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

AddExp.propTypes = {
  errors: object.isRequired,
  addExperience: func.isRequired,
  history: object.isRequired
}

export const mapStateToProps = state => ({
    errors: state.err.formErrors
})

export { AddExp as _UnconnectedAddExp }
export default connect(mapStateToProps, { addExperience })(AddExp)
