import React from 'react'

import {Form, TextArea, getFormBlock, getTextAreaBlock} from '../index'

describe('form/TextArea', () => {
  it('should running no error', () => {
    const formBlock = getFormBlock({})
    const textAreaBlock = getTextAreaBlock({})
    const wrapper = render(
      <Form block={formBlock}>
        <TextArea block={textAreaBlock} name="buah" label="label" />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
