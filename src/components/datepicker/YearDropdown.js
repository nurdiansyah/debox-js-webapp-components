// @flow

import React from 'react'
import type {Moment} from 'moment'
import {getYear} from '../utils/dateUtils'
import onClickOutside from 'react-onclickoutside'

import getKey from 'lodash/uniqueId'
import YearDropdownOptions from './YearDropdownOptions'
import {BLOCK_CALENDAR_ID} from './constants'
import {classNamesFactory} from '../utils/classnamesUtils'

const WrappedYearDropdownOptions = onClickOutside(YearDropdownOptions)
type YearDropdownProps = {
  styles?: Object,
  adjustDateOnChange?: ?boolean,
  dropdownMode?: 'scroll' | 'select',
  maxDate?: Moment,
  minDate?: Moment,
  onChange?: Function,
  scrollableYearDropdown?: ?boolean,
  year?: number,
  yearDropdownItemNumber?: number,
  date?: Moment,
  onSelect?: Function,
  setOpen?: Function
}

type State = {
  dropdownVisible: boolean
}

const defaultProps = {
  dropdownMode: 'select'
}

export default class YearDropdown extends React.PureComponent<YearDropdownProps, State> {
  dropdownOptions: ?HTMLElement
  blockClass: Function
  onSelectChange: Function
  onChange: Function
  toggleDropdown: Function
  handleYearChange: Function

  constructor(props: YearDropdownProps) {
    super(props)
    const {styles} = props
    this.blockClass = classNamesFactory(BLOCK_CALENDAR_ID, {styles})

    this.onSelectChange = this.onSelectChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
  }

  state = {
    dropdownVisible: false
  }

  onSelectChange(e: SyntheticEvent<HTMLSelectElement>) {
    const value = e.currentTarget ? e.currentTarget.value : undefined
    this.onChange(Number(value), e)
  }

  onChange(year: ?number, event: SyntheticEvent<HTMLElement>) {
    this.toggleDropdown(event)
    if (!year && year === this.props.year) {
      return
    }
    this.props.onChange && this.props.onChange(year)
  }

  toggleDropdown(event: SyntheticEvent<HTMLElement>) {
    this.setState(
      {
        dropdownVisible: !this.state.dropdownVisible
      },
      () => {
        if (this.props.adjustDateOnChange) {
          this.handleYearChange(this.props.date, event)
        }
      }
    )
  }

  handleYearChange(date: Moment, event: SyntheticEvent<HTMLElement>) {
    this.onSelect(date, event)
    this.setOpen()
  }

  onSelect(date: Moment, event: SyntheticEvent<HTMLElement>) {
    if (this.props.onSelect) {
      this.props.onSelect(date, event)
    }
  }

  setOpen() {
    if (this.props.setOpen) {
      this.props.setOpen(true)
    }
  }

  renderSelectMode() {
    return (
      <select value={this.props.year} className={this.blockClass('select')} onChange={this.onSelectChange}>
        {this.renderSelectOptions()}
      </select>
    )
  }

  renderSelectOptions() {
    const minYear = this.props.minDate ? getYear(this.props.minDate) : 1900
    const maxYear = this.props.maxDate ? getYear(this.props.maxDate) : 2100

    const options = []
    for (let i = minYear; i <= maxYear; i++) {
      options.push(
        <option key={getKey} value={i}>
          {i}
        </option>
      )
    }
    return options
  }

  renderScrollReadView(visible: boolean) {
    return (
      <div
        key="read"
        style={{visibility: visible ? 'visible' : 'hidden'}}
        className={this.blockClass('scroll-read-view')}
        onClick={event => this.toggleDropdown(event)}
        role="button"
        tabIndex={0}
      >
        <span className={this.blockClass('scroll-down-arrow')} />
        <span className={this.blockClass('scroll-selected')}>{this.props.year}</span>
      </div>
    )
  }

  renderScrollDropdown() {
    return (
      <WrappedYearDropdownOptions
        blockClass={this.blockClass}
        key={getKey('dropdown')}
        ref={ref => (this.dropdownOptions = ref)}
        year={this.props.year}
        onChange={this.onChange}
        onCancel={this.toggleDropdown}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
      />
    )
  }

  renderScrollMode() {
    const {dropdownVisible} = this.state
    const result = [this.renderScrollReadView(!dropdownVisible)]
    if (dropdownVisible) {
      result.unshift(this.renderScrollDropdown())
    }
    return result
  }

  render() {
    const {dropdownMode = defaultProps.dropdownMode} = this.props
    let renderedDropdown
    switch (dropdownMode) {
      case 'scroll':
        renderedDropdown = this.renderScrollMode()
        break
      default:
      case 'select':
        renderedDropdown = this.renderSelectMode()
        break
    }

    return <div className={this.blockClass(null, {type: 'year'})}>{renderedDropdown}</div>
  }
}
