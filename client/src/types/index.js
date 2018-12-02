import { string, number, exact, arrayOf } from 'prop-types'

export const userType = exact({
    _id: string.isRequired,
    name: string.isRequired,
    avatar: string.isRequired
})

export const commentType = exact({
    date: string.isRequired,
    _id: string.isRequired,
    text: string.isRequired,
    user: userType.isRequired
})

export const likeType = exact({
    _id: string.isRequired,
    user: string.isRequired
})

export const postType = exact({
  _id: string.isRequired,
  text: string.isRequired,
  user: userType.isRequired,
  likes: arrayOf(likeType).isRequired,
  comments: arrayOf(commentType),
  date: string.isRequired,
  __v: number
})

export const discoverListNodeType = exact({
  _id: string.isRequired,
  name: string.isRequired,
  avatar: string.isRequired,
  title: string.isRequired,
  company: string
})
