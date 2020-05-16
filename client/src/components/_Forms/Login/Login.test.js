/**
 * Contract:
 *
 * What my component renders?
 * (snapshot testing)
 * - form containing 2 fields
 *   1 div with 1 submit field and 1 text span
 *
 * What do I pass to components I render?
 * (props passing)
 * Look at:
 * - form
 * - email field
 * - password field
 * - submit field
 * - Link component
 *
 * What effects do the props I receive have?
 * (props effects) > (props passing)
 * - subfields in [errors] object cause Field components to show error spans right below input fields
 * - vice versa is true: no errors, no red texts
 *
 * How do I use functions (any of them)?
 * (functions)
 * - 4 thunk functions must be called with correct args
 * - onSubmit must preventDefault(), call all 4 thunk actions and history.push()
 * - Fields' onChange functions receive event obj and call setState correctly
 *
 * What does the state hold?
 * (state) > (props passing), (interaction)
 * - email textfield data
 * - password field data
 *
 * How and When do I update/invalidate state? 
 * (state) > (interaction)
 * - When user types, respective fields update state through setState calls
 * - No invalidation occurs throughout the whole lifecycle of the component
 *
 * How state affects other components?
 * (state) > (interaction)
 * - Updates text in text Fields
 *
 * Any context?
 * (context)
 * - n/a
 *
 * Lifecycle hooks side effects?
 * - N/A
 *
 * Public ref API?
 * - N/A
 *
 * What happens when user interacts with my component?
 * (interaction)
 * - When user types, respective fields update state through setState calls
 * - When user clicks on [Submit] button form's onSubmit function is called (just ensure that type prop is right)
 * - When user clicks on signup <Link> it navigates to /signup (not your resp, just ensure props)
 */


import React from 'react'
import { _UnconnectedLogin as Login } from './Login'
import Field from '../../Field/Field'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('Login', () => {
  let props
  let mountedLogin

  const getMockProps = () => {
    const actions = {
      fetchFollowers: jest.fn(),
      fetchSubscriptions: jest.fn(),
      fetchUsersProfile: jest.fn(),
      loginUser: jest.fn((data, cb) => cb())
    }

    const history = {
      push: jest.fn()
    }

    return cloneDeep({
      ...actions,
      history,
      errors: {}
    })
  }

  const comp = () => {
    if (!mountedLogin) {
      mountedLogin = shallow(<Login {...props} />)
    }
    return mountedLogin
  }

  beforeEach(() => {
    props = getMockProps()
    mountedLogin = undefined
  })

  describe('props passing', () => {
    describe('form', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'onSubmit',
          'children'
        ]
        expect(Object.keys(comp().find('form').props())).toStrictEqual(expectedKeys)
      })
      
      it('receives correct [onSubmit] prop', () => {
        expect(comp().find('form').prop('onSubmit')).toEqual(expect.any(Function))
      })
    })

    describe('email Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'label',
          'error',
          'placeholder'
        ]
        expect(Object.keys(comp().find(Field).find('[name="email"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('type')).toBe('text')
      })

      it('receives state.email into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ email: state })
        expect(comp().find(Field).find('[name="email"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.email is not defined', () => {
        comp().setState({ email: undefined })
        expect(comp().find(Field).find('[name="email"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('label')).toBe('Email:')
      })

      it('receives props.errors.email into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.email = msg
        expect(comp().find(Field).find('[name="email"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.email into [error] prop if former is defined', () => {
        delete props.errors.email
        expect(comp().find(Field).find('[name="email"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="email"]').prop('placeholder')).toBe('Your email')
      })
    })

    describe('password Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'label',
          'error',
          'placeholder'
        ]
        expect(Object.keys(comp().find(Field).find('[name="password"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('type')).toBe('password')
      })

      it('receives state.password into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ password: state })
        expect(comp().find(Field).find('[name="password"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.password is not defined', () => {
        comp().setState({ password: undefined })
        expect(comp().find(Field).find('[name="password"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('label')).toBe('Password:')
      })

      it('receives props.errors.password into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.password = msg
        expect(comp().find(Field).find('[name="password"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.password into [error] prop if former is defined', () => {
        delete props.errors.password
        expect(comp().find(Field).find('[name="password"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="password"]').prop('placeholder')).toBe('Your password')
      })
    })

    describe('submit button', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'inline',
          'containerStyle',
          'label',
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
        const expectedStyle = {
          cursor: "unset",
          margin: 0,
          pointerEvents: "unset"
        }
        expect(comp().find(Field).find('[name="submit"]').prop('containerStyle')).toStrictEqual(expectedStyle)
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="submit"]').prop('label')).toBe('Log In')
      })
    })

    describe('Link', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'to',
          'children',
          'replace'
        ]
        expect(Object.keys(comp().find('span.Login-options-info').find('Link').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [to] prop', () => {
        expect(comp().find('span.Login-options-info').find('Link').prop('to')).toBe('/signup')
      })
    })
  })

  describe('interaction', () => {
    describe('form submission', () => {
      let mockedEvent

      beforeEach(() => {
        mockedEvent = { preventDefault: jest.fn() }
      })

      it('invokes preventDefault()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(mockedEvent.preventDefault).toHaveBeenCalled()
      })

      it('invokes loginUser()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.loginUser).toHaveBeenCalled()
      })

      it('invokes fetchSubscriptions()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchSubscriptions).toHaveBeenCalled()
      })

      it('does not invoke fetchSubscriptions() until loginUser() invokes the callback', () => {
        props.loginUser = jest.fn()
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchSubscriptions).not.toHaveBeenCalled()
      })

      it('invokes fetchFollowers()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchFollowers).toHaveBeenCalled()
      })

      it('does not invoke fetchFollowers() until loginUser() invokes the callback', () => {
        props.loginUser = jest.fn()
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchFollowers).not.toHaveBeenCalled()
      })

      it('invokes fetchUsersProfile()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchUsersProfile).toHaveBeenCalled()
      })

      it('does not invoke fetchUsersProfile() until loginUser() invokes the callback', () => {
        props.loginUser = jest.fn()
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchUsersProfile).not.toHaveBeenCalled()
      })

      it('invokes history.push()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.history.push).toHaveBeenCalled()
      })
      
      it('invokes loginUser() with correct parms', () => {
        comp().find('form').simulate('submit', mockedEvent)
        const { reqSent, ...expectedPayload } = comp().state();
        expect(props.loginUser).toHaveBeenCalledWith(expectedPayload, expect.any(Function))
      })

      it('invokes fetchSubscriptions() with correct parms', () => {
        const userId = 'some_user_id_9786f91'
        props.loginUser = jest.fn((data, cb) => cb(userId))
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchSubscriptions).toHaveBeenCalledWith(userId)
      })

      it('invokes fetchFollowers() with correct parms', () => {
        const userId = 'some_user_id_9786f91'
        props.loginUser = jest.fn((data, cb) => cb(userId))
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.fetchFollowers).toHaveBeenCalledWith(userId)
      })

      it('invokes history.push() with correct parms', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.history.push).toHaveBeenCalledWith('/feed')
      })
    })

    describe('Fields', () => {
      let mockedEvent
      let value = 'some value'

      beforeEach(() => {
        mockedEvent = { target: { value } }
      })
      
      describe('email', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="email"]').simulate('change', mockedEvent)
          expect(comp().state('email')).toBe(value)
        })
      })

      describe('password', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="password"]').simulate('change', mockedEvent)
          expect(comp().state('password')).toBe(value)
        })
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
