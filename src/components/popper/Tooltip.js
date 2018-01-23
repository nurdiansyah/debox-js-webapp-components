/* @flow */

import React, {PureComponent} from 'react'

import Popper from './Popper'

import {placements} from './types'
import type {Placement} from './types'

export type TooltipProps = {
  tag?: React$ElementType,
  arrowColor?: string,
  arrowSize?: number,
  children?: React$Node,
  isOpen?: boolean,
  message?: React$Node,
  placement?: Placement,
  tooltipClassName?: string,
  tooltipStyle?: Object
}

type State = {
  isOpen: boolean
}

const defaultProps = {
  tag: 'div',
  placement: placements.RIGHT,
  arrowSize: 5,
  arrowColor: '#FFC107'
}

const baseTooltipStyle = {
  background: '#FFC107',
  color: '#000',
  width: 150,
  borderRadius: 3,
  boxShadow: '0 0 2px rgba(0,0,0,0.5)',
  padding: 10,
  textAlign: 'center'
}

class Tooltip extends PureComponent<TooltipProps, State> {
  state = {
    isOpen: false
  }

  getPopoutComponent() {
    const {tooltipClassName, tooltipStyle, message} = this.props
    if (tooltipClassName) {
      return <div className={tooltipClassName}>{message}</div>
    }
    return (
      <div
        style={{
          ...baseTooltipStyle,
          ...tooltipStyle
        }}
      >
        {message}
      </div>
    )
  }

  render() {
    const {
      tag: Tag = defaultProps.tag,
      arrowSize = defaultProps.arrowSize,
      arrowColor = defaultProps.arrowColor,
      placement = defaultProps.placement,
      isOpen,
      children
    } = this.props
    return (
      <Popper
        hasArrow
        arrowSize={arrowSize}
        arrowColor={arrowColor}
        placement={placement}
        embedComponent={this.getPopoutComponent()}
        isOpen={isOpen || this.state.isOpen}
      >
        <Tag
          onMouseEnter={() => {
            this.setState({isOpen: true})
          }}
          onMouseLeave={() => {
            this.setState({isOpen: false})
          }}
        >
          {children}
        </Tag>
      </Popper>
    )
  }
}

export default Tooltip
