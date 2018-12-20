import ScrollTop from '@/components/helpers/scrollTop'
import routes from '@/data/routes'
import { GlobalStyles } from '@/global/styles'
import * as React from 'react'
import Helmet from 'react-helmet'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'

const Root = () => (
  <div>
    <GlobalStyles />
    <Helmet>
      <title>Data table</title>
    </Helmet>
    <ScrollTop>
      <Switch>
        {routes.map(route => (
          <Route key={route.path as string} {...route} />
        ))}
      </Switch>
    </ScrollTop>
  </div>
)

export default hot(module)(Root)
