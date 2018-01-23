import React from 'react'

import {Form, Input, getFormBlock, getInputBlock} from '../index'

describe('form/Input', () => {
  it('should running no error', () => {
    const formBlock = getFormBlock({})
    const inputBlock = getInputBlock({})
    const wrapper = render(
      <Form block={formBlock}>
        <Input block={inputBlock} name="buah" />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
