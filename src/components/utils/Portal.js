// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {ownerDocument} from '@deboxsoft/webapp/utils/dom/owner'
import canUseDom from 'dom-helpers/util/inDOM'
import getContainer from './getContainer'

type ContainerType = ?(Element | ?React$Component<any, any> | (() => ?(Element | React$Component<any, any>)))

type PortalProps = {
  children: React$Node,
  container: ContainerType,
  onRendered: Function
}

class Portal extends React.Component<PortalProps> {
  _portalContainerNode: null | Element
  static displayName = 'portal'

  componentWillMount() {
    if (!canUseDom) {
      return
    }
    const container = getContainer(this.props.container)
    container && !(container instanceof Text) && this.setContainer(container)
  }

  componentDidMount() {
    if (!this._portalContainerNode) {
      this.setContainer(this.props.container)
      this.forceUpdate(this.props.onRendered)
    } else if (this.props.onRendered) {
      this.props.onRendered()
    }
  }

  componentWillReceiveProps(nextProps: PortalProps) {
    if (nextProps.container !== this.props.container) {
      this.setContainer(nextProps.container)
    }
  }

  componentWillUnmount() {
    this._portalContainerNode = null
  }

  setContainer(container: ContainerType) {
    const containerNode = getContainer(container, ownerDocument(this).body)
    this._portalContainerNode = containerNode instanceof Text ? null : containerNode
  }

  getMountNode = () => this._portalContainerNode

  render(): React$Node {
    return this.props.children && this._portalContainerNode
      ? ReactDOM.createPortal(this.props.children, this._portalContainerNode)
      : null
  }
}

export default Portal
