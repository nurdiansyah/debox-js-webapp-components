// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CardDeckProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'div'
}

const CardDeck = (props: CardDeckProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('deck')

  return <Tag {...attributes} className={className} />
}

export default CardDeck
