import React from 'react'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    showDropdown: true,
    toggleDropdown: jest.fn(),
    logoutUser: jest.fn(cb => cb()),
    history: { push: jest.fn() }
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Dropdown {...props} />)
  }
  return mountedComponent
}

describe('Dropdown', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('showDropdown', () => {
        it('if true, backdrop div is shown', () => {
          props.showDropdown = true
          expect(comp().find('div[className="backdrop"]').exists()).toBe(true)
        })

        it('if false, backdrop div is not shown', () => {
          props.showDropdown = false
          expect(comp().find('div[className="backdrop"]').exists()).toBe(false)
        })

        it('if true, dropdown list (ul) is shown', () => {
          props.showDropdown = true
          expect(comp().find('ul').hasClass('account-menu-open')).toBe(true)
        })

        it('if false, dropdown list (ul) is not shown', () => {
          props.showDropdown = false
          expect(comp().find('ul').hasClass('account-menu-open')).toBe(false)
        })
      })
    })
  })

  describe('interaction', () => {
    describe('ul', () => {
      it('onClick calls toggleDropdown', () => {
        comp().find('ul').simulate('click')
        expect(props.toggleDropdown).toHaveBeenCalled()
      })

      it('onClick calls toggleDropdown with correct args', () => {
        comp().find('ul').simulate('click')
        expect(props.toggleDropdown).toHaveBeenCalledWith(false)
      })
    })

    describe('logout button', () => {
      it('onClick calls logoutUser', () => {
        comp().find('.Navigation-menu-button').simulate('click')
        expect(props.logoutUser).toHaveBeenCalled()
      })

      it('onClick calls logoutUser with correct args', () => {
        comp().find('.Navigation-menu-button').simulate('click')
        expect(props.logoutUser).toHaveBeenCalledWith(expect.any(Function))
      })

      it('logoutUser callback calls history.push', () => {
        comp().find('.Navigation-menu-button').simulate('click')
        expect(props.history.push).toHaveBeenCalled()
      })

      it('logoutUser callback calls history.push with correct args', () => {
        comp().find('.Navigation-menu-button').simulate('click')
        expect(props.history.push).toHaveBeenCalledWith('/login')
      })
    })

    describe('backdrop', () => {
      it('onClick calls toggleDropdown', () => {
        comp().find('div[className="backdrop"]').simulate('click')
        expect(props.toggleDropdown).toHaveBeenCalled()
      })

      it('onClick calls toggleDropdown with correct args', () => {
        comp().find('div[className="backdrop"]').simulate('click')
        expect(props.toggleDropdown).toHaveBeenCalledWith(false)
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
