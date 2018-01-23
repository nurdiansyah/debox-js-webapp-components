// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CardLinkProps = {
  tag?: React$ElementType,
  getRef?: React$ElementRef<*>,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'a'
}

const CardLink = (props: CardLinkProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, getRef, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('link')

  return <Tag {...attributes} ref={getRef} className={className} />
}

CardLink.defaultProps = defaultProps
export default CardLink
