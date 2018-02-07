// @flow

import React from 'react'
import classNames from 'classNames'
import {propsClassNames} from '@deboxsoft/webapp/utils/classnamesUtils'
import {Link} from '../button'

export type NavbarBrandProps = {
  className?: string,
  classNames?: Function
}

const NavbarBrand = (props: NavbarBrandProps) => {
  const {className: _className, classNames: _classNames, ...attributes} = props

  const navbarCN = propsClassNames({classNames: _classNames})
  const className = classNames(_className, navbarCN('brand'))

  return (
    <div className={className}>
      <Link className={navbarCN('link')} {...attributes} />
    </div>
  )
}

export default NavbarBrand
