import React from 'react'
import { shallow } from 'enzyme'
import NoProfileMessage from './NoProfileMessage'
import cloneDeep from 'lodash.clonedeep'

let mountedComponent, props

const getMockProps = () => {
  return cloneDeep({
    history: {
      push: jest.fn()
    }
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<NoProfileMessage {...props} />)
  }
  return mountedComponent
}

describe('NoProfileMessage', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })

  describe('Create button', () => {
    it('receives correct function into onClick prop', () => {
      comp().find('field').simulate('click')
      expect(props.history.push).toHaveBeenCalled()
    })

    it('receives correct function into onClick prop, and uses it correctly', () => {
      comp().find('field').simulate('click')
      expect(props.history.push).toHaveBeenCalledWith('/profile/create-profile')
    })
  })
})
