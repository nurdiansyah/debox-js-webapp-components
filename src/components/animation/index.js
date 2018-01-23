// @flow

import _Fade, {type FadeProps} from './Fade'
import {injectClassNames, type StylesProps} from '../utils/classnamesUtils'

export const Fade: React$ComponentType<FadeProps & StylesProps> = injectClassNames('fade')(_Fade)

export default {
  Fade: _Fade
}
