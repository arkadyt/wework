import React from 'react'
import { Route } from 'react-router-dom'
import CommentsView from '../../../CommentsView/CommentsView'
import { arrayOf, string } from 'prop-types'
import { postType } from '../../../../types/index'

const commentsRoute = ({
  posts,
  baseUrl
}) => {
  return (
    <Route 
      path={`${baseUrl}/view-comments/:postId`} 
      render={props => (
        <CommentsView 
          post={posts.find(
            item => item._id === props.match.params.postId
          )}
          {...props} />
      )} />
  )
}

commentsRoute.propTypes = {
  posts: arrayOf(postType).isRequired,
  baseUrl: string.isRequired
}

export default commentsRoute
