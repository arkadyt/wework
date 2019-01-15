import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedNavigation as Navigation } from './Navigation'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    logoutUser: jest.fn(cb => cb()),
    authedUser: { isAuthenticated: true },
    history: { push: jest.fn() }
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Navigation {...props} />)
  }
  return mountedComponent
}

describe('Navigation', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('passing', () => {
      describe('ProfileButton', () => {
        it('receives correct toggleDropdown prop', () => {
          expect(comp().find('profileButton').prop('toggleDropdown').name).toContain('toggleDropdown')
        })
      })

      describe('Dropdown', () => {
        it('receives state.showDropdown into showDropdown prop', () => {
          comp().setState({ showDropdown: true })
          expect(comp().find('dropdown').prop('showDropdown')).toBe(comp().state('showDropdown'))
        })

        it('receives undefined into showDropdown prop if state.showDropdown is not defined', () => {
          comp().setState({ showDropdown: undefined })
          expect(comp().find('dropdown').prop('showDropdown')).not.toBeDefined()
        })

        it('receives correct function into toggleDropdown prop', () => {
          expect(comp().find('dropdown').prop('toggleDropdown').name).toContain('toggleDropdown')
        })
      })
    })
  })

  describe('functions', () => {
    describe('toggleDropdown', () => {
      it('calls setState', () => {
        const mock = jest.spyOn(Navigation.prototype, 'setState')
        comp().instance().toggleDropdown()
        expect(mock).toHaveBeenCalled()
      })

      it('calls setState with correct args', () => {
        const mock = jest.spyOn(Navigation.prototype, 'setState')
        comp().instance().toggleDropdown({}, true)
        expect(mock).toHaveBeenCalledWith({ showDropdown: true })
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
