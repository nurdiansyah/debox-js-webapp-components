// @flow

import React from 'react'
import type {Moment} from 'moment'
import Day from './Day'
import * as utils from '@deboxsoft/webapp/utils/dateUtils'
import type {HighlighDateType} from '@deboxsoft/webapp/utils/dateUtils'
import {classNamesFactory, type BemType} from '@deboxsoft/webapp/utils/classnamesUtils'

import WeekNumber from './WeekNumber'
import {BLOCK_CALENDAR_ID} from './constants'

type WeekProps = {
  styles?: BemType,
  day: Moment,
  dayClassName?: Function,
  endDate?: Moment,
  excludeDates?: Array<Moment>,
  filterDate?: Function,
  formatWeekNumber?: Function,
  highlightDates?: Map<string, HighlighDateType>,
  includeDates?: Array<Moment>,
  inline?: ?boolean,
  maxDate?: Moment,
  minDate?: Moment,
  month?: number,
  onDayClick?: Function,
  onDayMouseEnter?: Function,
  onWeekSelect?: Function,
  preSelection?: Moment,
  selected?: Moment,
  selectingDate?: Moment,
  selectsEnd?: ?boolean,
  selectsStart?: ?boolean,
  showWeekNumber?: ?boolean,
  startDate?: Moment,
  utcOffset?: number
}

const Week = (props: WeekProps) => {
  const {
    styles,
    dayClassName,
    month,
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    inline,
    highlightDates,
    selectingDate,
    filterDate,
    preSelection,
    selected,
    selectsStart,
    selectsEnd,
    startDate,
    endDate,
    utcOffset
  } = props
  const blockClass = classNamesFactory(BLOCK_CALENDAR_ID, {styles})
  const handleDayClick = (day, event) => props.onDayClick && props.onDayClick(day, event)

  const handleDayMouseEnter = day => props.onDayMouseEnter && props.onDayMouseEnter(day)

  const handleWeekClick = (day, weekNumber, event) => props.onWeekSelect && props.onWeekSelect(day, weekNumber, event)

  const formatWeekNumber = startOfWeek => {
    props.formatWeekNumber && props.formatWeekNumber(startOfWeek)
    return utils.getWeek(startOfWeek)
  }

  const renderDays = () => {
    const startOfWeek = utils.getStartOfWeek(utils.cloneDate(props.day))
    const days = []
    const weekNumber = formatWeekNumber(startOfWeek)
    if (props.showWeekNumber) {
      const onClickAction = props.onWeekSelect ? handleWeekClick(startOfWeek, weekNumber) : undefined
      days.push(<WeekNumber key="W" weekNumber={weekNumber} onClick={onClickAction} />)
    }
    return days.concat(
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = utils.addDays(utils.cloneDate(startOfWeek), offset)
        return (
          <Day
            className={blockClass('day')}
            styles={styles}
            key={offset}
            day={day}
            month={month}
            onClick={handleDayClick}
            onMouseEnter={handleDayMouseEnter}
            minDate={minDate}
            maxDate={maxDate}
            excludeDates={excludeDates}
            includeDates={includeDates}
            inline={inline}
            highlightDates={highlightDates}
            selectingDate={selectingDate}
            filterDate={filterDate}
            preSelection={preSelection}
            selected={selected}
            selectsStart={selectsStart}
            selectsEnd={selectsEnd}
            startDate={startDate}
            endDate={endDate}
            dayClassName={dayClassName}
            utcOffset={utcOffset}
          />
        )
      })
    )
  }
  return <div className={blockClass('week')}>{renderDays()}</div>
}

Week.defaultProps = {
  displayName: 'Week'
}

export default Week
