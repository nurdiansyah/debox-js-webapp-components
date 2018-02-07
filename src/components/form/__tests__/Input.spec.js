import React from 'react'

import {Form, Input} from '../index'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

const styles = bemStylesFactory({input: 'INPUT'})

describe('form/Input', () => {
  it('should running no error', () => {
    const wrapper = render(
      <Form styles={styles}>
        <Input styles={styles} name="buah" />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
