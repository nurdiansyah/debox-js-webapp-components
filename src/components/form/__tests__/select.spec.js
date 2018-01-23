import React from 'react'

import {Form, Select, getFormBlock, getSelectBlock} from '../index'

const values = [
  {label: 'Mangga', value: 'mangga'},
  {label: 'Mangga', value: 'mangga'},
  {id: '2', label: 'Jeruk', value: 'jeruk'},
  {id: '3', label: 'Apel', value: 'apel', checked: true}
]

describe('form/Select', () => {
  it('should running no error', () => {
    const formBlock = getFormBlock({})
    const selectBlock = getSelectBlock({})
    const wrapper = render(
      <Form block={formBlock}>
        <Select block={selectBlock} name="buah" values={values} />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
