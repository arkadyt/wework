import React from 'react'
import FollowButton from './FollowButton'
import Field from '../../../Field/Field'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('FollowButton', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      followAPerson: jest.fn(),
      profileOwnerId: 'some_id12097'
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<FollowButton {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('calls followAPerson', () => {
    comp().find(Field).simulate('click')
    expect(props.followAPerson).toHaveBeenCalled()
  })

  it('calls followAPerson with correct args', () => {
    comp().find(Field).simulate('click')
    expect(props.followAPerson).toHaveBeenCalledWith(props.profileOwnerId)
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
