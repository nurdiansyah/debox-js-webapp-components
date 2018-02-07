// @flow

import React from 'react'
import classNames from 'classnames'

export type IconProps = {
  styles: Object,
  className?: string,
  children?: React$Node,
  size?: 'small' | 'medium' | 'large'
}

export const BLOCK_ID = 'icon'

const Icon = ({styles, className, size, children}: IconProps) => {
  const iconCN = styles.block(BLOCK_ID).className
  const classes = classNames(className, iconCN(null, {size}))
  return <div className={classes}>{children}</div>
}

export default Icon
