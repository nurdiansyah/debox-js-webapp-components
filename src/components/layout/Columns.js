// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type ColumnsProps = {
  tag?: React$ElementType,
  gapless?: boolean,
  multiline?: boolean,
  centered?: boolean,
  className?: string,
  extClassName?: string,
  classNames?: Function
}

const defaultProps = {
  tag: 'div'
}

const Columns = (props: ColumnsProps) => {
  const {
    className: _className,
    extClassName,
    classNames: _classNames,
    gapless,
    centered,
    multiline,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames(
    'columns',
    {
      multiline,
      centered,
      gapless
    },
    extClassName
  )}`

  return <Tag {...attributes} className={className} />
}

export default Columns
