import React from 'react'
import { Profile } from './Profile'
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
    deleteAProfile: jest.fn(),
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
      })
    })

    describe('conditional rendering outputs', () => {

    })
  })
})

