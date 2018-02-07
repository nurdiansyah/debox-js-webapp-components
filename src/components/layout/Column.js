// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

type sizeType =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | 'three-quarters'
  | 'two-thirds'
  | 'half'
  | 'one-third'
  | 'one-quarter'

export type ColumnProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function,
  size?: sizeType,
  extClassName?: string
}

const defaultProps = {
  tag: 'div'
}

const Column = (props: ColumnProps) => {
  const {className: _className, classNames: _classNames, size, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('column', {size})}`

  return <Tag {...attributes} className={className} />
}

export default Column
