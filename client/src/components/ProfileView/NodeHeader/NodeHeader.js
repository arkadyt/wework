import React from 'react'
import Field from '../../Field/Field'
import { string, bool, func } from 'prop-types'

/**
 * Header for experience & education nodes.
 * Outputs {company} name with {timespan} or {delButton} 
 */
const NodeHeader = ({
    title,
    from,
    to,
    current,
    showDelButton,
    onDelBtnClick
}) => {
    // Month ##, ####
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    from = new Date(from).toLocaleDateString('en-US', dateFormatOptions)
    to = current
        ? 'Current'
        : new Date(to).toLocaleDateString('en-US', dateFormatOptions)
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{title}</h3>
            {showDelButton
                ? <Field
                    type="linkButton"
                    label="Delete"
                    containerStyle={{ margin: 0, width: 'auto' }}
                    onClick={onDelBtnClick} />
                : <span>{from} — {to}</span>}
        </div>
    )
}

NodeHeader.propTypes = {
  title: string.isRequired,
  from: string.isRequired,
  to: string,
  current: bool,
  showDelButton: bool.isRequired,
  onDelBtnClick: func.isRequired
}

export default NodeHeader
