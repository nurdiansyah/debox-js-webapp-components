import React from 'react'

import {Form, InputCheck, getFormBlock, getInputCheckBlock} from '../index'

const values = [
  {label: 'Mangga', value: 'mangga'},
  {label: 'Mangga', value: 'mangga'},
  {id: '2', label: 'Jeruk', value: 'jeruk'},
  {id: '3', label: 'Apel', value: 'apel', checked: true}
]

describe('form/Radio', () => {
  it('should running no error', () => {
    const formBlock = getFormBlock({})
    const inputCheckBlock = getInputCheckBlock({})
    const wrapper = render(
      <Form block={formBlock}>
        <InputCheck block={inputCheckBlock} name="buah" values={values} label="label" multiple />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
