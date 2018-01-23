// @flow

import React from 'react'
import type {Moment} from 'moment'
import {getDay, getMonth, getDate, now, isSameDay, isDayDisabled, isDayInRange, getDayOfWeekCode} from '../utils/dateUtils'
import {classNamesFactory, type BemType} from '../utils/classnamesUtils'
import type {HighlighDateType} from '../utils/dateUtils'
import {BLOCK_DAY_ID} from './constants'

type DayProps = {
  day: Moment,
  className: string,
  dayClassName?: Function,
  styles?: BemType,
  endDate?: Moment,
  highlightDates?: Map<string, HighlighDateType>,
  inline?: ?boolean,
  month?: number,
  onClick?: Function,
  onMouseEnter?: Function,
  preSelection?: Moment,
  selected?: Moment,
  selectingDate?: Moment,
  selectsEnd?: ?boolean,
  selectsStart?: ?boolean,
  startDate?: Moment,
  utcOffset?: number
}

const Day = (props: DayProps) => {
  const {
    className,
    day,
    onClick,
    onMouseEnter,
    inline,
    selected,
    preSelection,
    highlightDates,
    startDate,
    endDate,
    selectsStart,
    selectsEnd,
    selectingDate,
    month,
    dayClassName
  } = props
  const isDisabled = () => isDayDisabled(day, day)
  const blockClass = classNamesFactory(BLOCK_DAY_ID, {styles: props.styles})

  const handleClick = event => {
    if (!isDisabled() && onClick) {
      onClick(day, event)
    }
  }

  const handleMouseEnter = event => {
    if (!isDisabled() && onMouseEnter) {
      onMouseEnter(event)
    }
  }

  const isKeyboardSelected = () => !inline && !isSameDay(day, selected) && isSameDay(day, preSelection)

  const getHighLightedClass = () => {
    if (!highlightDates) {
      return {}
    }

    // Looking for className in the Map of {'day string, 'className'}
    const dayStr = day.format('MM.DD.YYYY')
    return highlightDates.get(dayStr)
  }

  const isInRange = () => {
    if (!startDate || !endDate) {
      return false
    }
    return isDayInRange(day, startDate, endDate)
  }

  const isInSelectingRange = () => {
    if (!(selectsStart || selectsEnd) || !selectingDate || isDisabled()) {
      return false
    }

    if (selectsStart && endDate && selectingDate.isSameOrBefore(endDate)) {
      return isDayInRange(day, selectingDate, endDate)
    }

    if (selectsEnd && startDate && selectingDate.isSameOrAfter(startDate)) {
      return isDayInRange(day, startDate, selectingDate)
    }

    return false
  }

  const isSelectingRangeStart = () => {
    if (!isInSelectingRange()) {
      return false
    }
    if (selectsStart) {
      return isSameDay(day, selectingDate)
    }
    return isSameDay(day, startDate)
  }

  const isSelectingRangeEnd = () => {
    if (!isInSelectingRange()) {
      return false
    }
    if (selectsEnd) {
      return isSameDay(day, selectingDate)
    }
    return isSameDay(day, endDate)
  }

  const isRangeStart = () => {
    if (!startDate || !endDate) {
      return false
    }
    return isSameDay(startDate, day)
  }

  const isRangeEnd = () => {
    if (!startDate || !endDate) {
      return false
    }
    return isSameDay(endDate, day)
  }

  const isWeekend = () => {
    const weekday = getDay(day)
    return weekday === 0 || weekday === 6
  }

  const isOutsideMonth = () => month !== undefined && month !== getMonth(day)

  const getClassNames = date => {
    const classes = dayClassName ? `${dayClassName(date)} ` : `${className} `
    return (
      classes +
      blockClass(null, {
        'day-of-week': getDayOfWeekCode(props.day),
        disabled: isDisabled(),
        selected: isSameDay(day, selected),
        'keyboard-selected': isKeyboardSelected(),
        'range-start': isRangeStart(),
        'range-end': isRangeEnd(),
        'in-range': isInRange(),
        'in-selecting-range': isInSelectingRange(),
        'selecting-range-start': isSelectingRangeStart(),
        'selecting-range-end': isSelectingRangeEnd(),
        today: isSameDay(now(props.utcOffset)),
        weekend: isWeekend(),
        'outside-month': isOutsideMonth(),
        ...getHighLightedClass()
      })
    )
  }

  return (
    <div
      className={getClassNames(props.day)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      aria-label={`day-${getDate(props.day)}`}
      role="option"
      aria-selected={isSameDay(day, selected)}
      tabIndex={0}
    >
      {getDate(props.day)}
    </div>
  )
}

Day.defaultProps = {
  displayName: 'Day'
}

export default Day
