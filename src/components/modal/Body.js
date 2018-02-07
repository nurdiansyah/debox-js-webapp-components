// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ModalBodyProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'div'
}

const ModalBody = (props: ModalBodyProps) => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('body')}`

  return <Tag {...attributes} className={className} />
}

export default ModalBody
