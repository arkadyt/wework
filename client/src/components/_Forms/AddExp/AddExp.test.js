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
import { _UnconnectedAddExp as AddExp } from './AddExp'
import Field from '../../Field/Field'
import { shallow } from 'enzyme'
import Overlay from '../../Overlay/Overlay'
import cloneDeep from 'lodash.clonedeep'

describe('AddExp', () => {
  let props
  let mountedAddExp

  const getMockProps = () => {
    const actions = {
      addExperience: jest.fn()
    }

    const history = {
      goBack: jest.fn()
    }

    return cloneDeep({
      ...actions,
      history,
      errors: {}
    })
  }

  const comp = () => {
    if (!mountedAddExp) {
      mountedAddExp = shallow(<AddExp {...props} />)
    }
    return mountedAddExp
  }

  beforeEach(() => {
    props = getMockProps()
    mountedAddExp = undefined
  })

  describe('props passing', () => {
    describe('Overlay', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'onBackdropClick',
          'children'
        ]
        expect(Object.keys(comp().find(Overlay).props())).toStrictEqual(expectedKeys)
      })
      
      it('receives correct [onBackdropClick] prop', () => {
        expect(comp().find(Overlay).prop('onBackdropClick')).toEqual(comp().instance().handleDismiss)
      })
    })

    describe('form', () => {
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
    })

    describe('title Field', () => {
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
        expect(Object.keys(comp().find(Field).find('[name="title"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="title"]').prop('type')).toBe('text')
      })

      it('receives state.title into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ title: state })
        expect(comp().find(Field).find('[name="title"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.title is not defined', () => {
        comp().setState({ title: undefined })
        expect(comp().find(Field).find('[name="title"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="title"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="title"]').prop('label')).toBe('Title:')
      })

      it('receives props.errors.title into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.title = msg
        expect(comp().find(Field).find('[name="title"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.title into [error] prop if former is defined', () => {
        delete props.errors.title
        expect(comp().find(Field).find('[name="title"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="title"]').prop('placeholder')).toBe('Software Developer')
      })
    })

    describe('company Field', () => {
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
        expect(Object.keys(comp().find(Field).find('[name="company"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="company"]').prop('type')).toBe('text')
      })

      it('receives state.company into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ company: state })
        expect(comp().find(Field).find('[name="company"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.company is not defined', () => {
        comp().setState({ company: undefined })
        expect(comp().find(Field).find('[name="company"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="company"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="company"]').prop('label')).toBe('Company:')
      })

      it('receives props.errors.company into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.company = msg
        expect(comp().find(Field).find('[name="company"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.company into [error] prop if former is defined', () => {
        delete props.errors.company
        expect(comp().find(Field).find('[name="company"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="company"]').prop('placeholder')).toBe('Company name')
      })
    })

    describe('location Field', () => {
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
        expect(Object.keys(comp().find(Field).find('[name="location"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="location"]').prop('type')).toBe('text')
      })

      it('receives state.location into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ location: state })
        expect(comp().find(Field).find('[name="location"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.location is not defined', () => {
        comp().setState({ location: undefined })
        expect(comp().find(Field).find('[name="location"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="location"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="location"]').prop('label')).toBe('Location:')
      })

      it('receives props.errors.location into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.location = msg
        expect(comp().find(Field).find('[name="location"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.location into [error] prop if former is defined', () => {
        delete props.errors.location
        expect(comp().find(Field).find('[name="location"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="location"]').prop('placeholder')).toBe('San Francisco, CA')
      })
    })

    describe('[from] Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'label',
          'error',
        ]
        expect(Object.keys(comp().find(Field).find('[name="from"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="from"]').prop('type')).toBe('date')
      })

      it('receives state.from into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ from: state })
        expect(comp().find(Field).find('[name="from"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.from is not defined', () => {
        comp().setState({ from: undefined })
        expect(comp().find(Field).find('[name="from"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="from"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="from"]').prop('label')).toBe('From:')
      })

      it('receives props.errors.from into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.from = msg
        expect(comp().find(Field).find('[name="from"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.from into [error] prop if former is defined', () => {
        delete props.errors.from
        expect(comp().find(Field).find('[name="from"]').prop('error')).not.toBeDefined()
      })
    })

    describe('[to] Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'disabled',
          'label',
          'error',
        ]
        expect(Object.keys(comp().find(Field).find('[name="to"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="to"]').prop('type')).toBe('date')
      })

      it('receives state.to into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ to: state })
        expect(comp().find(Field).find('[name="to"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.to is not defined', () => {
        comp().setState({ to: undefined })
        expect(comp().find(Field).find('[name="to"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="to"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives state.current into [disabled] prop if former is defined', () => {
        const state = false
        comp().setState({ current: state })
        expect(comp().find(Field).find('[name="to"]').prop('disabled')).toBe(state)
      })

      it('receives undefined into [disabled] prop if state.current is not defined', () => {
        comp().setState({ current: undefined })
        expect(comp().find(Field).find('[name="to"]').prop('disabled')).not.toBeDefined()
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="to"]').prop('label')).toBe('To:')
      })

      it('receives props.errors.to into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.to = msg
        expect(comp().find(Field).find('[name="to"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.to into [error] prop if former is defined', () => {
        delete props.errors.to
        expect(comp().find(Field).find('[name="to"]').prop('error')).not.toBeDefined()
      })
    })

    describe('[current] Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'label',
        ]
        expect(Object.keys(comp().find(Field).find('[name="current"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="current"]').prop('type')).toBe('checkbox')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="current"]').prop('label')).toBe('Current?')
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="current"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives state.current into [value] prop if former is defined', () => {
        const state = true
        comp().setState({ current: state })
        expect(comp().find(Field).find('[name="current"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.current is not defined', () => {
        comp().setState({ current: undefined })
        expect(comp().find(Field).find('[name="current"]').prop('value')).not.toBeDefined()
      })
    })

    describe('description Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'label',
          'rows',
          'error',
        ]
        expect(Object.keys(comp().find(Field).find('[name="description"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="description"]').prop('type')).toBe('textarea')
      })

      it('receives state.description into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ description: state })
        expect(comp().find(Field).find('[name="description"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.description is not defined', () => {
        comp().setState({ description: undefined })
        expect(comp().find(Field).find('[name="description"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="description"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="description"]').prop('label')).toBe('Description')
      })

      it('receives props.errors.description into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.description = msg
        expect(comp().find(Field).find('[name="description"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.description into [error] prop if former is defined', () => {
        delete props.errors.description
        expect(comp().find(Field).find('[name="description"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [rows] prop', () => {
        expect(comp().find(Field).find('[name="description"]').prop('rows')).toBe('2')
      })
    })

    describe('submit button', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'label',
        ]
        expect(Object.keys(comp().find(Field).find('[name="submit"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="submit"]').prop('type')).toBe('submit')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="submit"]').prop('label')).toBe('Add')
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
        expect(Object.keys(comp().find(Field).find('[name="cancel"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="cancel"]').prop('type')).toBe('button')
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="cancel"]').prop('label')).toBe('Cancel')
      })

      it('receives correct [onClick] prop', () => {
        expect(comp().find(Field).find('[name="cancel"]').prop('onClick')).toEqual(expect.any(Function))
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

      it('invokes addExperience()', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.addExperience).toHaveBeenCalled()
      })

      it('invokes addExperience() with correct args', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.addExperience).toHaveBeenCalledWith(comp().state(), comp().instance().handleDismiss)
      })
    })

    describe('Fields', () => {
      let mockedEvent
      let value = 'some value'

      beforeEach(() => {
        mockedEvent = { 
          target: { value }, 
          preventDefault: jest.fn()
        }
      })
      
      describe('title', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="title"]').simulate('change', mockedEvent)
          expect(comp().state('title')).toBe(value)
        })
      })

      describe('company', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="company"]').simulate('change', mockedEvent)
          expect(comp().state('company')).toBe(value)
        })
      })

      describe('location', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="location"]').simulate('change', mockedEvent)
          expect(comp().state('location')).toBe(value)
        })
      })

      describe('to', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="to"]').simulate('change', value)
          expect(comp().state('to')).toBe(value)
        })
      })

      describe('from', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="from"]').simulate('change', value)
          expect(comp().state('from')).toBe(value)
        })
      })

      describe('description', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="description"]').simulate('change', mockedEvent)
          expect(comp().state('description')).toBe(value)
        })
      })

      describe('cancel', () => {
        describe('[onClick]', () => {
          it('invokes preventDefault()', () => {
            comp().find(Field).find('[name="cancel"]').simulate('click', mockedEvent)
            expect(mockedEvent.preventDefault).toHaveBeenCalled()
          })

          it('invokes handleDismiss()', () => {
            const mockFn = jest.fn()
            comp().instance().handleDismiss = mockFn
            comp().find(Field).find('[name="cancel"]').simulate('click', mockedEvent)
            expect(mockFn).toHaveBeenCalled()
          })
        })
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
