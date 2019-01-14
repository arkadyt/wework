import React from 'react'
import FeedContent from './FeedContent'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    posts: [require('../../../../mocks/posts').mockPost],
    baseUrl: ''
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(
      <FeedContent {...props} />
    )
  } 
  return mountedComponent
}

describe('FeedContent', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('must generate expected amount of Posts', () => {
    expect(comp().find('withRouter(Connect(Post))')).toHaveLength(props.posts.length)
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
