// @flow

import React, {PureComponent} from 'react'

import Dropdown from './Dropdown'
import {propsClassNames} from '../utils/classnamesUtils'

export type DropdownItemProps = {
  active?: boolean,
  children?: React$Node,
  className?: string,
  classNames?: Function,
  disabled?: boolean,
  divider?: boolean,
  header?: boolean,
  onClick?: Function,
  tag?: React$ElementType,
  toggle?: boolean
}

const defaultProps = {
  tag: 'button',
  toggle: true
}

class DropdownItem extends PureComponent<DropdownItemProps> {
  onClick: Function

  static contextTypes = Dropdown.childContextTypes

  constructor(props: DropdownItemProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e: SyntheticEvent<*>) {
    const {toggle = defaultProps.toggle} = this.props
    if (this.props.disabled || this.props.header || this.props.divider) {
      e.preventDefault()
      return
    }

    this.props.onClick && this.props.onClick(e)

    if (toggle) {
      this.context.toggle()
    }
  }

  getTabIndex() {
    if (this.props.disabled || this.props.header || this.props.divider) {
      return '-1'
    }
    return '0'
  }

  render(): React$Node {
    const tabIndex = this.getTabIndex()
    const {className: _className, classNames: _classNames, divider, header, active, ...attributes} = this.props

    let {tag: Tag = defaultProps.tag} = attributes
    delete attributes.toggle
    delete attributes.tag

    const classNames = propsClassNames({propsClassNames: _classNames})
    const className = `${_className ? `${_className} ` : ''}${classNames({
      disabled: attributes.disabled,
      active,
      header,
      divider
    })}`

    if (Tag === 'button') {
      if (header) {
        Tag = 'h6'
      } else if (divider) {
        Tag = 'div'
      } else if (attributes.href) {
        Tag = 'a'
      }
    }

    return (
      <Tag
        type={Tag === 'button' && (attributes.onClick || this.props.toggle) ? 'button' : undefined}
        {...attributes}
        tabIndex={tabIndex}
        onClick={this.onClick}
        className={className}
      />
    )
  }
}

export default DropdownItem
