import { IStyledWithTheme } from '@/themes/default'
import styled from 'styled-components'

interface ITableRowProps extends IStyledWithTheme {
  header?: boolean
  disabledefaultDark?: boolean
}

export const RowContainer = styled.div`
  display: table-row;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;

  &:defaultdark {
    ${({ disabledefaultDark, header, theme }: ITableRowProps) =>
      !disabledefaultDark &&
      `background-color: ${!header && theme.colors.rowdefaultDark}};`}
  }

  ${(props: ITableRowProps) =>
    props.header
      ? `
        background-color: ${props.theme.colors.default};
        font-weight: bold;
        padding-top: 6px;
        padding-bottom: 6px;
      `
      : 'cursor: pointer;'};
`
