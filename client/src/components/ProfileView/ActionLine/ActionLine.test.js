import React from 'react'
import ActionLine from './ActionLine'
import Field from '../../Field/Field'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('ActionLine', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      nodes: [
        { node: 1 },
        { node: 2 }
      ]
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<ActionLine {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('nodes', () => {
        it('if has length of 0, comp does not render additional buttons', () => {
          props.nodes = []
          expect(comp().find(Field)).toHaveLength(1)
        })

        it('if has positive length higher than 0, comp renders additional buttons', () => {
          props.nodes = [
            { node: 1 },
            { node: 2 }
          ]
          expect(comp().find(Field).length).toBeGreaterThan(1)
        })
      })

      describe('isDeleting', () => {
        beforeEach(() => {
          props.nodes = [
            { node: 1 },
            { node: 2 }
          ]
        })

        it('if true, comp renders Cancel button', () => {
          props.isDeleting = true
          expect(comp().find('field[label="Cancel"]').exists()).toBe(true)
        })

        it('if true, comp does not render Delete button', () => {
          props.isDeleting = true
          expect(comp().find('field[label="Delete an entry"]').exists()).toBe(false)
        })

        it('if false, comp renders Delete button', () => {
          props.isDeleting = false
          expect(comp().find('field[label="Delete an entry"]').exists()).toBe(true)
        })

        it('if false, comp does not render Cancel button', () => {
          props.isDeleting = false
          expect(comp().find('field[label="Cancel"]').exists()).toBe(false)
        })
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
