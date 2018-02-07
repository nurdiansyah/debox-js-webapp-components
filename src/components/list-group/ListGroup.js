// @flow
import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ListGroupProps = {
  tag?: React$ElementType,
  flush?: boolean,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'ul'
}

const ListGroup = (props: ListGroupProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, flush, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames(null, {flush})}`

  return <Tag {...attributes} className={className} />
}

export default ListGroup
