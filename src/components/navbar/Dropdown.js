// @flow

import React, {type ChildrenArray} from 'react'

import Dropdown from './Dropdown'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type NavbarDropdownProps = {
  children?: ChildrenArray<*>,
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'li'
}

const NavDropdown = (props: NavbarDropdownProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('dropdown')}`

  return <Dropdown {...attributes} tag={Tag} className={className} />
}

export default NavDropdown
