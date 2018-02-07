// @flow

import React from 'react'
import _classNames from 'classnames'

export type MenuLinkProps = {
  tag?: React$ElementType,
  getRef?: string | Function,
  disabled?: boolean,
  active?: boolean,
  className?: string,
  classNames?: Function,
  onClick?: Function,
  href?: string
}

const defaultProps = {
  tag: 'a',
  classNames: _classNames
}

class NavLink extends React.Component<MenuLinkProps> {
  onClick: Function

  constructor(props: MenuLinkProps) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e: SyntheticEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.href === '#') {
      e.preventDefault()
    }

    this.props.onClick && this.props.onClick(e)
  }

  render(): React$Node {
    const {
      className: _className,
      classNames = defaultProps.classNames,
      active,
      tag: Tag = defaultProps.tag,
      getRef,
      ...attributes
    } = this.props

    const className = classNames(_className || 'nav-link', {
      disabled: attributes.disabled,
      active
    })

    return <Tag {...attributes} ref={getRef} onClick={this.onClick} className={className} />
  }
}

export default NavLink
