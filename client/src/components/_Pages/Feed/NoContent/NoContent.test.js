import React from 'react'
import NoContent from './NoContent'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('NoContent', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({})
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<NoContent {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})

