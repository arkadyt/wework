/**
 * Contract:
 * 
 * What my component renders?
 * - Ver. w/ Snapshot
 *
 * What do I pass to components I render?
 * - div:
 *   - list of ListNodes
 * - each ListNode
 *   - list item,
 *   - followAPerson func
 *
 * What effect do props I receive have?
 * - list turns into an array of ListNodes
 * - if list is undefined/null loading comp is rendered
 * - if list consists of 0 elements, message is shown.
 *
 * What do I do with the state? How do I update it?
 * - N/A
 *
 * Lifecycle hooks effects? Side effects?
 * - N/A
 *
 * Interaction with the component?
 * - N/A
 *
 * Context?
 * - N/A
 *
 * Public ref API?
 * - N/A
 */


import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedCreatorsList as CreatorsList } from './CreatorsList'
import ListNode from '../ListNode/ListNode'
import FBSpinner from '../../FBSpinner/FBSpinner'
import EmptyList from './EmptyList/EmptyList'
import cloneDeep from 'lodash.clonedeep'

describe('CreatorsList', () => {
  let props
  let mountedCreatorsList

  const getMockProps = () => {
    return cloneDeep({
      followAPerson: jest.fn(),
      list: [{ 
        _id: 'aaa987',
        name: 'John Doe',
        avatar: '//gravatar.com/12345',
        title: 'Web Developer',
        company: 'Some Company'
      }]
    })
  }
  const creatorsList = () => {
    if(!mountedCreatorsList) {
      mountedCreatorsList = shallow(<CreatorsList {...props} />)
    }
    return mountedCreatorsList
  }

  beforeEach(() => {
    props = getMockProps()
    mountedCreatorsList = undefined
  })

  describe('props passing', () => {
    it('outermost div receives an array of ListNodes as children', () => {
      // dive under cond. rendering hocs
      expect(creatorsList().dive().dive().find('div').find(ListNode).length).toBeGreaterThan(0)
    })

    it('ListNode receives list item and followAPerson func', () => {
      const expectedProps = {
        node: props.list[0],
        followAPerson: expect.any(Function)
      }
      expect(creatorsList().dive().dive().find(ListNode).first().props()).toStrictEqual(expectedProps)
    })
  })

  describe('props effects', () => {
    it('if list isn\'t empty/undefined, it\'s rendered into an array of ListNodes', () => {
      const nodes = 3
      props.list = new Array(nodes).fill(props.list[0]);
      expect(creatorsList().dive().dive().find(ListNode)).toHaveLength(nodes)
    })

    it('if list is empty message is shown', () => {
      props.list = []
      expect(creatorsList().dive().find(EmptyList)).toHaveLength(1)
    })

    it('if list is undefined/null, loading comp is rendered', () => {
      props.list = undefined
      expect(creatorsList().find(FBSpinner)).toHaveLength(1)
    })
  })

  it('must pass a snapshot test', () => {
    expect(creatorsList()).toMatchSnapshot()
  })
})
