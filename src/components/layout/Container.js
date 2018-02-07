// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ContainerProps = {
  className?: string,
  extClassName?: string,
  classNames?: Function,
  isFluid?: boolean,
  tag?: React$ElementType
}

const defaultProps = {
  tag: 'div'
}

const Container = (props: ContainerProps) => {
  const {
    className: _className,
    extClassName,
    classNames: _classNames,
    isFluid,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames(
    null,
    {
      'is-fluid': isFluid
    },
    extClassName
  )}`

  return <Tag {...attributes} className={className} />
}

export default Container
