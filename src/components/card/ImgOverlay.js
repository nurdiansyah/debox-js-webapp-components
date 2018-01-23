// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CardImgOverlayProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'div'
}

const CardImgOverlay = (props: CardImgOverlayProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('img-overlay')

  return <Tag {...attributes} className={className} />
}

CardImgOverlay.defaultProps = defaultProps
export default CardImgOverlay
