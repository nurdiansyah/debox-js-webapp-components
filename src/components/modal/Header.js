// @flow

import React from 'react'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ModalHeaderProps = {
  tag?: React$ElementType,
  wrapTag?: React$ElementType,
  toggle?: Function,
  className?: string,
  classNames?: Function,
  children?: React$Node,
  closeAriaLabel?: string
}

const defaultProps = {
  tag: 'h4',
  wrapTag: 'div',
  closeAriaLabel: 'Close'
}

const ModalHeader = (props: ModalHeaderProps) => {
  let closeButton
  const {
    className: _className,
    classNames: _classNames,
    children,
    toggle,
    tag: Tag = defaultProps.tag,
    wrapTag: WrapTag = defaultProps.wrapTag,
    closeAriaLabel = defaultProps.closeAriaLabel,
    ...attributes
  } = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('header')}`

  if (toggle) {
    closeButton = (
      <button type="button" onClick={toggle} className="close" aria-label={closeAriaLabel}>
        <span>{String.fromCharCode(215)}</span>
      </button>
    )
  }

  return (
    <WrapTag {...attributes} className={className}>
      <Tag className={classNames('modal-title')}>{children}</Tag>
      {closeButton}
    </WrapTag>
  )
}

export default ModalHeader
