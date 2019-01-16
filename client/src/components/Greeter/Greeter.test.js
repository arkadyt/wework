import React from 'react'
import { shallow } from 'enzyme'
import Greeter from './Greeter'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  // left here in case of future changes to the component
  return cloneDeep({})
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Greeter {...props} />)
  }
  return mountedComponent
}

describe('Greeter', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('state', () => {
    describe('startAnimations', () => {
      it('if true, whiteScreenClasses gets additional className', () => {
        comp().setState({ startAnimations: true })
        expect(comp().find('.Greeter__white-screen').hasClass('animate')).toBe(true)
      })

      it('if false, whiteScreenClasses does not get additional classNames', () => {
        comp().setState({ startAnimations: false })
        expect(comp().find('.Greeter__white-screen').hasClass('animate')).toBe(false)
      })

      it('if true, logoScreenClasses gets additional className', () => {
        comp().setState({ startAnimations: true })
        expect(comp().find('.Greeter__logo-screen').hasClass('animate')).toBe(true)
      })

      it('if false, logoScreenClasses does not get additional classNames', () => {
        comp().setState({ startAnimations: false })
        expect(comp().find('.Greeter__logo-screen').hasClass('animate')).toBe(false)
      })

      it('if true, headlineClasses gets additional className', () => {
        comp().setState({ startAnimations: true })
        expect(comp().find('.Greeter__headline').hasClass('animate')).toBe(true)
      })

      it('if false, headlineClasses does not get additional classNames', () => {
        comp().setState({ startAnimations: false })
        expect(comp().find('.Greeter__headline').hasClass('animate')).toBe(false)
      })

      it('if true, headlineWarningClasses gets additional className', () => {
        comp().setState({ startAnimations: true })
        expect(comp().find('.Greeter__headline_warning').hasClass('animate')).toBe(true)
      })

      it('if false, headlineWarningClasses does not get additional classNames', () => {
        comp().setState({ startAnimations: false })
        expect(comp().find('.Greeter__headline_warning').hasClass('animate')).toBe(false)
      })
    })
  })

  describe('functions', () => {
    describe('handleLoad', () => {
      it('sets startAnimations to true', () => {
        comp().setState({ startAnimations: false })
        comp().instance().handleLoad()
        expect(comp().state('startAnimations')).toBe(true)
      })
    })

    describe('componentDidMount', () => {
      it('registers window load event listener', () => {
        const listeners = {}
        global.addEventListener = (name, fn) => listeners[name] = fn
        comp()
        expect(Object.keys(listeners)).toHaveLength(1)
      })

      it('sets documentElement className', () => {
        comp()
        expect(global.document.documentElement.className).toContain('html-dark-background')
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})

