// @flow

import _Media, {type MediaProps} from './Media'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Media: React$ComponentType<MediaProps & StylesProps> = injectClassNames('media')(_Media)

export default {Media}
