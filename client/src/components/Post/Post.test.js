/**
 * Final component's contract:
 *     + onMount
 *            > menu button onClick listener is registered
 *     + onUnmount
 *            > menu button onClick listener is dropped
 *     + Props (objs, primitives, fns()) are picked apart, used to calc things, are displayed and affect things
 *            ! Props are component's Public API. Always test the api, ensure that expected output is always produced.
 *            ! make sure to verify that funcs are all called w/ their respective parameters
 *                > verified in place (interaction section)
 *            ! also mksure to always test the opposite expectation, schas when prop isn't passed, smth shld be null
 *            - avatar
 *                > if avatar is given, it's path should be found at img"Post__avatar"src
 *                > if avatar is not given, placeholderImage path must be found at img"Post__avatar"src
 *            - if flat prop is passed as true:
 *                > no shading and borders are rendered
 *                > if flag is false opposite is true
 *            - if nocomments flag is set to true
 *                > comments button is not rendered
 *                > if flag is false comments button is shown
 *            - if likedByAuthedUser is true
 *                > render like button with inline style { color: cornflowerblue }
 *                > opposite is { color: null } ( or is going to be no inline styles? )
 *            ! other props are going to be tested with snapshots, because there is too many
 *     + Things that we render, and their order
 *            > snapshot testing. (conditional rendering is additionally tested separately (Props section))
 *     + interaction
 *            - when author name is clicked:
 *                    > if I am not the author of the post, navigation to /profile/id/$authorId should happen
 *                    > if I am author, navigation to /profile should happen
 *            + when comment button is clicked:
 *                   > browser navigates to $baseUrl/view-comments/postId 
 *                   > CommentsView window shows up
 *            + when like button on a post is clicked: 
 *                   - if post was not liked before:
 *                       > likePost() is called with postId and fetchUsersStats fn
 *                   - if post was liked before:
 *                       > deleteLike() is called with postId and fetchUsersStats fn
 *            + when menu button on a post is clicked
 *                   - if state.showMenu is false
 *                       > div with the class Post__menu receives a class Post__menu--shown
 *                       > state.showMenu becomes true
 *                   - if state.showMenu is true
 *                       > div with the class Post__menu loses Post__menu--show class
 *                       > state.showMenu becomes false
 *                + if post belongs to user [delete] button is rendered instead of [unfollow]:
 *                       - if calculated flag belongsToAuthedUser === true
 *                           > Delete button is shown (detect by label & onClick fn)
 *                           > Unfollow is not shown
 *                       - if calculated flag belongsToAuthedUser === false
 *                           > Unfollow button is shown
 *                           > Delete is not shown
 *                + when Delete button is clicked
 *                       > deletePost() is called with postId and arrow fn
 *                       > fetchUsersStats() is called (has to be checked because 
 *                         it's our responsibility since we use it in arrow fn and not
 *                              just pass fetchUsersStats() on as an argument) 
 *                       > component instance is destroyed
 *                + when Unfollow button is clicked
 *                       > unfollowAPerson is called with personId
 *                       > fetchUsersStats() is called
 *                       > fetchDiscoverContent() is called with a number 5
 *                       > component instance is destroyed
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import { _UnconnectedPost as Post } from './Post.js'
import { mockPost } from '../../mocks/posts.js'
import mockUser from '../../mocks/user.js'
import cloneDeep from 'lodash.clonedeep'

describe('Post', () => {
  const getMockProps = () => {
    const actions = {
      likePost: jest.fn(),
      deleteLike: jest.fn(),
      deletePost: jest.fn((_id, callback) => { callback() }),
      unfollowAPerson: jest.fn((_id, callback) => { callback() }),
      fetchDiscoverContent: jest.fn(),
      fetchUsersStats: jest.fn()
    }

    const history = {
      push: jest.fn()
    }
    const match = {
      url: ""
    }

    const nocomments = false
    const flat = false

    return cloneDeep({
      ...actions,
      ...mockPost,
      authedUser: mockUser,
      history,
      match,
      nocomments,
      flat
    })
  }

  describe('global click event listener', () => { 
    const listenersMap = {}
    let comp

    beforeAll(() => {
      global.addEventListener = jest.fn((event, cb) => {
        if (listenersMap[event])
          listenersMap[event].push(cb)
        else
          listenersMap[event] = [cb]
      })
      global.removeEventListener = jest.fn((event, cb) => {
        if (listenersMap[event])
          listenersMap[event] = listenersMap[event].filter(item => item.name !== cb.name)
        else
          throw new Error('attempt to remove unregistered event')
      })
    })
    
    it('must be registered when component is mounted', () => {
      const props = getMockProps()
      comp = mount(<Post {...props} />)
      expect(listenersMap['click'].length).toEqual(1);
    })
    it('must be removed when component is unmounted', () => {
      comp.unmount()
      expect(listenersMap['click'].length).toEqual(0);
    })

    afterAll(() => {
      global.addEventListener.mockReset();
      global.removeEventListener.mockReset();
    })
  })

  describe('avatar image', () => {
    it('must be rendered as post author\'s image if defined', () => {
      const props = getMockProps()
      const avatar = 'https://some_avatar.com/1.jpg'
      props.user.avatar = avatar

      const comp = shallow(<Post {...props} />)
      expect(comp.find(".Post__avatar").prop('src')).toEqual(avatar)
    })
    
    it('must not be rendered if undefined, instead a placeholder image must replace it', () => {
      const props = getMockProps()
      const comp = shallow(<Post {...props} />)
      
      // placeholder image file name
      const avatar = 'avatar_placeholder.png'
      expect(comp.find(".Post__avatar").prop('src')).toEqual(avatar)
    })
  })

  describe('flat prop', () => {
    it('if true, set of specific inline styles must be found on the outermost div', () => {
      const props = getMockProps()
      props.flat = true
      const comp = shallow(<Post {...props} />)
      const expectedInlineStyles = {
        borderRadius: 'unset',
        boxShadow: 'unset',
        marginTop: 'unset'
      }

      expect(comp.find(".Post__container").prop('style')).toEqual(expectedInlineStyles)
    })
    it('if false/undefined, no inline styles should be set on the outermost div', () => {
      const props = getMockProps()
      const comp = shallow(<Post {...props} />)

      expect(comp.find(".Post__container").prop('style')).toEqual(null)
    })
  })

  describe('nocomments prop', () => {
    it('if true, comments button should not be rendered', () => {
      const props = getMockProps()
      props.nocomments = true
      const comp = shallow(<Post {...props} />)
      expect(comp.find(".Post__buttons").children().length).toBe(1)
    })
    it('if false/undefined, comments button should be rendered', () => {
      const props = getMockProps()
      const comp = shallow(<Post {...props} />)
      expect(comp.find(".Post__buttons").children().length).toBe(2)
    })
  })

  describe('liked by current user?', () => {
    it('if true, [Like] button must have cornflowerblue color set through inline styles', () => {
      const props = getMockProps()
      props.authedUser.id = 'user123'
      props.likes.push({
        _id: 'someLikeId',
        user: props.authedUser.id
      })
      // authedUser.id now must be found in likes array
      const comp = shallow(<Post {...props} />)
      const expectedStyles = { 
        color: 'cornflowerblue' 
      }
      expect(comp.find(".Post__buttons").childAt(0).prop('style')).toEqual(expectedStyles)
    })

    it('if false/undefined, [Like] button must have no inline styles', () => {
      const props = getMockProps()
      const comp = shallow(<Post {...props} />)
      expect(comp.find(".Post__buttons").childAt(0).prop('style')).toEqual(null)
    }) 
  })

  describe('interaction', () => {
    describe('post author name click', () => {
      it('if post is mine, navigation to /profile should happen', () => {
        const props = getMockProps()
        props.authedUser.id = "user123"
        props.user._id = "user123"

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__name").childAt(0).simulate('click')

        expect(props.history.push).toHaveBeenCalledWith('/profile')
        comp.unmount()
      })

      it('if post is not mine, navigation to athor\'s profile (/profile/id/$id) should happen', () => {
        const props = getMockProps()
        props.user._id = "user123"

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__name").childAt(0).simulate('click')

        expect(props.history.push).toHaveBeenCalledWith('/profile/id/user123')
        comp.unmount()
      })
    })

    describe('[Comments] button click', () => {
      it('must navigate to /view-comments/', () => {
        const props = getMockProps()
        props._id = 'post123'
        const comp = shallow(<Post {...props} />)

        comp.find(".Post__buttons").childAt(1).simulate('click')
        expect(props.history.push).toHaveBeenCalledWith('/view-comments/post123')
      })
    })

    describe('[Like] button click', () => {
      it('must call likePost() if post WASN\'T yet liked by the current user', () => {
        const props = getMockProps()
        props.authedUser.id = 'some_very_long_id_of_user123'

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__buttons").childAt(0).simulate('click')

        expect(props.likePost).toHaveBeenCalled()
      })

      it('must call deleteLike() if post WAS already liked by the current user', () => {
        const props = getMockProps()
        props.authedUser.id = 'some_very_long_id_of_user123'
        props.likes.push({
          _id: 'likeId_12561928',
          user: props.authedUser.id
        })

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__buttons").childAt(0).simulate('click')

        expect(props.deleteLike).toHaveBeenCalled()
      })

      it('must call likePost() with correct arguments', () => {
        const props = getMockProps()
        props._id = 'some_post123_id'
        props.authedUser.id = 'some_very_long_id_of_user123'

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__buttons").childAt(0).simulate('click')

        expect(props.likePost).toHaveBeenCalledWith('some_post123_id', props.fetchUsersStats)
      })

      it('must call deleteLike() with correct arguments', () => {
        const props = getMockProps()
        props._id = 'some_post123_id'
        props.authedUser.id = 'some_very_long_id_of_user123'
        props.likes.push({
          _id: 'likeId_12561928',
          user: props.authedUser.id
        })

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__buttons").childAt(0).simulate('click')

        expect(props.deleteLike).toHaveBeenCalledWith('some_post123_id', props.fetchUsersStats)

      })
    })

    describe('post menu', () => {
      describe('menu button click', () => {
        it('must toggle the state.showMenu boolean', () => {
          const props = getMockProps()
          const comp = shallow(<Post {...props} />)

          comp.find(".Post__button--menu").simulate('click')
          expect(comp.state('showMenu')).toBe(true)

          comp.find(".Post__button--menu").simulate('click')
          expect(comp.state('showMenu')).toBe(false)
        })

        it('must show menu if it\'s hidden', () => {
          const props = getMockProps()
          const comp = shallow(<Post {...props} />)

          comp.setState({ showMenu: false })
          comp.find(".Post__button--menu").simulate('click')
          expect(comp.find(".Post__menu").hasClass("Post__menu--shown")).toBe(true)
        })

        it('must hide menu if it\'s shown', () => {
          const props = getMockProps()
          const comp = shallow(<Post {...props} />)

          comp.setState({ showMenu: true })
          comp.find(".Post__button--menu").simulate('click')
          expect(comp.find(".Post__menu").hasClass("Post__menu--shown")).toBe(false)
        })

        it('must show menu despite the global click listener dismissMenu() effect', () => {
          // global click listener dismissMenu() has a check on that:
          // when user clicks on a menu button method doesn't react because
          // menu has to be shown (handled by the button itself), not hidden!
          const props = getMockProps()
          const comp = shallow(<Post {...props} />)

          comp.setState({ showMenu: true })
          comp.instance().dismissMenu({ target: { className: 'Post__button--menu' } })
          expect(comp.find(".Post__menu").hasClass("Post__menu--shown")).toBe(true)
        })
      })
      
      it('must get hidden if user clicks anywhere (except menu itself)', () => {
        // in the component this is done through calling dismissMenu() on 'click' events;
        // here I am testing exactly that.
        // there is no need to test if an actual mouse click triggers an event listener. 
        const props = getMockProps()
        const comp = shallow(<Post {...props} />)
        const event = { target: { className: 'Some__page__element' } }

        comp.setState({ showMenu: true })
        comp.instance().dismissMenu(event)
        expect(comp.find(".Post__menu").hasClass("Post__menu--shown")).toBe(false)
      })

      describe('if post belongs', () => {
        it('to me, then Delete button must be shown', () => {
          const props = getMockProps()
          props.authedUser.id = 'some_user_id123'
          props.user._id = props.authedUser.id

          const comp = shallow(<Post {...props} />)
          comp.find(".Post__button--menu").simulate('click')

          const menuButtons = comp.find(".Post__menu").children()
          expect(menuButtons.filterWhere(item => item.text() === 'Delete').length).toEqual(1)
        })

        it('to me, then Unfollow button must not be shown', () => {
          const props = getMockProps()
          props.authedUser.id = 'some_user_id123'
          props.user._id = props.authedUser.id

          const comp = shallow(<Post {...props} />)
          comp.find(".Post__button--menu").simulate('click')

          const menuButtons = comp.find(".Post__menu").children()
          expect(menuButtons.filterWhere(item => item.text() === 'Unfollow user').length).toEqual(0)
        })

        it('NOT to me, then Delete button must not be shown', () => {
          const props = getMockProps()
          props.authedUser.id = 'some_user_id123'
          props.user._id = 'some_different_id987'

          const comp = shallow(<Post {...props} />)
          comp.find(".Post__button--menu").simulate('click')

          const menuButtons = comp.find(".Post__menu").children()
          expect(menuButtons.filterWhere(item => item.text() === 'Delete').length).toEqual(0)
        })

        it('NOT to me, then Unfollow button must be shown', () => {
          const props = getMockProps()
          props.authedUser.id = 'some_user_id123'
          props.user._id = 'some_different_id987'

          const comp = shallow(<Post {...props} />)
          comp.find(".Post__button--menu").simulate('click')

          const menuButtons = comp.find(".Post__menu").children()
          expect(menuButtons.filterWhere(item => item.text() === 'Unfollow user').length).toEqual(1)
        })
      })

      it('when Delete button is clicked, deletePost() must be called', () => {
        const props = getMockProps()
        props.authedUser.id = 'some_user_id123'
        props.user._id = props.authedUser.id

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__button--menu").simulate('click')

        const menuButtons = comp.find(".Post__menu").children()
        menuButtons.filterWhere(item => item.text() === 'Delete').simulate('click')

        expect(props.deletePost).toHaveBeenCalled()
      })

      it('when [Unfollow user] button is clicked, unfollowAPerson() must be called', () => {
        const props = getMockProps()
        props.authedUser.id = 'some_user_id123'
        props.user._id = 'some_different_id987'

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__button--menu").simulate('click')

        const menuButtons = comp.find(".Post__menu").children()
        menuButtons.filterWhere(item => item.text() === 'Unfollow user').simulate('click')

        expect(props.unfollowAPerson).toHaveBeenCalled()
      })

      it('deletePost() must be called with correct parms', () => {
        const props = getMockProps()
        props.authedUser.id = 'some_user_id123'
        props.user._id = props.authedUser.id

        const postId = 'some_post123_id'
        props._id = postId

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__button--menu").simulate('click')

        comp.find(".Post__menu")
          .children()
          .filterWhere(item => item.text() === 'Delete')
          .simulate('click')

        expect(props.deletePost).toHaveBeenCalledWith(postId, expect.any(Function))
        expect(props.fetchUsersStats).toHaveBeenCalled()
      })

      it('unfollowAPerson() must be called with correct parms', () => {
        const props = getMockProps()
        props.authedUser.id = 'some_user_id123'

        const authorId = 'some_different_id987'
        props.user._id = authorId

        const comp = shallow(<Post {...props} />)
        comp.find(".Post__button--menu").simulate('click')

        comp.find(".Post__menu")
          .children()
          .filterWhere(item => item.text() === 'Unfollow user')
          .simulate('click')

        expect(props.unfollowAPerson).toHaveBeenCalledWith(authorId, expect.any(Function))
        expect(props.fetchUsersStats).toHaveBeenCalled()
        expect(props.fetchDiscoverContent).toHaveBeenCalledWith(5)
      })
    })
  })

  describe('state', () => {
    describe('menu', () => {
      it('state.showMenu boolean must be false by default', () => {
        const props = getMockProps()
        const comp = shallow(<Post {...props} />)

        expect(comp.state('showMenu')).toBe(false)
      })

      it('menu must be hidden by default', () => {
        const props = getMockProps()
        const comp = shallow(<Post {...props} />)

        expect(comp.find(".Post__menu").hasClass("Post__menu--shown")).toBe(false)
      })
    })
  })

  it('must pass a snapshot test', () => {
    const props = getMockProps()
    const comp = shallow(<Post {...props} />)

    // warning: enzyme-to-json package is used
    expect(comp).toMatchSnapshot()
  })

  it('must pass a smoke test', () => {
    const props = getMockProps()
    const div = document.createElement('div')
    ReactDOM.render(<Post {...props} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
