import React from 'react'
import { shallow } from 'enzyme'
import { _UnconnectedReply as Reply } from './Reply'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    onSubmit: jest.fn(),
    flat: true,
    rows: 5,
    errors: {},
    authedUser: { name: 'Name' },
    fetchUsersStats: jest.fn()
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Reply {...props} />)
  }
  return mountedComponent
}

describe('Reply', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('flat', () => {
        it('if true, flatStyles are applied to form', () => {
          props.flat = true
          const expectedProps = {
            borderRadius: 'unset',
            boxShadow: 'unset',
            marginTop: 'unset'
          }
          expect(comp().find('form').prop('style')).toEqual(expectedProps)
        })

        it('if false, flatStyles are not applied to form', () => {
          props.flat = false
          const expectedProps = {
            borderRadius: 'unset',
            boxShadow: 'unset',
            marginTop: 'unset'
          }
          expect(comp().find('form').prop('style')).not.toEqual(expectedProps)
        })
      })
    })
  })

  describe('functions', () => {
    describe('form', () => {
      describe('onSubmit', () => {
        it('calls preventDefault()', () => {
          const e = { preventDefault: jest.fn() }
          comp().find('form').simulate('submit', e)
          expect(e.preventDefault).toHaveBeenCalled()
        })

        it('calls props.onSubmit', () => {
          const e = { preventDefault: () => {} }
          props.onSubmit = jest.fn()
          comp().find('form').simulate('submit', e)
          expect(props.onSubmit).toHaveBeenCalled()
        })

        it('calls props.onSubmit with correct args', () => {
          const e = { preventDefault: () => {} }
          props.onSubmit = jest.fn()
          comp().find('form').simulate('submit', e)
          expect(props.onSubmit).toHaveBeenCalledWith(comp().state(), comp().instance().handleSubmit)
        })
      })
    })

    describe('textarea Field', () => {
      describe('onChange', () => {
        it('calls setState', () => {
          const e = { target: { value: 'val' } }
          const mock = jest.spyOn(Reply.prototype, 'setState')
          comp().find('field[type="textarea"]').simulate('change', e)
          expect(mock).toHaveBeenCalled()
        })

        it('calls setState w/ correct props', () => {
          const e = { target: { value: 'val' } }
          const mock = jest.spyOn(Reply.prototype, 'setState')
          comp().find('field[type="textarea"]').simulate('change', e)
          expect(mock).toHaveBeenCalledWith({ text: 'val' })
        })
      })
    })

    describe('handleSubmit()', () => {
      it('calls setState', () => {
        const spy = jest.spyOn(Reply.prototype, 'setState')
        comp().instance().handleSubmit()
        expect(spy).toHaveBeenCalled()
      })

      it('calls setState w/ correct args', () => {
        const spy = jest.spyOn(Reply.prototype, 'setState')
        comp().instance().handleSubmit()
        expect(spy).toHaveBeenCalledWith({ text: '' })
      })

      it('calls fetchUsersStats', () => {
        comp().instance().handleSubmit()
        expect(props.fetchUsersStats).toHaveBeenCalled()
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})

