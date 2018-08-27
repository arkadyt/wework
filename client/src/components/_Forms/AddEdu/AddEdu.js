import React from 'react'
import Field from '../../Field/Field'
import 'react-widgets/dist/css/react-widgets.css'
import './AddEdu.css'

class AddEdu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            school: '',
            fos: '',
            degree: '',
            from: null,
            to: null,
            current: false,
            desc: ''
        }
    }

    render() {
        const list = [
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

        const errors = this.props.errors || {}

        return <div className="AddEdu-container">
            <form onSubmit={e => {
                e.preventDefault()
                this.props.onSubmit(this.state)
            }}>
                <Field type="text"
                    name="school"
                    placeholder="UCLA"
                    value={this.state.school}
                    onChange={e => this.setState({ school: e.target.value })}
                    label="School:"
                    error={errors.school} />
                <Field type="text"
                    name="fos"
                    placeholder="Bioeconomics"
                    value={this.state.fos}
                    onChange={e => this.setState({ fos: e.target.value })}
                    label="Field of Study:"
                    error={errors.fos} />
                <Field type="list"
                    name="degree"
                    value={this.state.degree}
                    onChange={value => this.setState({ degree: value })}
                    label="Degree:"
                    list={list}
                    error={errors.degree} />
                <Field type="date"
                    name="from"
                    value={this.state.from}
                    onChange={value => this.setState({ from: new Date(value).toISOString() })}
                    label="From:" 
                    error={errors.from} />
                <Field
                    type="date"
                    name="to"
                    value={this.state.to}
                    onChange={value => this.setState({ to: new Date(value).toISOString() })}
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
                    name="desc"
                    value={this.state.desc}
                    onChange={e => this.setState({ desc: e.target.value })}
                    label="Description"
                    rows="5"
                    error={errors.desc} />
                <Field
                    type="submit"
                    name="submit"
                    label="Submit" />
            </form>
        </div>
    }
}

export default AddEdu