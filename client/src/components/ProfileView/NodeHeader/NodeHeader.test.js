/*
 * Props
 * State
 * Interaction
 * Functions
 */

import React from 'react'
import { shallow } from 'enzyme'
import NodeHeader from './NodeHeader'
import Field from '../../Field/Field'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    title: "Some title",
    from: "Fri Dec 28 2018 18:30:47 GMT-0800 (Pacific Standard Time)",
    current: true,
    showDelButton: true,
    onDelBtnClick: jest.fn()
  })
}

// dateFormatOptions 
const dfo = { year: 'numeric', month: 'long', day: 'numeric' }

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<NodeHeader {...props} />)
  }
  return mountedComponent
}

describe('NodeHeader', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props effects', () => {
    describe('[current]', () => {
      it('if true, comp renders from_date -> "Current" on date-line', () => {
        props.current = true
        props.showDelButton = false // jic
        expect(comp().find('h3+span').text()).toContain('Current')
      })

      it('if false, comp renders from_date -> to_date on date-line', () => {
        props.current = false
        props.showDelButton = false // jic
        expect(comp().find('h3+span').text()).not.toContain('Current')
      })
    })

    describe('[showDelButton]', () => {
      it('if true, comp renders delete button instead of date-line', () => {
        props.showDelButton = true
        expect(comp().find(Field).exists()).toBe(true)
      })

      it('if false, comp renders date-line', () => {
        props.showDelButton = false
        expect(comp().find(Field).exists()).toBe(false)
      })
    })
  })

  describe('props passing', () => {
    it('h3 gets props.title', () => {
      const title = 'custom title'
      props.title = title
      expect(comp().find('h3').text()).toBe(title)
    })

    describe('delete button', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "type",
          "label",
          "containerStyle",
          "onClick"
        ]
        props.showDelButton = true
        expect(Object.keys(comp().find(Field).props())).toStrictEqual(expectedProps)
      })

      it('receives props.onDelBtnClick for onClick prop', () => {
        const fn = jest.fn()
        props.onDelBtnClick = fn
        props.showDelButton = true
        expect(comp().find(Field).prop('onClick')).toBe(fn)
      })
    })

    describe('date-line', () => {
      it('receives props.from', () => {
        const date = "Fri Dec 28 2018 18:30:47 GMT-0800 (Pacific Standard Time)"
        props.from = date
        props.showDelButton = false
        expect(comp().find('h3+span').text()).toContain(new Date(date).toLocaleDateString('en-US', dfo))
      })

      it('receives props.to if current is false', () => {
        const date = "Thu Jan 28 2030 19:00:00 GMT-0800 (Pacific Standard Time)"
        props.current = false
        props.to = date
        props.showDelButton = false
        expect(comp().find('h3+span').text()).toContain(new Date(date).toLocaleDateString('en-US', dfo))
      })
    })
  })

  describe('passes a snapshot test', () => {
    it('showing delete button', () => {
      props.showDelButton = true
      expect(comp()).toMatchSnapshot()
    })

    it('showing date-line', () => {
      props.showDelButton = false
      props.current = false
      expect(comp()).toMatchSnapshot()
    })

    it('rendering "Current" instead of to_date', () => {
      props.showDelButton = false
      props.current = true
      expect(comp()).toMatchSnapshot()
    })
  })
})
