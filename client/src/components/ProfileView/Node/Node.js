import React from 'react'
import NodeHeader from '../NodeHeader/NodeHeader'
import { arrayOf, string, bool, func } from 'prop-types'

const node = ({
  _id,
  headers,
  from,
  to,
  current,
  description,
  onDelBtnClick,
  isDeleting
}) => {
  return (
    <div className="node">
      <NodeHeader
        title={headers[0]}
        from={from}
        to={to}
        current={current}
        showDelButton={isDeleting}
        onDelBtnClick={() => onDelBtnClick(_id)} />
      {headers.map((item, idx) => {
        // skip the first header as it's shown in NodeHeader
        if (idx === 0) 
          return undefined

        return (
          <p key={idx}>
            {headers[idx]}
          </p>
        )
      })}
      {description
        ? <p><b>Description:</b> {description}</p>
        : null}
    </div>
  )
}

node.propTypes = {
  _id: string.isRequired,
  headers: arrayOf(string).isRequired,
  from: string.isRequired,
  to: string,
  current: bool,
  description: string,
  onDelBtnClick: func.isRequired,
  isDeleting: bool.isRequired
}

export default node
