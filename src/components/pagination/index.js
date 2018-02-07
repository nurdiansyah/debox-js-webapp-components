// @flow

// import _Pagination, {type PaginationProps} from './Pagination'
import _PaginationItem, {type PaginationItemProps} from './Item'
import _PaginationLink, {type PaginationLinkProps} from './Link'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

// export const Pagination: React$ComponentType<PaginationProps & StylesProps> = injectClassNames('pagination')(_Pagination)
export const PaginationItem: React$ComponentType<PaginationItemProps & StylesProps> = injectClassNames('pagination')(
  _PaginationItem
)
export const PaginationLink: React$ComponentType<PaginationLinkProps & StylesProps> = injectClassNames('pagination')(
  _PaginationLink
)

export default {
  // Pagination: _Pagination,
  PaginationItem: _PaginationItem,
  PaginationLink: _PaginationLink
}
