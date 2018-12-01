import { string, number, exact, arrayOf } from 'prop-types'

export const userType = exact({
    _id: string.isRequired,
    name: string.isRequired,
    avatar: string.isRequired
})

export const postType = exact({
  _id: string.isRequired,
  text: string.isRequired,
  user: userType.isRequired,
  likes: arrayOf(
    exact({
      _id: string.isRequired,
      user: string.isRequired,
    })
  ).isRequired,
  comments: arrayOf(
    exact({
      date: string.isRequired,
      _id: string.isRequired,
      text: string.isRequired,
      user: userType.isRequired
    })
  ),
  date: string.isRequired,
  __v: number
})
