// @flow

import _Progress, {type ProgressProps} from './Progress'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Progress: React$ComponentType<ProgressProps & StylesProps> = injectClassNames('progress')(_Progress)

export default {
  Progress: _Progress
}
