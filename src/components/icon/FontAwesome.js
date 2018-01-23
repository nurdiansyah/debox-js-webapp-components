// @flow

import React from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type FontAwesomeProps = {
  classNames?: Function,
  symbol: string,
  color?: string
}

const Icon = (props: FontAwesomeProps) => {
  const {symbol, classNames: _classNames, color} = props
  const classNames = propsClassNames({classNames: _classNames})
  return <i className={classNames('awesome', {color}, {fa: true, [symbol]: true})} />
}

export default Icon
