/* eslint-disable react/no-find-dom-node */
// @flow

import ReactDOM from 'react-dom'

export default function getContainer(
  container: ?(Element | React$Component<any, any> | (() => ?(Element | ?React$Component<any, any>))),
  defaultContainer?: Element | Text | null
): null | Element | Text {
  container = typeof container === 'function' ? container() : container
  return ReactDOM.findDOMNode(container) || defaultContainer || null
}
