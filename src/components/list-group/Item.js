// @flow
import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ListGroupItemProps = {
  tag?: React$ElementType,
  active?: boolean,
  disabled?: boolean,
  color?: string,
  action?: boolean,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'li'
}

const handleDisabledOnClick = e => {
  e.preventDefault()
}

const ListGroupItem = (props: ListGroupItemProps) => {
  const {
    className: _className,
    classNames: _classNames,
    tag: Tag = defaultProps.tag,
    active,
    disabled,
    action,
    color,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('item', {
    active,
    disabled,
    action,
    color
  })}`

  // Prevent click event when disabled.
  const onclick = disabled ? handleDisabledOnClick : false
  return <Tag {...attributes} className={className} onClick={onclick} />
}

export default ListGroupItem
