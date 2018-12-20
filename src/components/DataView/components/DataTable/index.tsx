import Pagination from '@/components/Pagination'
import { extractHeaders } from '@/lib/utils'
import React, { Fragment } from 'react'

import { IAccount, IPagination } from '../../'
import { TableWrapper } from '../../styled'
import TableRow from '../TableRow'
import { TableName } from './styled'

interface IProps {
  data: IAccount[]
  dataKey?: string
  expansionPossible?: boolean
  tableName?: string
  pagination?: IPagination
}

const DataTable = ({
  data,
  tableName,
  dataKey,
  expansionPossible,
  pagination,
}: IProps) => (
  <Fragment>
    <TableWrapper>
      {tableName && <TableName colSpan={'100%' as any}>{tableName}</TableName>}
      <TableRow
        data={extractHeaders(data)}
        dataKey={dataKey}
        expansionPossible={expansionPossible}
        header
      />
      {data.map((item: IAccount, index: number) => (
        <TableRow
          key={item[dataKey] || index}
          data={item}
          dataKey={dataKey}
          expansionPossible={expansionPossible}
        />
      ))}
    </TableWrapper>
    {pagination && <Pagination pagination={pagination} />}
  </Fragment>
)

export default DataTable
