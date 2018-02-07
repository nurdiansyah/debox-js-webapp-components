// @flow

import React from 'react'
import type {Node} from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type BadgeProps = {
  color?: string,
  pill?: boolean,
  tag?: React$ElementType,
  children?: Node,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  color: 'default',
  tag: 'span'
}

const Badge = (props: BadgeProps) => {
  const {
    className: _className,
    classNames: _classNames,
    color = defaultProps.color,
    pill,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames(null, {color, pill})}`

  return <Tag {...attributes} className={className} />
}

export default Badge
