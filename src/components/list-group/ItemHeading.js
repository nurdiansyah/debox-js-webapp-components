// @flow
import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ListGroupItemHeadingProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'h5'
}

const ListGroupItemHeading = (props: ListGroupItemHeadingProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('item-heading')}`

  return <Tag {...attributes} className={className} />
}

export default ListGroupItemHeading
