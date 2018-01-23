// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type NavigationProps = {
  children?: React$Node,
  isRight?: ?boolean,
  className?: string,
  classNames?: Function,
  tag?: React$ElementType
}

const defaultProps = {
  tag: 'div'
}

export const Navigation = (props: NavigationProps) => {
  const {children, className: _className, classNames: _classNames, isRight, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('navigation', {right: isRight})}`

  return (
    <Tag className={className} {...attributes}>
      {children}
    </Tag>
  )
}

export default Navigation
