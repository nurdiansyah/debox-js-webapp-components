// // @flow

// import React from 'react'
// import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'

// export type PaginationProps = {
//   // children?: React$Node,
//   className?: string,
//   classNames?: Function,
//   count: number,
//   offset?: number,
//   onChangePage?: Function,
//   maxShowPage?: number,
//   limit?: number
// }

// const defaultProps = {
//   limit: 25,
//   maxShowPage: 3,
//   offset: 0
// }

// const Pagination = (props: PaginationProps) => {
//   const {
//     className: _className,
//     classNames: _classNames,
//     count,
//     offset = defaultProps.offset,
//     limit = defaultProps.limit,
//     onChangePage,
//     maxShowPage = defaultProps.maxShowPage
//   } = props

//   const numberPages = Math.floor(count / limit)
//   const currentPage = offset / limit + 1

//   const classNames = propsClassNames({classNames: _classNames})
//   const className = _className || classNames()

//   const changePageHandler = (page: number) => () => {
//     const _offset = (page - 1) * limit
//     onChangePage && onChangePage(_offset, limit)
//   }

//   return (
//     <div className={className}>
//       {/* begin page */}
//       {/* <div className={classNames('begin', {disabled: currentPage === 1})} onClick={changePageHandler(1)} /> */}
//       {/* last page */}
//       {/* <div className={classNames('last', {disabled: currentPage === numberPages})} onClick={changePageHandler(numberPages)} /> */}
//     </div>
//   )
// }

// export default Pagination
