// @flow

import React, {PureComponent} from 'react'

type MonthDropdownOptionsProps = {
  blockClass: Function,
  onCancel?: Function,
  onChange?: Function,
  month?: number,
  monthNames: Array<string>
}

export default class MonthDropdownOptions extends PureComponent<MonthDropdownOptionsProps> {
  month: ?HTMLDivElement
  handleClickOutside: Function
  onChange: Function

  constructor(props: MonthDropdownOptionsProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  onChange(month: number) {
    return this.props.onChange && this.props.onChange(month)
  }
  handleClickOutside() {
    return this.props.onCancel && this.props.onCancel()
  }
  renderOptions() {
    return this.props.monthNames.map((month: string, i: number) => (
      <div
        className={this.props.blockClass('scroll-option')}
        key={month}
        ref={ref => (this.month = ref)}
        onClick={this.onChange(i)}
        role="button"
        tabIndex={0}
      >
        {this.props.month === i ? <span className={this.props.blockClass('scroll-selected')}>✓</span> : ''}
        {month}
      </div>
    ))
  }
  render() {
    return <div className={this.props.blockClass('scroll-dropdown')}>{this.renderOptions()}</div>
  }
}
