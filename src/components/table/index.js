// @flow

import _Table, {type TableProps} from './Table'
import {injectClassNames, type StylesProps} from '../utils/classnamesUtils'

export const Table: React$ComponentType<TableProps & StylesProps> = injectClassNames('table')(_Table)

export default {
  Table: _Table
}
