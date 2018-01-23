// @flow

import React, {PureComponent} from 'react'
import PopperJs, {type Placement, type Modifiers} from 'popper.js'

import Arrow from './Arrow'
import {placements} from './types'

export type PopperProps = {
  arrowColor?: string,
  arrowSize?: number,
  children?: React$Node,
  hasArrow?: ?boolean,
  isOpen?: ?boolean,
  placement?: Placement,
  modifiers?: Modifiers,
  embedComponent?: React$Node,
  tag?: React$ElementType
}

type PopperData = {
  offsets: {
    popper: {
      left: number,
      top: number,
      position: Placement
    },
    arrow: {
      left: number,
      top: number
    }
  }
}

type State = {
  data: PopperData
}

const defaultProps = {
  arrowColor: '#FFC107',
  arrowSize: 5,
  isOpen: true,
  placement: placements.BOTTOM,
  modifiers: {
    applyStyle: {enabled: false}
  },
  tag: 'div'
}

class Popper extends PureComponent<PopperProps, State> {
  componentDidMount() {
    this.instantiatePopper()
  }

  componentWillReceiveProps() {
    if (!this._popper) {
      this.instantiatePopper()
    } else {
      this.updatePopper()
    }
  }

  componentWillUnmount() {
    if (this._popper) {
      this._popper.destroy()
    }
  }
  _popper = null
  _popperParentNode = null
  _popoutNode = null
  _arrow = null

  instantiatePopper() {
    const modifiers: Modifiers = Object.assign(defaultProps.modifiers, this.props.modifiers)
    if (this.props.hasArrow && this._arrow) {
      modifiers.arrow = {element: this._arrow}
    }
    this._popper = new PopperJs(this._popperParentNode, this._popoutNode, {
      placement: this.props.placement,
      modifiers,
      onCreate: data => this.setState({data}),
      onUpdate: data => this.setState({data})
    })
    this.updatePopper()
  }

  updatePopper() {
    requestAnimationFrame(() => {
      if (this._popper) {
        this._popper.update()
      }
    })
  }

  getPopperStyle(data: PopperData) {
    const {isOpen = defaultProps.isOpen} = this.props
    if (!data) {
      return {}
    }
    const left = Math.round(data.offsets.popper.left)
    const top = Math.round(data.offsets.popper.top)
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
      position: data.offsets.popper.position,
      transform,
      WebkitTransform: transform,
      top: 0,
      left: 0,
      display: isOpen ? 'block' : 'none',
      ...this.getPopperMargin()
    }
  }

  getPopperMargin() {
    const {placement = defaultProps.placement, hasArrow, arrowSize = defaultProps.arrowSize} = this.props
    if (!hasArrow) {
      return {}
    }
    if (placement.includes(placements.BOTTOM)) {
      return {marginTop: arrowSize}
    } else if (placement.includes(placements.LEFT)) {
      return {marginRight: arrowSize}
    } else if (placement.includes(placements.RIGHT)) {
      return {marginLeft: arrowSize}
    } else if (placement.includes(placements.TOP)) {
      return {marginBottom: arrowSize}
    }
    return {}
  }

  getArrowStyle(data: PopperData) {
    const {placement = defaultProps.placement} = this.props
    if (!data) {
      return {}
    }
    const left = Math.round(data.offsets.arrow.left)
    const top = Math.round(data.offsets.arrow.top)

    if (placement.includes(placements.TOP)) {
      return {
        position: 'absolute',
        left
      }
    } else if (placement.includes(placements.LEFT)) {
      return {
        position: 'absolute',
        top,
        right: 0
      }
    }
    return {
      position: 'absolute',
      left,
      top
    }
  }

  render() {
    const {
      arrowColor = defaultProps.arrowColor,
      arrowSize = defaultProps.arrowSize,
      tag: Tag = defaultProps.tag,
      hasArrow,
      embedComponent,
      placement = defaultProps.placement,
      children
    } = this.props
    return (
      <Tag>
        <div
          ref={el => {
            this._popperParentNode = el
          }}
        >
          {children}
        </div>
        <div
          ref={el => {
            this._popoutNode = el
          }}
          style={this.state && this.getPopperStyle(this.state.data)}
        >
          {embedComponent}
          {hasArrow && (
            <div
              ref={el => {
                this._arrow = el
              }}
              style={this.state !== null && this.getArrowStyle(this.state.data)}
            >
              <Arrow placement={placement} size={arrowSize} color={arrowColor} />
            </div>
          )}
        </div>
      </Tag>
    )
  }
}

export default Popper
