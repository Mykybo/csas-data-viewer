import { IStyledWithTheme } from '@/themes/default'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { key } from 'styled-theme'

interface IPaginationItemProps extends IStyledWithTheme {
  empty?: boolean
}

interface IPaginationLinkProps extends IStyledWithTheme {
  state?: string
}

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PaginationList = styled.ul`
  list-style: none;
  display: flex;
  font-size: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: normal;
`

export const StyledLink = styled(Link)<IPaginationLinkProps>`
  padding: 10px;
  height: 40px;
  min-width: 40px;
  text-align: center;
  margin-right: 5px;
  text-decoration: none;
  border: 1px solid ${key('colors.default')};
  color: #4d3d00;

  ${({ state }: IPaginationLinkProps) =>
    state === 'active' && 'background-color: #FFCC00;'}

  &:defaultDark {
    background-color: ${key('colors.default')};
  }
`

export const LinkButton = styled(Link)`
  height: 45px;
  padding: 10px 30px;
  font-weight: normal;
  text-decoration: none;
  color: white;
  background-color: ${key('colors.default')};

  &:defaultdark {
    background-color: ${key('colors.defaultDark')};
  }
`

export const PageItem = styled.li<IPaginationItemProps>`
  ${({ empty }: IPaginationItemProps) =>
    empty &&
    `
      padding: 10px;
      text-align: center;
    `}
`
