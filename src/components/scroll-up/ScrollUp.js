// @flow

import React, {Component} from 'react'
import TweenFunctions from 'tween-functions'
import detectPassiveEvents from 'detect-passive-events'

type ScrollUpProps = {
  topPosition?: number,
  showUnder: number,
  easing:
    | 'linear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInOutSine'
    | 'easeInExpo'
    | 'easeOutExpo'
    | 'easeInOutExpo'
    | 'easeInCirc'
    | 'easeOutCirc'
    | 'easeInOutCirc'
    | 'easeInElastic'
    | 'easeOutElastic'
    | 'easeInOutElastic'
    | 'easeInBack'
    | 'easeOutBack'
    | 'easeInOutBack'
    | 'easeInBounce'
    | 'easeOutBounce'
    | 'easeInOutBounce',
  duration?: number,
  style?: Object
}

type State = {
  show: boolean
}

const defaultProps = {
  duration: 250,
  easing: 'easeOutCubic',
  style: {
    position: 'fixed',
    bottom: 50,
    right: 30,
    cursor: 'pointer',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'linear',
    transitionDelay: '0s'
  }
}

export default class ScrollUp extends Component<ScrollUpProps, State> {
  data: Object
  handleScroll: Function
  handleClick: Function
  scrollStep: Function
  stopScrolling: Function

  constructor(props: ScrollUpProps) {
    super(props)
    this.state = {show: false}

    this.data = {startValue: 0, currentTime: 0, startTime: null, rafId: null}

    this.handleScroll = this.handleScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.scrollStep = this.scrollStep.bind(this)
    this.stopScrolling = this.stopScrolling.bind(this)
  }

  componentDidMount() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('wheel', this.stopScrolling, detectPassiveEvents.hasSupport ? {passive: true} : false)
    window.addEventListener('touchstart', this.stopScrolling, detectPassiveEvents.hasSupport ? {passive: true} : false)
  }

  shouldComponentUpdate(nextProps: ScrollUpProps, nextState: State) {
    return nextState.show !== this.state.show
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('wheel', this.stopScrolling, false)
    window.removeEventListener('touchstart', this.stopScrolling, false)
  }

  handleScroll() {
    if (window.pageYOffset > this.props.showUnder) {
      if (!this.state.show) {
        this.setState({show: true})
      }
    } else if (this.state.show) {
      this.setState({show: false})
    }
  }

  handleClick() {
    this.stopScrolling()
    this.data.startValue = window.pageYOffset
    this.data.currentTime = 0
    this.data.startTime = null
    this.data.fafId = window.requestAnimationFrame(this.scrollStep)
  }

  scrollStep(timestamp: number) {
    if (!this.data.startTime) {
      this.data.startTime = timestamp
    }

    this.data.currentTime = timestamp - this.data.startTime

    const position = TweenFunctions[this.props.easing](this.data.currentTime, this.data.startValue, this.props.topPosition, this.props.duration)

    if (window.pageYOffset <= this.props.topPosition) {
      this.stopScrolling()
    } else {
      window.scrollTo(window.pageYOffset, position)
      this.data.rafId = window.requestAnimationFrame(this.scrollStep)
    }
  }

  stopScrolling() {
    window.cancelAnimationFrame(this.data.rafId)
  }

  render() {
    const propStyle = this.props.style
    let style = Object.assign({}, defaultProps.style)

    style = Object.assign(style, propStyle)
    style.opacity = this.state.show ? 1 : 0
    style.visibility = this.state.show ? 'visible' : 'hidden'
    style.transitionProperty = 'opacity, visibility'

    return <div style={style} onClick={this.handleClick} role="presentation" />
  }
}
