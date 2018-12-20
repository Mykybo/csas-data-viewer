// Local GraphQL state
import getExpandedTables from '@/queries/getExpandedTables'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { ClientStateConfig, withClientState } from 'apollo-link-state'

export interface IAccount {
  accountNumber: string
  bankCode: string
  transparencyFrom: string
  transparencyTo: string
  publicationTo: string
  actualizationDate: string
  balance: number
  currency: string
  name: string
  iban: string
}

export interface IState {
  accounts?: IAccount[]
  expandedTables: string[]
  deletedTables: string[]
}

export interface IRoot {
  state: IState
}

interface IExpandRowMutation {
  key: string
}

export default function createState(cache: InMemoryCache): ApolloLink {
  // Helper function to retrieve the state from cache
  function getState(query: any): IState {
    const data = cache.readQuery<IRoot>({ query })
    return data.state || data
  }

  // Helper function to write data back to the cache
  function writeState(state: IState) {
    return cache.writeData({ data: { state } })
  }

  const opt: ClientStateConfig = {
    cache,
    resolvers: {
      Mutation: {
        expandTable(_, { key }: IExpandRowMutation) {
          const state = getState(getExpandedTables)
          const newExpandedTables = new Set(state.expandedTables)
          if (newExpandedTables.has(key)) {
            newExpandedTables.delete(key)
          } else {
            newExpandedTables.add(key)
          }
          const newState = {
            ...state,
            expandedTables: [...newExpandedTables],
          }
          writeState(newState)
          return newState
        },
      },
    },
  }

  opt.defaults = {
    state: {
      deletedTables: [],
      expandedTables: [],
    },
  } as IRoot

  return withClientState(opt)
}
