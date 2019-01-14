import React from 'react'
import CommentsRoute from './CommentsRoute'
import { StaticRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

/**
 *  Use following for complete mounts:
 *
 *    import { Provider } from 'react-redux'
 *    import configureMockStore from 'redux-mock-store'
 *
 *    const mockStore = configureMockStore()
 *    const store =  mockStore({
 *      user: { id: '123' },
 *      err: { formErrors: {} }
 *    })
 *
 *    mountedComponent = mount(
 *      <Provider store={store}>
 *        <Router location={props.location} context={{}}>
 *          <CommentsRoute {...props} />
 *        </Router>
 *      </Provider>
 *    )
 */

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    posts: [require('../../../../mocks/posts').mockPost],
    baseUrl: ''
  })
}

const comp = () => {
  if (!mountedComponent) {
    const mockStore = configureMockStore()
    const store =  mockStore({
      user: { id: '123' },
      err: { formErrors: {} }
    })

    // couldn't figure out how else can I check 
    // what Route with render prop would output
    mountedComponent = mount(
      <Provider store={store}>
        <Router location={props.location} context={{}}>
          <CommentsRoute {...props} />
        </Router>
      </Provider>
    )
  } 
  return mountedComponent
}

describe('CommentsRoute', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('matches snapshot', () => {
    props.location = `${props.baseUrl}/view-comments/${props.posts[0]._id}`
    expect(comp()).toMatchSnapshot()
  })
})
