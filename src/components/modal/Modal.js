// @flow

import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {TransitionGroup} from 'react-transition-group'
import Fade from '../animation/Fade'
import {getOriginalPadding, conditionallyUpdateScrollbar, setScrollbarWidth} from '@debox-client/webapp-core/utils/dom/body-utils'
import {propsClassNames} from '../utils/classnamesUtils'

const MODAL_OPEN_CLASS_NAME_BODY = 'body-open'

export type ModalProps = {
  isOpen?: boolean,
  autoFocus?: boolean,
  size?: string,
  toggle?: Function,
  keyboard?: boolean,
  role?: string,
  labelledBy?: string,
  backdrop?: boolean | 'static',
  onEnter?: Function,
  onExit?: Function,
  onOpened?: Function,
  onClosed?: Function,
  children?: React$Node,
  className?: string,
  classNames?: Function,
  fade?: boolean,
  zIndex?: number | string,
  backdropTransitionTimeout?: number,
  backdropTransitionAppearTimeout?: number,
  backdropTransitionEnterTimeout?: number,
  backdropTransitionLeaveTimeout?: number,
  modalTransitionTimeout?: number,
  modalTransitionAppearTimeout?: number,
  modalTransitionEnterTimeout?: number,
  modalTransitionLeaveTimeout?: number
}

const defaultProps = {
  autoFocus: true,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  zIndex: 1050,
  fade: true,
  modalTransitionTimeout: 300,
  backdropTransitionTimeout: 150
}

class Modal extends PureComponent<ModalProps> {
  togglePortal: Function
  handleBackdropClick: Function
  handleEscape: Function
  destroy: Function
  onOpened: Function
  onClosed: Function
  originalBodyPadding: ?string
  isBodyOverflowing: boolean
  _focus: boolean
  _dialogNode: ?HTMLElement
  _element: ?Element

  constructor(props: ModalProps) {
    super(props)

    this.originalBodyPadding = null
    this.isBodyOverflowing = false
    this.togglePortal = this.togglePortal.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleEscape = this.handleEscape.bind(this)
    this.destroy = this.destroy.bind(this)
    this.onOpened = this.onOpened.bind(this)
    this.onClosed = this.onClosed.bind(this)
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.togglePortal()
    }
    if (this.props.onEnter) {
      this.props.onEnter()
    }
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      // handle portal events/dom updates
      this.togglePortal()
    } else if (this._element) {
      // rerender portal
      this.renderIntoSubtree()
    }
  }

  componentWillUnmount() {
    this.destroy()
    if (this.props.onExit) {
      this.props.onExit()
    }
  }

  onOpened() {
    if (this.props.onOpened) {
      this.props.onOpened()
    }
  }

  onClosed() {
    this.destroy()
    if (this.props.onClosed) {
      this.props.onClosed()
    }
  }

  handleEscape(e: SyntheticEvent<HTMLElement>) {
    const {keyboard = defaultProps.keyboard} = this.props
    if (keyboard && e.keyCode === 27 && this.props.toggle) {
      this.props.toggle()
    }
  }

  handleBackdropClick(e: SyntheticEvent<HTMLElement>) {
    if (this.props.backdrop !== true) return
    if (this._dialogNode) {
      const container = this._dialogNode

      if (e.target instanceof Node && !container.contains(e.target) && this.props.toggle) {
        this.props.toggle()
      }
    }
  }

  hasTransition() {
    const {fade = defaultProps.fade} = this.props
    const modalTransitionTimeout = this.props.modalTransitionTimeout || defaultProps.modalTransitionTimeout
    if (fade === false) {
      return false
    }

    return modalTransitionTimeout > 0
  }

  togglePortal() {
    const {autoFocus = defaultProps.autoFocus} = this.props
    if (this.props.isOpen) {
      if (autoFocus) {
        this._focus = true
      }
      this.show()
      if (!this.hasTransition()) {
        this.onOpened()
      }
    } else {
      this.hide()
      if (!this.hasTransition()) {
        this.onClosed()
      }
    }
  }

  destroy() {
    const classNames = propsClassNames(this.props)
    if (this._element) {
      const element: Element = this._element
      ReactDOM.unmountComponentAtNode(element)
      if (document.body) {
        document.body.removeChild(element)
      }
      this._element = null
    }

    if (document.body) {
      // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`
      const body: HTMLElement = document.body
      const modalClassName = classNames(MODAL_OPEN_CLASS_NAME_BODY)
      const reg = new RegExp(`(^| )${modalClassName}( |$)`, 'g')
      const classNameBody = body.className.replace(reg, ' ')
      body.className = classNameBody.trim()
    }
    setScrollbarWidth(this.originalBodyPadding)
  }

  hide() {
    this.renderIntoSubtree()
  }

  show() {
    const classNames = propsClassNames(this.props)
    const element: HTMLDivElement = document.createElement('div')
    element.setAttribute('tabindex', '-1')
    element.style.position = 'relative'
    element.style.zIndex = this.props.zIndex ? this.props.zIndex.toString() : defaultProps.zIndex.toString()
    if (document.body) {
      const body: HTMLElement = document.body
      const bodyClassName = body.className
      this.originalBodyPadding = getOriginalPadding()

      conditionallyUpdateScrollbar()

      body.appendChild(element)

      body.className = `${bodyClassName} ${classNames(MODAL_OPEN_CLASS_NAME_BODY)}`
    }
    this._element = element
    this.renderIntoSubtree()
  }

  renderModalDialog() {
    const {className: _className, size, ...attributes} = this.props
    const classNames = propsClassNames(this.props)
    const className = `${_className ? `${_className} ` : ''}${classNames('dialog', {size})}`
    return (
      <div className={className} role="document" ref={c => (this._dialogNode = c)} {...attributes}>
        <div className={classNames('content')}>{this.props.children}</div>
      </div>
    )
  }

  renderIntoSubtree() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderChildren(), this._element)

    // check if modal should receive focus
    if (this._focus && this._dialogNode && this._dialogNode.parentElement instanceof HTMLElement) {
      this._dialogNode.parentElement.focus()
      this._focus = false
    }
  }

  renderChildren() {
    const {
      isOpen,
      backdrop = defaultProps.backdrop,
      modalTransitionTimeout = defaultProps.modalTransitionTimeout,
      backdropTransitionTimeout = defaultProps.backdropTransitionTimeout,
      role = defaultProps.role,
      labelledBy
    } = this.props
    const classNames = propsClassNames(this.props)

    const modalAttributes = {
      onClickCapture: this.handleBackdropClick,
      onKeyUp: this.handleEscape,
      style: {display: 'block'},
      'aria-labelledby': labelledBy,
      role,
      tabIndex: '-1'
    }

    if (this.hasTransition()) {
      return (
        <TransitionGroup component="div" className={classNames('container')}>
          {isOpen && (
            <Fade
              key="modal-dialog"
              onEnter={this.onOpened}
              onLeave={this.onClosed}
              transitionAppearTimeout={
                typeof this.props.modalTransitionAppearTimeout === 'number' ? this.props.modalTransitionAppearTimeout : modalTransitionTimeout
              }
              transitionEnterTimeout={
                typeof this.props.modalTransitionEnterTimeout === 'number' ? this.props.modalTransitionEnterTimeout : modalTransitionTimeout
              }
              transitionLeaveTimeout={
                typeof this.props.modalTransitionLeaveTimeout === 'number' ? this.props.modalTransitionLeaveTimeout : modalTransitionTimeout
              }
              classNames={classNames}
              className={classNames('fade')}
              {...modalAttributes}
            >
              {this.renderModalDialog()}
            </Fade>
          )}
          {isOpen &&
            backdrop && (
              <Fade
                key="modal-backdrop"
                transitionAppearTimeout={
                  typeof this.props.backdropTransitionAppearTimeout === 'number'
                    ? this.props.backdropTransitionAppearTimeout
                    : backdropTransitionTimeout
                }
                transitionEnterTimeout={
                  typeof this.props.backdropTransitionEnterTimeout === 'number'
                    ? this.props.backdropTransitionEnterTimeout
                    : backdropTransitionTimeout
                }
                transitionLeaveTimeout={
                  typeof this.props.backdropTransitionLeaveTimeout === 'number'
                    ? this.props.backdropTransitionLeaveTimeout
                    : backdropTransitionTimeout
                }
                classNames={classNames}
                className={classNames('backdrop')}
              />
            )}
        </TransitionGroup>
      )
    }

    return (
      <div className={classNames('container')}>
        {isOpen && (
          <div className={classNames(null, {show: true})} {...modalAttributes}>
            {this.renderModalDialog()}
          </div>
        )}
        {isOpen && backdrop && <div className={classNames('backdrop', {show: true})} />}
      </div>
    )
  }

  render(): React$Node {
    return null
  }
}

export default Modal
