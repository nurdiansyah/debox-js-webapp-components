// @flow

import React from 'react'
import _classNames from 'classnames'

export type MenuProps = {
  tabs?: boolean,
  pills?: boolean,
  vertical?: boolean,
  justified?: boolean,
  navbar?: boolean,
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'ul',
  classNames: _classNames
}

const Nav = (props: MenuProps) => {
  const {
    className: _className,
    classNames = defaultProps.classNames,
    tabs,
    pills,
    vertical,
    justified,
    navbar,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const className = classNames(_className || (navbar ? 'navbar-nav' : 'nav'), {
    'nav-tabs': tabs,
    'nav-pills': pills,
    'nav-justified': justified,
    'flex-column': vertical
  })

  return <Tag {...attributes} className={className} />
}

export default Nav
