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
 * (props effects)
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
 * (state)
 * - email textfield data
 * - password field data
 *
 * How and When do I update/invalidate state? 
 * (state)
 * - When user types, respective fields update state through setState calls
 * - No invalidation occurs throughout the whole lifecycle of the component
 *
 * How state affects other components?
 * (state)
 * - Updates text in text Fields
 *
 * Any context?
 * (context)
 * - react-router
 *   > history.push()
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
 * - When user clicks on [Submit] button form's onSubmit function is called
 * - When user clicks on signup <Link> it navigates to /signup
 */


import React from 'react'
import Login from './Login'
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
      loginUser: jest.fn()
    }

    const history = {
      push: jest.fn()
    }

    return cloneDeep({
      ...actions,
      history,
      errors: {
        email: 'Email is wrong'
      }
    })
  }

  const loginComp = () => {
    if (!mountedLogin) {
      mountedLogin = shallow(<Login {...props} />)
    }
    return mountedLogin
  }

  beforeEach(() => {
    props = getMockProps()
    mountedLogin = undefined
  })
})
