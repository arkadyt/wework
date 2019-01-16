import React from 'react'
import UnfollowButton from './UnfollowButton'
import Field from '../../../Field/Field'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('UnfollowButton', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      unfollowAPerson: jest.fn(),
      profileOwnerId: 'some_id12097'
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<UnfollowButton {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('calls unfollowAPerson', () => {
    comp().find(Field).simulate('click')
    expect(props.unfollowAPerson).toHaveBeenCalled()
  })

  it('calls unfollowAPerson with correct args', () => {
    comp().find(Field).simulate('click')
    expect(props.unfollowAPerson).toHaveBeenCalledWith(props.profileOwnerId)
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
