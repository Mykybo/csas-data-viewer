import { ITheme } from './interface'

const theme: ITheme = {
  colors: {
    border: '#D9D9D9',
    default: '#FFCC00',
    defaultDark: '#CCA300',
    header: '#E6E6E6',
    rowHover: '#F2F2F2',
  },
}

export interface IStyledWithTheme {
  theme: Readonly<typeof theme>
}

export default theme
