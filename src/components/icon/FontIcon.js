// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type FontIconProps = {
  children?: React$Node,
  className?: string,
  value?: React$Node,
  classNames?: Function
}

const FontIcon = ({children, className: _className, classNames: _classNames, value, ...attributes}: FontIconProps) => {
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames()}`
  return (
    <span data-deboxstyle="font-icon" className={className} {...attributes}>
      {value}
      {children}
    </span>
  )
}

export default FontIcon
