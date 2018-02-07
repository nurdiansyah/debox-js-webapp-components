// @flow

import _Table, {type TableProps} from './Table'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Table: React$ComponentType<TableProps & StylesProps> = injectClassNames('table')(_Table)

export default {
  Table: _Table
}
