import React from 'react'
import { _UnconnectedCommentsView as CommentsView } from './CommentsView'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'
import { mockPost } from '../../mocks/posts'
import Reply from '../Reply/Reply'
import Overlay from '../Overlay/Overlay'
import Post from '../Post/Post'
import CommentNode from '../CommentNode/CommentNode'

describe('CommentsView', () => {
  let props
  let mountedCommentsView

  const getMockProps = () => {
    return cloneDeep({
      history: {
        goBack: jest.fn()
      },
      post: mockPost,
      addComment: jest.fn()
    })
  }

  const commentsView = () => {
    if (!mountedCommentsView) {
      mountedCommentsView = shallow(<CommentsView {...props} />)
    }
    return mountedCommentsView
  }

  beforeEach(() => {
    props = getMockProps()
    mountedCommentsView = undefined
  })

  it('handleDismiss() function must operate as expected', () => {
    commentsView().instance().handleDismiss()
    expect(props.history.goBack).toHaveBeenCalled()
  })

  describe('shouldComponentUpdate', () => {
    it('blocks an update and navigates back if post object wasn\'t found in nextProps', () => {
      commentsView().setProps({ post: undefined })
      expect(props.history.goBack).toHaveBeenCalled()
    })

    it('doesn\'t block an update if post object was found in nextProps', () => {
      expect(commentsView().instance().shouldComponentUpdate(props, null)).toBe(true)
    })
  })

  describe('comments', () => {
    it('are replaced with a message when post has none', () => {
      props.post.comments = []
      expect(commentsView().find(".CommentsView-comments").childAt(1).name()).toBe('p')
    })

    it('are rendered if post has them', () => {
      expect(commentsView().find(".CommentsView-comments").find(CommentNode).length).toBe(2)
    })
  })

  describe('addComment()', () => {
    it('must be called upon the comment submission', () => {
      commentsView().find(Reply).simulate('submit')
      expect(props.addComment).toHaveBeenCalled()
    })

    it('must be called with correct parms', () => {
      const postId = 'some_post_id123'
      props.post._id = postId
      commentsView().find(Reply).simulate('submit', 'data', () => {})
      expect(props.addComment).toHaveBeenCalledWith(postId, 'data', expect.any(Function))
    })
  })

  describe('props passing', () => {
    it('Post component receives correct props', () => {
      const expectedProps = { ...props.post, flat: true, nocomments: true }
      expect(commentsView().find(Post).props()).toStrictEqual(expectedProps)
    })

    it('Reply component receives correct props', () => {
      // submit handler is tested elsewhere
      const expectedProps = { rows: "3", flat: true, onSubmit: expect.any(Function) }
      expect(commentsView().find(Reply).props()).toStrictEqual(expectedProps)
    })

    it('CommentNode component receives correct props', () => {
      // only have to verify a single case to prove that all uses in this component
      // would work as expected; do not include key prop in expectedProps.
      const comment = props.post.comments[0]
      const expectedProps = { postId: props.post._id, comment }
      expect(commentsView().find(CommentNode).first().props()).toStrictEqual(expectedProps)
    })

    it('Overlay component receives correct props', () => {
      const expectedProps = { 
        onBackdropClick: expect.any(Function),
        children: expect.anything()
      }
      expect(commentsView().find(Overlay).props()).toStrictEqual(expectedProps)
    })

    it('Overlay\'s handleDismiss() is called on backdrop click', () => {
      commentsView().find(Overlay).simulate('backdropClick')
      expect(props.history.goBack).toHaveBeenCalled()
    })
  })

  it('must pass a snapshot test', () => {
    // also verifies for the following constraints:
    // - if there are comments, comp should render them
    // - if there is post data, comp should render it
    // warning: enzyme-to-json is used
    expect(commentsView()).toMatchSnapshot()
  })
})

/**
 * Conclusions:
 * 
 * Not only the effects of passed props should be tested,
 * but also that internal components receive right props.
 */
