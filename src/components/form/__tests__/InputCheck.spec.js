import React from 'react'

import {Form, InputCheck} from '../index'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

const styles = bemStylesFactory({inputCheck: 'INPUT-CHECK'})

const values = [
  {label: 'Mangga', value: 'mangga'},
  {label: 'Mangga', value: 'mangga'},
  {id: '2', label: 'Jeruk', value: 'jeruk'},
  {id: '3', label: 'Apel', value: 'apel', checked: true}
]

describe('form/Radio', () => {
  it('should running no error', () => {
    const wrapper = render(
      <Form styles={styles}>
        <InputCheck styles={styles} name="buah" values={values} label="label" multiple />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
