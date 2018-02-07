import React from 'react'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

import {Form, Select} from '../index'

const styles = bemStylesFactory({select: 'SELECT'})

const values = [
  {label: 'Mangga', value: 'mangga'},
  {label: 'Mangga', value: 'mangga'},
  {id: '2', label: 'Jeruk', value: 'jeruk'},
  {id: '3', label: 'Apel', value: 'apel', selected: true}
]

describe('form/Select', () => {
  it('should running no error', () => {
    const wrapper = render(
      <Form styles={styles}>
        <Select styles={styles} name="buah" values={values} />
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
