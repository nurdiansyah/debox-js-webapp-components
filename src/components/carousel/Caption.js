// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CarouselCaptionProps = {
  captionHeader: string,
  captionText: string,
  className: string,
  classNames: Function
}

const CarouselCaption = (props: CarouselCaptionProps) => {
  const {captionHeader, captionText, classNames: _classNames, className: _className, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const className = `${_className ? `${_className} ` : ''}${classNames('caption', {
    'd-none': true,
    'd-md-block': true
  })}`

  return (
    <div {...attributes} className={className}>
      <h3>{captionHeader}</h3>
      <p>{captionText}</p>
    </div>
  )
}

export default CarouselCaption
