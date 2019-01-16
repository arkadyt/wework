import React from 'react'
import Experience from './Experience'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'
import { mockProfile } from '../../../mocks/profile'
import ActionLine from '../ActionLine/ActionLine'

describe('Experience', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      navTo: jest.fn(),
      quitEntryDeletingMode: jest.fn(),
      profileBelongsToAuthedUser: true,
      experience: [
        mockProfile.experience[0]
      ],
      deleteExperience: jest.fn(),
      isDeleting: true,
      setDeleting: jest.fn()
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Experience {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props', () => {
    describe('effects', () => {
      describe('profileBelongsToAuthedUser', () => {
        describe('when experience arr is empty', () => {
          beforeEach(() => {
            props.experience = []
          })

          // if nodes array is empty, and !profileBelongsToAuthedUser
          // nothing will be output

          it('if false, comp doesn\'t render anything', () => {
            props.profileBelongsToAuthedUser = false
            expect(comp().find('section').exists()).toBe(false)
          })

          // though if profile belongs to authed user, component will 
          // at least show ActionLine

          it('if true, comp renders stuff as usual', () => {
            props.profileBelongsToAuthedUser = true
            expect(comp().find('section').exists()).toBe(true)
          })

          it('if true, comp renders ActionLine', () => {
            props.profileBelongsToAuthedUser = true
            expect(comp().find(ActionLine).exists()).toBe(true)
          })
        })
        
        describe('when experience arr has some nodes in it', () => {
          beforeEach(() => {
            props.experience = [
              mockProfile.experience[0]
            ]
          })

          // if there are some entries, no matter what the variable is
          // entries will be shown

          it('if false, comp renders stuff as usual', () => {
            props.profileBelongsToAuthedUser = false
            expect(comp().find('section').exists()).toBe(true)
          })

          it('if true, comp renders stuff as usual', () => {
            props.profileBelongsToAuthedUser = true
            expect(comp().find('section').exists()).toBe(true)
          })

          // the only thing profileBelongsToAuthedUser controls in this
          // case is ActionLine

          it('if false, comp doesn\'t render ActionLine', () => {
            props.profileBelongsToAuthedUser = false
            expect(comp().find(ActionLine).exists()).toBe(false)
          })

          it('if true, comp renders ActionLine', () => {
            props.profileBelongsToAuthedUser = true
            expect(comp().find(ActionLine).exists()).toBe(true)
          })
        })
      })
    })
  })

  describe('functions', () => {
    it('calls quitEntryDeletingMode', () => {
      comp().find(ActionLine).simulate('addBtnClk')
      expect(props.quitEntryDeletingMode).toHaveBeenCalled()
    })

    it('calls navTo', () => {
      comp().find(ActionLine).simulate('addBtnClk')
      expect(props.navTo).toHaveBeenCalled()
    })

    it('calls navTo with correct args', () => {
      comp().find(ActionLine).simulate('addBtnClk')
      expect(props.navTo).toHaveBeenCalledWith('add-experience')
    })
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
