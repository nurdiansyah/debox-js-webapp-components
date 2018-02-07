// @flow

import _Menu, {type MenuProps} from './Menu'
import _MenuItem, {type MenuItemProps} from './Item'
import _MenuLink, {type MenuLinkProps} from './Link'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Menu: React$ComponentType<MenuProps & StylesProps> = injectClassNames('menu')(_Menu)
export const MenuItem: React$ComponentType<MenuItemProps & StylesProps> = injectClassNames('menu')(_MenuItem)
export const MenuLink: React$ComponentType<MenuLinkProps & StylesProps> = injectClassNames('menu')(_MenuLink)

export default {
  Menu: _Menu,
  MenuItem: _MenuItem,
  MenuLink: _MenuLink
}
