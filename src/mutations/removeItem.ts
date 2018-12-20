import gql from 'graphql-tag'

const removeItem = gql`
  mutation RemoveItem($key: String) {
    removeItem(key: $key) @client {
      ok
    }
  }
`

export default removeItem
