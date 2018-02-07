// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type CardColumnsProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'div'
}

const CardColumns = (props: CardColumnsProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames('column')

  return <Tag {...attributes} className={className} />
}

export default CardColumns
