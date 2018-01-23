// @flow

import React, {PureComponent} from 'react'
import getKey from 'lodash/uniqueId'
import type {Moment} from 'moment'
import {
  getHour,
  getMinute,
  newDate,
  getStartOfDay,
  addMinutes,
  cloneDate,
  formatDate,
  isTimeInDisabledRange,
  isTimeDisabled
} from '../utils/dateUtils'
import {classNamesFactory, type BemType} from '../utils/classnamesUtils'
import {BLOCK_TIME_ID} from './constants'

export type TimeProps = {
  styles?: BemType,
  format?: string,
  intervals?: number,
  selected?: Moment,
  onChange?: Function,
  todayButton?: string,
  minTime?: Moment,
  monthRef?: Moment,
  maxTime?: Moment,
  excludeTimes?: Array<Moment>
}

const defaultProps = {
  intervals: 30,
  onTimeChange: () => {},
  todayButton: null
}

export default class Time extends PureComponent<TimeProps> {
  list: ?HTMLUListElement
  classBlock: Function
  handleClick: Function

  constructor(props: TimeProps) {
    super(props)
    const {styles} = props
    this.classBlock = classNamesFactory(BLOCK_TIME_ID, {styles})

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    const multiplier = 60 / (this.props.intervals || defaultProps.intervals)
    const currH = this.props.selected ? getHour(this.props.selected) : getHour(newDate())
    if (this.list) {
      this.list.scrollTop = 30 * (multiplier * currH)
    }
  }

  handleClick(time: Moment) {
    if (
      ((this.props.minTime || this.props.maxTime) && isTimeInDisabledRange(time, this.props)) ||
      (this.props.excludeTimes && isTimeDisabled(time, this.props.excludeTimes))
    ) {
      return
    }

    this.props.onChange && this.props.onChange(time)
  }

  listClassName(time: Moment, currH: Moment, currM: Moment) {
    const modifier = {}

    if (currH === getHour(time) && currM === getMinute(time)) {
      modifier.selected = true
    }
    if (
      ((this.props.minTime || this.props.maxTime) && isTimeInDisabledRange(time, this.props)) ||
      (this.props.excludeTimes && isTimeDisabled(time, this.props.excludeTimes))
    ) {
      modifier.disabled = true
    }
    return this.classBlock('time-list-item', modifier)
  }

  renderTimes() {
    const times = []
    const format = this.props.format ? this.props.format : 'hh:mm A'
    const intervals = this.props.intervals || defaultProps.intervals
    const activeTime = this.props.selected ? this.props.selected : newDate()
    const currH = getHour(activeTime)
    const currM = getMinute(activeTime)
    const base = getStartOfDay(newDate())
    const multiplier = 1440 / intervals
    for (let i = 0; i < multiplier; i++) {
      times.push(addMinutes(cloneDate(base), i * intervals))
    }

    return times.map((time: Moment) => (
      <li key={getKey('time-item')} className={this.listClassName(time, currH, currM)}>
        <div onClick={this.handleClick(time)} role="button" tabIndex={0}>
          {formatDate(time, format)}
        </div>
      </li>
    ))
  }

  render() {
    let height = null
    if (this.props.monthRef) {
      height = this.props.monthRef.clientHeight - 39
    }

    return (
      <div className={this.classBlock('time-container', {'with-today-button': this.props.todayButton})}>
        <div className={this.classBlock('header', {time: true})}>
          <div>Time</div>
        </div>
        <div className={this.classBlock('time')}>
          <div className={this.classBlock('time-block')}>
            <ul
              className={this.classBlock('time-list')}
              ref={list => {
                this.list = list
              }}
              style={height ? {height} : {}}
            >
              {this.renderTimes.bind(this)()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
