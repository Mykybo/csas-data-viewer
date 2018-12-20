import gql from 'graphql-tag'

const expandTable = gql`
  mutation ExpandTable($key: String) {
    expandTable(key: $key) @client {
      ok
    }
  }
`

export default expandTable
