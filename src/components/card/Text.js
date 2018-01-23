// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CardTextProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'p'
}

const CardText = (props: CardTextProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('text')

  return <Tag {...attributes} className={className} />
}

CardText.defaultProps = defaultProps
export default CardText
