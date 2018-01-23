/* eslint max-len:0 */
// @flow
import isEmpty from 'lodash/isEmpty'
import isNill from 'lodash/isNil'
import isNumber from 'lodash/isNumber'

const isExisty = value => !isNill(value)

const validations = {
  isDefaultRequiredValue: (value: ?string): boolean => value === undefined || value === '',

  isExisty: (value: *): boolean => isExisty(value),

  matchRegexp: (value: *, regexp: *): boolean => !isExisty(value) || isEmpty(value) || regexp.test(value),

  isUndefined: (value: *): boolean => value === undefined,

  isEmptyString: (value: *) => isEmpty(value),

  isEmail: (value: *) => validations.matchRegexp(value, /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i),
  isUrl: (value: *) =>
    validations.matchRegexp(
      value,
      /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i
    ),

  isTrue: (value: *) => value === true,

  isFalse: (value: *) => value === false,

  isNumeric: (value: *) => {
    if (isNumber(value)) {
      return true
    }
    return validations.matchRegexp(value, /^[-+]?(?:\d*[.])?\d+$/)
  },

  isAlpha: (value: *) => validations.matchRegexp(value, /^[A-Z]+$/i),

  isAlphanumeric: (value: *) => validations.matchRegexp(value, /^[0-9A-Z]+$/i),

  isInt: (value: *) => validations.matchRegexp(value, /^(?:[-+]?(?:0|[1-9]\d*))$/),

  isFloat: (value: *) => validations.matchRegexp(value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][+-]?(?:\d+))?$/),

  isWords: (value: *) => validations.matchRegexp(value, /^[A-Z\s]+$/i),

  isSpecialWords: (value: *) => validations.matchRegexp(value, /^[A-Z\s\u00C0-\u017F]+$/i),

  isLength: (value: *, values: Array<*>, length: number) => !isExisty(value) || isEmpty(value) || value.length === length,

  equals: (value: *, values: Array<*>, eql: *) => !isExisty(value) || isEmpty(value) || value === eql,

  equalsField: (value: *, values: Array<*>, field: *) => value === values[field],

  maxLength: (value: *, values: Array<*>, length: number) => !isExisty(value) || value.length <= length,

  minLength: (value: *, values: Array<*>, length: number): boolean => !isExisty(value) || isEmpty(value) || value.length >= length
}

export default validations
