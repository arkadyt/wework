import React from 'react'
import Field from '../../Field/Field'
import { connect } from 'react-redux'
import { addEducation } from '../../../state/actions/profileActions'
import { dismissOverlay } from '../../../state/actions/overlayActions'
import * as overlayTypes from '../../../helpers/overlayTypes'
import 'react-widgets/dist/css/react-widgets.css'
import './AddEdu.css'

class AddEdu extends React.Component {
    state = {}

    render() {
        const { addEducation, dismissOverlay, errors } = this.props

        const degreeTypes = [
            "Professional Certificate",
            "Undergraduate Degrees",
            "Transfer Degree",
            "Associate Degree",
            "Bachelor Degree",
            "Graduate Degrees",
            "Master Degree",
            "Doctoral Degree",
            "Professional Degree",
            "Specialist Degree"
        ]

        return (
            <form className="AddEdu-container" onSubmit={e => {
                e.preventDefault()
                addEducation(this.state, () => {
                    dismissOverlay(overlayTypes.ADDING_EDUCATION)
                })
            }}>
                <h1>Add Education</h1>
                <Field type="text"
                    name="school"
                    placeholder="UCLA"
                    value={this.state.school}
                    onChange={e => this.setState({ school: e.target.value })}
                    label="School:"
                    error={errors.school} />
                <Field type="text"
                    name="fieldOfStudy"
                    placeholder="Bioeconomics"
                    value={this.state.fieldOfStudy}
                    onChange={e => this.setState({ fieldOfStudy: e.target.value })}
                    label="Field of Study:"
                    error={errors.fieldOfStudy} />
                <Field type="list"
                    name="degree"
                    value={this.state.degree}
                    onChange={value => this.setState({ degree: value })}
                    label="Degree:"
                    list={degreeTypes}
                    error={errors.degree} />
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
                    style={{ float: 'right', margin: '0 .5rem' }}
                    onClick={() => dismissOverlay(overlayTypes.ADDING_EDUCATION)} />
            </form>
        )
    }
}

export default connect(state => ({
    errors: state.err.formErrors
}), { addEducation, dismissOverlay })(AddEdu)