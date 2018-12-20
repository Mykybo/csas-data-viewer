import gql from 'graphql-tag'

// XXX: since it returns only expanded tables now, there is no use for it, but it allows easy extension of user state
const getTableInfo = gql`
  {
    state {
      expandedTables
    }
  }
`

export default getTableInfo
