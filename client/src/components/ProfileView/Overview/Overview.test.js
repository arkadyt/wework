import React from 'react'
import { shallow } from 'enzyme'
import Overview from './Overview'
import EditButton from './EditButton/EditButton'
import FollowButton from './FollowButton/FollowButton'
import UnfollowButton from './UnfollowButton/UnfollowButton'
import cloneDeep from 'lodash.clonedeep'
import { mockProfile as profile } from '../../../mocks/profile'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    profile,
    profileBelongsToAuthedUser: true,
    isFollowingProfileOwner: false,
    baseUrl: '/profile',
    history: { push: jest.fn() },
    followAPerson: jest.fn(),
    unfollowAPerson: jest.fn(),
    quitEntryDeletingMode: jest.fn(),
    navTo: jest.fn()
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Overview {...props} />)
  }
  return mountedComponent
}

describe('Overview', () => {
  beforeEach(() => {
    props = getMockProps()
    mountedComponent = undefined
  })

  describe('props', () => {
    describe('effects', () => {
      describe('profileBelongsToAuthedUser', () => {
        it('renders EditButton if true', () => {
          props.profileBelongsToAuthedUser = true
          expect(comp().find('.info-buttons').find(EditButton).exists()).toBe(true)
        })

        it('doesn\'t render EditButton if false', () => {
          props.profileBelongsToAuthedUser = false
          expect(comp().find('.info-buttons').find(EditButton).exists()).toBe(false)
        })
      })

      describe('isFollowingProfileOwner', () => {
        it('doesn\'t render UnfollowButton if false', () => {
          props.profileBelongsToAuthedUser = false
          props.isFollowingProfileOwner = false
          expect(comp().find('.info-buttons').find(UnfollowButton).exists()).toBe(false)
        })

        it('renders FollowButton if false', () => {
          props.profileBelongsToAuthedUser = false
          props.isFollowingProfileOwner = false
          expect(comp().find('.info-buttons').find(FollowButton).exists()).toBe(true)
        })

        it('doesn\'t render FollowButton if true', () => {
          props.profileBelongsToAuthedUser = false
          props.isFollowingProfileOwner = true
          expect(comp().find('.info-buttons').find(FollowButton).exists()).toBe(false)
        })

        it('renders UnfollowButton if true', () => {
          props.profileBelongsToAuthedUser = false
          props.isFollowingProfileOwner = true
          expect(comp().find('.info-buttons').find(UnfollowButton).exists()).toBe(true)
        })
      })
    })
  })

  describe('functions', () => {
    describe('navTo', () => {
      it('calls history.push', () => {
        
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
