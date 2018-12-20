import { excludedKeys, formatData, translateHeader } from '@/lib/utils'
import React, { Fragment } from 'react'
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'

import { TableCell } from './styled'

interface IProps {
  data: any
  expansionPossible: boolean
  dataKey?: string
  hasKids?: boolean
  header?: boolean
  isExpanded?: boolean
}

const TableCells = ({
  data,
  dataKey,
  isExpanded,
  header,
  expansionPossible,
  hasKids,
}: IProps) => (
  <Fragment>
    {expansionPossible && (
      <TableCell fixedWidth={16}>
        {hasKids && (isExpanded ? <FaAngleDown /> : <FaAngleRight />)}
      </TableCell>
    )}
    {header
      ? data.map((val: string) => (
          <TableCell key={`header-${val}`}>{translateHeader(val)}</TableCell>
        ))
      : Object.entries(data).map(
          ([key, val]) =>
            !excludedKeys.has(key) && (
              <TableCell key={`${data[dataKey]}-${key}-${val}`}>
                {formatData(key, val)}
              </TableCell>
            ),
        )}
  </Fragment>
)
export default TableCells
