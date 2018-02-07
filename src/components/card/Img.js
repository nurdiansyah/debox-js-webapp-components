// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type CardImgProps = {
  tag?: React$ElementType,
  top?: boolean,
  bottom?: boolean,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'img'
}

const CardImg = (props: CardImgProps) => {
  const {
    className: _className,
    classNames: _classNames,
    top,
    bottom,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('img')

  return <Tag {...attributes} className={className} />
}

CardImg.defaultProps = defaultProps
export default CardImg
