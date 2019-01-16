import FBSpinner from './FBSpinner'
import { shallow } from 'enzyme'
import React from 'react'

const comp = () => {
  return shallow(<FBSpinner />)
}

it('matches snapshot', () => {
  expect(comp()).toMatchSnapshot()
})
