// @flow

import _Container, {type ContainerProps} from './Container'
import _Columns, {type ColumnsProps} from './Columns'
import _Column, {type ColumnProps} from './Column'
import {injectClassNames, type StylesProps} from '@deboxsoft/webapp/utils/classnamesUtils'

export const Container: React$ComponentType<ContainerProps & StylesProps> = injectClassNames('container')(_Container)
export const Columns: React$ComponentType<ColumnsProps & StylesProps> = injectClassNames('grid')(_Columns)
export const Column: React$ComponentType<ColumnProps & StylesProps> = injectClassNames('grid')(_Column)

export default {
  Container: _Container,
  Columns: _Columns,
  Column: _Column
}
