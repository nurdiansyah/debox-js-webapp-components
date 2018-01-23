/* eslint-disable jsx-a11y/anchor-has-content */
// @flow

import React from 'react'
import type {Moment} from 'moment'

type YearDropdownOptionsProps = {
  blockClass: Function,
  minDate?: Moment,
  maxDate?: Moment,
  onCancel?: Function,
  onChange?: Function,
  scrollableYearDropdown?: ?boolean,
  year: number,
  yearDropdownItemNumber?: number
}

type State = {
  yearsList: Array<number>
}

function generateYears(year: number, noOfYear: number, minDate: Moment, maxDate: Moment) {
  const list = []
  for (let i = 0; i < 2 * noOfYear + 1; i++) {
    const newYear = year + noOfYear - i
    let isInRange = true

    if (minDate) {
      isInRange = minDate.year() <= newYear
    }

    if (maxDate && isInRange) {
      isInRange = maxDate.year() >= newYear
    }

    if (isInRange) {
      list.push(newYear)
    }
  }
  return list
}

export default class YearDropdownOptions extends React.PureComponent<YearDropdownOptionsProps, State> {
  blockClass: Function
  handleClickOutside: Function
  onChange: Function
  shiftYears: Function
  incrementYears: Function
  decrementYears: Function
  previous: ?HTMLDivElement
  upcoming: ?HTMLDivElement
  year: ?HTMLDivElement

  constructor(props: YearDropdownOptionsProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.shiftYears = this.shiftYears.bind(this)
    this.incrementYears = this.incrementYears.bind(this)
    this.decrementYears = this.decrementYears.bind(this)
    const {yearDropdownItemNumber, scrollableYearDropdown} = props

    const noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5)

    this.state = {
      yearsList: generateYears(props.year, noOfYear, props.minDate, props.maxDate)
    }
  }

  renderOptions() {
    const selectedYear = this.props.year
    const options = this.state.yearsList.map(year => (
      <div
        className={this.props.blockClass('scroll-option')}
        key={year}
        ref={ref => (this.year = ref)}
        onClick={this.onChange(year)}
        role="button"
        tabIndex={0}
      >
        {selectedYear === year ? <span className={this.props.blockClass('scroll-selected')}>✓</span> : ''}
        {year}
      </div>
    ))

    const minYear = this.props.minDate ? this.props.minDate.year() : null
    const maxYear = this.props.maxDate ? this.props.maxDate.year() : null

    if (!maxYear || !this.state.yearsList.find(year => year === maxYear)) {
      options.unshift(
        <div
          className={this.props.blockClass('scroll-option')}
          ref={ref => (this.upcoming = ref)}
          key={'upcoming'}
          onClick={this.incrementYears}
          role="button"
          tabIndex={0}
        >
          {/* eslint-disable-next-line */}
          <a className={this.blockClass('scroll-navigation', {upcoming: true})}>-</a>
        </div>
      )
    }

    if (!minYear || !this.state.yearsList.find(year => year === minYear)) {
      options.push(
        <div
          className={this.blockClass('scroll-option')}
          ref={ref => (this.previous = ref)}
          key={'previous'}
          onClick={this.decrementYears}
          role="button"
          tabIndex={0}
        >
          <a className={this.blockClass('scroll-navigation', {previous: true})} />
        </div>
      )
    }

    return options
  }

  onChange(year: number) {
    this.props.onChange && this.props.onChange(year)
  }

  handleClickOutside() {
    this.props.onCancel && this.props.onCancel()
  }

  shiftYears(amount: number) {
    const years = this.state.yearsList.map(year => year + amount)

    this.setState({
      yearsList: years
    })
  }

  incrementYears() {
    this.shiftYears(1)
  }

  decrementYears() {
    this.shiftYears(-1)
  }

  render() {
    const dropdownClass = this.props.blockClass('scroll-dropdown', {
      scrollable: this.props.scrollableYearDropdown
    })

    return <div className={dropdownClass}>{this.renderOptions()}</div>
  }
}
