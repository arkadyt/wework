import { bool, string, number, exact, arrayOf } from 'prop-types'

export const userType = exact({
    _id: string.isRequired,
    name: string.isRequired,
    email: string,
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

export const followerType = exact({
  _id: string.isRequired,
  user: string.isRequired
})

export const experienceEntryType = exact({
  _id: string.isRequired,
  title: string.isRequired,
  company: string.isRequired,
  location: string,
  from: string.isRequired,
  to: string,
  current: bool,
  description: string
})

export const educationEntryType = exact({
  _id: string.isRequired,
  school: string.isRequired,
  degree: string.isRequired,
  fieldOfStudy: string.isRequired,
  from: string.isRequired,
  to: string,
  current: bool,
  description: string
})

export const discoverListNodeType = exact({
  _id: string.isRequired,
  name: string.isRequired,
  avatar: string.isRequired,
  title: string.isRequired,
  followers: number,
  company: string
})

export const profileType = exact({
  _id: string.isRequired,
  date: string.isRequired,
  handle: string.isRequired,
  user: userType.isRequired,
  title: string.isRequired,
  status: string.isRequired,
  location: string,
  company: string,
  website: string,
  bio: string,
  skills: arrayOf(string).isRequired,
  experience: arrayOf(experienceEntryType),
  education: arrayOf(educationEntryType),
  youtube: string,
  facebook: string,
  linkedin: string,
  githubusername: string,
  instagram: string,
  twitter: string,
  __v: number
})
