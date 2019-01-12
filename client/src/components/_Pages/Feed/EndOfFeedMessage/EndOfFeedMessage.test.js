import React from 'react'
import EndOfFeedMessage from './EndOfFeedMessage'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('EndOfFeedMessage', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      endOfFeed: 'You have reached the end of your feed'
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<EndOfFeedMessage {...props} />)
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
