// @flow

import _Navbar, {type NavbarProps} from './Navbar'
import _NavbarBrand, {type NavbarBrandProps} from './Brand'
import _NavbarDropdown, {type NavbarDropdownProps} from './Dropdown'
import _NavbarItem, {type NavbarItemProps} from './Item'
import _Navigation, {type NavigationProps} from './Navigation'
import _NavbarToggler, {type NavbarTogglerProps} from './Toggler'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Navbar: React$ComponentType<NavbarProps & StylesProps> = injectClassNames('navbar')(_Navbar)
export const Navigation: React$ComponentType<NavigationProps & StylesProps> = injectClassNames('navbar')(_Navigation)
export const NavbarBrand: React$ComponentType<NavbarBrandProps & StylesProps> = injectClassNames('navbar', {
  keepStyles: true
})(_NavbarBrand)
export const NavbarDropdown: React$ComponentType<NavbarDropdownProps & StylesProps> = injectClassNames('navbar')(
  _NavbarDropdown
)
export const NavbarItem: React$ComponentType<NavbarItemProps & StylesProps> = injectClassNames('navbar', {
  keepStyles: true
})(_NavbarItem)
export const NavbarToggler: React$ComponentType<NavbarTogglerProps & StylesProps> = injectClassNames('navbar')(
  _NavbarToggler
)

export default {
  Navbar: _Navbar,
  NavbarBrand: _NavbarBrand,
  NavbarToggler: _NavbarToggler
}
