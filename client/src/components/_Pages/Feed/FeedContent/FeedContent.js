import React, { Fragment } from 'react'
import Post from '../../../Post/Post'
import CommentsView from '../../../CommentsView/CommentsView'
import { Route } from 'react-router-dom'
import { arrayOf, string } from 'prop-types'
import { postType } from '../../../../types/index'

const feedContent = ({
  posts,
  baseUrl
}) => (
  <Fragment>
    <div className="Feed-body">
      {posts.map(item => (
        <Post key={item._id} {...item} />)
      )}
    </div>
    <Route 
      path={`${baseUrl}/view-comments/:postId`} 
      render={props => (
        <CommentsView 
          post={posts.find(
            item => item._id === props.match.params.postId
          )}
          {...props} />
      )} />
  </Fragment>
)

feedContent.propTypes = {
  posts: arrayOf(postType).isRequired,
  baseUrl: string.isRequired
}

export default feedContent
