// @flow

import _Form, {type FormProps} from './Form'
import _Input, {type InputProps} from './Input'
import _InputCheck, {type InputCheckProps} from './InputCheck'
import _Select, {type SelectProps} from './Select'
import _TextArea, {type TextAreaProps} from './TextArea'
import _Field, {type FieldProps} from './Field'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Form: React$ComponentType<FormProps & StylesProps> = injectClassNames('form')(_Form)
export const Field: React$ComponentType<FieldProps & StylesProps> = injectClassNames('field', {keepStyles: true})(
  _Field
)
export const Input: React$ComponentType<InputProps & StylesProps> = injectClassNames('input', {keepStyles: true})(
  _Input
)
export const InputCheck: React$ComponentType<InputCheckProps & StylesProps> = injectClassNames('input-check', {
  keepStyles: true
})(_InputCheck)
export const Select: React$ComponentType<SelectProps & StylesProps> = injectClassNames('select', {keepStyles: true})(
  _Select
)
export const TextArea: React$ComponentType<TextAreaProps & StylesProps> = injectClassNames('text-area', {
  keepStyles: true
})(_TextArea)
export default {
  Form: _Form,
  Input: _Input,
  InputCheck: _InputCheck,
  Select: _Select,
  TextArea: _TextArea
}
