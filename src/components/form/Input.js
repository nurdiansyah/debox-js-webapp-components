// @flow

import React, {Component} from 'react'
import isEqual from 'lodash/isEqual'

import FormControl from '@deboxsoft/webapp/form/Control'
import cleanProps from './helper/clean-props'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

import type {ControlProps} from '@deboxsoft/webapp/form/Control-Base'

export type InputProps = {
  label?: string,
  type?:
    | 'color'
    | 'date'
    | 'datetime'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
} & ControlProps

export class Input extends Component<InputProps> {
  inputNode: ?HTMLInputElement

  constructor(props: InputProps) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  componentWillMount() {
    let value
    if (this.props.type && this.props.type.match(/file/)) {
      value = []
    } else {
      value = this.props.value || ''
    }
    this.props.formControl && this.props.formControl.setValue(value)
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.props.formControl && this.props.formControl.setValue(nextProps.value)
    }
  }

  shouldComponentUpdate(nextProps: InputProps) {
    return !isEqual(this.props, nextProps)
  }

  changeValue: Function = (event: SyntheticEvent<HTMLInputElement>) => {
    let value
    let _addValue
    if (this.props.type && this.props.type.match(/file/)) {
      value = event.currentTarget.files
      _addValue = event.currentTarget.value
    } else {
      value = event.currentTarget.value
    }
    this.props.formControl && this.props.formControl.setValue(value, this.props.onChange, _addValue)
  }

  setFocus: Function = () => {
    this.inputNode && this.inputNode.focus()
  }

  render(): React$Node {
    const {id, classNames: _classNames, value, className: _className, formControl, disabled, ...attributes} = this.props

    const classNames = propsClassNames({classNames: _classNames})
    let className = _className ? `${_className} ` : ''

    if (['range', 'file'].indexOf(this.props.type) !== -1) {
      className += classNames(null, {
        type: this.props.type,
        'is-invalid': formControl && formControl.showErrors()
      })
    } else {
      className += classNames(null, {
        'is-invalid': formControl && formControl.showErrors()
      })
    }

    const _id = formControl ? formControl.id : id
    const _value = formControl ? formControl.getValue() : value
    return (
      <input
        ref={node => (this.inputNode = node)}
        id={_id}
        value={_value}
        className={className}
        onChange={this.changeValue}
        disabled={disabled || (formControl && formControl.isFormDisabled())}
        {...cleanProps(attributes)}
      />
    )
  }
}

export default FormControl(Input)
