import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedQuickStats as QuickStats } from './QuickStats'
import cloneDeep from 'lodash.clonedeep'

jest.mock('../../hocs/conditionalRendering')
const { withEither } = require('../../hocs/conditionalRendering')

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

      // TODO: test compose call
      // either call jest.unmock('recompose') in every test suite using recompose package
      // or try something else like jest.disableAutomock()
      // (which is unusable by the time of writing)
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

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})

