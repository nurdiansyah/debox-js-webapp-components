// @flow

import React from 'react'
import _classNames from 'classnames'

export type MenuItemProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'li',
  classNames: _classNames
}

const NavItem = (props: MenuItemProps) => {
  const {
    className: _className,
    classNames = defaultProps.classNames,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const className = classNames(_className || 'nav-item')

  return <Tag {...attributes} className={className} />
}

export default NavItem
