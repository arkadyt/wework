import React from 'react'
import Location from './Location'
import { shallow } from 'enzyme'
import { mockProfile } from '../../../../mocks/profile'
import cloneDeep from 'lodash.clonedeep'

describe('Location', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      profile: mockProfile
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Location {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('matches snapshot when location is defined', () => {
    props.profile.location = 'Some location'
    expect(comp()).toMatchSnapshot()
  })

  it('matches snapshot when location is undefined', () => {
    delete props.profile.location
    expect(comp()).toMatchSnapshot()
  })
})
