import Root from '@/components/root'
import { createClient } from '@/graphql/apollo'
import { ThemeProvider } from '@/lib/styledComponents'
import defaultTheme from '@/themes/default'
import createBrowserHistory from 'history/createBrowserHistory'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

const client = createClient()
const history = createBrowserHistory()

ReactDOM.hydrate(
  <ThemeProvider theme={defaultTheme}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <Root />
      </Router>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
)
