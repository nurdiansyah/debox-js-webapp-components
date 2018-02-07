// @flow
/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/href-no-hash */

import React from 'react'
import type {Moment} from 'moment'
import type {Placement} from 'popper.js'
import onClickOutside from 'react-onclickoutside'
import {Input} from '../form'
import type {HighlighDateType} from '@deboxsoft/webapp/utils/dateUtils'
import {
  newDate,
  now,
  cloneDate,
  isMoment,
  isDate,
  isBefore,
  isAfter,
  setTime,
  getSecond,
  getMinute,
  getHour,
  getMonth,
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subtractDays,
  subtractMonths,
  subtractWeeks,
  subtractYears,
  isSameDay,
  isDayDisabled,
  isDayInRange,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  parseDate,
  safeDateFormat,
  getHighLightDaysMap
} from '@deboxsoft/webapp/utils/dateUtils'

import {BLOCK_DATEPICKER_ID} from './constants'
import PopperComponent from './PopperComponent'
import Calendar from './Calendar'
import {classNamesFactory, type BemType} from '@deboxsoft/webapp/utils/classnamesUtils'

const WrappedCalendar = onClickOutside(Calendar)

export type DatePickerProps = {
  adjustDateOnChange?: ?boolean,
  allowSameDay?: ?boolean,
  autoComplete?: string,
  autoFocus?: ?boolean,
  calendarClassName?: string,
  children?: React$Node,
  styles?: Object | BemType,
  className?: string,
  customInput?: Object,
  customInputRef?: string,
  dateFormat?: string,
  dateFormatCalendar?: string,
  dayClassName?: string,
  disabled?: ?boolean,
  disabledKeyboardNavigation?: ?boolean,
  dropdownMode?: 'scroll' | 'select',
  endDate?: Moment,
  excludeDates?: Array<Moment>,
  filterDate?: Function,
  fixedHeight?: ?boolean,
  formatWeekNumber?: Function,
  highlightDates?: Array<Moment | Object>,
  id?: string,
  includeDates?: Array<Moment>,
  inline?: ?boolean,
  isClearAble?: ?boolean,
  locale?: string,
  maxDate?: Moment,
  minDate?: Moment,
  monthsShown?: number,
  name: string,
  onBlur?: Function,
  onChange?: Function,
  onSelect?: Function,
  onWeekSelect?: Function,
  onClickOutside?: Function,
  onChangeRaw?: Function,
  onFocus?: Function,
  onKeyDown?: Function,
  onMonthChange?: Function,
  onYearChange?: Function,
  openToDate?: Moment,
  peekNextMonth?: ?boolean,
  placeholderText?: string,
  popperContainer?: Function,
  popperClassName?: string,
  popperModifiers?: Object,
  popperPlacement?: Placement,
  preventOpenOnFocus?: ?boolean,
  readOnly?: ?boolean,
  required?: ?boolean,
  scrollableYearDropdown?: ?boolean,
  selected?: ?Moment,
  selectsEnd?: ?boolean,
  selectsStart?: ?boolean,
  showMonthDropdown?: ?boolean,
  showWeekNumbers?: ?boolean,
  showYearDropdown?: ?boolean,
  forceShowMonthNavigation?: ?boolean,
  startDate?: Moment,
  startOpen?: ?boolean,
  tabIndex?: number,
  title?: string,
  todayButton?: string,
  useWeekdaysShort?: ?boolean,
  utcOffset?: number,
  value?: string,
  weekLabel?: string,
  withPortal?: ?boolean,
  yearDropdownItemNumber?: number,
  shouldCloseOnSelect?: ?boolean,
  showTimeSelect?: ?boolean,
  timeFormat?: string,
  timeIntervals?: number,
  minTime?: Moment,
  maxTime?: Moment,
  excludeTimes?: Array<Moment>
}

type State = {
  inputValue: ?string,
  open: boolean,
  preventFocus: boolean,
  preSelection: Moment,
  highlightDates: Map<string, HighlighDateType>
}

const defaultProps = {
  dateFormat: 'L',
  dateFormatCalendar: 'MMMM YYYY',
  dropdownMode: 'scroll',
  filterDate: () => {},
  monthsShown: 1,
  shouldCloseOnSelect: true,
  timeIntervals: 30,
  locale: 'id'
}

/**
 * General datepicker component.
 */
class DatePicker extends React.PureComponent<DatePickerProps, State> {
  blockClass: Function
  calcInitialState: Function
  calendar: ?React$Ref<any>
  inputFocusTimeout: ?number
  handleCalendarClickOutside: Function
  handleChange: Function
  handleDropdownFocus: Function
  handleFocus: Function
  handleSelect: Function
  handleTimeChange: Function
  handleBlur: Function
  input: ?Object
  onInputClick: Function
  onInputKeyDown: Function
  onClearClick: Function
  preventFocusTimeout: number
  setReferenceInput: Function
  setFocus: Function
  setSelected: Function

  constructor(props: DatePickerProps) {
    super(props)
    this.blockClass = classNamesFactory(BLOCK_DATEPICKER_ID, props)
    this.state = this.calcInitialState()
    this.handleCalendarClickOutside = this.handleCalendarClickOutside.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDropdownFocus = this.handleDropdownFocus.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.onInputClick = this.onInputClick.bind(this)
    this.onInputKeyDown = this.onInputKeyDown.bind(this)
    this.onClearClick = this.onClearClick.bind(this)
    this.setSelected = this.setSelected.bind(this)
    this.setFocus = this.setFocus.bind(this)
    this.setReferenceInput = this.setReferenceInput.bind(this)
  }

  componentWillReceiveProps(nextProps: DatePickerProps) {
    const currentMonth = this.props.selected && getMonth(this.props.selected)
    const nextMonth = nextProps.selected && getMonth(nextProps.selected)
    if (this.props.inline && currentMonth !== nextMonth) {
      this.setPreSelection(nextProps.selected)
    }
    if (nextProps && this.props.highlightDates !== nextProps.highlightDates) {
      this.setState({
        highlightDates: getHighLightDaysMap(nextProps.highlightDates)
      })
    }
  }

  componentWillUnmount() {
    this.clearPreventFocusTimeout()
  }

  getPreSelection() {
    return this.props.openToDate
      ? newDate(this.props.openToDate)
      : this.props.selectsEnd && this.props.startDate
        ? newDate(this.props.startDate)
        : this.props.selectsStart && this.props.endDate ? newDate(this.props.endDate) : now(this.props.utcOffset)
  }

  calcInitialState() {
    const defaultPreSelection = this.getPreSelection()
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const boundedPreSelection =
      minDate && isBefore(defaultPreSelection, minDate)
        ? minDate
        : maxDate && isAfter(defaultPreSelection, maxDate) ? maxDate : defaultPreSelection
    return {
      open: this.props.startOpen || false,
      preventFocus: false,
      preSelection: this.props.selected ? newDate(this.props.selected) : boundedPreSelection,
      // transforming highlighted days (perhaps nested array)
      // to flat Map for faster access in day.jsx
      highlightDates: getHighLightDaysMap(this.props.highlightDates)
    }
  }

  clearPreventFocusTimeout() {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout)
    }
  }

  setFocus() {
    if (this.input) {
      const input = this.input
      input.focus && input.focus()
      input.setFocus && input.setFocus()
    }
  }

  setOpen(open: boolean) {
    this.setState({
      open,
      preSelection: open && this.state.open ? this.state.preSelection : this.calcInitialState().preSelection
    })
  }

  handleFocus(event: SyntheticEvent<HTMLElement>) {
    if (!this.state.preventFocus && this.props.onFocus) {
      this.props.onFocus(event)
      if (!this.props.preventOpenOnFocus) {
        this.setOpen(true)
      }
    }
  }

  cancelFocusInput() {
    clearTimeout(this.inputFocusTimeout)
    this.inputFocusTimeout = null
  }

  deferFocusInput() {
    this.cancelFocusInput()
    this.inputFocusTimeout = setTimeout(() => {
      this.setFocus()
    }, 1)
  }

  handleDropdownFocus() {
    this.cancelFocusInput()
  }

  handleBlur(event: SyntheticEvent<HTMLElement>) {
    if (this.state.open) {
      this.deferFocusInput()
    } else {
      this.props.onBlur && this.props.onBlur(event)
    }
  }

  handleCalendarClickOutside(event: SyntheticEvent<HTMLElement>) {
    if (!this.props.inline) {
      this.setOpen(false)
    }
    this.props.onClickOutside && this.props.onClickOutside(event)
    if (this.props.withPortal) {
      event.preventDefault()
    }
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>, value: string) {
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(event)
      if (event.isDefaultPrevented()) {
        return
      }
    }
    if (event.target instanceof HTMLInputElement || value) {
      const _value: string = event.target instanceof HTMLInputElement ? event.target.value : value
      this.setState({inputValue: _value})
      const date = parseDate(_value, {
        dateFormat: this.props.dateFormat || defaultProps.dateFormat,
        locale: this.props.locale || defaultProps.locale
      })
      if (date || !_value) {
        this.setSelected(date, event, true)
      }
    }
  }

  handleSelect(date: Moment, event: SyntheticEvent<HTMLElement>) {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({preventFocus: true}, () => {
      this.preventFocusTimeout = setTimeout(() => this.setState({preventFocus: false}), 50)
      return this.preventFocusTimeout
    })
    this.setSelected(date, event)
    if (!this.props.shouldCloseOnSelect || this.props.showTimeSelect) {
      this.setPreSelection(date)
    } else if (!this.props.inline) {
      this.setOpen(false)
    }
  }

  setSelected(date: Moment, event: SyntheticEvent<HTMLElement>, keepInput: boolean) {
    let changedDate = date

    if (changedDate !== null && isDayDisabled(changedDate, this.props)) {
      return
    }

    if (!isSameDay(this.props.selected, changedDate) || this.props.allowSameDay) {
      if (changedDate !== null) {
        if (this.props.selected) {
          changedDate = setTime(newDate(changedDate), {
            hour: getHour(this.props.selected),
            minute: getMinute(this.props.selected),
            second: getSecond(this.props.selected)
          })
        }
        this.setState({
          preSelection: changedDate
        })
      }
      this.props.onChange && this.props.onChange(changedDate, event)
    }

    this.props.onSelect && this.props.onSelect(changedDate, event)

    if (!keepInput) {
      this.setState({inputValue: null})
    }
  }

  setPreSelection(date: Moment) {
    const isDateRangePresent = typeof this.props.minDate !== 'undefined' && typeof this.props.maxDate !== 'undefined'
    const isValidDateSelection =
      isDateRangePresent && date ? isDayInRange(date, this.props.minDate, this.props.maxDate) : true
    if (isValidDateSelection) {
      this.setState({
        preSelection: date
      })
    }
  }

  setReferenceInput(input: ?Object) {
    this.input = input
  }

  handleTimeChange(time: Moment) {
    const selected = this.props.selected ? this.props.selected : this.getPreSelection()
    const changedDate = setTime(cloneDate(selected), {
      hour: getHour(time),
      minute: getMinute(time),
      second: 0
    })

    this.setState({
      preSelection: changedDate
    })

    this.props.onChange && this.props.onChange(changedDate)
    this.setOpen(false)
  }

  onInputClick() {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  }

  onInputKeyDown(event: SyntheticKeyboardEvent<HTMLInputElement>) {
    this.props.onKeyDown && this.props.onKeyDown(event)
    const eventKey = event.key
    if (!this.state.open && !this.props.inline && !this.props.preventOpenOnFocus) {
      if (eventKey !== 'Enter' && eventKey !== 'Escape' && eventKey !== 'Tab') {
        this.onInputClick()
      }
      return
    }
    const copy = newDate(this.state.preSelection)
    if (eventKey === 'Enter') {
      event.preventDefault()
      if (isMoment(this.state.preSelection) || isDate(this.state.preSelection)) {
        this.handleSelect(copy, event)
        !this.props.shouldCloseOnSelect && this.setPreSelection(copy)
      } else {
        this.setOpen(false)
      }
    } else if (eventKey === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (eventKey === 'Tab') {
      this.setOpen(false)
    } else if (!this.props.disabledKeyboardNavigation) {
      let newSelection
      switch (eventKey) {
        case 'ArrowLeft':
          event.preventDefault()
          newSelection = subtractDays(copy, 1)
          break
        case 'ArrowRight':
          event.preventDefault()
          newSelection = addDays(copy, 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          newSelection = subtractWeeks(copy, 1)
          break
        case 'ArrowDown':
          event.preventDefault()
          newSelection = addWeeks(copy, 1)
          break
        case 'PageUp':
          event.preventDefault()
          newSelection = subtractMonths(copy, 1)
          break
        case 'PageDown':
          event.preventDefault()
          newSelection = addMonths(copy, 1)
          break
        case 'Home':
          event.preventDefault()
          newSelection = subtractYears(copy, 1)
          break
        case 'End':
          event.preventDefault()
          newSelection = addYears(copy, 1)
          break
        default:
      }
      if (this.props.adjustDateOnChange) {
        this.setSelected(newSelection)
      }
      this.setPreSelection(newSelection)
    }
  }

  onClearClick(event: SyntheticEvent<HTMLElement>) {
    event.preventDefault()
    this.props.onChange && this.props.onChange(null, event)
    this.setState({inputValue: null})
  }

  renderCalendar() {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return (
      <WrappedCalendar
        ref={elem => {
          this.calendar = elem
        }}
        locale={this.props.locale}
        styles={this.props.styles}
        adjustDateOnChange={this.props.adjustDateOnChange}
        setOpen={this.setOpen}
        dateFormat={this.props.dateFormatCalendar || defaultProps.dateFormatCalendar}
        useWeekdaysShort={this.props.useWeekdaysShort}
        dropdownMode={this.props.dropdownMode || defaultProps.dropdownMode}
        selected={this.props.selected}
        preSelection={this.state.preSelection}
        onSelect={this.handleSelect}
        onWeekSelect={this.props.onWeekSelect}
        openToDate={this.props.openToDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selectsStart={this.props.selectsStart}
        selectsEnd={this.props.selectsEnd}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        formatWeekNumber={this.props.formatWeekNumber}
        highlightDates={this.state.highlightDates}
        includeDates={this.props.includeDates}
        inline={this.props.inline}
        peekNextMonth={this.props.peekNextMonth}
        showMonthDropdown={this.props.showMonthDropdown}
        showWeekNumbers={this.props.showWeekNumbers}
        showYearDropdown={this.props.showYearDropdown}
        withPortal={this.props.withPortal}
        forceShowMonthNavigation={this.props.forceShowMonthNavigation}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        todayButton={this.props.todayButton}
        weekLabel={this.props.weekLabel}
        utcOffset={this.props.utcOffset}
        fixedHeight={this.props.fixedHeight}
        monthsShown={this.props.monthsShown || defaultProps.monthsShown}
        onDropdownFocus={this.handleDropdownFocus}
        onMonthChange={this.props.onMonthChange}
        onYearChange={this.props.onYearChange}
        dayClassName={this.props.dayClassName}
        showTimeSelect={this.props.showTimeSelect}
        onTimeChange={this.handleTimeChange}
        timeFormat={this.props.timeFormat}
        timeIntervals={this.props.timeIntervals || defaultProps.timeIntervals}
        minTime={this.props.minTime}
        maxTime={this.props.maxTime}
        excludeTimes={this.props.excludeTimes}
        className={this.props.calendarClassName}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
      >
        {this.props.children}
      </WrappedCalendar>
    )
  }

  renderDateInput() {
    const className =
      (this.props.className ? `${this.props.className} ` : '') +
      this.blockClass(null, {
        open: this.state.open
      })

    const customInput = this.props.customInput
    const customInputRef = this.props.customInputRef || 'ref'
    const inputValue =
      typeof this.props.value === 'string'
        ? this.props.value
        : typeof this.state.inputValue === 'string'
          ? this.state.inputValue
          : safeDateFormat(this.props.selected, {
              dateFormat: this.props.dateFormat || defaultProps.dateFormat,
              locale: this.props.locale || defaultProps.locale
            })

    if (customInput) {
      return React.cloneElement(customInput, {
        [customInputRef]: input => {
          this.input = input
        },
        value: inputValue,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onClick: this.onInputClick,
        onFocus: this.handleFocus,
        onKeyDown: this.onInputKeyDown,
        id: this.props.id,
        name: this.props.name,
        autoFocus: this.props.autoFocus,
        placeholder: this.props.placeholderText,
        disabled: this.props.disabled,
        autoComplete: this.props.autoComplete,
        className,
        title: this.props.title,
        readOnly: this.props.readOnly,
        required: this.props.required,
        tabIndex: this.props.tabIndex,
        styles: this.props.styles
      })
    }
    return (
      <Input
        type="text"
        getRef={this.setReferenceInput}
        value={inputValue}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onClick={this.onInputClick}
        onFocus={this.handleFocus}
        onKeyDown={this.onInputKeyDown}
        id={this.props.id}
        name={this.props.name}
        autoFocus={!!this.props.autoFocus}
        placeholder={this.props.placeholderText}
        disabled={!!this.props.disabled}
        autoComplete={this.props.autoComplete}
        className={className}
        title={this.props.title}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex}
        styles={this.props.styles}
      />
    )
  }

  renderClearButton() {
    if (this.props.isClearAble && this.props.selected != null) {
      return (
        <a className={this.blockClass('close-icon')} href="#" onClick={this.onClearClick} role="button" tabIndex={0} />
      )
    }
    return null
  }

  render() {
    const calendar = this.renderCalendar()

    if (this.props.inline && !this.props.withPortal) {
      return calendar
    }

    if (this.props.withPortal) {
      return (
        <div>
          {!this.props.inline ? (
            <div className={this.blockClass('input')}>
              {this.renderDateInput()}
              {this.renderClearButton()}
            </div>
          ) : null}
          {this.state.open || this.props.inline ? <div className={this.blockClass('portal')}>{calendar}</div> : null}
        </div>
      )
    }

    return (
      <PopperComponent
        className={this.props.popperClassName}
        styles={this.props.styles}
        hidePopper={!this.state.open || !!this.props.disabled}
        popperModifiers={this.props.popperModifiers}
        targetComponent={
          <div className={this.blockClass('input')}>
            {this.renderDateInput()}
            {this.renderClearButton()}
          </div>
        }
        popperContainer={this.props.popperContainer}
        popperComponent={calendar}
        popperPlacement={this.props.popperPlacement}
      />
    )
  }
}

export default DatePicker
