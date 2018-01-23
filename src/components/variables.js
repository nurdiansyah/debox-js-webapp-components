// @flow

export type SizeType = 'large' | 'medium' | 'small' | 'xsmall' | 'lg' | 'md' | 'sm' | 'xs'

export const Size: Object = {
  LARGE: 'large',
  SMALL: 'small',
  XSMALL: 'xsmall'
}

export const SIZE_MAP: Object = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
}

export const DEVICE_SIZES: Array<string> = ['lg', 'md', 'sm', 'xs']

export const Type: Object = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link',
  INVERSE: 'inverse',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
}

export default {
  Size,
  SIZE_MAP,
  DEVICE_SIZES,
  Type
}
