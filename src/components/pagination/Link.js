// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type PaginationLinkProps = {
  'aria-label'?: string,
  children?: Array<React$Node>,
  className?: string,
  classNames?: Function,
  next?: boolean,
  previous?: boolean,
  tag?: React$ElementType
}

const defaultProps = {
  tag: 'a'
}

const PaginationLink = (props: PaginationLinkProps) => {
  const {
    className: _className,
    classNames: _classNames,
    next,
    previous,
    tag: Tag = defaultProps.tag,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('link')}`

  let defaultAriaLabel
  if (previous) {
    defaultAriaLabel = 'Previous'
  } else if (next) {
    defaultAriaLabel = 'Next'
  }
  const ariaLabel = props['aria-label'] || defaultAriaLabel

  let defaultCaret
  if (previous) {
    defaultCaret = '\u00ab'
  } else if (next) {
    defaultCaret = '\u00bb'
  }

  let children = props.children
  if (children && !children.length) {
    children = null
  }

  if (previous || next) {
    children = [
      <span key="caret">{children || defaultCaret}</span>,
      <span className="sr-only" key="sr">
        {ariaLabel}
      </span>
    ]
  }

  return (
    <Tag {...attributes} className={className} aria-label={ariaLabel}>
      {children}
    </Tag>
  )
}

export default PaginationLink
