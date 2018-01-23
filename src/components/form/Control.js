// @flow

import React from 'react'
import isEqual from 'lodash/isEqual'
import uniqueId from 'lodash/uniqueId'

import {contextTypes, FormControl$Component} from './helper/form-control-types'
import type {ControlProps, State, Context} from './helper/form-control-types'
import {propsClassNames} from '../utils/classnamesUtils'

const convertValidationsToObject = validations => {
  if (typeof validations === 'string') {
    return validations.split(/,(?![^{[]*[}\]])/g).reduce((_prevValids, _curValids) => {
      let args = _curValids.split(':')
      const validateMethod = args.shift()

      args = args.map(arg => {
        try {
          return JSON.parse(arg)
        } catch (e) {
          return arg // It is a string if it can not parse it
        }
      })

      if (args.length > 1) {
        throw new Error('FormControl does not support multiple args on string validations. Use object format of validations instead.')
      }

      _prevValids[validateMethod] = args.length ? args[0] : true
      return _prevValids
    }, {})
  }

  return validations || {}
}

const defaultProps = {
  validationErrors: {},
  tag: 'div'
}

const withFormControl: Function = (ComposedComponent: React$ComponentType<*>) => {
  class FormControl extends FormControl$Component<ControlProps, State> {
    static contextTypes = contextTypes

    constructor(props: ControlProps, context: Context) {
      super(props, context)
      this.getErrorMessage = this.getErrorMessage.bind(this)
      this.getErrorMessages = this.getErrorMessages.bind(this)
      this.getId = this.getId.bind(this)
      this.getValidatePristine = this.getValidatePristine.bind(this)
      this.hasValue = this.hasValue.bind(this)
      this.isFormDisabled = this.isFormDisabled.bind(this)
      this.isFormSubmitted = this.isFormSubmitted.bind(this)
      this.isPristine = this.isPristine.bind(this)
      this.isRequired = this.isRequired.bind(this)
      this.isValid = this.isValid.bind(this)
      this.resetValue = this.resetValue.bind(this)
      this.setEnableAutoFocus = this.setEnableAutoFocus.bind(this)
      this.setValidations = this.setValidations.bind(this)
      this.setValue = this.setValue.bind(this)
      this.showErrors = this.showErrors.bind(this)
      this.showRequired = this.showRequired.bind(this)
      this.i = 0
      this.state = {
        value: props.value || '',
        isRequired: false,
        isValid: true,
        isPristine: true,
        pristineValue: props.value,
        validationError: [],
        externalError: null,
        formSubmitted: false
      }
    }

    componentDidMount() {
      this.setValidations(this.props.validations, this.props.required)
      this.context.formManager.attachToForm(this)
      this.setEnableAutoFocus(this.props.autoFocus)
    }

    // We have to make the validate method is kept when new props are added
    componentWillReceiveProps(nextProps: ControlProps) {
      this.setValidations(nextProps.validations, nextProps.required)
      if (nextProps.value !== this.props.value) {
        this.setState({value: nextProps.value})
      }
    }

    componentDidUpdate(prevProps: ControlProps) {
      // If validations or required is changed, run a new validation
      if (!isEqual(this.props.validations, prevProps.validations) || !isEqual(this.props.required, prevProps.required)) {
        this.context.formManager.validate(this)
      }
    }

    // Detach it when component unmounts
    componentWillUnmount() {
      this.context.formManager.detachFromForm(this)
    }

    getValidatePristine: Function = () => {
      const defaultProperty = this.context.validatePristine || false
      return this.props.validatePristine ? this.props.validatePristine : defaultProperty
    }

    /**
     * getId
     *
     * The ID is used as an attribute on the form control, and is used to allow
     * associating the label element with the form control.
     *
     * If we don't explicitly pass an `id` prop, we generate one based on the
     * `name` and `label` properties.
     */
    getId: Function = () => {
      if (this.props.id) {
        return this.props.id
      }
      const name = this.props.name
      return uniqueId(
        name
          .split('[')
          .join('_')
          .replace(']', '')
      )
    }

    setValidations: Function = (validations: string, required: boolean | string) => {
      // Add validations to the store itself as the props object can not be modified
      this.validations = convertValidationsToObject(validations) || {}
      this.requiredValidations = required === true ? {isDefaultRequiredValue: true} : convertValidationsToObject(required)
    }

    getErrorMessage: Function = () => {
      const messages = this.getErrorMessages()
      return messages.length ? messages[0] : null
    }

    getErrorMessages: Function = () => (!this.isValid() || this.showRequired() ? this.state.externalError || this.state.validationError || [] : [])

    setEnableAutoFocus: Function = enableAutoFocus => {
      this.enableAutoFocus = enableAutoFocus
    }

    // We validate after the value has been set
    setValue: Function = (value, onChange, addValue) => {
      this.autoFocus = false
      const cb = () => {
        this.context.formManager.validate(this)
        if (onChange) {
          onChange(this.props.name, this.state.value, addValue)
          this.autoFocus = this.enableAutoFocus
        }
      }
      cb.bind(this)

      if (onChange) {
        this.setState(
          {
            value,
            isPristine: false
          },
          cb
        )
      } else {
        this.setState(
          {
            value
          },
          cb
        )
      }
    }

    getValue: Function = () => this.state.value

    isFormDisabled: Function = () => this.context.formManager.isFormDisabled()

    isValid: Function = () => this.state.isValid

    isPristine: Function = () => this.state.isPristine

    isFormSubmitted: Function = () => this.state.formSubmitted

    isRequired: Function = () => !!this.props.required

    showRequired: Function = () => this.state.isRequired

    showErrors: Function = () => {
      if (this.isPristine() === true) {
        if (this.getValidatePristine() === false) {
          return false
        }
      }
      return this.isValid() === false
    }

    resetValue: Function = () => {
      this.setState(
        {
          value: this.state.pristineValue,
          isPristine: true
        },
        () => {
          this.context.formManager.validate(this)
        }
      )
    }

    hasValue: Function = () => this.state.value !== ''

    renderErrorMessage() {
      if (!this.showErrors()) {
        return null
      }
      const classNames = propsClassNames(this.props)
      const errorMessages = this.getErrorMessages() || []
      return errorMessages.map(message => (
        <span key={uniqueId('error-message')} className={classNames('error')}>
          {message}
        </span>
      ))
    }

    // TODO tampilan help masih belum terpikirkan
    renderHelp() {
      if (!this.props.help) {
        return null
      }
      const classNames = propsClassNames(this.props)
      const className = classNames('help')
      return <span className={className}>{this.props.help}</span>
    }

    render(): React$Node {
      const {tag: Tag = defaultProps.tag, getRef, controlClassName, ...attributes} = this.props
      const {formBlockCN} = this.context
      delete attributes.id
      const formControl = {
        getErrorMessage: this.getErrorMessage,
        getErrorMessages: this.getErrorMessages,
        getLayout: this.getLayout,
        getValue: this.getValue,
        hasValue: this.hasValue,
        id: this.getId(),
        isFormDisabled: this.isFormDisabled,
        isFormSubmitted: this.isFormSubmitted,
        isPristine: this.isPristine,
        isRequired: this.isRequired,
        isValid: this.isValid,
        isValidValue: this.isValidValue,
        resetValue: this.resetValue,
        setEnableAutoFocus: this.setEnableAutoFocus,
        setValidations: this.setValidations,
        setValue: this.setValue,
        showErrors: this.showErrors,
        showRequired: this.showRequired
      }
      const classNames = propsClassNames({classNames: formBlockCN})
      const className = controlClassName || classNames('control')

      return (
        <Tag className={className}>
          <ComposedComponent
            ref={_ref => {
              getRef && getRef(_ref)
              return (this.RefComponent = _ref)
            }}
            {...attributes}
            {...this.state}
            autoFocus={this.autoFocus}
            formControl={formControl}
          />
          {this.renderErrorMessage()}
          {this.renderHelp()}
        </Tag>
      )
    }
  }

  return FormControl
}

export default withFormControl
