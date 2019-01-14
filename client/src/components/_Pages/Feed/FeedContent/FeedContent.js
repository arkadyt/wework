import React, { Fragment } from 'react'
import Post from '../../../Post/Post'
import CommentsRoute from '../CommentsRoute/CommentsRoute'
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
    <CommentsRoute 
      posts={posts}
      baseUrl={baseUrl} />
  </Fragment>
)

feedContent.propTypes = {
  posts: arrayOf(postType).isRequired,
  baseUrl: string.isRequired
}

export default feedContent
