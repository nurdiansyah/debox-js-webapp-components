// @flow

import _Card, {type CardProps} from './Card'
import _CardBlock, {type CardBlockProps} from './Block'
import _CardContent, {type CardContentProps} from './Content'
import _CardColumns, {type CardColumnsProps} from './Columns'
import _CardDeck, {type CardDeckProps} from './Deck'
import _CardFooter, {type CardFooterProps} from './Footer'
import _CardGroup, {type CardGroupProps} from './Group'
import _CardHeader, {type CardHeaderProps} from './Header'
import _CardImg, {type CardImgProps} from './Img'
import _CardImgOverlay, {type CardImgOverlayProps} from './ImgOverlay'
import _CardLink, {type CardLinkProps} from './Link'
import _CardSubtitle, {type CardSubtitleProps} from './Subtitle'
import _CardText, {type CardTextProps} from './Text'
import _CardTitle, {type CardTitleProps} from './Title'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Card: React$ComponentType<CardProps & StylesProps> = injectClassNames('card')(_Card)
export const CardBlock: React$ComponentType<CardBlockProps & StylesProps> = injectClassNames('card')(_CardBlock)
export const CardContent: React$ComponentType<CardContentProps & StylesProps> = injectClassNames('card')(_CardContent)
export const CardColumns: React$ComponentType<CardColumnsProps & StylesProps> = injectClassNames('card')(_CardColumns)
export const CardDeck: React$ComponentType<CardDeckProps & StylesProps> = injectClassNames('card')(_CardDeck)
export const CardFooter: React$ComponentType<CardFooterProps & StylesProps> = injectClassNames('card')(_CardFooter)
export const CardGroup: React$ComponentType<CardGroupProps & StylesProps> = injectClassNames('card')(_CardGroup)
export const CardHeader: React$ComponentType<CardHeaderProps & StylesProps> = injectClassNames('card')(_CardHeader)
export const CardImg: React$ComponentType<CardImgProps & StylesProps> = injectClassNames('card')(_CardImg)
export const CardImgOverlay: React$ComponentType<CardImgOverlayProps & StylesProps> = injectClassNames('card')(
  _CardImgOverlay
)
export const CardLink: React$ComponentType<CardLinkProps & StylesProps> = injectClassNames('card')(_CardLink)
export const CardSubtitle: React$ComponentType<CardSubtitleProps & StylesProps> = injectClassNames('card')(
  _CardSubtitle
)
export const CardText: React$ComponentType<CardTextProps & StylesProps> = injectClassNames('card')(_CardText)
export const CardTitle: React$ComponentType<CardTitleProps & StylesProps> = injectClassNames('card')(_CardTitle)

export default {
  Card,
  CardBlock,
  CardColumns,
  CardDeck,
  CardFooter,
  CardGroup,
  CardHeader,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle
}
