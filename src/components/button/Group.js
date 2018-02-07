// @flow
import React from 'react'

import {SIZE_MAP} from '../variables'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ButtonGroupProps = {
  className?: string,
  classNames?: Function,
  role?: string,
  size?: 'lg' | 'large' | 'sm' | 'small',
  tag?: React$ElementType,
  vertical?: boolean
}

const defaultProps = {
  tag: 'div',
  role: 'group'
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    className: _className,
    classNames: _classNames,
    size,
    tag: Tag = defaultProps.tag,
    vertical,
    role = defaultProps.role,
    ...attributes
  } = props
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames(null, {
    size: size ? SIZE_MAP[size] : false,
    vertical
  })}`

  return <Tag {...attributes} className={className} role={role} />
}

ButtonGroup.defaultProps = defaultProps

export default ButtonGroup
