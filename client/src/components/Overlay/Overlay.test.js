import React from 'react'
import { shallow } from 'enzyme'
import Overlay from './Overlay'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    children: 'children',
    centered: true,
    onBackdropClick: jest.fn()
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Overlay {...props} />)
  }
  return mountedComponent
}

describe('Overlay', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('centered', () => {
        it('if true, content div receives additional class', () => {
          props.centered = true
          expect(comp().find('.Overlay-content').hasClass('Overlay-content-centered')).toBe(true)
        })

        it('if false, content div does not receive any additional classes', () => {
          props.centered = false
          expect(comp().find('.Overlay-content').prop('className').trim()).toBe('Overlay-content')
        })
      })
    })

    describe('passing', () => {
      it('outer div receives correct function into onClick', () => {
        expect(comp().find('.Overlay-container').prop('onClick')).toBe(comp().instance().handleSubmit)
      })
    })
  })

  describe('functions', () => {
    describe('handleSubmit', () => {
      it('calls onBackdropClick if e.target.id is a backdrop div', () => {
        props.onBackdropClick = jest.fn()
        const e = { target: { id: 'Overlay-container-backdrop' } }
        comp().instance().handleSubmit(e)
        expect(props.onBackdropClick).toHaveBeenCalled()
      })

      it('does NOT call onBackdropClick if e.target.id is NOT a backdrop div', () => {
        props.onBackdropClick = jest.fn()
        const e = { target: { id: 'something-else' } }
        comp().instance().handleSubmit(e)
        expect(props.onBackdropClick).not.toHaveBeenCalled()
      })
    })

    describe('componentWillMount', () => {
      it('sets specific document.body.style', () => {
        comp()
        expect(global.document.body.style._values.overflow).toEqual('hidden')
      })
    })

    describe('componentWillUnmount', () => {
      it('removes added styles', () => {
        comp().unmount()
        expect(Object.keys(global.document.body.style._values)).toHaveLength(0)
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})


