import gql from 'graphql-tag'

// TODO: pagination for transactions
const getTransactions = gql`
  query Transactions($accountNumber: String) {
    transactions(accountNumber: $accountNumber) {
      amount {
        value
        precision
        currency
      }
      type
      dueDate
      processingDate
      sender {
        accountNumber
        bankCode
        iban
        specificSymbol
        specificSymbolParty
        variableSymbol
        constantSymbol
        name
        description
      }
      receiver {
        accountNumber
        bankCode
        iban
      }
      typeDescription
    }
  }
`

export default getTransactions
