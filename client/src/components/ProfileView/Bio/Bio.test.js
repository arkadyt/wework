import React from 'react'
import Bio from './Bio'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('Bio', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      bio: 'Some bio'
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Bio {...props} />)
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
