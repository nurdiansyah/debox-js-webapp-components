// @flow

import React from 'react'
import {type Placement, type Modifiers} from 'popper.js'
import {Manager, Target, Popper} from 'react-popper'

import {classNamesFactory, type BemType} from '@deboxsoft/webapp/utils/classnamesUtils'
import {BLOCK_CALENDAR_ID} from './constants'

type PopperComponentProps = {
  styles?: BemType,
  hidePopper?: boolean,
  popperComponent?: React$Node,
  popperModifiers?: Modifiers,
  popperPlacement?: Placement,
  popperContainer?: React$ComponentType<any>,
  targetComponent: React$Node
}

const defaultProps = {
  hidePopper: true,
  popperModifiers: {
    preventOverflow: {
      enabled: true,
      escapeWithReference: true,
      boundariesElement: 'viewport'
    }
  },
  popperPlacement: 'bottom-start'
}

export default (props: PopperComponentProps) => {
  const {
    styles,
    hidePopper = defaultProps.hidePopper,
    popperComponent,
    popperContainer,
    popperModifiers,
    popperPlacement = defaultProps.popperPlacement,
    targetComponent
  } = props
  const blockClass = classNamesFactory(BLOCK_CALENDAR_ID, {styles})
  let popper
  if (!hidePopper) {
    const classes = blockClass('popper')
    popper = (
      <Popper className={classes} modifiers={popperModifiers} placement={popperPlacement}>
        {popperComponent}
      </Popper>
    )
  }
  if (popperContainer) {
    popper = React.createElement(popperContainer, {}, popper)
  }

  const classes = blockClass('popper-target')
  return (
    <Manager>
      <Target className={classes}>{targetComponent}</Target>
      {popper}
    </Manager>
  )
}
