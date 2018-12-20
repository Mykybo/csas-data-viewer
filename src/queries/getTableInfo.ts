import gql from 'graphql-tag'

const getTableInfo = gql`
  {
    state {
      expandedTables
      deletedTables
    }
  }
`

export default getTableInfo
