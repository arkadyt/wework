import React from 'react'
import { Profile, mapStateToProps } from './Profile'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import cloneDeep from 'lodash.clonedeep'
import { mockProfile } from '../../../mocks/profile'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    history: {
      goBack: jest.fn(),
      push: jest.fn()
    },
    match: {
      url: '/profile'
    },
    fetchUsersProfile: jest.fn(),
    deleteProfile: jest.fn(cb => cb()),
    fetchAProfile: jest.fn(),
    viewedProfile: mockProfile,
    profile: mockProfile,
    errors: {}
  })
}

const createRouterContext = pathname => {
  return cloneDeep({
    router: {
      history: new BrowserRouter().history,
      route: {
        location: {
          pathname
        },
        match: {},
      }
    }
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Profile {...props} />)
  } 
  return mountedComponent
}

describe('Profile', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('snapshots', () => {
    describe('Routes', () => {
      describe('rendered when authed user is at /profile, and he/she already have a profile', () => {
        beforeEach(() => {
          props.profile = mockProfile
          delete props.errors.noProfile
        })

        it('/delete-profile', () => {
          const context = createRouterContext(`${props.match.url}/delete-profile`)
          expect(comp().find('Route[path*="delete-profile"]').dive({ context })).toMatchSnapshot()
        })

        it('/add-education', () => {
          const context = createRouterContext(`${props.match.url}/add-education`)
          expect(comp().find('Route[path*="add-education"]').dive({ context })).toMatchSnapshot()
        })

        it('/add-experience', () => {
          const context = createRouterContext(`${props.match.url}/add-experience`)
          expect(comp().find('Route[path*="add-experience"]').dive({ context })).toMatchSnapshot()
        })

        it('/update-profile', () => {
          const context = createRouterContext(`${props.match.url}/update-profile`)
          expect(comp().find('Route[path*="update-profile"]').dive({ context })).toMatchSnapshot()
        })

        it('bare baseUrl', () => {
          const context = createRouterContext(`${props.match.url}`)
          expect(comp().find(`Route[path="${props.match.url}"]`).dive({ context })).toMatchSnapshot()
        })
      })

      describe('rendered when authed user is at /profile, and has no profile yet', () => {
        beforeEach(() => {
          delete props.profile
          props.errors.noProfile = 'defined'
        })

        it('/create-profile', () => {
          const context = createRouterContext(`${props.match.url}/create-profile`)
          expect(comp().find('Route[path*="create-profile"]').dive({ context })).toMatchSnapshot()
        })

        it('bare baseUrl', () => {
          const context = createRouterContext(`${props.match.url}`)
          expect(comp().find(`Route[path="${props.match.url}"]`).dive({ context })).toMatchSnapshot()
        })
      })

      describe('rendered when authed user is at /profile/id, and viewed user has a profile', () => {
        beforeEach(() => {
          props.viewedProfile = mockProfile
        })

        it('the only one and always rendered route', () => {
          const id = props.viewedProfile.user._id
          props.match.url = `/profile/id/${id}`
          props.match.params = { userId: id }
          const context = createRouterContext(`${props.match.url}`)
          expect(comp().find(`Route`).dive({ context })).toMatchSnapshot()
        })
      })
    })

    describe('conditional rendering outputs', () => {
      describe('when match.url includes /id/', () => {
        beforeEach(() => {
          props.match.url = '/profile/id/something'
        })

        it('renders message that viewed user has no profile', () => {
          props.errors.noViewedProfile = 'error!'
          expect(comp()).toMatchSnapshot()
        })

        it('renders viewed users profile', () => {
          delete props.errors.noViewedProfile
          props.viewedProfile = mockProfile

          const id = props.viewedProfile.user._id
          props.match.url = `/profile/id/${id}`
          props.match.params = { userId: id }

          expect(comp()).toMatchSnapshot()
        })

        it('otherwise calls fetchAProfile', () => {
          delete props.errors.noViewedProfile
          delete props.viewedProfile

          const id = 'id of not yet loaded user'
          props.match.url = `/profile/id/${id}`
          props.match.params = { userId: id }

          comp()
          expect(props.fetchAProfile).toHaveBeenCalledWith(id)
        })
      })

      describe('when match.url does not contain /id/', () => {
        beforeEach(() => {
          props.match.url = '/profile'
        })

        it('renders two routes if props.errors.noProfile is defined', () => {
          props.errors.noProfile = 'defined!'
          delete props.profile
          expect(comp()).toMatchSnapshot()
        })

        it('renders five routes if props.profile is defined', () => {
          props.profile = mockProfile
          delete props.errors.noProfile
          expect(comp()).toMatchSnapshot()
        })

        it('renders five routes if props.profile is defined', () => {
          delete props.profile
          delete props.errors.noProfile

          comp()
          expect(props.fetchUsersProfile).toHaveBeenCalled()
        })
      })
    })
  })

  describe('props', () => {
    describe('passing', () => {
      describe('create profile modal', () => {
        beforeEach(() => {
          props.match.url = '/profile'
          props.errors.noProfile = 'defined'
        })

        it('receives correct onConfirm function', () => {
          const context = createRouterContext(`${props.match.url}`)
          comp().find(`Route[path="${props.match.url}"]`).dive({ context }).simulate('confirm')
          expect(props.history.push).toHaveBeenCalledWith(`${props.match.url}/create-profile`)
        })

        it('receives correct onDismiss function', () => {
          const context = createRouterContext(`${props.match.url}`)
          comp().find(`Route[path="${props.match.url}"]`).dive({ context }).simulate('dismiss')
          expect(props.history.push).toHaveBeenCalledWith(`/feed`)
        })
      })

      describe('delete profile modal', () => {
        beforeEach(() => {
          props.match.url = '/profile'
          delete props.errors.noProfile
          props.profile = mockProfile
        })

        it('receives correct onConfirm function', () => {
          const context = createRouterContext(`${props.match.url}/delete-profile`)
          comp().find(`Route[path*="/delete-profile"]`).dive({ context }).simulate('confirm')
          expect(props.deleteProfile).toHaveBeenCalledWith(expect.any(Function))
          expect(props.history.push).toHaveBeenCalledWith(props.match.url)
        })

        it('receives correct onDismiss function', () => {
          const context = createRouterContext(`${props.match.url}/delete-profile`)
          comp().find(`Route[path*="/delete-profile"]`).dive({ context }).simulate('dismiss')
          expect(props.history.goBack).toHaveBeenCalled()
        })
      })
    })
  })

  describe('mapStateToProps', () => {
    it('returns expected object', () => {
      const state = {
        profile: { a: 1, b: 900 },
        err: {},
        viewedProfile: mockProfile
      }

      const expectedObj = {
        profile: state.profile,
        errors: state.err,
        viewedProfile: state.viewedProfile
      }

      expect(mapStateToProps(state)).toStrictEqual(expectedObj)
    })
  })
})

