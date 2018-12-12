/**
 * Contract:
 *
 * What my component renders?
 * (snapshot testing)
 * - form containing 4 text fields
 *   1 div with 1 submit field and 1 text span
 *
 * What do I pass to components I render?
 * (props passing)
 * Look at:
 * - Redirect
 * - form
 * - name field
 * - email field
 * - password field
 * - password confirmation field
 * - submit field
 * - Link component
 *
 * What effects do the props I receive have?
 * (props effects)
 * - when certain subfields are defined in [errors] object, respective Fields show errors (tested in props passing)
 * - vice versa is true: no errors, no red texts
 * - if user is authed, visiting /signup would redirect him to /profile
 * - if user isn't authed, visiting /signup would show Signup component
 *
 * How do I use functions?
 * (functions) > (interaction)
 * - n/a, no internal functions, use of others is tested in (interaction)
 *
 * What happens when user interacts with my component?
 * (interaction)
 * - onSubmit must preventDefault(), call all 4 thunk actions and history.push() with correct args
 * - When user types, respective fields update state through setState calls
 * - When user clicks on login <Link> it navigates to /login
 * - Manually visiting /signup while authenticated redirects to /profile
 *
 * What does the state hold?
 * (state) > (props passing)
 * - name field data
 * - email textfield data
 * - password field data
 * - pwd confirmation field data
 *
 * How and When do I update/invalidate state? 
 * (state) > (interaction)
 * - n/a, all of the below is tested in the (interaction) section
 * - When user types, Fields update respective state parts through setState calls
 * - No invalidation occurs throughout the whole lifecycle of the component
 *
 * How state affects other components?
 * (state) > (props passing)
 * - n/a, tested in (props passing)
 * - Updates text in text Fields
 *
 * Any context?
 * (context) > (interaction)
 * - react-router
 *   > history.push()
 *
 * Lifecycle hooks side effects?
 * - N/A
 *
 * Public ref API?
 * - N/A
 *
 */

import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedSignup as Signup } from './Signup'
import Field from '../../Field/Field'
import Overlay from '../../Overlay/Overlay'
import cloneDeep from 'lodash.clonedeep'
import Redirect from 'react-router'

describe('Signup', () => {
  let props
  let mountedComponent

  const getMockProps = () => {
    const actions = {
      registerUser: jest.fn(),
      fetchFollowers: jest.fn(),
      fetchUsersProfile: jest.fn(),
      fetchSubscriptions: jest.fn()
    }

    const errors = {}
    const authedUser = { isAuthenticated: false }

    return cloneDeep({
      authedUser,
      errors,
      ...actions
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Signup {...props} />)
    }
    return mountedComponent
  }

  beforeEach(() => {
    props = getMockProps()
    mountedComponent = undefined
  })

  describe('props passing', () => {
    describe('Redirect component', () => {
      beforeEach(() => {
        props.authedUser.isAuthenticated = true
      })

      it('receives correct set of props', () => {
        const expectedKeys = [ 'to', 'push' ]
        expect(Object.keys(comp().find('Redirect').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [to] prop', () => {
        expect(comp().find('Redirect').prop('to')).toBe('/profile')
      })

      it('receives correct [push] prop', () => {
        expect(comp().find('Redirect').prop('push')).toBe(false)
      })
    })

    describe('form', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [ 'onSubmit', 'children' ]
        expect(Object.keys(comp().find('form').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [onSubmit] prop', () => {
        expect(comp().find('form').prop('onSubmit')).toEqual(expect.any(Function))
      })
    })

    describe('name Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label',
          'value',
          'onChange',
          'placeholder',
          'error'
        ]
        expect(Object.keys(comp().find(Field).find('[name="name"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="name"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="name"]').prop('label')).toBe('Your name:')
      })

      it('receives state.name for [value] prop if former is defined', () => {
        const state = 'some state'
        comp().setState({ name: state })
        expect(comp().find(Field).find('[name="name"]').prop('value')).toBe(state)
      })

      it('receives undefined for [value] prop if state.name is undefined', () => {
        comp().setState({ name: undefined })
        expect(comp().find(Field).find('[name="name"]').prop('value')).not.toBeDefined()
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find(Field).find('[name="name"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="name"]').prop('placeholder')).toBe('John Doe')
      })

      it('receives props.errors.name for [error] prop if former is defined', () => {
        const msg = 'error occured'
        props.errors.name = msg
        expect(comp().find(Field).find('[name="name"]').prop('error')).toBe(msg)
      })

      it('receives undefined for [error] prop if props.errors.name is undefined', () => {
        delete props.errors.name
        expect(comp().find(Field).find('[name="name"]').prop('error')).not.toBeDefined()
      })
    })

    describe('email Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label',
          'value',
          'onChange',
          'placeholder',
          'error'
        ]
        expect(Object.keys(comp().find(Field).find('[name="email"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('label')).toBe('Your email:')
      })

      it('receives state.email for [value] prop if former is defined', () => {
        const state = 'some state'
        comp().setState({ email: state })
        expect(comp().find(Field).find('[name="email"]').prop('value')).toBe(state)
      })

      it('receives undefined for [value] prop if state.email is undefined', () => {
        comp().setState({ email: undefined })
        expect(comp().find(Field).find('[name="email"]').prop('value')).not.toBeDefined()
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('placeholder')).toBe('your.name@mail.com')
      })

      it('receives props.errors.email for [error] prop if former is defined', () => {
        const msg = 'error occured'
        props.errors.email = msg
        expect(comp().find(Field).find('[name="email"]').prop('error')).toBe(msg)
      })

      it('receives undefined for [error] prop if props.errors.email is undefined', () => {
        delete props.errors.email
        expect(comp().find(Field).find('[name="email"]').prop('error')).not.toBeDefined()
      })
    })

    describe('password Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label',
          'value',
          'onChange',
          'placeholder',
          'error'
        ]
        expect(Object.keys(comp().find(Field).find('[name="password"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('type')).toBe('password')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('label')).toBe('Password:')
      })

      it('receives state.password for [value] prop if former is defined', () => {
        const state = 'some state'
        comp().setState({ password: state })
        expect(comp().find(Field).find('[name="password"]').prop('value')).toBe(state)
      })

      it('receives undefined for [value] prop if state.password is undefined', () => {
        comp().setState({ password: undefined })
        expect(comp().find(Field).find('[name="password"]').prop('value')).not.toBeDefined()
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('placeholder')).toBe('Min. 6 characters')
      })

      it('receives props.errors.password for [error] prop if former is defined', () => {
        const msg = 'error occured'
        props.errors.password = msg
        expect(comp().find(Field).find('[name="password"]').prop('error')).toBe(msg)
      })

      it('receives undefined for [error] prop if props.errors.password is undefined', () => {
        delete props.errors.password
        expect(comp().find(Field).find('[name="password"]').prop('error')).not.toBeDefined()
      })
    })

    describe('passwordConfirm Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label',
          'value',
          'onChange',
          'placeholder',
          'error'
        ]
        expect(Object.keys(comp().find(Field).find('[name="passwordConfirm"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('type')).toBe('password')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('label')).toBe('Confirm password:')
      })

      it('receives state.passwordConfirm for [value] prop if former is defined', () => {
        const state = 'some state'
        comp().setState({ passwordConfirm: state })
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('value')).toBe(state)
      })

      it('receives undefined for [value] prop if state.passwordConfirm is undefined', () => {
        comp().setState({ passwordConfirm: undefined })
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('value')).not.toBeDefined()
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('placeholder')).toBe('Type in your password again')
      })

      it('receives props.errors.passwordConfirm for [error] prop if former is defined', () => {
        const msg = 'error occured'
        props.errors.passwordConfirm = msg
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('error')).toBe(msg)
      })

      it('receives undefined for [error] prop if props.errors.passwordConfirm is undefined', () => {
        delete props.errors.passwordConfirm
        expect(comp().find(Field).find('[name="passwordConfirm"]').prop('error')).not.toBeDefined()
      })
    })

    describe('submit Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [ 
          'type', 
          'name',
          'inline', 
          'containerStyle', 
          'label'
        ]
        expect(Object.keys(comp().find(Field).find('[name="submit"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="submit"]').prop('type')).toBe('submit')
      })

      it('receives correct [inline] prop', () => {
        expect(comp().find(Field).find('[name="submit"]').prop('inline')).toBe(true)
      })

      it('receives correct [containerStyle] prop', () => {
        const expectedStyles = {
          margin: 0
        }
        expect(comp().find(Field).find('[name="submit"]').prop('containerStyle')).toStrictEqual(expectedStyles)
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="submit"]').prop('label')).toStrictEqual('Sign Up')
      })
    })

    describe('Link component', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'to',
          'children',
          'replace'
        ]
        expect(Object.keys(comp().find('span.Signup-options-info').find('Link').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [to] prop', () => {
        expect(comp().find('span.Signup-options-info').find('Link').prop('to')).toBe('/login')
      })

      it('receives correct [children] prop', () => {
        expect(comp().find('span.Signup-options-info').find('Link').prop('children')).toBe('Log In')
      })
    })
  })

  describe('props effects', () => {
    describe('authentication status', () => {
      it('renders only Redirect if user is authed', () => {
        props.authedUser.isAuthenticated = true
        expect(comp().first().name()).toBe('Redirect')
      })

      it('renders div instead of Redirect if user is not authed', () => {
        props.authedUser.isAuthenticated = false
        expect(comp().first().name()).toBe('div')
      })
    })
  })

  describe('interaction', () => {
    describe('form submission', () => {})

    describe('name Field', () => {})

    describe('email Field', () => {})

    describe('password Field', () => {})

    describe('password confirmation Field', () => {})

    describe('submit Field', () => {})

    describe('Link component', () => {})
  })

  it('passes a snapshot test', () => {
    expect(comp()).toMatchSnapshot()
  })
})
