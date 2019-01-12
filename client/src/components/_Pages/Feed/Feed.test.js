import React from 'react'
import { shallow } from 'enzyme'
import { Feed } from './Feed'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    errors: {},
    match: { url: '' },
    fetchPosts: jest.fn()
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Feed {...props} />)
  }
  return mountedComponent
}

describe('Feed', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()

    global.scrollTo = jest.fn()
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})


