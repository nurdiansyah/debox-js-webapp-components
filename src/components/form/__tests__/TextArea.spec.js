import React from 'react'

import {Form, TextArea} from '../index'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

const styles = bemStylesFactory({textarea: 'TEXT-AREA'})

describe('form/TextArea', () => {
  it('should running no error', () => {
    const wrapper = render(
      <Form>
        <TextArea styles={styles} name="buah" label="label" />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
