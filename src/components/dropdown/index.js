// @flow

import _Dropdown, {type DropdownProps} from './Dropdown'
import _DropdownMenu, {type DropdownMenuProps} from './Menu'
import _DropdownItem, {type DropdownItemProps} from './Item'
import _DropdownToggle, {type DropdownToggleProps} from './Toggle'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Dropdown: React$ComponentType<DropdownProps & StylesProps> = injectClassNames('dropdown')(_Dropdown)
export const DropdownMenu: React$ComponentType<DropdownMenuProps & StylesProps> = injectClassNames('dropdown')(
  _DropdownMenu
)
export const DropdownItem: React$ComponentType<DropdownItemProps & StylesProps> = injectClassNames('dropdown')(
  _DropdownItem
)
export const DropdownToggle: React$ComponentType<DropdownToggleProps & StylesProps> = injectClassNames('dropdown')(
  _DropdownToggle
)

export default {
  Dropdown: _Dropdown,
  DropdownMenu: _DropdownMenu,
  DropdownItem: _DropdownItem,
  DropdownToggle: _DropdownToggle
}
