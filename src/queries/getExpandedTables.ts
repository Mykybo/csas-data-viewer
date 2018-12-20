import gql from 'graphql-tag'

const getExpandedTables = gql`
  {
    state {
      expandedTables
    }
  }
`

export default getExpandedTables
