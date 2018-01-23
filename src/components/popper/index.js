// @flow

import _Popper, {type PopperProps} from './Popper'
import _Arrow, {type ArrowProps} from './Arrow'
import _Tooltip, {type TooltipProps} from './Tooltip'
import {injectClassNames, type StylesProps} from '../utils/classnamesUtils'
import type {Placement as _Placement, Modifieras as _Modifiers} from 'popper.js'

export type Placement = _Placement
export type Modifiers = _Modifiers

export const Arrow: React$ComponentType<ArrowProps & StylesProps> = injectClassNames('popper')(_Arrow)
export const Popper: React$ComponentType<PopperProps & StylesProps> = injectClassNames('popper')(_Popper)
export const Tooltip: React$ComponentType<TooltipProps & StylesProps> = injectClassNames('popper')(_Tooltip)

export default {
  Arrow: _Arrow,
  Popper: _Popper,
  Tooltip: _Tooltip
}
