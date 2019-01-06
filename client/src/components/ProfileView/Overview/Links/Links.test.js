import React from 'react'
import { shallow } from 'enzyme'
import Links from './Links'
import cloneDeep from 'lodash.clonedeep'
import { mockProfile as profile } from '../../../../mocks/profile'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    profile
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Links {...props} />)
  }
  return mountedComponent
}

describe('Links', () => {
  beforeEach(() => {
    props = getMockProps()
    mountedComponent = undefined
  })

  describe('props', () => {
    describe('effects', () => {
      describe('youtube', () => {
        it('if true comp renders a youtube link up in the intro section', () => {
          const link = 'http://some.link'
          props.profile.youtube = link

          const predicate = node => node.childAt(0).name() === 'FaYoutube'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(1)
        })

        it('if false comp does not render a youtube link up in the intro section', () => {
          delete props.profile.youtube

          const predicate = node => node.childAt(0).name() === 'FaYoutube'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(0)
        })
      })

      describe('twitter', () => {
        it('if true comp renders a twitter link up in the intro section', () => {
          const link = 'http://some.link'
          props.profile.twitter = link

          const predicate = node => node.childAt(0).name() === 'FaTwitter'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(1)
        })

        it('if false comp does not render a twitter link up in the intro section', () => {
          delete props.profile.twitter

          const predicate = node => node.childAt(0).name() === 'FaTwitter'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(0)
        })
      })

      describe('github', () => {
        it('if true comp renders a github link up in the intro section', () => {
          const username = 'name'
          props.profile.githubusername = username

          const predicate = node => node.childAt(0).name() === 'FaGithub'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(1)
        })

        it('if false comp does not render a github link up in the intro section', () => {
          delete props.profile.githubusername

          const predicate = node => node.childAt(0).name() === 'FaGithub'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(0)
        })
      })

      describe('facebook', () => {
        it('if true comp renders a facebook link up in the intro section', () => {
          const link = 'http://some.link'
          props.profile.facebook = link

          const predicate = node => node.childAt(0).name() === 'FaFacebook'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(1)
        })

        it('if false comp does not render a facebook link up in the intro section', () => {
          delete props.profile.facebook

          const predicate = node => node.childAt(0).name() === 'FaFacebook'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(0)
        })
      })

      describe('linkedin', () => {
        it('if true comp renders a linkedin link up in the intro section', () => {
          const link = 'http://some.link'
          props.profile.linkedin = link

          const predicate = node => node.childAt(0).name() === 'FaLinkedin'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(1)
        })

        it('if false comp does not render a linkedin link up in the intro section', () => {
          delete props.profile.linkedin

          const predicate = node => node.childAt(0).name() === 'FaLinkedin'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(0)
        })
      })

      describe('instagram', () => {
        it('if true comp renders a instagram link up in the intro section', () => {
          const link = 'http://some.link'
          props.profile.instagram = link

          const predicate = node => node.childAt(0).name() === 'FaInstagram'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(1)
        })

        it('if false comp does not render a instagram link up in the intro section', () => {
          delete props.profile.instagram

          const predicate = node => node.childAt(0).name() === 'FaInstagram'
          expect(comp().find('a').filterWhere(predicate)).toHaveLength(0)
        })
      })
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
