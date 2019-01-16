import React from 'react'
import { shallow } from 'enzyme'
import Modal from './Modal'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    question: 'Whatsup?',
    onConfirm: jest.fn(),
    onDismiss: jest.fn(),
    actionColor: 'green'
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Modal {...props} />)
  }
  return mountedComponent
}

describe('Modal', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('actionColor', () => {
        it('if specified, action button takes actionColor for background', () => {
          props.actionColor = 'red'
          const expectedProps = {
            backgroundColor: 'red',
            borderColor: 'red',
            color: 'white',
            width: '100%'
          }
          expect(comp().find('field[label="Yes"]').prop('style')).toEqual(expectedProps)
        })

        it('if not specified, action button does not receive any additional styles', () => {
          delete props.actionColor
          expect(comp().find('field[label="Yes"]').prop('style')).toEqual(null)
        })
      })
    })

    describe('passing', () => {
      describe('Overlay', () => {
        it('receives correct function into onBackdropClick', () => {
          expect(comp().find('Overlay').prop('onBackdropClick')).toBe(props.onDismiss)
        })
      })

      describe('No button', () => {
        it('receives correct function into onClick', () => {
          expect(comp().find('field[label="No"]').prop('onClick')).toBe(props.onDismiss)
        })
      })

      describe('Yes button', () => {
        it('receives correct function into onClick', () => {
          expect(comp().find('field[label="Yes"]').prop('onClick')).toBe(props.onConfirm)
        })
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})


