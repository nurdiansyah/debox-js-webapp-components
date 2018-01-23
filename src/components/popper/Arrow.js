// @flow

import React, {PureComponent} from 'react'
import {placements} from './types'

import type {Placement} from './types'

export type ArrowProps = {
  placement: Placement,
  tag?: React$ElementType,
  size: number,
  color: string
}

const defaultProps = {
  tag: 'div'
}

const baseStyle: Object = {
  width: '0',
  height: '0',
  borderStyle: 'solid',
  position: 'absolute'
}

const arrowUp = (size: number, color: string): Object => ({
  ...baseStyle,
  borderWidth: `0 ${size}px ${size}px ${size}px`,
  borderColor: `transparent transparent ${color} transparent`,
  top: `-${size}px`,
  left: `calc(50% - ${size}px)`,
  marginTop: '0',
  marginBottom: '0'
})

const arrowBottom = (size: number, color: string): Object => ({
  ...baseStyle,
  borderWidth: `${size}px ${size}px 0 ${size}px`,
  borderColor: `${color} transparent transparent transparent`,
  bottom: `-${size}px`,
  left: `calc(50% - ${size}px)`,
  marginTop: '0',
  marginBottom: '0'
})

const arrowLeft = (size: number, color: string): Object => ({
  ...baseStyle,
  borderWidth: `${size}px ${size}px ${size}px 0`,
  borderColor: `transparent ${color} transparent transparent`,
  left: `-${size}px`,
  top: `calc(50% - ${size}px)`,
  marginLeft: '0',
  marginRight: '0'
})

const arrowRight = (size: number, color: string): Object => ({
  ...baseStyle,
  borderWidth: `${size}px 0 ${size}px ${size}px`,
  borderColor: `transparent transparent transparent ${color}`,
  right: `-${size}px`,
  top: `calc(50% - ${size}px)`,
  marginLeft: 0,
  marginRight: 0
})

class Arrow extends PureComponent<ArrowProps> {
  getStyle(): Object {
    if (this.props.placement.includes(placements.TOP)) {
      return arrowBottom(this.props.size, this.props.color)
    } else if (this.props.placement.includes(placements.BOTTOM)) {
      return arrowUp(this.props.size, this.props.color)
    } else if (this.props.placement.includes(placements.LEFT)) {
      return arrowRight(this.props.size, this.props.color)
    }
    return arrowLeft(this.props.size, this.props.color)
  }

  render(): React$Node {
    const {tag: Tag = defaultProps.tag, ...attributes} = this.props
    return <Tag {...attributes} style={this.getStyle()} />
  }
}

export default Arrow
