import React from 'react'
import FeedContent, { isEmptyFn, isLoadingFn, isEndOfFeedFn } from './FeedContent'
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

  describe('functions', () => {
    describe('isEndOfFeedFn', () => {
      it('returns true if endOfFeed is defined and isLoading is false', () => {
        const customProps = {
          endOfFeed: 'some error',
          isLoading: false
        }
        expect(isEndOfFeedFn(customProps)).toBe(true)
      })

      it('returns false if endOfFeed is not defined but isLoading is false', () => {
        const customProps = {
          isLoading: false
        }
        expect(isEndOfFeedFn(customProps)).toBe(false)
      })

      it('returns false if endOfFeed is defined but isLoading is true', () => {
        const customProps = {
          endOfFeed: 'some error',
          isLoading: true
        }
        expect(isEndOfFeedFn(customProps)).toBe(false)
      })

      it('returns false if endOfFeed is defined and isLoading is true', () => {
        const customProps = {
          endOfFeed: 'some error',
          isLoading: true
        }
        expect(isEndOfFeedFn(customProps)).toBe(false)
      })
    })

    describe('isLoadingFn', () => {
      it('returns true if isLoading is true', () => {
        const customProps = {
          isLoading: true
        }
        expect(isLoadingFn(customProps)).toBe(true)
      })

      it('returns true if isLoading is false but endOfFeed is not defined and no posts were loaded', () => {
        const customProps = {
          isLoading: false,
          posts: []
        }
        expect(isLoadingFn(customProps)).toBe(true)
      })

      it('returns true if isLoading is true and endOfFeed is not defined and no posts were loaded', () => {
        const customProps = {
          isLoading: true,
          posts: []
        }
        expect(isLoadingFn(customProps)).toBe(true)
      })

      it('returns false if isLoading is false and endOfFeed is defined but no posts were loaded', () => {
        const customProps = {
          isLoading: false,
          posts: [],
          endOfFeed: 'error!'
        }
        expect(isLoadingFn(customProps)).toBe(false)
      })

      it('returns false if isLoading is false and endOfFeed is not defined but some posts were loaded', () => {
        const customProps = {
          isLoading: false,
          posts: [ {}, {}, {} ],
        }
        expect(isLoadingFn(customProps)).toBe(false)
      })

      it('returns false if isLoading is false, endOfFeed is defined and some posts were loaded', () => {
        const customProps = {
          isLoading: false,
          endOfFeed: 'error!',
          posts: [ {}, {}, {} ],
        }
        expect(isLoadingFn(customProps)).toBe(false)
      })
    })

    describe('isEmptyFn', () => {
      it('returns true if no posts were loaded and endOfFeed is defined', () => {
        const customProps = {
          endOfFeed: 'defined!',
          posts: []
        }
        expect(isEmptyFn(customProps)).toBe(true)
      })

      it('returns false if some posts were loaded and endOfFeed is defined', () => {
        const customProps = {
          endOfFeed: 'defined!',
          posts: [ {} ]
        }
        expect(isEmptyFn(customProps)).toBe(false)
      })

      it('returns false if no posts were loaded but endOfFeed is undefined', () => {
        const customProps = {
          posts: []
        }
        expect(isEmptyFn(customProps)).toBe(false)
      })

      it('returns false if some posts were loaded and endOfFeed is undefined', () => {
        const customProps = {
          posts: [ {} ],
          endOfFeed: 'some err'
        }
        expect(isEmptyFn(customProps)).toBe(false)
      })
    })
  })

  it('must generate expected amount of Posts', () => {
    expect(comp().find('withRouter(Connect(Post))')).toHaveLength(props.posts.length)
  })

  describe('snapshots', () => {
    it('Route render-out matches snapshot', () => {
      const context = createRouterContext(`${props.baseUrl}/view-comments/${props.posts[0]._id}`)
      expect(comp().find('Route').dive({ context })).toMatchSnapshot()
    })

    it('matches snapshot', () => {
      expect(comp()).toMatchSnapshot()
    })
  })
})
