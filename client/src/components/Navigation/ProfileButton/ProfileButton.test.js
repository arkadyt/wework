import React from 'react'
import { shallow } from 'enzyme'
import ProfileButton from './ProfileButton'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    isAuthenticated: true
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<ProfileButton {...props} />)
  }
  return mountedComponent
}

describe('ProfileButton', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('isAuthenticated', () => {
        it('if true, Account button is rendered', () => {
          props.isAuthenticated = true
          expect(comp().find('button[className="Navigation-button"]').exists()).toBe(true)
        })

        it('if false, Link component is rendered', () => {
          props.isAuthenticated = false
          expect(comp().find('Link').exists()).toBe(true)
        })
      })
    })
  })

  it('matches snapshot with isAuthenticated set to true', () => {
    props.isAuthenticated = true
    expect(comp()).toMatchSnapshot()
  })

  it('matches snapshot with isAuthenticated set to false', () => {
    props.isAuthenticated = false
    expect(comp()).toMatchSnapshot()
  })
})

