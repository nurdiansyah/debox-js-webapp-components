// @flow

import _Link, {type LinkProps} from './Link'
import _Badge, {type BadgeProps} from './Badge'
import _Button, {type ButtonProps} from './Button'
import _ButtonGroup, {type ButtonGroupProps} from './Group'
import _ButtonToolbar, {type ButtonToolbarProps} from './Toolbar'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Link: React$ComponentType<LinkProps & StylesProps> = injectClassNames('link')(_Link)
export const Badge: React$ComponentType<BadgeProps & StylesProps> = injectClassNames('badge')(_Badge)
export const Button: React$ComponentType<ButtonProps & StylesProps> = injectClassNames('button')(_Button)
export const ButtonGroup: React$ComponentType<ButtonGroupProps & StylesProps> = injectClassNames('button-group')(
  _ButtonGroup
)
export const ButtonToolbar: React$ComponentType<ButtonToolbarProps & StylesProps> = injectClassNames('button-tool')(
  _ButtonToolbar
)

export default {
  Link: _Link,
  Badge: _Badge,
  Button: _Button,
  ButtonGroup: _ButtonGroup,
  ButtonToolbar: _ButtonToolbar
}
