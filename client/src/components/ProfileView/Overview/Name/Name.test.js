import React from 'react'
import { shallow } from 'enzyme'
import Name from './Name'
import { mockProfile } from '../../../../mocks/profile'

describe('Name', () => {
  const comp = () => shallow(<Name profile={mockProfile} />)

  it('matches snapshot', () => {
    expect(comp()).toMatchSnapshot()
  })
})
