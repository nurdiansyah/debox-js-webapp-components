// @flow

import React, {Component} from 'react'
import isEqual from 'lodash/isEqual'
import getId from 'lodash/uniqueId'
import includes from 'lodash/includes'

import {propsClassNames} from '../utils/classnamesUtils'
import FormControl from './Control'
import cleanProps from './helper/clean-props'

import type {ControlProps} from './helper/form-control-types'

export type ValueType = {
  id?: string | number,
  label: string,
  value: string,
  checked?: boolean,
  disabled?: boolean
}

export type InputCheckProps = {
  inline?: boolean,
  multiple?: ?boolean,
  values?: Array<ValueType>
} & ControlProps

const defaultProps = {
  values: []
}

export class InputCheck extends Component<InputCheckProps> {
  element: Object

  static isFieldset = true

  constructor(props: InputCheckProps) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  componentWillMount() {
    // set value default
    const {formControl, multiple, values = defaultProps.values} = this.props
    if (multiple) {
      const tmp: Array<*> = []
      values.forEach((option: ValueType) => {
        if (option.checked) {
          tmp.push(option.value)
        }
      })
      formControl && formControl.setValue(tmp)
    } else {
      let tmp: string
      values.some((option: ValueType) => {
        if (option.checked) {
          tmp = option.value
          return true
        }
        return false
      })
      formControl && formControl.setValue(tmp)
    }
  }

  shouldComponentUpdate(nextProps: InputCheckProps) {
    return !isEqual(this.props, nextProps)
  }

  changeValue: Function = (event: SyntheticEvent<HTMLInputElement>) => {
    const {multiple, values = defaultProps.values, formControl} = this.props
    if (multiple) {
      const tmp = []
      values.forEach((option: ValueType, index: number) => {
        if (this.element[index].checked) {
          tmp.push(option.value)
        }
      })
    } else {
      formControl && formControl.setValue(event.currentTarget.value, this.props.onChange)
    }
  }

  renderContainer(component: React$Node, key?: string | number) {
    const {className: _className, classNames: _classNames, inline} = this.props
    const classNames = propsClassNames({classNames: _classNames})
    let className = _className ? `${_className} ` : ''
    className += classNames(null, {inline})
    return (
      <div key={key} className={className}>
        {component}
      </div>
    )
  }

  renderElement = (props: Object) => {
    const {index, multiple, labelName, classNames: _classNames, disabled, getRef, onChange, ...attributes} = props
    const type = multiple ? 'checkbox' : 'radio'
    const classNames = propsClassNames(props)
    const className = classNames(type)
    return (
      <label htmlFor={attributes.id} className={classNames('label')} key={`label-${attributes.id}`}>
        <input {...cleanProps(attributes)} ref={getRef} type={type} className={className} onChange={onChange} disabled={disabled} />
        {labelName}
      </label>
    )
  }

  render(): React$Node {
    const {formControl, value, multiple, values = defaultProps.values, name, ...attributes} = this.props
    const _value = formControl ? formControl.getValue() : value
    const Tag = this.renderElement
    const RadioComponent = values.map((option, key) => {
      const checked = multiple ? includes(_value, option.value) : isEqual(_value, option.value)
      const id: number | string = option.id || getId(name)
      attributes.disabled = this.props.disabled || option.disabled || (formControl && formControl.isFormDisabled())
      this.element = {}
      const _radioComp = (
        <Tag
          id={id}
          key={id}
          index={key}
          value={option.value}
          labelName={option.label}
          checked={checked}
          multiple={multiple}
          getRef={ref => (this.element[key] = ref)}
          onChange={this.changeValue}
          {...attributes}
        />
      )
      return _radioComp
    })
    return this.renderContainer(RadioComponent)
  }
}

export default FormControl(InputCheck)
