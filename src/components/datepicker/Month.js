// @flow

import React from 'react'
import type {Moment} from 'moment'
import * as utils from '../utils/dateUtils'
import type {HighlighDateType} from '../utils/dateUtils'
import {classNamesFactory, type BemType} from '../utils/classnamesUtils'

import Week from './Week'
import {BLOCK_CALENDAR_ID} from './constants'

const FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6

type MonthProps = {
  styles?: BemType,
  day?: Moment,
  dayClassName?: Function,
  endDate?: Moment,
  excludeDates?: Array<Moment>,
  filterDate?: Function,
  fixedHeight?: ?boolean,
  formatWeekNumber?: Function,
  highlightDates?: Map<string, HighlighDateType>,
  includeDates?: Array<Moment>,
  inline?: ?boolean,
  maxDate?: Moment,
  minDate?: Moment,
  onDayClick?: Function,
  onDayMouseEnter?: Function,
  onMouseLeave?: Function,
  onWeekSelect?: Function,
  peekNextMonth?: ?boolean,
  preSelection?: Moment,
  selected?: Moment,
  selectingDate?: Moment,
  selectsEnd?: ?boolean,
  selectsStart?: ?boolean,
  showWeekNumbers?: ?boolean,
  startDate?: Moment,
  utcOffset?: number
}

const Month = (props: MonthProps) => {
  const {onDayClick, onDayMouseEnter, onMouseLeave, fixedHeight} = props

  const blockClass = classNamesFactory(BLOCK_CALENDAR_ID, props)
  const handleDayClick = (day: Moment, event: SyntheticEvent<HTMLElement>) => {
    if (onDayClick) {
      onDayClick(day, event)
    }
  }

  const handleDayMouseEnter = (day: Moment) => {
    if (onDayMouseEnter) {
      onDayMouseEnter(day)
    }
  }

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave()
    }
  }

  const isWeekInMonth = startOfWeek => {
    const endOfWeek = utils.addDays(utils.cloneDate(startOfWeek), 6)
    return utils.isSameMonth(startOfWeek, props.day) || utils.isSameMonth(endOfWeek, props.day)
  }

  const renderWeeks = () => {
    const weeks = []
    const isFixedHeight = fixedHeight
    let currentWeekStart = utils.getStartOfWeek(utils.getStartOfMonth(utils.cloneDate(props.day)))
    let i = 0
    let breakAfterNextPush = false

    // eslint-disable-next-line no-constant-condition
    while (true) {
      weeks.push(
        <Week
          key={i}
          styles={props.styles}
          day={currentWeekStart}
          month={utils.getMonth(props.day)}
          onDayClick={handleDayClick}
          onDayMouseEnter={handleDayMouseEnter}
          onWeekSelect={props.onWeekSelect}
          formatWeekNumber={props.formatWeekNumber}
          minDate={props.minDate}
          maxDate={props.maxDate}
          excludeDates={props.excludeDates}
          includeDates={props.includeDates}
          inline={props.inline}
          highlightDates={props.highlightDates}
          selectingDate={props.selectingDate}
          filterDate={props.filterDate}
          preSelection={props.preSelection}
          selected={props.selected}
          selectsStart={props.selectsStart}
          selectsEnd={props.selectsEnd}
          showWeekNumber={props.showWeekNumbers}
          startDate={props.startDate}
          endDate={props.endDate}
          dayClassName={props.dayClassName}
          utcOffset={props.utcOffset}
        />
      )

      if (breakAfterNextPush) break

      i++
      currentWeekStart = utils.addWeeks(utils.cloneDate(currentWeekStart), 1)

      // If one of these conditions is true, we will either break on this week
      // or break on the next week
      const isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT
      const isNonFixedAndOutOfMonth = !isFixedHeight && !isWeekInMonth(currentWeekStart)

      if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
        if (props.peekNextMonth) {
          breakAfterNextPush = true
        } else {
          break
        }
      }
    }

    return weeks
  }

  const getClassNames = () => {
    const {selectingDate, selectsStart, selectsEnd} = props
    return blockClass('month', {
      'selecting-range': selectingDate && (selectsStart || selectsEnd)
    })
  }

  return (
    <div className={getClassNames()} onMouseLeave={handleMouseLeave} role="listbox" tabIndex={0}>
      {renderWeeks()}
    </div>
  )
}

Month.defaultProps = {
  displayName: 'Month'
}

export default Month
