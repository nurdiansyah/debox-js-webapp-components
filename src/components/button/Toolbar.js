// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ButtonToolbarProps = {
  className?: string,
  classNames?: Function,
  role?: string,
  tag?: React$ElementType
}

const defaultProps = {
  tag: 'div',
  role: 'toolbar'
}

const ButtonToolbar = (props: ButtonToolbarProps) => {
  const {
    className: _className,
    classNames: _classNames,
    tag: Tag = defaultProps.tag,
    role = defaultProps.role,
    ...attributes
  } = props
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames()}`
  return <Tag {...attributes} className={className} role={role} />
}

export default ButtonToolbar
