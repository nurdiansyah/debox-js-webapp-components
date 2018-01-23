// @flow

import React from 'react'
import Transition from 'react-transition-group/CSSTransition'
import {propsClassNames} from '../utils/classnamesUtils'

export type FadeProps = {
  className?: string,
  classNames?: Function,
  // noinspection ReservedWordAsName
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in?: boolean,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit?: boolean,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear?: boolean,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout?: number,

  /**
   * Callback fired before the component fades in
   */
  onEnter?: Function,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering?: Function,
  /**
   * Callback fired after the has component faded in
   */
  onEntered?: Function,
  /**
   * Callback fired before the component fades out
   */
  onExit?: Function,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting?: Function,
  /**
   * Callback fired after the component has faded out
   */
  onExited?: Function
}

const defaultProps = {
  timeout: 300
}

const Fade = (props: FadeProps) => {
  const {className: _className, classNames: _classNames, timeout = defaultProps.timeout, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames()}`
  return (
    <Transition {...attributes} className={className} enteredClassName={classNames('in')} enteringClassName={classNames('in')} timeout={timeout} />
  )
}

export default Fade
