// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'
import classNames from 'classNames'

export type NavbarTogglerProps = {
  tag?: React$ElementType,
  type?: string,
  className?: string,
  classNames?: Function,
  children?: React$Node,
  position?: 'left' | 'right'
}

const defaultProps = {
  tag: 'button',
  type: 'button'
}

const NavbarToggler = (props: NavbarTogglerProps) => {
  const {
    className: _className,
    classNames: _classNames,
    children,
    position,
    type = defaultProps.type,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const navbarCN = propsClassNames({classNames: _classNames})
  const className = classNames(_className, navbarCN('toggler', {position}))

  let role
  if (type === 'button') {
    role = 'button'
  }

  return (
    <Tag className={className} {...attributes} role={role}>
      {children || <span className={navbarCN('navbar-toggler-icon')} />}
    </Tag>
  )
}

export default NavbarToggler
