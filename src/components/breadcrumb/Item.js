// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type BreadcrumbItemProps = {
  tag?: React$ElementType,
  active?: boolean,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'li'
}

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const {className: _className, classNames: _classNames, active, tag: Tag = defaultProps.tag, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} + ' '` : ''}${classNames('item', {active})}`

  return <Tag {...attributes} className={className} />
}

export default BreadcrumbItem
