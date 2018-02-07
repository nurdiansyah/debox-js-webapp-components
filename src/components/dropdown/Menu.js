// @flow

import React from 'react'
import PropTypes from 'prop-types'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type DropdownMenuProps = {
  children?: React$Node,
  className?: string,
  classNames?: Function,
  right?: boolean,
  tag?: React$ElementType
}

type ContextTypes = {
  isOpen: boolean
}

const defaultProps = {
  tag: 'div'
}

const DropdownMenu = (props: DropdownMenuProps, context: ContextTypes) => {
  const {className: _className, classNames: _classNames, right, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('menu', {right})}`
  return <Tag {...attributes} tabIndex="-1" aria-hidden={!context.isOpen} role="menu" className={className} />
}

DropdownMenu.contextTypes = {
  isOpen: PropTypes.bool
}

export default DropdownMenu
