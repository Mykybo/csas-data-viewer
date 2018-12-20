import { ITheme } from '@/themes/interface'
import * as styledComponents from 'styled-components'

export interface IClassNameProps {
  className: string
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>

export {
  createGlobalStyle,
  css,
  ITheme,
  keyframes,
  ThemeProvider,
}

export default styled
