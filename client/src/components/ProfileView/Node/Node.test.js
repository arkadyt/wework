import React from 'react'
import Node from './Node'
import NodeHeader from '../NodeHeader/NodeHeader'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('Node', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      _id: 'someid_1298',
      headers: [ 'header0', 'header1' ],
      from: 'from',
      to: 'to',
      onDelBtnClick: jest.fn(),
      isDeleting: true,
      description: 'desc'
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Node {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('description', () => {
        it('if undefined, comp doesn\'t render description paragraph', () => {
          delete props.description
          expect(comp().find('p b').exists()).toBe(false)
        })

        it('if defined, comp renders description paragraph', () => {
          props.description = 'some text'
          expect(comp().find('p b').exists()).toBe(true)
        })
      })
    })
  })

  describe('functions', () => {
    it('calls onDelBtnClick', () => {
      comp().find(NodeHeader).simulate('delBtnClick')
      expect(props.onDelBtnClick).toHaveBeenCalled()
    })

    it('calls onDelBtnClick with correct args', () => {
      comp().find(NodeHeader).simulate('delBtnClick')
      expect(props.onDelBtnClick).toHaveBeenCalledWith(props._id)
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})

