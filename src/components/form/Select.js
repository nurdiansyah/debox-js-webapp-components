// @flow

import React, {PureComponent} from 'react'
import uniqueId from 'lodash/uniqueId'
import FormControl from './Control'

import cleanProps from './helper/clean-props'
import {propsClassNames} from '../utils/classnamesUtils'

import type {ControlProps} from './helper/form-control-types'

export type ValueType = {
  id?: string | number,
  label: string,
  value: string,
  checked?: ?boolean,
  group?: string,
  disabled?: boolean
}

export type SelectProps = {
  multiple?: boolean,
  onChange?: Function,
  values?: Array<ValueType>
} & ControlProps

const defaultProps = {
  values: []
}

class Select extends PureComponent<SelectProps> {
  constructor(props, context) {
    super(props, context)
    this.changeValue = this.changeValue.bind(this)
  }

  componentWillMount() {
    const formControl = this.props.formControl
    if (this.props.multiple) {
      formControl && formControl.setValue([])
    } else {
      formControl && formControl.setValue(this.props.value)
    }
  }

  changeValue: Function = (event: SyntheticEvent<HTMLSelectElement>) => {
    const {formControl, onChange} = this.props
    const target = event.currentTarget
    let value
    if (this.props.multiple) {
      value = []
      for (let i = 0; i < target.length; i++) {
        const option = target.options[i]
        if (option.selected) {
          value.push(option.value)
        }
      }
    } else {
      value = target.value
    }
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
      values = defaultProps.values,
      className: _className,
      ...props
    } = this.props
    const renderValueOption = (item, key) => {
      const {group, label, ...others} = item // eslint-disable-line no-unused-vars
      return (
        <option key={key} {...others}>
          {label}
        </option>
      )
    }

    let groups = values.filter(item => item.group).map(item => item.group)

    groups = [...new Set(groups)]

    let optionNodes = []
    if (groups.length <= 0) {
      optionNodes = values.map((item: ValueType) => renderValueOption(item, uniqueId(name)))
    } else {
      const itemsWithoutGroup = values.filter(item => !item.group)
      const optionId = uniqueId(name)
      itemsWithoutGroup.forEach((item: ValueType, key: number) => {
        optionNodes.push(renderValueOption(item, `${optionId}-${key}`))
      })

      groups.forEach(group => {
        const groupItems = values.filter(item => item.group === group)
        const groupOptionNodes = groupItems.map((item: ValueType) => renderValueOption(item))
        optionNodes.push(
          <optgroup label={group} key={optionId}>
            {groupOptionNodes}
          </optgroup>
        )
      })
    }

    const _id = formControl ? formControl.id : id
    const _value = formControl ? formControl.getValue : value
    const classNames = propsClassNames({classNames: _classNames})
    let className = _className ? `${_className} ` : ''
    className += classNames()
    return (
      <select
        className={className}
        id={_id}
        value={_value}
        onChange={this.changeValue}
        disabled={disabled || (formControl && formControl.isFormDisabled())}
        {...cleanProps(props)}
      >
        {optionNodes}
      </select>
    )
  }
}

export default FormControl(Select)
