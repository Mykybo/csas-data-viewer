import expandTableMutation from '@/mutations/expandTable'
import getTableInfo from '@/queries/getTableInfo'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'

import NestedTables from '../NestedTables'
import TableCells from '../TableCells'
import { RowContainer } from './styled'

interface IProps {
  data: any
  expansionPossible: boolean
  dataKey: string
  header?: boolean
}

const TableRow = ({ data, dataKey, header, expansionPossible }: IProps) => (
  <Mutation mutation={expandTableMutation}>
    {expandTable => (
      <Query query={getTableInfo}>
        {({
          data: {
            state: { expandedTables },
          },
        }) => {
          const isExpanded = expandedTables.includes(data[dataKey])

          return (
            <Fragment>
              <RowContainer
                header={header}
                onClick={() =>
                  !header &&
                  expansionPossible &&
                  expandTable({
                    variables: { key: data[dataKey] },
                  })
                }
              >
                <TableCells
                  data={data}
                  dataKey={dataKey}
                  expansionPossible={expansionPossible}
                  isExpanded={isExpanded}
                  header={header}
                  hasKids={!header}
                />
              </RowContainer>
              {isExpanded && (
                <NestedTables dataKey={dataKey} dataValue={data[dataKey]} />
              )}
            </Fragment>
          )
        }}
      </Query>
    )}
  </Mutation>
)
export default TableRow
