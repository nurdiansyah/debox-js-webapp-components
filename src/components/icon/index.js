// @flow

import _FontIcon, {type FontIconProps} from './FontIcon'
import _FontAwesome, {type FontAwesomeProps} from './FontAwesome'
import {injectClassNames, type StylesProps} from '../utils/classnamesUtils'


export const FontIcon: React$ComponentType<FontIconProps & StylesProps> = injectClassNames('icon')(_FontIcon)
export const FontAwesome: React$ComponentType<FontAwesomeProps & StylesProps> = injectClassNames('icon')(_FontAwesome)

export default {
  FontIcon: _FontIcon,
  FontAwesome: _FontAwesome
}
