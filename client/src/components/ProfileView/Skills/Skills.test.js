import React from 'react'
import Skills from './Skills'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('Skills', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      skills: [
        "Skill1",
        "Skill2"
      ]
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Skills {...props} />)
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
