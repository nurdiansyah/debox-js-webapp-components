import React from 'react'

import {Form, Field} from '../index'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

const styles = bemStylesFactory({field: 'FIELD'})

describe('form/field', () => {
  it('should when not label', () => {
    const wrapper = render(
      <Form styles={styles}>
        <Field styles={styles}>
          <div>test</div>
        </Field>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should with label', () => {
    const wrapper = render(
      <Form styles={styles}>
        <Field styles={styles} label="label test">
          <div>test</div>
        </Field>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
