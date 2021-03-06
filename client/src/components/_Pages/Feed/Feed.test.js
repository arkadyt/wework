import React from 'react'
import { shallow } from 'enzyme'
import { Feed, mapStateToProps } from './Feed'
import cloneDeep from 'lodash.clonedeep'
import { mockPost } from '../../../mocks/posts'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    errors: {},
    match: { url: '' },
    fetchPosts: jest.fn(),
    posts: [mockPost]
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

    const listeners = {}
    global.document.addEventListener = jest.fn((name, fn) => listeners[name] = fn)
    global.document.removeEventListener = jest.fn((name, fn) => delete listeners[name])
  })

  describe('props', () => {
    describe('passing', () => {
      describe('Reply component', () => {
        it('receives correct onSubmit prop', () => {
          props.addPost = jest.fn()
          comp().find('Connect(Reply)').simulate('submit', 1, 2)
          expect(props.addPost).toHaveBeenCalledWith(1, 2)
        })
      })
    })
  })

  describe('functions', () => {
    describe('componentWillUnmount', () => {
      it('removes scroll event listener', () => {
        comp().unmount()
        // TODO better function matching, expect.extend(...)
        expect(global.document.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      })
    })

    describe('componentDidMount', () => {
      it('calls fetchPosts with...', () => {
        comp()
        expect(props.fetchPosts).toHaveBeenCalledWith(false)
      })

      it('calls fetchPosts once', () => {
        comp()
        expect(props.fetchPosts).toHaveBeenCalledTimes(1)
      })

      it('calls scrollTo with...', () => {
        comp()
        expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
      })

      it('calls scrollTo once', () => {
        comp()
        expect(global.scrollTo).toHaveBeenCalledTimes(1)
      })

      it('calls addEventListener with...', () => {
        comp()
        // TODO better function matching, expect.extend(...)
        expect(global.document.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      })

      it('calls addEventListener once', () => {
        comp()
        expect(global.document.addEventListener).toHaveBeenCalledTimes(1)
      })
    })

    describe('componentDidUpdate', () => {
      describe('if state.loadMore is true', () => {
        it('updates state as expected', () => {
          comp().setState({ loadMore: true })
          expect(comp().state()).toEqual({ loadMore: false, isLoading: true })
        })

        it('calls fetchPosts once', () => {
          comp()
          props.fetchPosts.mockClear()
          comp().setState({ loadMore: true })
          expect(props.fetchPosts).toHaveBeenCalledTimes(1)
        })

        it('calls fetchPosts with...', () => {
          comp().setState({ loadMore: true })
          const { posts, fetchPosts } = props

          // TODO test which functions exactly
          expect(fetchPosts).toHaveBeenCalledWith(
            posts[posts.length - 1].date, 
            expect.any(Function), 
            expect.any(Function)
          )
        })
      })

      describe('if state.loadMore is false', () => {
        // TODO find a better way to assert that nothing happens

        it('does not update state', () => {
          const prevState = { ...comp().state() }
          comp().setState({ loadMore: false })
          expect(comp().state()).toStrictEqual(prevState)
        })

        it('does not call fetchPosts', () => {
          comp()
          props.fetchPosts.mockClear()
          comp().setState({ loadMore: false })
          expect(props.fetchPosts).not.toHaveBeenCalled()
        })
      })
    })

    describe('afterFetch', () => {
      it('calls setState', () => {
        const fn = jest.spyOn(Feed.prototype, 'setState')
        comp()
        fn.mockClear()
        comp().instance().afterFetch()
        expect(fn).toHaveBeenCalledWith({ isLoading: false })
      })
    })

    describe('onScroll', () => {
      it('if errors.endOfFeed is defined, does nothing', () => {
        props.errors.endOfFeed = 'some error, sir!'
        const setState = jest.spyOn(Feed.prototype, 'setState')

        comp()
        setState.mockClear()

        comp().instance().onScroll()
        expect(setState).not.toHaveBeenCalled()
      })

      it('if state.isLoading is true, does nothing', () => {
        delete props.errors.endOfFeed
        const setState = jest.spyOn(Feed.prototype, 'setState')

        comp().setState({ isLoading: true })
        setState.mockClear()

        comp().instance().onScroll()
        expect(setState).not.toHaveBeenCalled()
      })

      it('if not page bottom, does nothing', () => {
        delete props.errors.endOfFeed
        const setState = jest.spyOn(Feed.prototype, 'setState')
        const isBottom = jest.spyOn(Feed.prototype, 'isBottom')
        isBottom.mockImplementationOnce(() => false)

        comp().setState({ isLoading: false })
        setState.mockClear()

        comp().instance().onScroll()
        expect(setState).not.toHaveBeenCalled()
      })

      it('if all above is not true, updates the state', () => {
        delete props.errors.endOfFeed
        const setState = jest.spyOn(Feed.prototype, 'setState')
        const isBottom = jest.spyOn(Feed.prototype, 'isBottom')
        isBottom.mockImplementationOnce(() => true)

        comp().setState({ isLoading: false })
        setState.mockClear()

        comp().instance().onScroll()
        expect(setState).toHaveBeenCalled()
      })
    })

    describe('isBottom', () => {
      it('calls getBoundingClientRect', () => {
        const el = {
          getBoundingClientRect: jest.fn(() => ({ bottom: 0 }))
        }
        comp().instance().isBottom(el)
        expect(el.getBoundingClientRect).toHaveBeenCalled()
      })

      it('returns true page bottom is reached', () => {
        global.window.innerHeight = 100
        const el = {
          getBoundingClientRect: jest.fn(() => ({ bottom: 100 }))
        }
        expect(comp().instance().isBottom(el)).toBe(true)
      })

      it('returns false if page bottom is not reached', () => {
        global.window.innerHeight = 20
        const el = {
          getBoundingClientRect: jest.fn(() => ({ bottom: 100 }))
        }
        expect(comp().instance().isBottom(el)).toBe(false)
      })
    })

    describe('triggerFeedLoad', () => {
      it('calls setState with correct parms once invoked', () => {
        const spy = jest.spyOn(Feed.prototype, 'setState')
        comp().instance().triggerFeedLoad()
        expect(spy).toHaveBeenCalledWith({ loadMore: true })
      })
    })
  })

  describe('mapStateToProps', () => {
    it('returs expected object', () => {
      const state = {
        posts: [],
        err: {}
      }

      const expectedObj = {
        posts: state.posts,
        errors: state.err
      }

      expect(mapStateToProps(state)).toStrictEqual(expectedObj)
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
