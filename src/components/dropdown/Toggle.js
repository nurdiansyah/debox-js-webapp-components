// @flow

import React, {PureComponent} from 'react'

import Button from '../button/Button'
import Anchor from '../button/Link'
import {propsClassNames} from '../utils/classnamesUtils'

export type DropdownToggleProps = {
  caret?: boolean,
  color?: string,
  children?: React$Node,
  className?: string,
  classNames?: Function,
  disabled?: boolean,
  onClick?: Function,
  'data-toggle'?: string,
  'aria-haspopup'?: boolean,
  'aria-label'?: boolean,
  split?: boolean,
  tag?: React$ElementType,
  nav?: boolean,
  href?: string
}

type ContextTypes = {
  isOpen: boolean,
  toggle: Function
}

const defaultProps = {
  'data-toggle': 'dropdown',
  'aria-haspopup': true,
  color: 'secondary'
}

class DropdownToggle extends PureComponent<DropdownToggleProps> {
  onClick: Function
  contextTypes: ContextTypes

  constructor(props: DropdownToggleProps) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e: SyntheticEvent<*>) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.nav && !this.props.tag) {
      e.preventDefault()
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }

    this.context.toggle()
  }

  render(): React$Node {
    const {caret, className: _className, classNames: _classNames, nav, split, tag, ...attributes} = this.props

    const ariaLabel = attributes['aria-label'] || 'Toggle Dropdown'
    attributes['aria-haspopup'] = attributes['aria-haspopup'] || defaultProps['aria-haspopup']
    attributes['data-toggle'] = attributes['data-toggle'] || defaultProps['data-toggle']

    const classNames = propsClassNames({classNames: _classNames})
    const className = `${_className ? `${_className} ` : ''}${classNames('toggle', {
      split,
      active: this.context.isOpen,
      nav
    })}`
    const children = attributes.children || <span className="sr-only">{ariaLabel}</span>

    let Tag

    if (nav && !tag) {
      Tag = Anchor
      attributes.href = '#'
    } else if (!tag) {
      Tag = Button
      attributes.color = attributes.color ? attributes.color : defaultProps.color
    } else {
      Tag = tag
    }
    return (
      <Tag {...attributes} onClick={this.onClick} className={className}>
        {children}
      </Tag>
    )
  }
}

export default DropdownToggle
