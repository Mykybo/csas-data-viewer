import 'cross-fetch/polyfill'

import Root from '@/components/root'
import { createClient } from '@/graphql/apollo'
import Output from '@/lib/output'
import { ThemeProvider } from '@/lib/styledComponents'
import defaultTheme from '@/themes/default'
import Html from '@/views/ssr'
import { Context } from 'koa'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// Server entrypoint
export interface IRouterContext {
  status?: number
  url?: string
}

export default function(output: Output) {
  return async (ctx: Context) => {
    const client = createClient()
    const sheet = new ServerStyleSheet()
    const routerContext: IRouterContext = {}

    const components = (
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProvider client={client}>
            <StaticRouter location={ctx.request.url} context={routerContext}>
              <Root />
            </StaticRouter>
          </ApolloProvider>
        </ThemeProvider>
      </StyleSheetManager>
    )

    // Render the Apollo tree
    await getDataFromTree(components)

    // Handle redirects
    if ([301, 302].includes(routerContext.status!)) {
      ctx.status = routerContext.status!
      ctx.redirect(routerContext.url!)
      return
    }

    // Handle 404 Not Found
    if (routerContext.status === 404) {
      ctx.status = 404
      ctx.body = 'Not found'
      return
    }

    // Create response HTML
    const html = ReactDOMServer.renderToString(components)

    // Create the React render via React Helmet
    const reactRender = ReactDOMServer.renderToString(
      <Html
        css={output.client.main('css')!}
        helmet={Helmet.renderStatic()}
        html={html}
        js={output.client.main('js')!}
        styles={sheet.getStyleElement()}
        window={{
          __APOLLO_STATE__: client.extract(),
        }}
      />,
    )

    ctx.type = 'text/html'
    ctx.body = `<!DOCTYPE html>${reactRender}`
  }
}
