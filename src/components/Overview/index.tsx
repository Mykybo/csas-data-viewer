import getAccounts from '@/queries/getAccounts'
import qs from 'query-string'
import * as React from 'react'
import { Query } from 'react-apollo'

import DataView from '../DataView'

const Overview = ({ location }) => (
  <Query query={getAccounts} variables={{ ...qs.parse(location.search) }}>
    {({
      data: {
        accounts: {
          accounts,
          pageNumber,
          pageSize,
          pageCount,
          nextPage,
          recordCount,
        },
      },
    }) => (
      <DataView
        data={accounts}
        pagination={{
          nextPage,
          pageCount,
          pageNumber,
          pageSize,
          recordCount,
        }}
      />
    )}
  </Query>
)

export default Overview
