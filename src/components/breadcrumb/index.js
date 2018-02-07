// @flow

import _Breadcrumb, {type BreadcrumbProps} from './Breadcrumb'
import _BreadcrumbItem, {type BreadcrumbItemProps} from './Item'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Breadcrumb: React$ComponentType<BreadcrumbProps & StylesProps> = injectClassNames('breadcrumb')(
  _Breadcrumb
)
export const BreadcrumbItem: React$ComponentType<BreadcrumbItemProps & StylesProps> = injectClassNames('breadcrumb')(
  _BreadcrumbItem
)

export default {
  Breadcrumb: _Breadcrumb,
  BreadcrumbItem: _BreadcrumbItem
}
