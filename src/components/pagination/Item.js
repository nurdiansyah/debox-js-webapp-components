// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type PaginationItemProps = {
  active?: boolean,
  children?: React$Node,
  className?: string,
  classNames?: Function,
  disabled?: boolean,
  tag?: React$ElementType
}

const defaultProps = {
  tag: 'li'
}

const PaginationItem = (props: PaginationItemProps) => {
  const {active, className: _className, classNames: _classNames, disabled, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = classNames(_className || 'item', {
    active,
    disabled
  })

  return <Tag {...attributes} className={className} />
}

export default PaginationItem
