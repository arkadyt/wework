import React, { Fragment } from 'react'
import Post from '../../../Post/Post'
import CommentsView from '../../../CommentsView/CommentsView'
import { Route } from 'react-router-dom'
import { arrayOf, string } from 'prop-types'
import { postType } from '../../../../types/index'
import FBSpinner from '../../../FBSpinner/FBSpinner'
import NoContent from '../NoContent/NoContent'
import EndOfFeedMessage from '../EndOfFeedMessage/EndOfFeedMessage'

const isEmptyFn = ({ endOfFeed, posts }) => {
  return posts.length === 0 && !!endOfFeed
}

const isLoadingFn = ({ endOfFeed, posts, isLoading }) => {
  return isLoading || (!endOfFeed && posts.length === 0)
}

const isEndOfFeedFn = ({ endOfFeed, isLoading }) => {
  return !!endOfFeed && !isLoading
}

const feedContent = props => {
  const { posts, baseUrl, endOfFeed } = props
  let bottomWidget = null

  if (isEmptyFn(props)) {
    bottomWidget = <NoContent />
  } else if (isLoadingFn(props)) {
    bottomWidget = <FBSpinner />
  } else if (isEndOfFeedFn(props)) {
    bottomWidget = <EndOfFeedMessage endOfFeed={endOfFeed}/>
  }

  return (
    <Fragment>
      <Route path={`${baseUrl}/view-comments/:postId`} render={props => (
          <CommentsView {...props} post={posts.find(
              item => item._id === props.match.params.postId
            )} />
        )} />
      <div className="Feed-body">
        {posts.map(item => <Post key={item._id} {...item} />)}
      </div>
      {bottomWidget}
    </Fragment>
  )
}

feedContent.propTypes = {
  posts: arrayOf(postType).isRequired,
  baseUrl: string.isRequired
}

export { isEmptyFn, isLoadingFn, isEndOfFeedFn }
export default feedContent
