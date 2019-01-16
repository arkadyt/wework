import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Multiselect from 'react-widgets/lib/Multiselect'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import './Field.scss'
import { node, string, func, object, bool, number, arrayOf, oneOfType, instanceOf } from 'prop-types'

Moment.locale('en')
momentLocalizer()

const field = ({
    // different fields require different props
    type,
    name, value, onChange, // all except submit and button
    placeholder, error, // all except checkbox, submit and button
    label, // checkbox, submit, button
    list, // list, multiselect
    rows, // textarea
    disabled, // date
    onClick, style, // button, linkButton, textarea
    inline, // container
    containerStyle, // container
    children
}) => {
    let field = null
    const commonProps = { name, id: name, value, onChange }

    switch (type) {
        case "textarea":
            field = <textarea
                {...commonProps}
                placeholder={placeholder || 'Say something...'}
                className="rw-widget-container rw-widget-input"
                style={{
                    padding: '.5rem',
                    fontSize: '1rem',
                    width: '100%',
                    resize: 'none',
                    ...style
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
        case "multiselect":
            field = <Multiselect
                {...commonProps}
                placeholder={placeholder || "Enter a few items..."}
                data={list} />
            break
        case "checkbox":
            field = <label htmlFor={name}>
                <input type="checkbox" {...commonProps} />
                &nbsp;&nbsp;{label}
            </label>
            break
        case "submit":
            field = <button
                type="submit"
                className="button-action">
                {label || children}
            </button>
            break
        case "button":
            field = <button
                className="button"
                style={style}
                onClick={onClick}>
                {label || children}
            </button>
            break
        case "linkButton":
            field = <button
                className="link-button"
                style={style}
                onClick={onClick}>
                {label || children}
            </button>
            break
        default:
            field = <input
                {...commonProps}
                placeholder={placeholder}
                className="rw-widget-container rw-widget-input"
                type={type} />
    }

    return (
        <div style={containerStyle}
            className={['Field-container', inline ? 'inline' : ''].join(' ')}>
            {label
                && type !== "checkbox"
                && type !== "submit"
                && type !== "button"
                && type !== "linkButton"
                && <label htmlFor={name}>{label}</label>}
            {field}
            {error
                && type !== "checkbox"
                && type !== "submit"
                && type !== "button"
                && type !== "linkButton"
                && <span className="error">{error}</span>}
        </div>
    )
}

field.propTypes = {
  type: string,
  name: string,
  value: oneOfType([string, arrayOf(string), bool, instanceOf(Date)]),
  onChange: func,
  placeholder: string,
  error: string,
  label: string,
  list: arrayOf(string),
  rows: oneOfType([string, number]),
  disabled: bool,
  onClick: func,
  style: object,
  inline: bool,
  containerStyle: object,
  children: oneOfType([arrayOf(node), node])
}

export default field
