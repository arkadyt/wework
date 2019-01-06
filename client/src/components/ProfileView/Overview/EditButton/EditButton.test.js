import React from 'react'
import EditButton from './EditButton'
import Field from '../../../Field/Field'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

describe('EditButton', () => {
  let mountedComponent, props

  const getMockProps = () => {
    return cloneDeep({
      navTo: jest.fn(),
      quitEntryDeletingMode: jest.fn()
    })
  }

  const comp = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<EditButton {...props} />)
    } 
    return mountedComponent
  }

  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  it('calls quitEntryDeletingMode', () => {
    comp().find(Field).simulate('click')
    expect(props.quitEntryDeletingMode).toHaveBeenCalled()
  })

  it('calls navTo', () => {
    comp().find(Field).simulate('click')
    expect(props.navTo).toHaveBeenCalled()
  })

  it('calls navTo with correct args', () => {
    comp().find(Field).simulate('click')
    expect(props.navTo).toHaveBeenCalledWith('update-profile')
  })

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
