import React from 'react'
import DangerZone from './DangerZone'
import Field from '../../Field/Field'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('DangerZone', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      navTo: jest.fn(),
      quitEntryDeletingMode: jest.fn(),
      profileBelongsToAuthedUser: true
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<DangerZone {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('profileBelongsToAuthedUser', () => {
        it('if false, comp renders nothing', () => {
          props.profileBelongsToAuthedUser = false
          expect(comp().find('section').exists()).toBe(false)
        })

        it('if true, comp renders everything', () => {
          props.profileBelongsToAuthedUser = true
          expect(comp().find('section').exists()).toBe(true)
        })
      })
    })
  })

  describe('functions', () => {
    it('calls quitEntryDeletingMode', () => {
      comp().find(Field).simulate('click')
      expect(props.quitEntryDeletingMode).toHaveBeenCalled()
    })

    it('calls navTo', () => {
      comp().find(Field).simulate('click')
      expect(props.navTo).toHaveBeenCalled()
    })

    it('calls navTo with correct args', () => {
      comp().find(Field).simulate('click')
      expect(props.navTo).toHaveBeenCalledWith('delete-profile')
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
