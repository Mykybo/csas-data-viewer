import gql from 'graphql-tag'

const getAccounts = gql`
  query Accounts($page: String, $size: String) {
    accounts(page: $page, size: $size) {
      pageNumber
      pageSize
      pageCount
      nextPage
      recordCount
      accounts {
        accountNumber
        bankCode
        transparencyFrom
        transparencyTo
        publicationTo
        actualizationDate
        balance
        currency
        name
        iban
      }
    }
  }
`

export default getAccounts
