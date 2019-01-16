import React from 'react'
import { shallow } from 'enzyme'
import StatsChart from './StatsChart'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    authedUser: {
      name: 'Mike',
      avatar: undefined
    },
    usersProfile: {
      title: 'Construction Worker',
      company: 'Construction Workers United',
      status: 'Not Open For Employment'
    },
    stats: {
      followers: 1038,
      following: 1270,
      postCount: 20,
      totalLikes: 503,
      totalComments: 121
    }
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<StatsChart {...props} />)
  }
  return mountedComponent
}

describe('StatsChart', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})


