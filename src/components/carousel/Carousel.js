// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

type CarouselProps = {
  className?: string,
  classNames?: Function,
  children?: React$Node
}

const Carousel = (props: CarouselProps) => {
  const {children, className: _className, classNames: _classNames, ...attributes} = props
  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames()}`
  return (
    <div className={className} {...attributes}>
      {children}
    </div>
  )
}

export default Carousel
