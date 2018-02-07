// @flow

import React, {PureComponent, type ChildrenArray} from 'react'
import PropTypes from 'prop-types'

import Popper from '../popper/Popper'
import DropdownMenu from './Menu'
import type {SizeType} from '../variables'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type DropdownProps = {
  children?: ChildrenArray<*>,
  className?: string,
  classNames?: Function,
  disabled?: boolean,
  dropup?: boolean,
  group?: boolean,
  isOpen?: boolean,
  size?: SizeType,
  tag?: React$ElementType,
  popper?: Object,
  toggle?: Function
}

const defaultPopperConfig = {
  classPrefix: 'bs-popper',
  tag: 'div',
  classes: {element: 'dropdown', enabled: 'show'},
  constraints: [{to: 'scrollParent', attachment: 'together none'}, {to: 'window', attachment: 'together none'}]
}

const defaultProps = {
  tag: 'div'
}

class Dropdown extends PureComponent<DropdownProps> {
  handleDocumentClick: Function
  container: HTMLElement
  node: ?React$ElementRef<*>

  static childContextTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool
  }

  constructor(props: DropdownProps) {
    super(props)

    this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  getChildContext() {
    return {
      toggle: this.toggle,
      isOpen: this.props.isOpen
    }
  }

  componentDidMount() {
    this.handleProps()
  }

  componentDidUpdate(prevProps: DropdownProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleProps()
    }
  }

  componentWillUnmount() {
    this.removeEvents()
  }

  getPopperTarget: Function = () => this.container.querySelector('[data-toggle="dropdown"]')

  getPopperConfig(childProps: Object) {
    const target = () => this.getPopperTarget()
    let vElementAttach = 'top'
    let hElementAttach = 'left'
    let vTargetAttach = 'bottom'
    let hTargetAttach = 'left'

    if (childProps.right) {
      hElementAttach = 'right'
      hTargetAttach = 'right'
    }

    if (this.props.dropup) {
      vElementAttach = 'bottom'
      vTargetAttach = 'top'
    }

    return {
      ...defaultPopperConfig,
      attachment: `${vElementAttach} ${hElementAttach}`,
      targetAttachment: `${vTargetAttach} ${hTargetAttach}`,
      target,
      ...this.props.popper
    }
  }

  addEvents() {
    document.addEventListener('click', this.handleDocumentClick, true)
  }

  removeEvents() {
    document.removeEventListener('click', this.handleDocumentClick, true)
  }

  handleDocumentClick(e: SyntheticEvent<HTMLElement>) {
    if (e.target instanceof Node) {
      if (this.container.contains(e.target) && this.container !== e.target) {
        return
      }
    }
    this.toggle()
  }

  handleProps() {
    if (this.props.tether) {
      return
    }

    if (this.props.isOpen) {
      this.addEvents()
    } else {
      this.removeEvents()
    }
  }

  toggle(e: ?SyntheticEvent<HTMLElement>) {
    if (this.props.disabled) {
      e && e.preventDefault()
      return
    }
    this.props.toggle && this.props.toggle()
  }

  renderChildren() {
    const {popper, children, ...attrs} = this.props
    attrs.toggle = this.toggle

    return React.Children.map(React.Children.toArray(children), (child: *) => {
      if (popper && child.type === DropdownMenu) {
        const popperConfig = this.getPopperConfig(child.props)
        return (
          <Popper {...attrs} tether={popperConfig}>
            {child}
          </Popper>
        )
      }

      return child
    })
  }

  render(): React$Node {
    const {
      className: _className,
      classNames: _classNames,
      dropup,
      group,
      size,
      tag: Tag = defaultProps.tag,
      isOpen,
      ...attributes
    } = this.props
    delete attributes.toggle
    const classNames = propsClassNames({classNames: _classNames})
    const className = `${_className ? `${_className} ` : ''}${classNames(null, {
      size,
      group,
      show: isOpen,
      dropup
    })}`

    return (
      <Tag ref={_ref => (this.node = _ref)} {...attributes} className={className}>
        {this.renderChildren()}
      </Tag>
    )
  }
}

export default Dropdown
