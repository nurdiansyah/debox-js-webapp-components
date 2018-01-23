// @flow

import _Modal, {type ModalProps} from './Modal'
import _ModalBody, {type ModalBodyProps} from './Body'
import _ModalFooter, {type ModalFooterProps} from './Footer'
import _ModalHeader, {type ModalHeaderProps} from './Header'
import {injectClassNames, type StylesProps} from '../utils/classnamesUtils'


export const Modal: React$ComponentType<ModalProps & StylesProps> = injectClassNames('modal')(_Modal)
export const ModalBody: React$ComponentType<ModalBodyProps & StylesProps> = injectClassNames('modal')(_ModalBody)
export const ModalFooter: React$ComponentType<ModalFooterProps & StylesProps> = injectClassNames('modal')(_ModalFooter)
export const ModalHeader: React$ComponentType<ModalHeaderProps & StylesProps> = injectClassNames('modal')(_ModalHeader)

export default {
  Modal: _Modal,
  ModalBody: _ModalBody,
  ModalFooter: _ModalFooter,
  ModalHeader: _ModalHeader
}
