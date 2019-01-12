import React from 'react'
import { string } from 'prop-types'

const endOfFeedMessage = ({ endOfFeed }) => (
    <p className="Feed-message">
        {endOfFeed}
    </p>
)

endOfFeedMessage.propTypes = {
  endOfFeed: string.isRequired
}

export default endOfFeedMessage
