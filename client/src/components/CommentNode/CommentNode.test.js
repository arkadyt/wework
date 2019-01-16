/**
 * Contract:
 *
 * What do I do with the props I receive? (Where does rendering vary? etc.)
 * - deleteComment function is called when Delete btn is clicked
 * - fetchUserStats is passed to deleteComment
 * - authedUserId is used to check if comment belongs to curr. user which controls render of button line
 * - postId is used in deleteComment()
 * - comment's fields are simply rendered 
 *
 * What components do I render?
 * Timestamp line, text line and buttons line
 *
 * What props do I pass them?
 * - First <p> has to receive [name] and that must be followed by correct instance of Date object
 * - Second <p> has to receive [text]
 * - Third element - div, is rendered conditionally (uses authedUserId and comment id to determine)
 * - and renders a Field with a set of props: onClick with deleteComment and few other props.
 *
 * What happens if user interacts with any of the components?
 * - Clicking on abovementioned Field invokes deleteComment() function
 *
 * What happens if child component calls a callback passed to it?
 * - if deleteComment is called, instance ceases to exist
 *
 * What happens in lifecycle hooks?
 * - N/A, functional component
 *
 * What about state? How do I update it?
 * - N/A, functional component
 *
 * Context effects?
 * - N/A
 *
 * Public ref interface?
 * - N/A
 *
 */

import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedCommentNode as CommentNode, mapStateToProps } from './CommentNode'
import cloneDeep from 'lodash.clonedeep'
import { mockPost } from '../../mocks/posts.js'
import moment from 'moment'

describe('CommentNode', () => {
  let props
  let mountedCommentNode

  const commentNode = () => {
    if(!mountedCommentNode) {
      mountedCommentNode = shallow(<CommentNode {...props} />)
    }
    return mountedCommentNode
  }

  const getMockProps = () => {
    const actions = {
      deleteComment: jest.fn(),
      fetchUsersStats: jest.fn()
    }

    const comment = mockPost.comments[0]

    return cloneDeep({
      ...actions,
      comment,
      postId: mockPost._id,
      authedUserId: mockPost.comments[0].user._id
    })
  }

  beforeEach(() => {
    props = getMockProps()
    mountedCommentNode = undefined
  })

  describe('conditional rendering', () => {
    it('buttons line is shown if user is comment author', () => {
      const authedUserId = 'some_authed_user_id123'
      props.authedUserId = authedUserId
      props.comment.user._id = authedUserId
      expect(commentNode().find({ type: 'linkButton' }).length).toBeGreaterThan(0)
    })

    it('buttons line is not shown if user is not comment author', () => {
      const authedUserId = 'some_authed_user_id123'
      const commenterId = 'some_commenter_id123'
      props.authedUserId = authedUserId
      props.comment.user._id = commenterId
      expect(commentNode().find({ type: 'linkButton' }).length).toBe(0)
    })
  })

  describe('interaction', () => {
    it('deleteComment() is called when Delete button is clicked', () => {
      props.deleteComment = jest.fn()
      commentNode().find({ type: 'linkButton', label: 'Delete' }).simulate('click')
      expect(props.deleteComment).toHaveBeenCalled()
    })
  })

  describe('props/args passing', () => {
    it('timestamp line displays commenter name', () => {
      const name = 'Plain Jane'
      props.comment.user.name = name
      expect(commentNode().find("p").first().text()).toMatch(name)
    })

    it('timestamp line displays correct timestamp', () => {
      const text = commentNode().find(".CommentNode-container").childAt(0).text()
      const substr = text.substring(text.indexOf('at ') + 3)
      // Example: November 30, 2018, 3:18:44 PM:
      expect(moment(substr, 'MMMM D, YYYY, h:mm:ss A:', true).isValid()).toBe(true)
    })
    
    it('text line displays text', () => {
      const text = 'test_text_texst_12345'
      props.comment.text = text
      expect(commentNode().find(".CommentNode-container").childAt(1).text()).toMatch(text)
    })


    /* Below button tests assume that current user is comment author */
    
    it('Delete button (Field comp.) receives correct props', () => {
      const props = commentNode().find({ type: 'linkButton', label: 'Delete' }).props()
      const expectedProps = {
        type: 'linkButton',
        label: 'Delete',
        inline: true,
        onClick: expect.any(Function)
      }
      expect(props).toStrictEqual(expectedProps)
    })
    
    it('deleteButton() func receives correct parms', () => {
      const postId = 'some_post_id123'
      props.postId = postId
      const commentId = 'some_comment_id123'
      props.comment._id = commentId

      props.deleteButton = jest.fn()
      commentNode().find({ type: 'linkButton', label: 'Delete' }).simulate('click')
      expect(props.deleteComment).toHaveBeenCalledWith(postId, commentId, props.fetchUsersStats)
    })
  })

  describe('mapStateToProps', () => {
    it('returns expected object', () => {
      const state = { user: { id: 'id123' } }
      expect(mapStateToProps(state)).toEqual({ authedUserId: 'id123' })
    })
  })

  it('must pass a snapshot test', () => {
    expect(commentNode()).toMatchSnapshot()
  })
})
