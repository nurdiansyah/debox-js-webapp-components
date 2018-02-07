// @flow

import React, {Component} from 'react'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import formDataToObject from 'form-data-to-object'
import FormControl from '@deboxsoft/webapp/form/Control'
import {contextTypes} from '@deboxsoft/webapp/form/Control-Base'
import type {FormControlType, State as FormControl$State, Context} from '@deboxsoft/webapp/form/Control-Base'

import noop from '@deboxsoft/core/utils/noop'
import validationRules from './helper/validation-rule'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

export type FormProps = {
  layout?: string,
  children?: React$Node,
  className?: string,
  classNames?: Function,
  disabled?: boolean,
  mapping?: Function,
  onChange?: Function,
  onError?: Function,
  onInvalid?: Function,
  onInvalidSubmit?: Function,
  onReset?: Function,
  onSubmit?: Function,
  onSuccess?: Function,
  onValid?: Function,
  onValidSubmit?: Function,
  preventExternalInvalidation?: boolean,
  validatePristine?: boolean,
  validationErrors?: Object
}

export type Validation = {
  isValid: boolean,
  isRequired: boolean,
  externalError?: *,
  error?: *
}

export type State = {
  formSubmitted?: boolean,
  isValid?: boolean,
  canChange?: boolean
}

const defaultProps = {
  layout: 'horizontal'
}

class Form extends Component<FormProps, State> {
  getCurrentValues: Function
  getPristineValues: Function
  setFormPristine: Function
  setInputValidationErrors: Function
  getModel: Function
  reset: Function
  submit: Function
  mapModel: Function
  resetModel: Function
  updateInputsWithError: Function
  isChanged: Function
  isFormDisabled: Function
  validate: Function
  runValidation: Function
  validateForm: Function
  attachToForm: Function
  detachFromForm: Function
  inputs: Array<FormControlType>
  _isMounted: boolean
  prevInputNames: Array<*>

  static runRules(value: any, currentValues: any, validations: any) {
    const results = {
      errors: [],
      failed: [],
      success: []
    }
    if (Object.keys(validations).length) {
      Object.keys(validations).forEach(validationMethod => {
        if (validationRules[validationMethod] && typeof validations[validationMethod] === 'function') {
          throw new Error(`formManager does not allow you to override default validations: ${validationMethod}`)
        }

        if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
          throw new Error(`formManager does not have the validation rule: ${validationMethod}`)
        }
        if (typeof validations[validationMethod] === 'function') {
          const validation = validations[validationMethod](value, currentValues)
          if (typeof validation === 'string') {
            results.errors.push(validation)
            results.failed.push(validationMethod)
          } else if (!validation) {
            results.failed.push(validationMethod)
          }
          return
        } else if (typeof validationRules[validationMethod] === 'function') {
          const validation = validationRules[validationMethod](value, currentValues, validations[validationMethod])
          if (typeof validation === 'string') {
            results.errors.push(validation)
            results.failed.push(validationMethod)
          } else if (!validation) {
            results.failed.push(validationMethod)
          } else {
            results.success.push(validationMethod)
          }
          return
        }
        results.success.push(validationMethod)
      })
    }
    return results
  }

  static childContextTypes = contextTypes

  constructor(props: FormProps): void {
    super(props)
    this.getCurrentValues = this.getCurrentValues.bind(this)
    this.getPristineValues = this.getPristineValues.bind(this)
    this.setFormPristine = this.setFormPristine.bind(this)
    this.setInputValidationErrors = this.setInputValidationErrors.bind(this)
    this.getModel = this.getModel.bind(this)
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.mapModel = this.mapModel.bind(this)
    this.resetModel = this.resetModel.bind(this)
    this.updateInputsWithError = this.updateInputsWithError.bind(this)
    this.isChanged = this.isChanged.bind(this)
    this.isFormDisabled = this.isFormDisabled.bind(this)
    this.validate = this.validate.bind(this)
    this.runValidation = this.runValidation.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.attachToForm = this.attachToForm.bind(this)
    this.detachFromForm = this.detachFromForm.bind(this)

    this.inputs = []
    this.state = {
      formSubmitted: false,
      isValid: true,
      isSubmitting: false,
      canChange: false
    }
  }

  getChildContext(): Context {
    return {
      layout: this.props.layout || defaultProps.layout,
      validatePristine: this.props.validatePristine || false,
      formBlockCN: this.props.classNames,
      formManager: {
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        validate: this.validate,
        isFormDisabled: this.isFormDisabled,
        isValidValue: (component: FormControl<*>, value: *) => this.runValidation(component, value).isValid
      }
    }
  }

  // Add a map to store the inputs of the form, a model to store
  // the values of the form and register child inputs
  componentWillMount(): void {
    this.inputs = []
    this._isMounted = true
  }

  componentDidMount(): void {
    this.validateForm()
  }

  componentWillUpdate(): void {
    // Keep a reference to input names before form updates,
    // to check if inputs has changed after render
    this.prevInputNames = this.inputs.map(component => component.props.name)
  }

  componentDidUpdate(): void {
    if (
      this.props.validationErrors &&
      typeof this.props.validationErrors === 'object' &&
      Object.keys(this.props.validationErrors).length > 0
    ) {
      this.setInputValidationErrors(this.props.validationErrors)
    }

    const newInputNames = this.inputs.map(component => component.props.name)
    if (!isEqual(this.prevInputNames, newInputNames)) {
      this.validateForm()
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  getCurrentValues(): * {
    return this.inputs.reduce((data, component) => {
      const name = component.props.name
      data[name] = component.state.value
      return data
    }, {})
  }

  getPristineValues(): * {
    return this.inputs.reduce((data: *, component: FormControlType) => {
      const name = component.props.name
      data[name] = component.props.value
      return data
    }, {})
  }

  setFormPristine(isPristine: boolean) {
    this.setState({
      formSubmitted: !isPristine
    })

    // Iterate through each component and set it as pristine
    // or "dirty".
    this.inputs.forEach((component: FormControlType) => {
      component.setState({
        formSubmitted: !isPristine,
        isPristine
      })
    })
  }

  setInputValidationErrors(errors: *): void {
    this.inputs.forEach((component: FormControlType) => {
      const name = component.props.name
      const args: FormControl$State = {
        isValid: !(name in errors),
        validationError: typeof errors[name] === 'string' ? [errors[name]] : errors[name]
      }
      component.setState(args)
    })
  }

  getModel(): Object {
    const currentValues = this.getCurrentValues()
    return this.mapModel(currentValues)
  }

  // Allow resetting to specified data
  reset(event: SyntheticEvent<HTMLButtonElement | HTMLInputElement>) {
    event && event.preventDefault()
    this.setFormPristine(true)
    if (typeof this.props.onReset === 'function') {
      this.props.onReset(this.resetModel)
    } else {
      this.resetModel()
    }
  }

  // Update model, submit to url prop and send the model
  submit(event: SyntheticEvent<HTMLButtonElement | HTMLInputElement>): void {
    const {onSubmit, onValidSubmit, onInvalidSubmit} = this.props
    event && event.preventDefault()
    // Trigger form as not pristine.
    // If any inputs have not been touched yet this will make them dirty
    // so validation becomes visible (if based on isPristine)
    this.setFormPristine(false)
    const model = this.getModel()
    if (onSubmit) {
      onSubmit(model, this.resetModel, this.updateInputsWithError)
    }
    this.state.isValid
      ? onValidSubmit && onValidSubmit(model, this.resetModel, this.updateInputsWithError)
      : onInvalidSubmit && onInvalidSubmit(model, this.resetModel, this.updateInputsWithError)
  }

  mapModel(model: Object): Object {
    if (this.props.mapping) {
      return this.props.mapping(model)
    }
    return formDataToObject.toObj(
      Object.keys(model).reduce((mappedModel, key) => {
        const keyArray = key.split('.')
        let base = mappedModel
        while (keyArray.length) {
          const currentKey = keyArray.shift()
          base = base[currentKey] = keyArray.length ? base[currentKey] || {} : model[key]
        }
        return mappedModel
      }, {})
    )
  }

  // Reset each key in the model to the original / initial / specified value
  resetModel(data: *): void {
    this.inputs.forEach((component: FormControlType) => {
      const name = component.props.name
      if ({}.hasOwnProperty.call(data, name)) {
        component.setValue(data[name])
      } else {
        component.resetValue()
      }
    })
    this.validateForm()
  }

  // Go through errors from server and grab the components
  // stored in the inputs map. Change their state to invalid
  // and set the serverError message
  updateInputsWithError(errors: *): void {
    Object.keys(errors).forEach(name => {
      const component: FormControlType = find(
        this.inputs,
        (_component: FormControlType) => _component.props.name === name
      )

      if (!component) {
        throw new Error(
          `You are trying to update an input that does not exist. Verify errors object with input names. ${JSON.stringify(
            errors
          )}`
        )
      }
      const state: FormControl$State = {
        isValid: this.props.preventExternalInvalidation || false,
        externalError: typeof errors[name] === 'string' ? [errors[name]] : errors[name]
      }
      component.setState(state)
    })
  }

  // Checks if the values have changed from their initial value
  isChanged(): boolean {
    return !isEqual(this.getPristineValues(), this.getCurrentValues())
  }

  isFormDisabled(): boolean {
    return !!this.props.disabled
  }

  // Use the binded values and the actual input value to
  // validate the input and set its state. Then check the
  // state of the form itself
  validate(component: FormControlType): void {
    const {onChange} = this.props
    // Trigger onChange
    if (this.state.canChange) {
      onChange && onChange(this.getCurrentValues(), this.isChanged())
    }
    const validation: Validation = this.runValidation(component)
    // Run through the validations, split them up and call
    // the validator IF there is a value or it is required
    component.setState(
      {
        isValid: validation.isValid,
        isRequired: validation.isRequired,
        validationError: validation.error,
        externalError: null
      },
      this.validateForm
    )
  }

  // Checks validation on current value or a passed value
  runValidation(component: FormControlType, value: *): Validation {
    const currentValues = this.getCurrentValues()
    const validationErrors = component.props.validationErrors
    const validationError = component.props.validationError
    value = arguments.length === 2 ? value : component.state.value

    const validationResults = Form.runRules(value, currentValues, component.validations)
    const requiredResults = Form.runRules(value, currentValues, component.requiredValidations)
    // the component defines an explicit validate function
    if (typeof component.validate === 'function') {
      validationResults.failed = component.validate() ? [] : ['failed']
    }

    const isRequired = Object.keys(component.requiredValidations).length ? !!requiredResults.success.length : false
    const isValid =
      !validationResults.failed.length &&
      !(this.props.validationErrors && this.props.validationErrors[component.props.name])
    const _error = () => {
      if (isValid && !isRequired) {
        return []
      }

      if (validationResults.errors.length) {
        return validationResults.errors
      }

      if (this.props.validationErrors && this.props.validationErrors[component.props.name]) {
        return typeof this.props.validationErrors[component.props.name] === 'string'
          ? [this.props.validationErrors[component.props.name]]
          : this.props.validationErrors[component.props.name]
      }

      if (isRequired) {
        const error = validationErrors && validationErrors[requiredResults.success[0]]
        return error ? [error] : null
      }

      if (validationResults.failed.length) {
        return validationResults.failed
          .map(failed => (validationErrors && validationErrors[failed] ? validationErrors[failed] : validationError))
          .filter(
            (x, pos, arr) => arr.indexOf(x) === pos // Remove duplicates
          )
      }
      return null
    }
    return {
      isRequired,
      isValid: isRequired ? false : isValid,
      error: _error()
    }
  }

  // Validate the form by going through all child input components
  // and check their state
  validateForm(): void {
    const {onValid = noop, onInvalid = noop} = this.props
    // We need a callback as we are validating all inputs again. This will
    // run when the last component has set its state
    const onValidationComplete = () => {
      const allIsValid = this.inputs.every(component => component.state.isValid)
      this.setState({
        isValid: allIsValid
      })
      if (allIsValid) {
        onValid()
      } else {
        onInvalid()
      }

      // Tell the form that it can start to trigger change events
      this.setState({
        canChange: true
      })
    }
    onValidationComplete()

    // Run validation again in case affected by other inputs. The
    // last component validated will run the onValidationComplete callback
    this.inputs.forEach((component, index) => {
      const validation: Validation = this.runValidation(component)
      if (validation.isValid && component.state._externalError) {
        validation.isValid = false
      }
      component.setState(
        {
          isValid: validation.isValid,
          isRequired: validation.isRequired,
          validationError: validation.error,
          externalError: !validation.isValid && component.state.externalError ? component.state.externalError : null
        },
        () => (index === this.inputs.length - 1 ? onValidationComplete : null)
      )
    })

    // If there are no inputs, set state where form is ready to trigger
    // change event. New inputs might be added later
    if (!this.inputs.length && this._isMounted) {
      this.setState({
        canChange: true
      })
    }
  }

  // Method put on each input component to register
  // itself to the form
  attachToForm(component: FormControlType): void {
    if (this.inputs.indexOf(component) === -1) {
      this.inputs.push(component)
    }
    this.validate.bind(this, component)
  }

  // Method put on each input component to unregister
  // itself from the form
  detachFromForm(component: FormControlType): void {
    const componentPos = this.inputs.indexOf(component)
    if (componentPos !== -1) {
      this.inputs = this.inputs.slice(0, componentPos).concat(this.inputs.slice(componentPos + 1))
    }
    this.validateForm()
  }

  render(): React$Node {
    /* eslint-disable no-unused-vars */
    const {
      className: _className,
      classNames: _classNames,
      mapping,
      onChange,
      onError,
      onInvalid,
      onInvalidSubmit,
      onSubmit,
      onSuccess,
      onValid,
      onValidSubmit,
      preventExternalInvalidation,
      validatePristine,
      validationErrors,
      ...attributes
    } = this.props
    const classNames = propsClassNames({classNames: _classNames})
    let className = _className ? `${_className} ` : ''
    className += classNames()
    return (
      <form {...attributes} onSubmit={this.submit} onReset={this.reset} className={className}>
        {this.props.children}
      </form>
    )
  }
}

export const addValidationRule = (name: string, func: Function) => (validationRules[name] = func)
export default Form
