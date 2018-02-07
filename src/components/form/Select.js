// @flow

import React, {PureComponent} from 'react'
import isEqual from 'lodash/isEqual'
import type {ControlProps} from '@deboxsoft/webapp/form/Control-Base'
import FormControl from '@deboxsoft/webapp/form/Control'

import cleanProps from './helper/clean-props'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type ValueType = {
  id?: string | number,
  label: string,
  value: string,
  selected?: ?boolean,
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
  _id: string

  constructor(props, context) {
    super(props, context)
    this.changeValue = this.changeValue.bind(this)
  }

  componentWillMount() {
    const {multiple, values = defaultProps.values, value} = this.props
    this.setFormControlValue(multiple, values, value)
  }

  componentWillReceiveProps(nextProps: SelectProps) {
    this.setFormControlValue(nextProps.multiple, nextProps.values, nextProps.value)
  }

  shouldComponentUpdate(nextProps: SelectProps) {
    return !isEqual(this.props, nextProps)
  }

  setFormControlValue(multiple?: ?boolean, values?: Array<ValueType>, value?: any) {
    const formControl = this.props.formControl
    if (formControl) {
      this._id = formControl.id
    }
    if (multiple) {
      const tmp: Array<*> = []
      values &&
        values.forEach((option: ValueType) => {
          option.selected = value
            ? Array.isArray(value) ? value.includes(option.value) : isEqual(value, option.value)
            : option.selected
          if (option.selected) {
            tmp.push(option.value)
          }
        })
      formControl && formControl.setValue(tmp)
    } else {
      let tmp: string
      values &&
        values.some((option: ValueType) => {
          if (option.selected) {
            tmp = option.value
            return true
          }
          return false
        })
      formControl && formControl.setValue(tmp)
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
      ...attributes
    } = this.props
    const renderValueOption = (item: ValueType, key: string) => {
      const {group, label, value: _value, selected, ...others} = item // eslint-disable-line no-unused-vars
      const _selected = selected || (value && Array.isArray(value) ? value.includes(_value) : value === _value)
      return (
        <option key={key} selected={_selected} value={_value} {...others}>
          {label}
        </option>
      )
    }

    let groups = values.filter(item => item.group).map(item => item.group)

    groups = [...new Set(groups)]

    let optionNodes = []
    if (groups.length <= 0) {
      optionNodes = values.map((item: ValueType, index: number) =>
        renderValueOption(item, `${this._id}-option-${index}`)
      )
    } else {
      const itemsWithoutGroup = values.filter(item => !item.group)
      const optionId = `${this._id}-option`
      itemsWithoutGroup.forEach((item: ValueType, key: number) => {
        optionNodes.push(renderValueOption(item, `${optionId}-${key}`))
      })

      groups.forEach((group, groupIndex) => {
        const groupItems = values.filter(item => item.group === group)
        const groupOptionNodes = groupItems.map((item: ValueType, index: number) =>
          renderValueOption(item, `${this._id}-option-${index}`)
        )
        optionNodes.push(
          <optgroup label={group} key={`${optionId}-group-${groupIndex}`}>
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
        {...cleanProps(attributes)}
      >
        {optionNodes}
      </select>
    )
  }
}

export default FormControl(Select)
