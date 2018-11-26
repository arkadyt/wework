/**
 * Component's contract.
 * 
 * From the user's side of things:
 *  * component should show up properly: text, timestamp, images, stats, links, styling
 *  * component's buttons should work.
 *
 *
 * Qs from Medium:
 *
 *  1. What does my component render?
 *  >> Tweet text, timestamp, author image, name link, buttons, menu, stats.
 *
 *  2. Does my component render different things under different circumstances?
 *  >> Yes: - when menu button is clicked menu is shown
 *          - when Delete/Unfollow is clicked, component is destroyed
 *          - when like/coment is added, counter updates
 *          - if post belongs to user [Delete] button is rendered instead of [Unfollow]
 *          - if flat prop is passed, no shading and borders are rendered
 *          - if nocomments flag is set, comments button is not rendered.
 *
 *  3. When I pass a function as a prop what does my component use it for?
 *  >> all 6 functions are used to communicate with backend server.
 *
 *  3.1. Does it call them or just passes them down to other components?
 *  >> all 6 functions are called in place
 *
 *  3.2. What does it call them with?
 *  >> deletePost             >> postId
 *     unfollowAPerson        >> postAuthorId
 *     fetchUsersStats        >> [nil, curr. authed user's id is taken from redux store]
 *     fetchDiscoverContent   >> amount of new users to load
 *     deleteLike, likePost   >> postId, post operation function to execute
 *
 *  4. When user interacts with my component what happens?
 *  >> when like/comment is clicked, respective counters update
 *     when menu btn is clicked, menu is rendered
 *     when Delete/Unfollow is clicked, component instance is destroyed
 *       
 *  Additional Section:
 *  >> Props it receives are objects, functions and primitives.
 *     - Objects are picked apart, used to calc things, displayed
 *     - Funcs are all called w/ respective parameters
 *     - Primitives are used just like objects
 *     - Props influence the output: read Q#2.
 *  >> State:
 *     - showMenu controls if menu is rendered or not
 *  >> Context:
 *     - redux: authedUser object and 6 functions
 *     - react-router: history and match objects
 *  >> What happens when you call methods on it's instance?
 *     - WTF's that? N/A
 *  >> SideEffects, baby:
 *     - menu button onClick listener is registered and dropped upon mounting/unmounting
 *
 *
 *  Additional Batch of Questions:
 *     - What do I do with the props I receive?
 *     - What components do I render? What do I pass them?
 *     - Do I ever keep anything in state? Do I invalidate it when receiving new props? When do I update it?
 *     - If a user interacts with me, or a child component calls a callback that I passed to it, what do I do?
 *     - Does anything happen when I am mounted/unmounted?
 *  
 *  React 16 Context API specific tips:
 *     - It is convenient to have an unconnected export of a Component just for testing.
 *  
 *  Found list of constraints:
 *     + menu button onClick listener is registered and dropped upon mounting/unmounting
 *     + when like/comment is clicked, respective counters update
 *     + when menu btn is clicked, menu is rendered
 *     + when Delete/Unfollow is clicked, component instance is destroyed
 *     + if post belongs to user [Delete] button is rendered instead of [Unfollow]
 *     + if flat prop is passed, no shading and borders are rendered
 *     + if nocomments flag is set, comments button is not rendered.
 *     + Objects are picked apart, used to calc things, displayed
 *     + Funcs are all called w/ respective parameters
 *     + Primitives are used just like objects
 *     + Things that we render, and their order
 *     + Public API, props passing and NOT PASSING on
 *     - prop type checking, and optionality verifying
 *     + Side effects on entire application
 *
 *  Ok, contract is found. Now what's worth testing?
 *  Per every constraint in the contract, ask:
 *   1. Will the test have to duplicate exactly the application code? This will make it brittle.
 *   2. Will the assertion try to test the behavior that is already tested in the library code?
 *   3. From an outsider's perspective, is this detail important? Or is it only an internal concern?
 *      Can the effect of this internal detail be described with only comp's public API? 
 *     
 *  Testing is really mostly about ensuring that INPUT turns >> into the expected OUTPUT.
 *  And how does that happen? Through your code! You test your code behavior and scan for mistakes.
 *
 *
 *
 *  Ok, updated -/+ sign by every found constraint.
 *
 *
 *  
 *  Expanded list of constraints:
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
 *     + Side effects on entire application
 *         In some cases side effects come through state updates and consequent subtree rerenders
 *         In case of Post component, all side effects come through thunk actions
 *             thunk actions testing:
 *             - likePost()
 *                    > axios request is sent to add userId to the post likes list 
 *                    > response updates the affected post in redux store
 *                    > like button becomes colored
 *                    > fetchUsersStats() is called
 *                    > totalLikes counter updates on a user object
 *                    > user stats panel updates with new like counter
 *                ...to be continued somewhere else...
 *
 * 
 *
 * Some Conclusions:
 *    - never test things that some action is not responsible for.
 *        for example:
 *        only assert that clicking on a [like] button has to trigger a thunk action with right args, and only that.
 *        then test the action effects separately.
 *          ? but how do I make sure then that the action effects reflect back correctly? 
 *          ? like [Like] button would get lit up on the caller post and not on some other?
 *            > Updates delivery on the redux side is tested by redux and I may rest assured that that'll work.
 *            > Caller post would be one of the subscribers and I will just have to check that 
 *            > incoming props are distributed and consumed correctly in the Post component.
 *            > That's why...
 *    - testing props consumption and their effects is very important!
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import { _UnconnectedPost as Post } from './Post.js'
import { mockPost } from '../../mocks/posts.js'
import mockUser from '../../mocks/user.js'

describe('Post', () => {
  const getMockProps = () => {
    const actions = {
      likePost: jest.fn(),
      deleteLike: jest.fn(),
      deletePost: jest.fn(),
      unfollowAPerson: jest.fn(),
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

    return {
      ...actions,
      authedUser: mockUser,
      // deep cloning this way will mess up the 'date' field, 
      // but none of the following test suites care about it anyways.
      ...JSON.parse(JSON.stringify(mockPost)),
      history,
      match,
      nocomments,
      flat
    }
  }

  describe('global click event listener', () => { 
    const listenersMap = {}
    let comp

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
    
    it('must be registered when component is mounted', () => {
      const props = getMockProps()
      comp = mount(<Post {...props} />)
      expect(listenersMap['click'].length).toEqual(1);
    })
    it('must be removed when component is unmounted', () => {
      comp.unmount()
      expect(listenersMap['click'].length).toEqual(0);
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

  it('must pass a smoke test', () => {
    const props = getMockProps()
    const div = document.createElement('div')
    ReactDOM.render(<Post {...props} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})