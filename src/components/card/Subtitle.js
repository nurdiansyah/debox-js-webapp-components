// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CardSubtitleProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'h6'
}

const CardSubtitle = (props: CardSubtitleProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('subtitle')
  return <Tag {...attributes} className={className} />
}

CardSubtitle.defaultProps = defaultProps
export default CardSubtitle
