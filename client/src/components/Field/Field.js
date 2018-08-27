import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import 'react-widgets/dist/css/react-widgets.css'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import './Field.css'

Moment.locale('en')
momentLocalizer()

const field = ({
    type, name, placeholder,
    label, error,
    list, rows,
    value, onChange,
    disabled
}) => {
    let field = null
    const commonProps = { name, id: name, value, onChange }

    switch (type) {
        case "text":
            field = <input
                {...commonProps}
                placeholder={placeholder || "Enter text..."}
                className="rw-widget-container rw-widget-input"
                type="text" />
            break
        case "textarea":
            field = <textarea
                {...commonProps}
                placeholder={placeholder || 'Say something...'}
                className="rw-widget-container rw-widget-input"
                style={{
                    padding: '.5rem',
                    fontSize: '1rem',
                    width: '100%',
                    resize: 'none'
                }}
                rows={rows} />
            break
        case "date":
            field = <DateTimePicker
                {...commonProps}
                placeholder={placeholder || 'Pick a date...'}
                time={false}
                format="MMM DD, YYYY"
                editFormat="M/DD/YYYY"
                disabled={disabled} />
            break
        case "list":
            field = <DropdownList
                {...commonProps}
                placeholder={placeholder || "Choose one..."}
                data={list} />
            break
        case "checkbox":
            field = <label htmlFor={name}>
                <input type="checkbox" {...commonProps} />
                &nbsp;&nbsp;{label}
            </label>
            break
        case "submit":
            field = <button type="submit">{label}</button>
            break
    }

    return <div className="Field-container">
        {label
            && type !== "checkbox"
            && type !== "submit"
            && <label htmlFor={name}>{label}</label>}
        {field}
        {error
            && type !== "checkbox"
            && type !== "submit"
            && <span className="error">{error}</span>}
    </div>
}

export default field