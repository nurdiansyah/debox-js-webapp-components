// @flow

import React, {PureComponent} from 'react'
import history from '@debox-client/core/history'
import {Link} from '../button'
import {propsClassNames} from '../utils/classnamesUtils'

export type NavbarItemProps = {
  children?: React$Node,
  className?: string,
  classNames?: Function,
  isActive?: ?boolean,
  to?: string,
  state?: string,
  tag?: React$ElementType
}

type State = {
  active: boolean
}

const defaultProps = {
  tag: 'div'
}

const checkActive = (currentState: string, state: string) => new RegExp(`${state}((/|-).*|(/?$))`).test(currentState)

export class Item extends PureComponent<NavbarItemProps, State> {
  listenerLinkHandler: Function
  getLocationState: Function

  constructor(props: NavbarItemProps) {
    super(props)
    this.listenerLinkHandler = this.listenerLinkHandler.bind(this)
    this.getLocationState = this.getLocationState.bind(this)
    this.registerLink()
    this.state = {
      active: !!props.isActive || (props.state && checkActive(history.location.state, props.state)) || false
    }
  }

  registerLink() {
    if (this.props.to) {
      history.listen(this.listenerLinkHandler)
    }
  }

  listenerLinkHandler(location: Object) {
    this.setState({
      active: (this.props.state && checkActive(location.state, this.props.state)) || false
    })
  }

  getLocationState() {
    return this.props.state
  }

  render() {
    const {children, className: _className, classNames: _classNames, tag, ...attributes} = this.props

    const classNames = propsClassNames({classNames: _classNames})
    const className = `${_className ? `${_className} ` : ''}${classNames('item', {link: !!attributes.to, 'is-active': this.state.active})}`
    const Tag = tag || (attributes.to && Link) || defaultProps.tag
    return (
      <Tag className={className} {...attributes}>
        {children}
      </Tag>
    )
  }
}

export default Item
