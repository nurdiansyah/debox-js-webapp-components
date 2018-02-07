// @flow

import React, {PureComponent} from 'react'

import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type FieldProps = {
  className?: string,
  classNames?: Function,
  children?: React$Node,
  required?: ?boolean,
  label?: string,
  labelClassName?: string,
  tag?: React$ElementType,
  htmlFor?: string,
  error?: ?boolean,
  horizontal?: ?boolean
}
const defaultProps = {
  tag: 'div'
}

class FormGroup extends PureComponent<FieldProps> {
  renderRequiredSymbol() {
    const {required} = this.props
    const classNames = propsClassNames(this.props)
    if (required) {
      return <span className={classNames('required')}> *</span>
    }
    return null
  }

  renderLabel() {
    const {tag: Tag, labelClassName} = this.props
    const TagLabel = Tag === 'fieldset' ? 'legend' : 'label'
    let className = labelClassName ? `${labelClassName} ` : ''
    className += propsClassNames(this.props)('label')
    return (
      <TagLabel className={className} htmlFor={this.props.htmlFor}>
        {this.props.label}
        {this.renderRequiredSymbol()}
      </TagLabel>
    )
  }

  renderElement() {
    const children = this.props.children
    return children
  }

  render(): React$Node {
    const {
      classNames: _classNames,
      label,
      tag: Tag = defaultProps.tag,
      className: _className,
      ...attributes
    } = this.props
    const classNames = propsClassNames({classNames: _classNames})
    let className = _className ? `${_className} ` : ''
    className += classNames('field', {
      horizontal: attributes.horizontal,
      error: attributes.error
    })

    if (typeof Tag !== 'string') {
      return (
        <Tag className={_className} {...attributes}>
          {this.renderElement()}
        </Tag>
      )
    }

    if (label) {
      return (
        <Tag className={className}>
          {this.renderLabel()}
          {this.renderElement()}
        </Tag>
      )
    }
    return <Tag className={className}>{this.renderElement()}</Tag>
  }
}

export default FormGroup
