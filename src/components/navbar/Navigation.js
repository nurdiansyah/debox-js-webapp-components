// @flow

import React, {PureComponent} from 'react'
import {propsClassNames} from '../utils/classnamesUtils'
import history from '@debox-client/core/history'

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
  /\/hotel(\/)/
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
