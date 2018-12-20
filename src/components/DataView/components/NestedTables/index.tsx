import NoData from '@/components/NoData'
import getTransactions from '@/queries/getTransactions'
import React from 'react'
import { Query } from 'react-apollo'

import DataTable from '../DataTable'
import { TableCell } from '../TableCells/styled'
import { RowContainer } from '../TableRow/styled'

interface IProps {
  dataValue: string
  dataKey: string
}

const NestedTables = ({ dataValue, dataKey }: IProps) => (
  <Query query={getTransactions} variables={{ [dataKey]: dataValue }}>
    {({ data: { transactions } }) =>
      transactions && transactions.length ? (
        <RowContainer disabledefaultDark>
          <TableCell colSpan={'100%' as any}>
            <DataTable data={transactions} tableName={'Transactions'} />
          </TableCell>
        </RowContainer>
      ) : (
        <NoData />
      )
    }
  </Query>
)

export default NestedTables
