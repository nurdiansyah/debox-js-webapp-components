// @flow

import React, {PureComponent} from 'react'
import type {Moment} from 'moment'
import YearDropdown from './YearDropdown'
import MonthDropdown from './MonthDropdown'
import Month from './Month'
import Time from './Time'
import {
  now,
  setMonth,
  getMonth,
  addMonths,
  subtractMonths,
  getStartOfWeek,
  getStartOfDate,
  addDays,
  cloneDate,
  formatDate,
  localizeDate,
  setYear,
  getYear,
  isBefore,
  isAfter,
  getLocaleData,
  getWeekdayShortInLocale,
  getWeekdayMinInLocale,
  isSameDay,
  allDaysDisabledBefore,
  allDaysDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate
} from '@deboxsoft/webapp/utils/dateUtils'

import {classNamesFactory, type BemType} from '@deboxsoft/webapp/utils/classnamesUtils'

import type {HighlighDateType} from '@deboxsoft/webapp/utils/dateUtils'
import {BLOCK_CALENDAR_ID} from './constants'

const DROPDOWN_FOCUS_CLASSNAMES = ['year-select', 'month-select']

export type CalendarProps = {
  adjustDateOnChange?: ?boolean,
  children?: React$Node,
  styles?: BemType,
  dateFormat: string,
  dayClassName?: Function,
  dropdownMode?: 'scroll' | 'select',
  endDate?: Object,
  excludeDates?: Array<Moment>,
  filterDate?: Function,
  fixedHeight?: boolean,
  formatWeekNumber?: Function,
  highlightDates?: Map<string, HighlighDateType>,
  includeDates?: Array<Moment>,
  inline?: boolean,
  locale?: string,
  maxDate?: Moment,
  minDate?: Moment,
  monthsShown?: number,
  onClickOutside?: Function,
  onMonthChange?: Function,
  onYearChange?: Function,
  forceShowMonthNavigation?: ?boolean,
  onDropdownFocus?: Function,
  onSelect?: Function,
  onWeekSelect?: Function,
  showTimeSelect?: ?boolean,
  timeFormat?: string,
  timeIntervals?: number,
  onTimeChange?: Function,
  minTime?: Moment,
  maxTime?: Moment,
  excludeTimes?: Array<Moment>,
  openToDate?: Moment,
  peekNextMonth?: ?boolean,
  scrollableYearDropdown?: ?boolean,
  preSelection?: Moment,
  selected?: Moment,
  selectsEnd?: ?boolean,
  selectsStart?: ?boolean,
  showMonthDropdown?: ?boolean,
  showWeekNumbers?: ?boolean,
  showYearDropdown?: ?boolean,
  startDate?: Moment,
  todayButton?: string,
  useWeekdaysShort?: ?boolean,
  withPortal?: ?boolean,
  utcOffset?: number,
  weekLabel?: string,
  yearDropdownItemNumber?: number,
  setOpen?: Function
}

type State = {
  date: Moment,
  selectingDate: null,
  monthContainer: HTMLElement | null
}

const defaultProps = {
  onDropdownFocus: () => {},
  monthsShown: 1,
  forceShowMonthNavigation: false,
  locale: 'id',
  dropdownMode: 'select'
}

export default class Calendar extends PureComponent<CalendarProps, State> {
  monthContainer: HTMLElement | null
  assignMonthContainer: ?Function
  blockClass: Function
  changeYear: Function
  changeMonth: Function
  increaseMonth: Function
  decreaseMonth: Function
  handleClickOutside: Function
  handleDayClick: Function
  handleDayMouseEnter: Function
  handleMonthMouseLeave: Function
  handleYearChange: Function
  handleMonthChange: Function

  static isDropdownSelect(element: Object = {}) {
    const classNames = (element.className || '').split(/\s+/)
    return DROPDOWN_FOCUS_CLASSNAMES.some(testClassname => classNames.indexOf(testClassname) >= 0)
  }

  constructor(props: CalendarProps) {
    super(props)
    this.blockClass = classNamesFactory(BLOCK_CALENDAR_ID, props)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this)
    this.handleMonthMouseLeave = this.handleMonthMouseLeave.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleMonthChange = this.handleMonthChange.bind(this)
    this.changeYear = this.changeYear.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.increaseMonth = this.increaseMonth.bind(this)
    this.decreaseMonth = this.decreaseMonth.bind(this)
  }

  state = {
    date: this.localizeDate(this.getDateInView()),
    selectingDate: null,
    monthContainer: this.monthContainer
  }

  componentDidMount() {
    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = (() => {
        this.setState({monthContainer: this.monthContainer})
      })()
    }
  }

  componentWillReceiveProps(nextProps: CalendarProps) {
    if (nextProps.preSelection && !isSameDay(nextProps.preSelection, this.props.preSelection)) {
      this.setState({
        date: this.localizeDate(nextProps.preSelection)
      })
    } else if (nextProps.openToDate && !isSameDay(nextProps.openToDate, this.props.openToDate)) {
      this.setState({
        date: this.localizeDate(nextProps.openToDate)
      })
    }
  }

  handleClickOutside(event: SyntheticEvent<any>) {
    this.props.onClickOutside && this.props.onClickOutside(event)
  }

  handleDropdownFocus(event: SyntheticEvent<any>) {
    if (Calendar.isDropdownSelect(event.target) && this.props.onDropdownFocus) {
      this.props.onDropdownFocus()
    }
  }

  getDateInView() {
    const {preSelection, selected, openToDate, utcOffset} = this.props
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const current = now(utcOffset)
    const initialDate = openToDate || selected || preSelection
    if (initialDate) {
      return initialDate
    }
    if (minDate && isBefore(current, minDate)) {
      return minDate
    } else if (maxDate && isAfter(current, maxDate)) {
      return maxDate
    }

    return current
  }

  localizeDate(date: Moment) {
    const {locale = defaultProps.locale} = this.props
    return localizeDate(date, locale)
  }

  increaseMonth() {
    this.setState(
      {
        date: addMonths(cloneDate(this.state.date), 1)
      },
      () => this.handleMonthChange(this.state.date)
    )
  }

  decreaseMonth() {
    this.setState(
      {
        date: subtractMonths(cloneDate(this.state.date), 1)
      },
      () => this.handleMonthChange(this.state.date)
    )
  }

  handleDayClick(day: Moment, event: SyntheticEvent<any>) {
    this.props.onSelect && this.props.onSelect(day, event)
  }

  handleDayMouseEnter(day: Moment) {
    this.setState({selectingDate: day})
  }

  handleMonthMouseLeave() {
    this.setState({selectingDate: null})
  }

  handleYearChange(date: Moment) {
    if (this.props.onYearChange) {
      this.props.onYearChange(date)
    }
  }

  handleMonthChange(date: Moment) {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(date)
    }
    if (this.props.adjustDateOnChange) {
      if (this.props.onSelect) {
        this.props.onSelect(date)
      }
      if (this.props.setOpen) {
        this.props.setOpen(true)
      }
    }
  }

  changeYear(year: number) {
    this.setState(
      {
        date: setYear(cloneDate(this.state.date), year)
      },
      () => this.handleYearChange(this.state.date)
    )
  }

  changeMonth(month: number) {
    this.setState(
      {
        date: setMonth(cloneDate(this.state.date), month)
      },
      () => this.handleMonthChange(this.state.date)
    )
  }

  header(date: Moment = this.state.date) {
    const startOfWeek = getStartOfWeek(cloneDate(date))
    const dayNames = []
    if (this.props.showWeekNumbers) {
      dayNames.push(
        <div key="W" className={this.blockClass('day-name')}>
          {this.props.weekLabel || '#'}
        </div>
      )
    }
    return dayNames.concat(
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(cloneDate(startOfWeek), offset)
        const localeData = getLocaleData(day)
        const weekDayName = this.props.useWeekdaysShort
          ? getWeekdayShortInLocale(localeData, day)
          : getWeekdayMinInLocale(localeData, day)
        return (
          <div key={offset} className={this.blockClass('day-name')}>
            {weekDayName}
          </div>
        )
      })
    )
  }

  renderPreviousMonthButton() {
    const {includeDates, minDate, forceShowMonthNavigation = defaultProps.forceShowMonthNavigation} = this.props

    if (!forceShowMonthNavigation && allDaysDisabledBefore(this.state.date, 'month', {includeDates, minDate})) {
      return null
    }
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        className={this.blockClass('navigation', {previous: true})}
        onClick={this.decreaseMonth}
        role="button"
        tabIndex={0}
      />
    )
  }

  renderNextMonthButton() {
    if (!this.props.forceShowMonthNavigation && allDaysDisabledAfter(this.state.date, 'month', this.props)) {
      return null
    }

    const mod: Object = {next: true}
    if (this.props.showTimeSelect) {
      mod['with-time'] = true
    }
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a className={this.blockClass('navigation', mod)} onClick={this.increaseMonth} role="button" tabIndex={0} />
    )
  }

  renderCurrentMonth(date: Moment = this.state.date) {
    const mod: Object = {}
    if (this.props.showYearDropdown) {
      mod['has-year-dropdown'] = true
    }
    if (this.props.showMonthDropdown) {
      mod['has-month-dropdown'] = true
    }
    return <div className={this.blockClass('current-month', mod)}>{formatDate(date, this.props.dateFormat)}</div>
  }

  renderYearDropdown(overrideHide: boolean = false) {
    if (!this.props.showYearDropdown || overrideHide) {
      return null
    }
    return (
      <YearDropdown
        adjustDateOnChange={this.props.adjustDateOnChange}
        styles={this.props.styles}
        date={this.state.date}
        onSelect={this.props.onSelect}
        setOpen={this.props.setOpen}
        dropdownMode={this.props.dropdownMode}
        onChange={this.changeYear}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        year={getYear(this.state.date)}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
      />
    )
  }

  renderMonthDropdown(overrideHide: boolean = false) {
    if (!this.props.showMonthDropdown || overrideHide) {
      return null
    }
    return (
      <MonthDropdown
        styles={this.props.styles}
        dropdownMode={this.props.dropdownMode}
        locale={this.props.locale}
        dateFormat={this.props.dateFormat}
        onChange={this.changeMonth}
        month={getMonth(this.state.date)}
      />
    )
  }

  renderTodayButton() {
    const {todayButton, onSelect: _onSelect, utcOffset} = this.props
    if (!todayButton) {
      return null
    }

    const onSelect = (event: SyntheticEvent<any>) => {
      _onSelect && _onSelect(getStartOfDate(now(utcOffset)), event)
    }

    return (
      <div className={this.blockClass('today-button')} onClick={onSelect} role="button" tabIndex={0}>
        {todayButton}
      </div>
    )
  }

  renderMonths() {
    const {monthsShown = defaultProps.monthsShown, dropdownMode = defaultProps.dropdownMode} = this.props
    const monthList = []
    for (let i = 0; i < monthsShown; ++i) {
      const monthDate = addMonths(cloneDate(this.state.date), i)
      const monthKey = `month-${i}`
      monthList.push(
        <div
          key={monthKey}
          ref={div => {
            this.monthContainer = div
          }}
          className={this.blockClass('container')}
        >
          <div className={this.blockClass('header')}>
            {this.renderCurrentMonth(monthDate)}
            <div
              className={this.blockClass('header-dropdown', {[dropdownMode]: true})}
              onFocus={this.handleDropdownFocus}
            >
              {this.renderMonthDropdown(i !== 0)}
              {this.renderYearDropdown(i !== 0)}
            </div>
            <div className={this.blockClass('day-names')}>{this.header(monthDate)}</div>
          </div>
          <Month
            styles={this.props.styles}
            day={monthDate}
            dayClassName={this.props.dayClassName}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            onMouseLeave={this.handleMonthMouseLeave}
            onWeekSelect={this.props.onWeekSelect}
            formatWeekNumber={this.props.formatWeekNumber}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            highlightDates={this.props.highlightDates}
            selectingDate={this.state.selectingDate}
            includeDates={this.props.includeDates}
            inline={this.props.inline}
            fixedHeight={this.props.fixedHeight}
            filterDate={this.props.filterDate}
            preSelection={this.props.preSelection}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            showWeekNumbers={this.props.showWeekNumbers}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            peekNextMonth={this.props.peekNextMonth}
            utcOffset={this.props.utcOffset}
          />
        </div>
      )
    }
    return monthList
  }

  renderTimeSection() {
    if (this.props.showTimeSelect) {
      return (
        <Time
          styles={this.props.styles}
          selected={this.props.selected}
          onChange={this.props.onTimeChange}
          format={this.props.timeFormat}
          intervals={this.props.timeIntervals}
          minTime={this.props.minTime}
          maxTime={this.props.maxTime}
          excludeTimes={this.props.excludeTimes}
          todayButton={this.props.todayButton}
          showMonthDropdown={this.props.showMonthDropdown}
          showYearDropdown={this.props.showYearDropdown}
          withPortal={this.props.withPortal}
          monthRef={this.state.monthContainer}
        />
      )
    }
    return null
  }

  render() {
    const className = this.blockClass(null, {portal: this.props.withPortal})
    return (
      <div className={className}>
        <div className={this.blockClass('triangle')} />
        {this.renderPreviousMonthButton()}
        {this.renderNextMonthButton()}
        {this.renderMonths()}
        {this.renderTodayButton()}
        {this.renderTimeSection()}
        {this.props.children}
      </div>
    )
  }
}
