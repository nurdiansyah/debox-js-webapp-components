// @flow

import React from 'react'
import {classNamesFactory, type BemType} from '../utils/classnamesUtils'
import {BLOCK_CALENDAR_ID} from './constants'

type WeekNumberProps = {
  styles?: BemType,
  weekNumber: number,
  onClick: ?Function
}

export default (props: WeekNumberProps) => {
  const {styles} = props
  const blockClass = classNamesFactory(BLOCK_CALENDAR_ID, {styles})
  const {weekNumber, onClick} = props
  const handleClick = event => {
    onClick && onClick(event)
  }

  const className = blockClass('week-number', {clickable: !!onClick})
  return (
    <div className={className} aria-label={`week-${weekNumber}`} onClick={handleClick} role="button" tabIndex={0}>
      {weekNumber}
    </div>
  )
}
