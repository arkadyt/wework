import React from 'react'
import { shallow } from 'enzyme'
import ProtectedLinks from './ProtectedLinks'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    isAuthenticated: true
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<ProtectedLinks {...props} />)
  }
  return mountedComponent
}

describe('ProtectedLinks', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('isAuthenticated', () => {
        it('if true, everything is rendered', () => {
          props.isAuthenticated = true
          expect(comp().type()).not.toBe(null)
        })

        it('if false, nothing is rendered', () => {
          props.isAuthenticated = false
          expect(comp().type()).toBe(null)
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


