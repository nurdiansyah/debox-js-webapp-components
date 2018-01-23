// @flow

import _Menu, {type MenuProps} from './Menu'
import _MenuItem, {type MenuItemProps} from './Item'
import _MenuLink, {type MenuLinkProps} from './Link'
import {injectClassNames, type StylesProps} from '../utils/classnamesUtils'

export const Menu: React$ComponentType<MenuProps> = injectClassNames('menu')(_Menu)
export const MenuItem: React$ComponentType<MenuItemProps> = injectClassNames('menu')(_MenuItem)
export const MenuLink: React$ComponentType<MenuLinkProps> = injectClassNames('menu')(_MenuLink)

export default {
  Menu: _Menu,
  MenuItem: _MenuItem,
  MenuLink: _MenuLink
}
