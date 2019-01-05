import React from 'react'
import Field from '../../Field/Field'

const actionLine = ({
  nodes,
  isDeleting,
  onAddBtnClk,
  addBtnLabel,
  setDeleting
}) => {
  const containerStyle = {
    margin: 0,
    marginTop: '.15rem'
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Field
        type="linkButton"
        label={addBtnLabel}
        containerStyle={{ flexBasis: '9rem', ...containerStyle }}
        onClick={onAddBtnClk} />
      {nodes.length !== 0
        ? isDeleting
          ? <Field
              type="linkButton"
              label="Cancel"
              containerStyle={containerStyle}
              onClick={() => setDeleting(false)} />
          : <Field
              type="linkButton"
              label="Delete an entry"
              containerStyle={containerStyle}
              onClick={() => setDeleting(true)} />
        : null}
    </div>
  )
}

export default actionLine
