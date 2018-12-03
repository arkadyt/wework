import React from 'react'
import EmptyList from './EmptyList'
import { shallow } from 'enzyme'

it('must match a snapshot', () => {
  const comp = shallow(<EmptyList />)
  expect(comp).toMatchSnapshot()
})
