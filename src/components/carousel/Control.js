// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CarouselControlProps = {
  tag: React$ElementType,
  classNames: Function,
  direction: 'prev' | 'next',
  directionText: string,
  onClickHandler: Function
}

const defaultProps = {
  tag: 'a'
}

const CarouselControl = (props: CarouselControlProps) => {
  const {tag: Tag = defaultProps.tag, direction, classNames: _classNames, onClickHandler, directionText, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const anchorClasses = classNames('control', {direction})
  const iconClasses = classNames('control-icon', {direction})
  const screenReaderClasses = classNames('sr-only')

  return (
    <Tag
      {...attributes}
      className={anchorClasses}
      role="button"
      onClick={e => {
        e.preventDefault()
        onClickHandler()
      }}
    >
      <span className={iconClasses} />
      <span className={screenReaderClasses}>{directionText || direction}</span>
    </Tag>
  )
}

CarouselControl.defaultProps = defaultProps
export default CarouselControl
