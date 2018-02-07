// @flow

import React, {PureComponent} from 'react'

import FormControl from '@deboxsoft/webapp/form/Control'
import cleanProps from './helper/clean-props'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

import type {ControlProps} from '@deboxsoft/webapp/form/Control-Base'

export type TextAreaProps = {
  cols?: number,
  values?: Array<Object>,
  rows?: number
} & ControlProps

export class TextArea extends PureComponent<TextAreaProps> {
  constructor(props: TextAreaProps) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue: Function = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const {formControl, onChange} = this.props
    const value = event.currentTarget.value
    formControl && formControl.setValue(value)
    onChange && onChange(this.props.name, value)
  }

  render(): React$Node {
    const {
      id,
      value,
      formControl,
      name,
      classNames: _classNames,
      disabled,
      className: _className,
      cols,
      rows,
      ...attributes
    } = this.props

    const _id = formControl ? formControl.id : id
    const _value = formControl ? formControl.getValue() : value
    const classNames = propsClassNames({classNames: _classNames})
    let className = _className ? `${_className} ` : ''
    className += classNames()
    return (
      <textarea
        className={className}
        id={_id}
        value={_value}
        onChange={this.changeValue}
        disabled={disabled || (formControl && formControl.isFormDisabled())}
        cols={cols}
        rows={rows}
        {...cleanProps(attributes)}
      />
    )
  }
}

export default FormControl(TextArea)
