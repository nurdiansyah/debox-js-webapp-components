// @flow

import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Icon, {BLOCK_ID} from './Icon'
import classNames from 'classnames'

export type IconFaProps = {
  border?: ?boolean,
  classNameFa?: string,
  className?: string,
  fixedWidth?: number,
  flip?: 'horizontal' | 'vertical' | 'both',
  icon: Object | Array<any> | string,
  listItem?: ?boolean,
  mask?: Object | Array<any> | string,
  pull?: 'right' | 'left',
  pulse?: ?boolean,
  size?: 'small' | 'medium' | 'large',
  sizeFa?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x',
  spin?: ?boolean,
  styles: Object,
  symbol?: boolean | string,
  transform?: string | Object
}

const FontAwesome = (props: IconFaProps) => {
  const {
    border,
    className,
    classNameFa,
    fixedWidth,
    flip,
    icon,
    listItem,
    mask,
    pull,
    pulse,
    sizeFa,
    size,
    spin,
    styles,
    symbol,
    transform
  } = props
  const iconCN = styles.block(BLOCK_ID).className
  const classes = classNames(iconCN('fa'), classNameFa)
  return (
    <Icon className={className} styles={styles} size={size}>
      <FontAwesomeIcon
        className={classes}
        border={border}
        fixedWidth={fixedWidth}
        flip={flip}
        icon={icon}
        listItem={listItem}
        mask={mask}
        pull={pull}
        pulse={pulse}
        size={sizeFa}
        spin={spin}
        symbol={symbol}
        transform={transform}
      />
    </Icon>
  )
}

export default FontAwesome
