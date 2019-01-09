import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'
import { _UnconnectedPrivateRoute as PrivateRoute } from './PrivateRoute'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    component: () => <h1>Hello!</h1>,
    authedUser: { isAuthenticated: true }
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Router>
        <PrivateRoute {...props} />
      </Router>
    )
  }
  return mountedComponent
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('isAuthenticated', () => {
        it('if true, component is rendered', () => {
          props.authedUser.isAuthenticated = true
          expect(comp().find('component').exists()).toBe(true)
        })

        it('if false, Redirect is rendered', () => {
          props.authedUser.isAuthenticated = false
          expect(comp().find('Redirect').exists()).toBe(true)
        })
      })
    })
  })
})

