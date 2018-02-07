// @flow

import _ListGroup, {type ListGroupProps} from './ListGroup'
import _ListGroupItem, {type ListGroupItemProps} from './Item'
import _ListGroupItemHeading, {type ListGroupItemHeadingProps} from './ItemHeading'
import _ListGroupItemText, {type ListGroupItemTextProps} from './ItemText'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const ListGroup: React$ComponentType<ListGroupProps & StylesProps> = injectClassNames('list-group')(_ListGroup)
export const ListGroupItem: React$ComponentType<ListGroupItemProps & StylesProps> = injectClassNames('list-group')(
  _ListGroupItem
)
export const ListGroupItemHeading: React$ComponentType<ListGroupItemHeadingProps & StylesProps> = injectClassNames(
  'list-group'
)(_ListGroupItemHeading)
export const ListGroupItemText: React$ComponentType<ListGroupItemTextProps & StylesProps> = injectClassNames(
  'list-group'
)(_ListGroupItemText)

export default {
  ListGroup: _ListGroup,
  ListGroupItem: _ListGroupItem,
  ListGroupItemHeading: _ListGroupItemHeading,
  ListGroupItemText: _ListGroupItemText
}
