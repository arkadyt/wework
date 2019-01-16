import React from 'react'
import FeedContent from './FeedContent'
import { BrowserRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

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

const createRouterContext = pathname => {
  return cloneDeep({
    router: {
      history: new BrowserRouter().history,
      route: {
        location: {
          pathname
        },
        match: {},
      }
    }
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

  it('Route render-out matches snapshot', () => {
    console.log(comp().debug())
    const context = createRouterContext(`${props.baseUrl}/view-comments/${props.posts[0]._id}`)
    expect(comp().find('Route').dive({ context })).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
