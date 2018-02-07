// @flow

import React from 'react'
import getKey from 'lodash/uniqueId'
import onClickOutside from 'react-onclickoutside'
import * as utils from '@deboxsoft/webapp/utils/dateUtils'
import {classNamesFactory, type BemType} from '@deboxsoft/webapp/utils/classnamesUtils'
import MonthDropdownOptions from './MonthDropdownOptions'
import {BLOCK_CALENDAR_ID} from './constants'

const WrappedMonthDropdownOptions = onClickOutside(MonthDropdownOptions)

type MonthDropdownProps = {
  styles?: BemType,
  dropdownMode?: 'scroll' | 'select',
  locale?: string,
  dateFormat: string,
  month?: number,
  onChange?: Function
}

type State = {
  dropdownVisible: boolean
}

export default class MonthDropdown extends React.PureComponent<MonthDropdownProps, State> {
  blockClass: Function
  options: ?HTMLOptionElement
  onChange: Function
  toggleDropdown: Function

  static renderSelectOptions(monthNames: Array<string>) {
    return monthNames.map((M, i) => (
      <option key={getKey('option-month-dropdown')} value={i}>
        {M}
      </option>
    ))
  }

  constructor(props: MonthDropdownProps) {
    super(props)
    const {styles} = props
    this.blockClass = classNamesFactory(BLOCK_CALENDAR_ID, {styles})
    this.onChange = this.onChange.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  state = {
    dropdownVisible: false
  }

  onChange(month: number) {
    this.toggleDropdown()
    if (month !== this.props.month) {
      this.props.onChange && this.props.onChange(month)
    }
  }

  toggleDropdown() {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    })
  }

  renderSelectMode(monthNames: Array<string>) {
    return (
      <select
        value={this.props.month}
        className={this.blockClass('select')}
        onChange={e => this.onChange(e.target.value)}
      >
        {MonthDropdown.renderSelectOptions(monthNames)}
      </select>
    )
  }

  renderScrollReadView(visible: boolean, monthNames: Array<string>) {
    return (
      <div
        key="read"
        style={{visibility: visible ? 'visible' : 'hidden'}}
        className={this.blockClass('scroll-read-view')}
        onClick={this.toggleDropdown}
        role="button"
        tabIndex={0}
      >
        <span className={this.blockClass('scroll-down-arrow')} />
        <span className={this.blockClass('scroll-selected')}>{this.props.month && monthNames[this.props.month]}</span>
      </div>
    )
  }

  renderScrollDropdown(monthNames: Array<string>) {
    return (
      <WrappedMonthDropdownOptions
        blockClass={this.blockClass}
        key={getKey('dropdown')}
        ref={ref => (this.options = ref)}
        month={this.props.month}
        monthNames={monthNames}
        onChange={this.onChange}
        onCancel={this.toggleDropdown}
      />
    )
  }

  renderScrollMode(monthNames: Array<string>) {
    const {dropdownVisible} = this.state
    const result = [this.renderScrollReadView(!dropdownVisible, monthNames)]
    if (dropdownVisible) {
      result.unshift(this.renderScrollDropdown(monthNames))
    }
    return result
  }

  render() {
    const localeData = this.props.locale && utils.getLocaleDataForLocale(this.props.locale)
    const monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(M =>
      utils.getMonthInLocale(localeData, utils.newDate({M}), this.props.dateFormat)
    )

    let renderedDropdown
    switch (this.props.dropdownMode) {
      case 'scroll':
        renderedDropdown = this.renderScrollMode(monthNames)
        break
      default:
      case 'select':
        renderedDropdown = this.renderSelectMode(monthNames)
        break
    }

    return <div className={this.blockClass(null, {type: 'month'})}>{renderedDropdown}</div>
  }
}
