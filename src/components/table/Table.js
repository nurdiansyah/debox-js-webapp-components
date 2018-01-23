// @flow

import React, {Component} from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type TableProps = {
  className?: string,
  classNames?: Function,
  striped?: ?boolean,
  bordered: ?boolean,
  condensed: ?boolean,
  hover: ?boolean,
  responsive: ?boolean
}

class Table extends Component<TableProps> {
  renderTable() {
    const {striped, bordered, condensed, hover, responsive, className: _className, classNames: _classNames, ...attributes} = this.props
    const classNames = propsClassNames({classNames: _classNames})
    const className = `${_className ? `${_className} ` : ''}${classNames(null, {
      responsive,
      hover,
      bordered,
      condensed,
      striped
    })}`
    return <table {...attributes} className={className} />
  }

  render(): React$Node {
    if (this.props.responsive) {
      return <div>{this.renderTable()}</div>
    }
    return this.renderTable()
  }
}

export default Table
