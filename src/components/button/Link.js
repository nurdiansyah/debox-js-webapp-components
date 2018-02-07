// @flow
import React from 'react'
import history from '@deboxsoft/core/history'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type LinkProps = {
  className?: string,
  classNames?: Function,
  disabled?: boolean,
  href?: string,
  onClick?: Function,
  role?: string,
  tabIndex?: number | string | false,
  tag?: React$ElementType,
  to?: string,
  state?: string
}

const defaultProps = {
  tag: 'a'
}

const isTrivialHref = href => !href || href.trim() === '#'

const Link = (props: LinkProps) => {
  const {
    tag: Tag = defaultProps.tag,
    to,
    state,
    classNames: _classNames,
    className: _className,
    disabled,
    onClick,
    ...attributes
  } = props
  const handleClick = (event): React$Node => {
    if (disabled || attributes.role === 'button') {
      event.preventDefault()
    }

    if (disabled) {
      event.stopPropagation()
      return
    }

    onClick && onClick(event)
    to && history.push(to, state)
  }

  if (isTrivialHref(attributes.href)) {
    attributes.role = attributes.role || 'button'
    attributes.href = to
  }

  if (disabled) {
    attributes.tabIndex = -1
  }

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames(null, {disabled})}`

  return <Tag disabled={disabled} {...attributes} onClick={handleClick} className={className} />
}

export default Link
