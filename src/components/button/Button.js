// @flow

import React, {PureComponent} from 'react'

import Link from './Link'
import {SIZE_MAP, type SizeType} from '../variables'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ButtonProps = {
  active?: boolean,
  children?: React$Node,
  block?: boolean,
  className?: string,
  classNames?: Function,
  color?: string,
  disabled?: boolean,
  href?: string,
  onClick?: Function,
  outline?: boolean,
  size?: SizeType,
  tag?: React$ElementType,
  /**
   * Defines HTML button type attribute
   */
  type?: 'button' | 'reset' | 'submit'
}

const defaultProps = {
  tag: 'button',
  color: 'secondary',
  type: 'button'
}

class Button extends PureComponent<ButtonProps> {
  onClick: Function

  constructor(props: ButtonProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e: SyntheticEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render(): React$Node {
    const {
      active,
      block,
      children,
      className: _className,
      classNames: _classNames,
      color = defaultProps.color,
      href,
      outline,
      size,
      tag: Tag = defaultProps.tag,
      type = defaultProps.type,
      ...attributes
    } = this.props

    const classNames = propsClassNames({classNames: _classNames})
    let className = `${_className ? `${_className} ` : ''}`
    className += classNames(null, {
      [`${outline ? 'outline' : 'color'}`]: color,
      size: size ? SIZE_MAP[size] : false,
      block,
      active,
      disabled: attributes.disabled
    })

    attributes.onClick = this.onClick
    const renderAnchor = (): React$Node => (
      <Link {...attributes} href={href} className={className}>
        {children}
      </Link>
    )

    if (href) {
      return renderAnchor()
    }

    return (
      <Tag {...attributes} type={type}>
        {children}
      </Tag>
    )
  }
}

export default Button
