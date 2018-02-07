// @flow

import React from 'react'
import DatePicker from '../DatePicker'
import TestUtils from 'react-dom/test-utils'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

const styles = bemStylesFactory({datepicker: 'DATEPICKER'})

describe('datepicker', () => {
  it('should render no error', () => {
    const datePicker = TestUtils.renderIntoDocument(<DatePicker styles={styles} name="test" />)
    const dateInput = datePicker.input
    // TestUtils.Simulate.focus(dateInput)
    // expect(datePicker.calendar).not.toBeUndefined()
    // datepicker.find('input').simulate('click')
  })
})
