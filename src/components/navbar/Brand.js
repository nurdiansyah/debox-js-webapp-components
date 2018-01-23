// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'
import {Link} from '../button'

export type NavbarBrandProps = {
  className?: string,
  classNames?: Function
}

const NavbarBrand = (props: NavbarBrandProps) => {
  const {className: _className, classNames: _classNames, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('brand')}`

  return (
    <div className={className}>
      <Link className={classNames('link')} {...attributes} />
    </div>
  )
}

export default NavbarBrand
