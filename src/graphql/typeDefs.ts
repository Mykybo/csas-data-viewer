import { gql } from 'apollo-server-koa'

const typeDefs = gql`
  type Account {
    accountNumber: String
    bankCode: String
    transparencyFrom: String
    transparencyTo: String
    publicationTo: String
    actualizationDate: String
    balance: Float
    currency: String
    name: String
    iban: String
  }

  # Transaction types

  type Amount {
    value: Float
    precision: Int
    currency: String
  }

  type Sender {
    accountNumber: String
    bankCode: String
    iban: String
    specificSymbol: String
    specificSymbolParty: String
    variableSymbol: String
    constantSymbol: String
    name: String
    description: String
  }

  type Receiver {
    accountNumber: String
    bankCode: String
    iban: String
  }

  type Transaction {
    amount: Amount
    type: String
    dueDate: String
    processingDate: String
    sender: Sender
    receiver: Receiver
    typeDescription: String
  }

  type AccountsResponse {
    accounts: [Account]
    pageNumber: Int
    pageSize: Int
    pageCount: Int
    nextPage: Int
    recordCount: Int
  }

  type Query {
    accounts(page: String, size: String): AccountsResponse
    transactions(accountNumber: String): [Transaction]
  }
`
export default typeDefs
