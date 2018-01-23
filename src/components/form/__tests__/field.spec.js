import React from 'react'

import {Form, Field, getFormBlock} from '../index'

describe('form/field', () => {
  it('should when not label', () => {
    const formBlock = getFormBlock({})
    const wrapper = render(
      <Form block={formBlock}>
        <Field block={formBlock}>
          <div>test</div>
        </Field>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should with label', () => {
    const formBlock = getFormBlock({})
    const wrapper = render(
      <Form block={formBlock}>
        <Field block={formBlock} label="label test">
          <div>test</div>
        </Field>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
