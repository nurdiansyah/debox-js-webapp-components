// @flow

import React from 'react'
import uniqueId from 'lodash/uniqueId'
import {propsClassNames} from '../utils/classnamesUtils'

export type CarouselIndicatorsProps = {
  items: Array<*>,
  activeIndex: number,
  className?: string,
  classNames: Function,
  onClickHandler: Function
}

const CarouselIndicators = (props: CarouselIndicatorsProps) => {
  const {items, activeIndex, className: _className, classNames: _classNames, onClickHandler, ...attributes} = props

  const classNames = propsClassNames({classNames: _classNames})
  const listClasses = `${_className ? `${_className} ` : ''}${classNames('indicators')}`
  const indicators = items.map((item, idx) => {
    const indicatorClasses = classNames({active: activeIndex === idx})
    return (
      <li
        key={uniqueId('carousel-indicator')}
        onClick={e => {
          e.preventDefault()
          onClickHandler(idx)
        }}
        role="menuitem"
        className={indicatorClasses}
      />
    )
  })

  return (
    <ol className={listClasses} {...attributes}>
      {indicators}
    </ol>
  )
}

export default CarouselIndicators
