// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type NavbarProps = {
  children?: React$Node,
  inverse?: boolean,
  placement?: 'full-width' | 'fixed-top' | 'fixed-bottom' | 'sticky-top',
  color?: string,
  role?: string,
  tag?: React$ElementType,
  withContainer?: ?boolean,
  classBlock?: Object,
  className?: string,
  classNames?: Function,
  toggleable?: string | boolean
}

const defaultProps = {
  tag: 'nav',
  toggleable: false,
  light: true,
  placement: 'full-width'
}

const Navbar = (props: NavbarProps) => {
  const {
    toggleable = defaultProps.toggleable,
    className: _className,
    classNames: _classNames,
    inverse,
    placement,
    color,
    tag: Tag = defaultProps.tag,
    role: _role,
    children,
    withContainer = true,
    ..._attributes
  } = props
  const attributes: Object = _attributes

  if (_role || Tag !== 'nav') {
    attributes.role = _role || 'navigation'
  }

  const classNames = propsClassNames({classNames: _classNames})
  let className = _className ? `${_className} ` : ''
  className += classNames(null, {
    toggleable,
    placement: defaultProps.placement ? placement : false,
    color,
    inverse
  })

  return (
    <Tag {...attributes} className={className}>
      {withContainer ? <div className={classNames('container')}>{children}</div> : children}
    </Tag>
  )
}

export default Navbar
