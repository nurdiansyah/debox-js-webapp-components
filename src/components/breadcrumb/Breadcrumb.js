// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type BreadcrumbProps = {
  tag?: React$ElementType,
  className?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'ol'
}

const Breadcrumb = (props: BreadcrumbProps): React$Node => {
  const {className: _className, classNames: _classNames, tag: Tag = defaultProps.tag, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames()}`

  return <Tag {...attributes} className={className} />
}

export default Breadcrumb
