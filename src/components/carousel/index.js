// @flow

import _CarouselCaption, {type CarouselCaptionProps} from './Caption'
import _CarouselControl, {type CarouselControlProps} from './Control'
import _CarouselIndicators, {type CarouselIndicatorsProps} from './Indicators'
import _CarouselItem, {type CarouselItemProps} from './Item'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const CarouselCaption: React$ComponentType<CarouselCaptionProps & StylesProps> = injectClassNames('carousel')(
  _CarouselCaption
)
export const CarouselControl: React$ComponentType<CarouselControlProps & StylesProps> = injectClassNames('carousel')(
  _CarouselControl
)
export const CarouselIndicators: React$ComponentType<CarouselIndicatorsProps & StylesProps> = injectClassNames(
  'carousel'
)(_CarouselIndicators)
export const CarouselItem: React$ComponentType<CarouselItemProps & StylesProps> = injectClassNames('carousel')(
  _CarouselItem
)

export default {
  CarouselCaption: _CarouselCaption,
  CarouselControl: _CarouselControl,
  CarouselIndicators: _CarouselIndicators,
  CarouselItem: _CarouselItem
}
