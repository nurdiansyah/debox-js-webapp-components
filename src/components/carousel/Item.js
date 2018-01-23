// @flow

import React, {PureComponent} from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type CarouselItemProps = {
  src: string,
  altText: string,
  classNames: Function,
  className: string,
  children: React$Node
}

type ContextTypes = {
  direction: string
}

type State = {
  animation: Object
}

class CarouselItem extends PureComponent<CarouselItemProps, State> {
  willEnterTimeout: number
  willLeaveTimeout: number
  slide: HTMLDivElement

  constructor(props: CarouselItemProps, context: ContextTypes) {
    super(props, context)
    this.state = {animation: {}}
  }

  componentWillUnmount() {
    clearTimeout(this.willEnterTimeout)
    clearTimeout(this.willLeaveTimeout)
  }

  componentWillAppear(callBack: Function) {
    this.setState({
      animation: {active: true}
    })
    callBack()
  }

  componentWillEnter(callBack: Function) {
    const className = this.context.direction === 'right' ? {next: true, left: true} : {prev: true, right: true}
    this.setState({
      animation: className
    })

    this.willEnterTimeout = setTimeout(() => {
      callBack()
    }, 500)
  }

  componentDidEnter() {
    this.setState({
      animation: {active: true}
    })
  }

  componentWillLeave(callBack: Function) {
    const className = this.context.direction === 'right' ? {left: true, active: true} : {right: true, active: true}
    this.setState({
      animation: className
    })

    this.slide.dispatchEvent(new CustomEvent('slide.bs.carousel'))

    this.willLeaveTimeout = setTimeout(() => {
      callBack()
    }, 500)
  }

  componentDidLeave() {
    this.setState({
      animation: {}
    })
    this.slide.dispatchEvent(new CustomEvent('slid.bs.carousel'))
  }

  render(): React$Node {
    const {src, altText, children, classNames: _classNames, className: _className, ...attributes} = this.props

    const classNames = propsClassNames({classNames: _classNames})
    const className = `${_className ? `${_className} ` : ''}${classNames('item', this.state.animation)}`

    return (
      <div
        {...attributes}
        className={className}
        ref={slide => {
          if (slide) this.slide = slide
        }}
      >
        <img src={src} alt={altText} />
        {children}
      </div>
    )
  }
}

export default CarouselItem
