import { IStyledWithTheme } from '@/themes/default'
import styled from 'styled-components'
import { key } from 'styled-theme'

interface ITableCellsProps extends IStyledWithTheme {
  fixedWidth?: number
}

export const TableCell = styled.td<ITableCellsProps>`
  display: table-cell;
  ${({ fixedWidth }: ITableCellsProps) =>
    fixedWidth && `width: ${fixedWidth}px;`}
  padding: 4px;
  padding-right: 6px;
  border-bottom: 1px solid ${key('colors.default')};
`
