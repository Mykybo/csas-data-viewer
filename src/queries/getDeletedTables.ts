import gql from 'graphql-tag'

const getDeletedTables = gql`
  {
    state {
      deletedTables
    }
  }
`

export default getDeletedTables
