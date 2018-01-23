import React from 'react'

import Tooltip from '../Tooltip'

describe('button -> tooltip', () => {
  it('Ketika dijalankan secara default', () => {
    const Comp = shallow(<Tooltip />)
    expect(Tooltip).toMatchSnapshot(Comp)
  })
})
