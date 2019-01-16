import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedProfileView as ProfileView, mapStateToProps } from './ProfileView'
import cloneDeep from 'lodash.clonedeep'
import { mockProfile as profile } from '../../mocks/profile'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    authedUser: {
      id: 'someId71926',
      following: [ 
        { _id: 'someId1101282', user: 'userId34491f0' }
      ]
    },
    history: { push: jest.fn() },
    match: { url: '' },
    deleteEducation: jest.fn(),
    deleteExperience: jest.fn(),
    followAPerson: jest.fn(),
    unfollowAPerson: jest.fn(),
    profile,
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<ProfileView {...props} />)
  }
  return mountedComponent
}

describe('ProfileView', () => {
  beforeEach(() => {
    props = getMockProps()
    mountedComponent = undefined
  })

  describe('functions', () => {
    describe('render', () => {
      it('calls isFollowingProfileOwner', () => {
        const spy = jest.spyOn(ProfileView.prototype, 'isFollowingProfileOwner')
        comp()
        expect(spy).toHaveBeenCalled()
      })

      it('calls profileBelongsToAuthedUser', () => {
        const spy = jest.spyOn(ProfileView.prototype, 'profileBelongsToAuthedUser')
        comp()
        expect(spy).toHaveBeenCalled()
      })
    })

    describe('navTo', () => {
      it('calls history.push', () => {
        const mockFn = jest.fn()
        props.history.push = mockFn
        comp().instance().navTo()
        expect(mockFn).toHaveBeenCalled()
      })

      it('calls history.push with correct args', () => {
        const mockFn = jest.fn()
        props.history.push = mockFn

        const link = 'link'
        props.match.url = 'URL'

        comp().instance().navTo(link)
        expect(mockFn).toHaveBeenCalledWith(`${props.match.url}/${link}`)
      })
    })

    describe('setEduDeleting', () => {
      it('sets respective var in the state correctly', () => {
        comp().setState({ deletingEduEntries: true })
        comp().instance().setEduDeleting(false)
        expect(comp().state('deletingEduEntries')).toBe(false)
      })
    })

    describe('setExpDeleting', () => {
      it('sets respective var in the state correctly', () => {
        comp().setState({ deletingExpEntries: true })
        comp().instance().setExpDeleting(false)
        expect(comp().state('deletingExpEntries')).toBe(false)
      })
    })

    describe('quitEntryDeletingMode', () => {
      it('pushes instance().defaultDeletingState to the state', () => {
        const name = 'someCrazyVarName'
        comp().instance().defaultDeletingState = {
          [name]: true
        }
        comp().instance().quitEntryDeletingMode()
        expect(comp().state(name)).toBeDefined()
      })
    })

    describe('defaultDeletingState', () => {
      // yup. some would assume mirroring it like this an antipattern.
      it('is correct', () => {
        const expected = {
          deletingExpEntries: false,
          deletingEduEntries: false
        }
        expect(comp().instance().defaultDeletingState).toStrictEqual(expected)
      })
    })

    describe('constructor', () => {
      it('sets default state', () => {
        expect(comp().state()).toStrictEqual(comp().instance().defaultDeletingState)
      })
    })

    describe('isFollowingProfileOwner', () => {
      it('returns true if owner is followed', () => {
        const sameId = 'id00013'
        props.profile.user._id = sameId
        props.authedUser.following[0].user = sameId
        expect(comp().instance().isFollowingProfileOwner()).toBe(true)
      })

      it('returns false if owner is not followed', () => {
        const someId = 'id00013'
        props.profile.user._id = someId
        props.authedUser.following[0].user = someId + 'a change'
        expect(comp().instance().isFollowingProfileOwner()).toBe(false)
      })
    })

    describe('profileBelongsToAuthedUser', () => {
      it('returns true if profile is owned by authed user', () => {
        const sameId = 'id32221'
        props.profile.user._id = sameId
        props.authedUser.id = sameId
        expect(comp().instance().profileBelongsToAuthedUser()).toBe(true)
      })

      it('returns false if profile is not owned by authed user', () => {
        const someId = 'id32221'
        props.profile.user._id = someId
        props.authedUser.id = someId + 'a change'
        expect(comp().instance().profileBelongsToAuthedUser()).toBe(false)
      })
    })
  })

  describe('props', () => {
    describe('passing', () => {
      describe('Overview', () => {
        it('receives correct thing into unfollowAPerson prop', () => {
          expect(comp().find('overview').prop('unfollowAPerson')).toBe(props.unfollowAPerson)
        })

        it('receives correct thing into followAPerson prop', () => {
          expect(comp().find('overview').prop('followAPerson')).toBe(props.followAPerson)
        })

        it('receives correct thing into navTo prop', () => {
          expect(comp().find('overview').prop('navTo').name).toContain('navTo')
        })

        it('receives correct thing into quitEntryDeletingMode prop', () => {
          expect(comp().find('overview').prop('quitEntryDeletingMode').name).toContain('quitEntryDeletingMode')
        })
      })

      describe('Experience', () => {
        it('receives correct thing into deleteExperience prop', () => {
          expect(comp().find('experience').prop('deleteExperience')).toBe(props.deleteExperience)
        })

        it('receives correct thing into setDeleting prop', () => {
          expect(comp().find('experience').prop('setDeleting').name).toContain('setExpDeleting')
        })

        it('receives correct thing into navTo prop', () => {
          expect(comp().find('experience').prop('navTo').name).toContain('navTo')
        })

        it('receives correct thing into quitEntryDeletingMode prop', () => {
          expect(comp().find('experience').prop('quitEntryDeletingMode').name).toContain('quitEntryDeletingMode')
        })
      })

      describe('Education', () => {
        it('receives correct thing into deleteEducation prop', () => {
          expect(comp().find('education').prop('deleteEducation')).toBe(props.deleteEducation)
        })

        it('receives correct thing into setDeleting prop', () => {
          expect(comp().find('education').prop('setDeleting').name).toContain('setEduDeleting')
        })

        it('receives correct thing into navTo prop', () => {
          expect(comp().find('education').prop('navTo').name).toContain('navTo')
        })

        it('receives correct thing into quitEntryDeletingMode prop', () => {
          expect(comp().find('education').prop('quitEntryDeletingMode').name).toContain('quitEntryDeletingMode')
        })
      })

      describe('DangerZone', () => {
        it('receives correct thing into navTo prop', () => {
          expect(comp().find('dangerZone').prop('navTo').name).toContain('navTo')
        })

        it('receives correct thing into quitEntryDeletingMode prop', () => {
          expect(comp().find('dangerZone').prop('quitEntryDeletingMode').name).toContain('quitEntryDeletingMode')
        })
      })

      describe('common props obj', () => {
        it('contains correct navTo prop', () => {
          // hey you know what? do that per every component.
          // makes sense and you get numbers.
        })
      })
    })
  })

  describe('mapStateToProps', () => {
    it('returns expected object', () => {
      const state = {
        user: {
          name: 'John'
        }
      }
      expect(mapStateToProps(state)).toEqual({ authedUser: state.user })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
