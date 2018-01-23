// @flow
import React from 'react'
import type {Node} from 'react'
import {propsClassNames} from '../utils/classnamesUtils'

export type MediaProps = {
  body?: boolean,
  bottom?: boolean,
  children?: Node,
  className?: string,
  classNames?: Function,
  heading?: boolean,
  left?: boolean,
  list?: boolean,
  middle?: boolean,
  object?: boolean,
  right?: boolean,
  tag?: React$ElementType,
  top?: boolean
}

const Media = (props: MediaProps) => {
  const {body, bottom, className: _className, classNames: _classNames, heading, left, list, middle, object, right, tag, top, ...attributes} = props

  let defaultTag
  if (heading) {
    defaultTag = 'h4'
  } else if (left || right) {
    defaultTag = 'a'
  } else if (object) {
    defaultTag = 'img'
  } else if (list) {
    defaultTag = 'ul'
  } else {
    defaultTag = 'div'
  }
  const Tag = tag || defaultTag

  const classNames = propsClassNames({classNames: _classNames})
  const className = classNames(_className, {
    'media-body': body,
    'media-heading': heading,

    'media-left': left,
    'media-right': right,
    'media-top': top,
    'media-bottom': bottom,
    'media-middle': middle,
    'media-object': object,
    'media-list': list,
    media: !body && !heading && !left && !right && !top && !bottom && !middle && !object && !list
  })

  return <Tag {...attributes} className={className} />
}

export default Media
