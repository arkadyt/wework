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
import Overlay from '../../Overlay/Overlay'

describe('UpdateProfile', () => {
  let props
  let mountedUpdateProfile

  const getMockProps = () => {
    return cloneDeep({
      errors: {},
      updateUsersProfile: jest.fn(),
      history: { 
        goBack: jest.fn() 
      }
    })
  }

  const comp = () => {
    if (!mountedUpdateProfile) {
      mountedUpdateProfile = shallow(<UpdateProfile {...props} />)
    }
    return mountedUpdateProfile
  }

  beforeEach(() => {
    props = getMockProps()
    mountedUpdateProfile = undefined
  })

  describe('props passing', () => {
    describe('handle Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="handle"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.handle is undefined', () => {
        delete props.errors.handle
        expect(comp().find('[name="handle"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.handle is defined', () => {
        const msg = 'something happened...'
        props.errors.handle = msg
        expect(comp().find('[name="handle"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="handle"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="handle"]').prop('label')).toBe('Profile handle:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="handle"]').prop('placeholder')).toBe('someperson123')
      })

      it('receives undefined for [value] prop if state.handle is undefined', () => {
        comp().setState({ handle: undefined })
        expect(comp().find('[name="handle"]').prop('value')).not.toBeDefined()
      })

      it('receives state.handle for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ handle: state })
        expect(comp().find('[name="handle"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="handle"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })
    
    describe('company Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="company"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.company is undefined', () => {
        delete props.errors.company
        expect(comp().find('[name="company"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.company is defined', () => {
        const msg = 'something happened...'
        props.errors.company = msg
        expect(comp().find('[name="company"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="company"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="company"]').prop('label')).toBe('Company:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="company"]').prop('placeholder')).toBe('Company name')
      })

      it('receives undefined for [value] prop if state.company is undefined', () => {
        comp().setState({ company: undefined })
        expect(comp().find('[name="company"]').prop('value')).not.toBeDefined()
      })

      it('receives state.company for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ company: state })
        expect(comp().find('[name="company"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="company"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('website Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="website"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.website is undefined', () => {
        delete props.errors.website
        expect(comp().find('[name="website"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.website is defined', () => {
        const msg = 'something happened...'
        props.errors.website = msg
        expect(comp().find('[name="website"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="website"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="website"]').prop('label')).toBe('Personal Website:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="website"]').prop('placeholder')).toBe('http://mywebsite.com')
      })

      it('receives undefined for [value] prop if state.website is undefined', () => {
        comp().setState({ website: undefined })
        expect(comp().find('[name="website"]').prop('value')).not.toBeDefined()
      })

      it('receives state.website for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ website: state })
        expect(comp().find('[name="website"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="website"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('location Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="location"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.location is undefined', () => {
        delete props.errors.location
        expect(comp().find('[name="location"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.location is defined', () => {
        const msg = 'something happened...'
        props.errors.location = msg
        expect(comp().find('[name="location"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="location"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="location"]').prop('label')).toBe('Location:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="location"]').prop('placeholder')).toBe('Seattle, WA')
      })

      it('receives undefined for [value] prop if state.location is undefined', () => {
        comp().setState({ location: undefined })
        expect(comp().find('[name="location"]').prop('value')).not.toBeDefined()
      })

      it('receives state.location for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ location: state })
        expect(comp().find('[name="location"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="location"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('title Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="title"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.title is undefined', () => {
        delete props.errors.title
        expect(comp().find('[name="title"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.title is defined', () => {
        const msg = 'something happened...'
        props.errors.title = msg
        expect(comp().find('[name="title"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="title"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="title"]').prop('label')).toBe('Job title:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="title"]').prop('placeholder')).toBe('Marketing Analyst')
      })

      it('receives undefined for [value] prop if state.title is undefined', () => {
        comp().setState({ title: undefined })
        expect(comp().find('[name="title"]').prop('value')).not.toBeDefined()
      })

      it('receives state.title for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ title: state })
        expect(comp().find('[name="title"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="title"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('status Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'list',
	  'value',
	  'onChange',
	  'error'
        ]
        expect(Object.keys(comp().find('[name="status"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.status is undefined', () => {
        delete props.errors.status
        expect(comp().find('[name="status"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.status is defined', () => {
        const msg = 'something happened...'
        props.errors.status = msg
        expect(comp().find('[name="status"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="status"]').prop('type')).toBe('list')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="status"]').prop('label')).toBe('Job seeker status:')
      })

      it('receives correct [list] prop', () => {
        expect(comp().find('[name="status"]').prop('list')).toEqual(expect.any(Array))
      })

      it('receives undefined for [value] prop if state.status is undefined', () => {
        comp().setState({ status: undefined })
        expect(comp().find('[name="status"]').prop('value')).not.toBeDefined()
      })

      it('receives state.status for [value] prop if former is defined', () => {
        const state = ['some value', 'some 2nd value']
        comp().setState({ status: state })
        expect(comp().find('[name="status"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="status"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('skills Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'list',
	  'value',
	  'onChange',
	  'error'
        ]
        expect(Object.keys(comp().find('[name="skills"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.skills is undefined', () => {
        delete props.errors.skills
        expect(comp().find('[name="skills"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.skills is defined', () => {
        const msg = 'something happened...'
        props.errors.skills = msg
        expect(comp().find('[name="skills"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="skills"]').prop('type')).toBe('multiselect')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="skills"]').prop('label')).toBe('Skills:')
      })

      it('receives correct [list] prop', () => {
        expect(comp().find('[name="skills"]').prop('list')).toEqual(expect.any(Array))
      })

      it('receives undefined for [value] prop if state.skills is undefined', () => {
        comp().setState({ skills: undefined })
        expect(comp().find('[name="skills"]').prop('value')).not.toBeDefined()
      })

      it('receives state.skills for [value] prop if former is defined', () => {
        const state = ['some value', 'some 2nd value']
        comp().setState({ skills: state })
        expect(comp().find('[name="skills"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="skills"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('bio Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
          'error',
          'placeholder'
        ]
        expect(Object.keys(comp().find('[name="bio"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.bio is undefined', () => {
        delete props.errors.bio
        expect(comp().find('[name="bio"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.bio is defined', () => {
        const msg = 'something happened...'
        props.errors.bio = msg
        expect(comp().find('[name="bio"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="bio"]').prop('type')).toBe('textarea')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="bio"]').prop('label')).toBe('Bio:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="bio"]').prop('placeholder')).toBe('It\'s okay to brag here..')
      })

      it('receives undefined for [value] prop if state.bio is undefined', () => {
        comp().setState({ bio: undefined })
        expect(comp().find('[name="bio"]').prop('value')).not.toBeDefined()
      })

      it('receives state.bio for [value] prop if former is defined', () => {
        const state = ['some value', 'some 2nd value']
        comp().setState({ bio: state })
        expect(comp().find('[name="bio"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="bio"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('social media section toggle button', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          'type',
          'name',
          'label',
          'onClick'
        ]
        expect(Object.keys(comp().find('[name="toggle"]').props())).toStrictEqual(expectedProps)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="toggle"]').prop('type')).toBe('button')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="toggle"]').prop('label')).toBe('Toggle social media section')
      })

      it('receives correct [onClick] prop', () => {
        expect(comp().find('[name="toggle"]').prop('onClick')).toEqual(expect.any(Function))
      })
    })

    describe('youtube Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="youtube"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.youtube is undefined', () => {
        delete props.errors.youtube
        expect(comp().find('[name="youtube"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.youtube is defined', () => {
        const msg = 'something happened...'
        props.errors.youtube = msg
        expect(comp().find('[name="youtube"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="youtube"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="youtube"]').prop('label')).toBe('Youtube:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="youtube"]').prop('placeholder')).toBe('Please enter full channel URL')
      })

      it('receives undefined for [value] prop if state.youtube is undefined', () => {
        comp().setState({ youtube: undefined })
        expect(comp().find('[name="youtube"]').prop('value')).not.toBeDefined()
      })

      it('receives state.youtube for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ youtube: state })
        expect(comp().find('[name="youtube"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="youtube"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('twitter Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="twitter"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.twitter is undefined', () => {
        delete props.errors.twitter
        expect(comp().find('[name="twitter"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.twitter is defined', () => {
        const msg = 'something happened...'
        props.errors.twitter = msg
        expect(comp().find('[name="twitter"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="twitter"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="twitter"]').prop('label')).toBe('Twitter:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="twitter"]').prop('placeholder')).toBe('Twitter profile URL')
      })

      it('receives undefined for [value] prop if state.twitter is undefined', () => {
        comp().setState({ twitter: undefined })
        expect(comp().find('[name="twitter"]').prop('value')).not.toBeDefined()
      })

      it('receives state.twitter for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ twitter: state })
        expect(comp().find('[name="twitter"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="twitter"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('instagram Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="instagram"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.instagram is undefined', () => {
        delete props.errors.instagram
        expect(comp().find('[name="instagram"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.instagram is defined', () => {
        const msg = 'something happened...'
        props.errors.instagram = msg
        expect(comp().find('[name="instagram"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="instagram"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="instagram"]').prop('label')).toBe('Instagram:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="instagram"]').prop('placeholder')).toBe('Instagram URL')
      })

      it('receives undefined for [value] prop if state.instagram is undefined', () => {
        comp().setState({ instagram: undefined })
        expect(comp().find('[name="instagram"]').prop('value')).not.toBeDefined()
      })

      it('receives state.instagram for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ instagram: state })
        expect(comp().find('[name="instagram"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="instagram"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('facebook Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="facebook"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.facebook is undefined', () => {
        delete props.errors.facebook
        expect(comp().find('[name="facebook"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.facebook is defined', () => {
        const msg = 'something happened...'
        props.errors.facebook = msg
        expect(comp().find('[name="facebook"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="facebook"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="facebook"]').prop('label')).toBe('Facebook:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="facebook"]').prop('placeholder')).toBe('Facebook profile URL')
      })

      it('receives undefined for [value] prop if state.facebook is undefined', () => {
        comp().setState({ facebook: undefined })
        expect(comp().find('[name="facebook"]').prop('value')).not.toBeDefined()
      })

      it('receives state.facebook for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ facebook: state })
        expect(comp().find('[name="facebook"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="facebook"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('githubusername Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
	  'type',
	  'name',
	  'label',
	  'value',
	  'onChange',
	  'error',
	  'placeholder'
        ]
        expect(Object.keys(comp().find('[name="githubusername"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives undefined for [error] prop if props.errors.githubusername is undefined', () => {
        delete props.errors.githubusername
        expect(comp().find('[name="githubusername"]').prop('error')).not.toBeDefined()
      })

      it('receives error message for [error] prop if props.errors.githubusername is defined', () => {
        const msg = 'something happened...'
        props.errors.githubusername = msg
        expect(comp().find('[name="githubusername"]').prop('error')).toBe(msg)
      })	

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="githubusername"]').prop('type')).toBe('text')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="githubusername"]').prop('label')).toBe('Github:')
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find('[name="githubusername"]').prop('placeholder')).toBe('Github username only')
      })

      it('receives undefined for [value] prop if state.githubusername is undefined', () => {
        comp().setState({ githubusername: undefined })
        expect(comp().find('[name="githubusername"]').prop('value')).not.toBeDefined()
      })

      it('receives state.githubusername for [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ githubusername: state })
        expect(comp().find('[name="githubusername"]').prop('value')).toBe(state)
      })

      it('receives function for [onChange] prop', () => {
        expect(comp().find('[name="githubusername"]').prop('onChange')).toEqual(expect.any(Function))
      })
    })

    describe('submit button', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label'
        ]
        expect(Object.keys(comp().find('[name="submit"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="submit"]').prop('type')).toBe('submit')
      })

      it('receives correct [label] prop', () => {
        expect(['Create', 'Update']).toContain(comp().find('[name="submit"]').prop('label'))
      })
    })

    describe('cancel button', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label',
          'onClick'
        ]
        expect(Object.keys(comp().find('[name="cancel"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find('[name="cancel"]').prop('type')).toBe('button')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find('[name="cancel"]').prop('label')).toBe('Cancel')
      })

      it('receives correct [onClick] prop', () => {
        expect(comp().find('[name="cancel"]').prop('onClick')).toEqual(expect.any(Function))
      })
    })

    describe('form element', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'className',
          'onSubmit',
          'children'
        ]
        expect(Object.keys(comp().find('form').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [onSubmit] prop', () => {
        expect(comp().find('form').prop('onSubmit')).toEqual(expect.any(Function))
      })

      it('receives correct [className] prop', () => {
        expect(comp().find('form').prop('className')).toBe('UpdateProfile-container')
      })
    })

    describe('social media fields drawer (div)', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'style',
          'children'
        ]
        expect(Object.keys(comp().find('form').find('div').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [style] prop', () => {
        const expectedValues = [
          { 'display': 'none' },
          { 'display': 'block' }
        ]
        expect(expectedValues).toContainEqual(comp().find('form').find('div').prop('style'))
      })
    })

    describe('Overlay component', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'onBackdropClick',
          'children'
        ]
        expect(Object.keys(comp().find(Overlay).props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [onBackdropClick] prop', () => {
        expect(comp().find(Overlay).prop('onBackdropClick')).toEqual(expect.any(Function))
      })
    })

    describe('page header h1', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'children'
        ]
        expect(Object.keys(comp().find('form').find('h1').props())).toStrictEqual(expectedKeys)
      })
    })
  })

  describe('props effects', () => {
    it('', () => {})
  })

  describe('functions use', () => {
    it('', () => {})
  })

  describe('state', () => {
    it('', () => {})
  })

  describe('lifecycle', () => {
    it('', () => {})
  })

  describe('interaction', () => {
    it('', () => {})
  })

  it('passes a snapshot test', () => {
    expect(comp()).toMatchSnapshot()
  })
})
