// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CardTitleProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'h4'
}

const CardTitle = (props: CardTitleProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('title')

  return <Tag {...attributes} className={className} />
}

CardTitle.defaultProps = defaultProps
export default CardTitle
