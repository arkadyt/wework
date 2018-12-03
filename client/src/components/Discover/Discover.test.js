/**
 * Contract:
 *
 * What my component renders? What do I pass to components I render?
 *   - CreatorsListWithCondRenderings taking list and func as props
 *
 * What do I do with the props I receive, what effect do they have?
 * - 4 functions are combined in 1 convenience function and passed on to the CreatorsList
 * - List is passed on to CreatorsList
 *
 * What do I do with the state? How do I update it?
 * - N/A
 *
 * Lifecycle hooks effects? Side effects?
 * - componentDidMount calls discover content fetch 
 *
 * Interaction with the component?
 * - N/A
 *
 * Context?
 * - N/A
 *
 * Public ref API?
 * - N/A
 *
 *
 *
 */


import React from 'react'
import {shallow} from 'enzyme'
import { _UnconnectedDiscover as Discover } from './Discover'
import cloneDeep from 'lodash.clonedeep'
import CreatorsList from './CreatorsList/CreatorsList'

describe('Discover', () => {
  let props
  let mountedDiscover

  const getMockProps = () => {
    const actions = {
      followAPerson: jest.fn((it, cb) => cb()),
      fetchUsersStats: jest.fn(),
      fetchPosts: jest.fn(),
      fetchDiscoverContent: jest.fn()
    }

    const listElem = {
      _id: 'ab109a',
      name: 'John Doe',
      avatar: '//gravatar.com/12345',
      title: 'Web Developer',
      company: 'Some Company'
    }

    return cloneDeep({
      ...actions,
      list: [listElem]
    })
  }

  const discoverComp = () => {
    if(!mountedDiscover) {
      mountedDiscover = shallow(<Discover {...props} />)
    }
    return mountedDiscover
  }

  beforeEach(() => {
    props = getMockProps()
    mountedDiscover = undefined
  })

  describe('once local followAPerson() func is invoked', () => {
    const id = 'id123'
    const cb = jest.fn() // used only once!

    beforeEach(() => {
      discoverComp().instance().followAPerson(id, cb)
    })

    it('calls followAPerson (from props)', () => {
      expect(props.followAPerson).toHaveBeenCalled()
    })

    it('calls followAPerson (from props) with correct parms', () => {
      expect(props.followAPerson).toHaveBeenCalledWith(id, expect.any(Function))
    })

    it('calls fetchDiscoverContent', () => {
      expect(props.fetchDiscoverContent).toHaveBeenCalled()
    })

    it('calls fetchDiscoverContent with correct parms', () => {
      expect(props.fetchDiscoverContent).toHaveBeenCalledWith(5)
    })

    it('calls fetchUsersStats', () => {
      expect(props.fetchUsersStats).toHaveBeenCalled()
    })

    it('calls fetchPosts', () => {
      expect(props.fetchPosts).toHaveBeenCalled()
    })

    it('calls fetchPosts with correct parms', () => {
      expect(props.fetchPosts).toHaveBeenCalledWith(false)
    })

    it('calls a provided callback eventually', () => {
      expect(cb).toHaveBeenCalled()
    })
  })

  describe('side effects', () => {
    it('calls fetchDiscoverContent() on componentDidMount', () => {
      discoverComp()
      expect(props.fetchDiscoverContent).toHaveBeenCalled()
    })
  })

  describe('props passing', () => {
    it('CreatorsList receives correct props', () => {
      const expectedProps = {
        list: props.list, 
        followAPerson: discoverComp().instance().followAPerson
      }
      expect(discoverComp().find(CreatorsList).props()).toStrictEqual(expectedProps)
    })
  })

  it('passes a snapshot test', () => {
    expect(discoverComp()).toMatchSnapshot()
  })
})
