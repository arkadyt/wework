/**
 * Contract:
 *
 * What do I render? What props do I pass to components I render?
 * (props passing)
 * - ListNode-img receives avatar in src field
 * - Person name Button receives correct props
 * - paragraph right below displays title and company(if available) 
 * - [+] button receives correct props
 *
 *
 * What do I do with the props I receive? What effect do they have?
 * (props effects)
 * - if company field is present, company is shown
 * - if company is not specified, company string isn't rendered
 *
 * Interaction?
 * (interaction)
 * (args passing)
 * - Clicking on a [+] button calls followAPerson function
 * - Clicking on a person's name navigates to their profile (/profile/id/$id)
 *
 * Side effects?
 * - N/A
 *
 * State?
 * - N/A
 *
 * Context & public ref API
 * - N/A
 *
 */

import React from 'react'
import { _UnconnectedListNode as ListNode } from './ListNode'
import Field from '../../Field/Field'
import { FaUserPlus } from 'react-icons/fa'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('ListNode', () => {
  let props
  let mountedListNode

  const getMockProps = () => {
    return cloneDeep({
      followAPerson: jest.fn(),
      node: { 
        _id: 'bbb123',
        name: 'John Doe',
        avatar: '//gravatar.com/12345',
        title: 'Web Developer',
        company: 'Some Company'
      },
      history: {
        push: jest.fn()
      }
    })
  }

  const listNode = () => {
    if(!mountedListNode) {
      mountedListNode = shallow(<ListNode {...props} />)
    }
    return mountedListNode
  }

  beforeEach(() => {
    props = getMockProps()
    mountedListNode = undefined
  })

  describe('props passing', () => {
    it('person\'s image node receives correct props', () => {
      const avatar = 'some_avatar_123'
      const expectedProps = { 
	className: 'ListNode-img', 
	src: avatar, 
	alt: '' 
      }
      props.node.avatar = avatar
      expect(listNode().find('.ListNode-img').props()).toStrictEqual(expectedProps)
    })

    it('person\'s name button receives correct props', () => {
      // expectedProps should not depend on global props object
      const label = 'Label129'
      const expectedProps = {
        type: 'linkButton',
        label,
        inline: true,
        style: { fontSize: '1.15em' },
        onClick: expect.any(Function)
      }
      props.node.name = label
      expect(listNode().find('.ListNode-name').find(Field).props()).toStrictEqual(expectedProps)
    })

    it('paragraph below person\'s name button receives correct props', () => {
      const company = 'company_is_specified'
      const expectedProps = {
        children: [props.node.title, ` at ${company}`]
      }	
      props.node.company = company
      expect(listNode().find('.ListNode-name').find('p').props()).toStrictEqual(expectedProps)
    })

    it('+[AddPerson] button receives correct props', () => {
      const expectedProps = {
        type: 'linkButton',
        style: { fontSize: '1.4rem' },
        onClick: expect.any(Function),
        children: <FaUserPlus />
      }
      expect(listNode().find('.ListNode-container').childAt(2).props()).toStrictEqual(expectedProps)
    })
  })

  describe('args passing', () => {
    it('followAPerson function is called with correct parms', () => {
      const id = 'someID127'
      props.node._id = id
      listNode().find('.ListNode-container').childAt(2).simulate('click')
      expect(props.followAPerson).toHaveBeenCalledWith(id)
    })

    it('history.push is called with correct parms', () => {
      const id = 'some__ID_2'
      props.node._id = id
      listNode().find('.ListNode-name').find(Field).simulate('click')
      expect(props.history.push).toHaveBeenCalledWith(`/profile/id/${id}`)
    })
  })

  describe('props effects', () => {
    it('if company field is undefined, it is not rendered', () => {
      const title = 'some_title123'
      props.node.company = undefined
      props.node.title = title
      // to be purely title
      expect(listNode().find('.ListNode-name').find('p').text()).toBe(title)
    })

    it('if company field is defined, it is shown', () => {
      const company = 'some_company123'
      props.node.company = company
      expect(listNode().find('.ListNode-name').find('p').text()).toMatch(company)
    })
  })

  describe('interaction', () => {
    it('click on +[AddPerson] button calls followAPerson function', () => {
      listNode().find('.ListNode-container').childAt(2).simulate('click')
      expect(props.followAPerson).toHaveBeenCalled()
    })

    it('click on a person\'s name navigates to their profile', () => {
      listNode().find('.ListNode-name').find(Field).simulate('click')
      expect(props.history.push).toHaveBeenCalled()
    })
  })

  it('passes a snapshot test', () => {
    expect(listNode()).toMatchSnapshot()
  })
})
