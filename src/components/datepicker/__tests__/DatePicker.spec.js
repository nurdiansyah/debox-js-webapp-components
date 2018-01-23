// @flow

import React from 'react'
import DatePicker from '../DatePicker'
import TestUtils from 'react-dom/test-utils'

describe('datepicker', () => {
  it('should render no error', () => {
    const datePicker = TestUtils.renderIntoDocument(<DatePicker />)
    const dateInput = datePicker.input
    TestUtils.Simulate.focus(dateInput)
    // expect(datePicker.calendar).not.toBeUndefined()
    // datepicker.find('input').simulate('click')
  })
})
