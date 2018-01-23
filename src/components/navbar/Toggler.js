// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

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

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('toggler', {position})}`

  let role
  if (type === 'button') {
    role = 'button'
  }

  return (
    <Tag className={className} {...attributes} role={role}>
      {children || <span className={classNames('navbar-toggler-icon')} />}
    </Tag>
  )
}

export default NavbarToggler
