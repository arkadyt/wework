import React from 'react'
import { shallow } from 'enzyme'
import { QuickStats, mapStateToProps } from './QuickStats'
import cloneDeep from 'lodash.clonedeep'

jest.mock('../../hocs/conditionalRendering')
jest.mock('recompose')

const { withEither } = require('../../hocs/conditionalRendering')
const { compose } = require('recompose')

// mocks become fully functional
// this removes need for manual unmocking per every test
// UPDATE: actually I think I could have just used jest.spyOn?
withEither.mockImplementation(
  require.requireActual('../../hocs/conditionalRendering').withEither
)
compose.mockImplementation(
  require.requireActual('recompose').compose
)

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    authedUser: {
      name: 'Mike',
      avatar: undefined
    },
    usersProfile: {
      title: 'Construction Worker',
      company: 'Construction Workers United',
      status: 'Not Open For Employment'
    },
    stats: {
      followers: 1038,
      following: 1270,
      postCount: 20,
      totalLikes: 503,
      totalComments: 121
    },
    history: {
      push: jest.fn()
    },
    fetchUsersStats: jest.fn()
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<QuickStats {...props} />)
  }
  return mountedComponent
}

describe('QuickStats', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('functions', () => {
    describe('componentDidMount', () => {
      it('calls fetchUsersStats', () => {
        comp()
        expect(props.fetchUsersStats).toHaveBeenCalled()
      })
    })

    describe('render', () => {
      it('calls withCondRendering', () => {
        const mock = jest.spyOn(QuickStats.prototype, 'withCondRendering')
        comp()
        expect(mock).toHaveBeenCalled()
      })
    })

    describe('withCondRendering', () => {
      it('calls withEither', () => {
        withEither.mockClear()
        comp()
        expect(withEither).toHaveBeenCalledTimes(2)
      })

      it('calls compose', () => {
        compose.mockClear()
        comp()
        expect(compose).toHaveBeenCalledTimes(1)
      })
    })

    describe('isLoadingFn', () => {
      it('returns true if stats isn\'t defined', () => {
        delete props.stats
        expect(comp().instance().isLoadingFn(props)).toBe(true)
      })

      it('returns true if profile isn\'t defined', () => {
        delete props.usersProfile
        expect(comp().instance().isLoadingFn(props)).toBe(true)
      })

      it('returns true if authedUser isn\'t defined', () => {
        delete props.authedUser
        expect(comp().instance().isLoadingFn(props)).toBe(true)
      })

      it('returns false if all three (profile, stats, authedUser) are defined', () => {
        props.authedUser = {}
        props.usersProfile = {}
        props.stats = {}
        expect(comp().instance().isLoadingFn(props)).toBe(false)
      })
    })

    describe('hasNoProfile', () => {
      it('returns true if errors.noProfile is defined', () => {
        expect(comp().instance().hasNoProfile({ errors: { noProfile: 'msg' } })).toBe(true)
      })

      it('returns false if errors.noProfile is undefined', () => {
        expect(comp().instance().hasNoProfile({ errors: {} })).toBe(false)
      })
    })
  })

  describe('mapStateToProps', () => {
    it('returns expected object', () => {
      const state = {
        user: { 
          name: 'John Doe', 
          stats: { 
            height: 200 
          } 
        },
        profile: { 
          age: 30 
        },
        err: { 
          email: 'Email is wrong' 
        }
      }

      const expectedObject = {
        authedUser: state.user,
        usersProfile: state.profile,
        stats: state.user.stats,
        errors: state.err
      }

      expect(mapStateToProps(state)).toEqual(expectedObject)
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})

