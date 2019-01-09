import React from 'react'
import { _UnconnectedAddEdu as AddEdu, mapStateToProps } from './AddEdu'
import Field from '../../Field/Field'
import { shallow } from 'enzyme'
import Overlay from '../../Overlay/Overlay'
import cloneDeep from 'lodash.clonedeep'

describe('AddEdu', () => {
  let props
  let mountedAddEdu

  const getMockProps = () => {
    const actions = {
      addEducation: jest.fn()
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
    if (!mountedAddEdu) {
      mountedAddEdu = shallow(<AddEdu {...props} />)
    }
    return mountedAddEdu
  }

  beforeEach(() => {
    props = getMockProps()
    mountedAddEdu = undefined
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

    describe('school Field', () => {
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
        expect(Object.keys(comp().find(Field).find('[name="school"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="school"]').prop('type')).toBe('text')
      })

      it('receives state.school into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ school: state })
        expect(comp().find(Field).find('[name="school"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.school is not defined', () => {
        comp().setState({ school: undefined })
        expect(comp().find(Field).find('[name="school"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="school"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="school"]').prop('label')).toBe('School:')
      })

      it('receives props.errors.school into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.school = msg
        expect(comp().find(Field).find('[name="school"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.school into [error] prop if former is defined', () => {
        delete props.errors.school
        expect(comp().find(Field).find('[name="school"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="school"]').prop('placeholder')).toBe('UCLA')
      })
    })

    describe('fieldOfStudy Field', () => {
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
        expect(Object.keys(comp().find(Field).find('[name="fieldOfStudy"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('type')).toBe('text')
      })

      it('receives state.fieldOfStudy into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ fieldOfStudy: state })
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.fieldOfStudy is not defined', () => {
        comp().setState({ fieldOfStudy: undefined })
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('label')).toBe('Field of Study:')
      })

      it('receives props.errors.fieldOfStudy into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.fieldOfStudy = msg
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.fieldOfStudy into [error] prop if former is defined', () => {
        delete props.errors.fieldOfStudy
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('error')).not.toBeDefined()
      })

      it('receives correct [placeholder] prop', () => {
        expect(comp().find(Field).find('[name="fieldOfStudy"]').prop('placeholder')).toBe('Bioeconomics')
      })
    })

    describe('degree Field', () => {
      it('receives correct set of props', () => {
        const expectedKeys = [
          'type',
          'name',
          'value',
          'onChange',
          'label',
          'list',
          'error',
        ]
        expect(Object.keys(comp().find(Field).find('[name="degree"]').props())).toStrictEqual(expectedKeys)
      })

      it('receives correct [type] prop', () => {
        expect(comp().find(Field).find('[name="degree"]').prop('type')).toBe('list')
      })

      it('receives state.degree into [value] prop if former is defined', () => {
        const state = 'some value'
        comp().setState({ degree: state })
        expect(comp().find(Field).find('[name="degree"]').prop('value')).toBe(state)
      })

      it('receives undefined into [value] prop if state.degree is not defined', () => {
        comp().setState({ degree: undefined })
        expect(comp().find(Field).find('[name="degree"]').prop('value')).not.toBeDefined()
      })

      it('receives correct [onChange] prop', () => {
        expect(comp().find(Field).find('[name="degree"]').prop('onChange')).toEqual(expect.any(Function))
      })

      it('receives correct [label] prop', () => {
        expect(comp().find(Field).find('[name="degree"]').prop('label')).toBe('Degree:')
      })

      it('receives correct [list] prop', () => {
        expect(comp().find(Field).find('[name="degree"]').prop('list')).toEqual(expect.any(Array))
      })

      it('receives props.errors.degree into [error] prop if former is defined', () => {
        const msg = 'some err occured'
        props.errors.degree = msg
        expect(comp().find(Field).find('[name="degree"]').prop('error')).toBe(msg)
      })

      it('receives props.errors.degree into [error] prop if former is defined', () => {
        delete props.errors.degree
        expect(comp().find(Field).find('[name="degree"]').prop('error')).not.toBeDefined()
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

  describe('functions', () => {
    describe('handleDismiss()', () => {
      it('calls history.goBack() when invoked', () => {
        comp().instance().handleDismiss()
        expect(props.history.goBack).toHaveBeenCalled()
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
        expect(props.addEducation).toHaveBeenCalled()
      })

      it('invokes addExperience() with correct args', () => {
        comp().find('form').simulate('submit', mockedEvent)
        expect(props.addEducation).toHaveBeenCalledWith(comp().state(), comp().instance().handleDismiss)
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
      
      describe('school', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="school"]').simulate('change', mockedEvent)
          expect(comp().state('school')).toBe(value)
        })
      })

      describe('fieldOfStudy', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="fieldOfStudy"]').simulate('change', mockedEvent)
          expect(comp().state('fieldOfStudy')).toBe(value)
        })
      })

      describe('degree', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="degree"]').simulate('change', value)
          expect(comp().state('degree')).toBe(value)
        })
      })

      describe('from', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="from"]').simulate('change', value)
          expect(comp().state('from')).toBe(value)
        })
      })

      describe('to', () => {
        it('[onChange] function works as expected', () => {
          comp().find(Field).find('[name="to"]').simulate('change', value)
          expect(comp().state('to')).toBe(value)
        })
      })

      describe('current', () => {
        it('[onChange] function works as expected', () => {
          const value = false
          mockedEvent.target.checked = value
          comp().find(Field).find('[name="current"]').simulate('change', mockedEvent)
          expect(comp().state('current')).toBe(value)
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

  describe('mapStateToProps', () => {
    it('returns expected object', () => {
      const state = {
        err: { 
          formErrors: {
            email: 'Email is wrong' 
          }
        }
      }

      const expectedObject = {
        errors: state.err.formErrors
      }

      expect(mapStateToProps(state)).toEqual(expectedObject)
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
