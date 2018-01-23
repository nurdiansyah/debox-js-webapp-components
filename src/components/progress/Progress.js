// @flow

import React from 'react'
import toNumber from 'lodash/toNumber'
import {propsClassNames} from '../utils/classnamesUtils'

export type ProgressProps = {
  children?: React$Node,
  bar?: boolean,
  multi?: boolean,
  tag?: string,
  value?: string | number,
  max?: string | number,
  animated?: boolean,
  striped?: boolean,
  color?: string,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'div',
  value: 0,
  max: 100
}

const Progress = (props: ProgressProps) => {
  const {
    children,
    className: _className,
    classNames: _classNames,
    value = defaultProps.value,
    max = defaultProps.max,
    animated,
    striped,
    color,
    bar,
    multi,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const percent = toNumber(value) / toNumber(max) * 100

  const classNames = propsClassNames({classNames: _classNames})
  const progressClasses = `${_className ? `${_className} ` : ''}${classNames()}`

  const progressBarClasses = classNames('bar', {animated, color, striped})

  const ProgressBar = multi ? (
    children
  ) : (
    <div className={progressBarClasses} style={{width: `${percent}%`}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
      {children}
    </div>
  )

  if (bar) {
    return ProgressBar
  }

  return (
    <Tag {...attributes} className={progressClasses}>
      {ProgressBar}
    </Tag>
  )
}

export default Progress
