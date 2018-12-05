/**
 * Contract:
 *
 * What do I render?
 * (snapshot)
 * - Overlay
 *   - form
 *     - h1
 *     - 9 Fields
 *     - next 6 Fields hidden under a toggle
 *     - Submit and Cancel button Fields
 *
 * What do I pass components that I render?
 * (props passing)
 * - Look at all Fields,
 * - form
 * - Overlay
 * - h1
 * - div hiding social media fields
 *
 * Do props I receive affect what I render?
 * (props effects)
 * - errors object triggers error displaying
 * - if profile object isn't passed, UpdateProfile form turns into CreateProfile (h1, submit btn label)
 *
 * What do I do with functions (all of them)?
 * (functions / args passing)
 * - Look at:
 *   - updateUsersProfile
 *   - handleDismiss
 *   - preventDefault calls
 *   - history.push calls
 *   - setState calls
 *
 * Do I hold anything in state? HOW and WHEN do I update it? Invalidation? How does state affect other components?
 * (state)
 * - social media text Fields window state
 *   > controls abovementioned window
 *   > controlled through toggle button
 * - creatingProfile flag
 *   > conrols contents of h1 and submit button
 *   > controlled through profile object in props (undef > true, def > false)
 * - text fields states
 *
 * Any context used?
 * - redux: 1 thunk action, errors object from state
 *
 * Public ref API?
 * - n/a
 *
 * Lifecycle hooks side effects?
 * (lifecycle hooks)
 * - constructor:
 *   > if profile is passed, destructure it into state, set creatingProfile state flag to false
 *   > else apply initial state
 *
 * User interaction?
 * (interaction)
 * - Look at:
 *   - all Fields: typing, clicking, toggling etc.
 *   - form submission (correct/incorrect)
 *   - again, make sure preventDefault calls are present
 *   - cancel button click
 *   - backdrop click
 *
 */

import React from 'react'
import { shallow } from 'enzyme'
import { UpdateProfile } from './UpdateProfile'
import cloneDeep from 'lodash.clonedeep'

describe('UpdateProfile', () => {
  let props
  let mountedUpdateProfile

  const getMockProps = () => {
    return cloneDeep({

    })
  }

  const updateProfileComp = () => {
    if (!mountedUpdateProfile) {
      mountedUpdateProfile = shallow(<UpdateProfile {...props} />)
    }
    return mountedUpdateProfile
  }

  beforeEach(() => {
    props = getMockProps()
    mountedUpdateProfile = undefined
  })
})
