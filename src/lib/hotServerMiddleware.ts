import * as fs from 'fs'
import * as Koa from 'koa'
import { join } from 'path'
import * as requireFromString from 'require-from-string'
import * as sourceMapSupport from 'source-map-support'
import * as webpack from 'webpack'

import Output from './output'
import Stats from './stats'

// Types
export type ServerRenderer = (ctx: Koa.Context, next: () => Promise<any>) => void
export type OutputRenderer = (output: Output) => ServerRenderer
export type KoaHandler = (error: any, serverRenderer: ServerRenderer) => Koa.Middleware

// Create a Koa handler
const createKoaHandler: KoaHandler = (error, serverRenderer) => (ctx, next) => {
  if (error) {
    ctx.throw(error)
  }
  return serverRenderer(ctx, next)
}

function isMultiCompiler(compiler?: webpack.MultiCompiler) {
  // Duck typing as `instanceof MultiCompiler` fails when npm decides to
  // install multiple instances of webpack.
  return compiler && compiler.compilers
}

function findCompiler(multiCompiler: webpack.MultiCompiler, name: string) {
  return multiCompiler.compilers.filter(compiler => (compiler as any).name.indexOf(name) === 0)
}

function findStats(multiStats: any, name: string) {
  return multiStats.stats.filter((stats: any) => stats.compilation.name.indexOf(name) === 0)
}

function getFilename(serverStats: webpack.Stats, outputPath: string) {
    const assetsByChunkName = serverStats.toJson().assetsByChunkName
    const filename = assetsByChunkName.main || ''
    // If source maps are generated `assetsByChunkName.main`
    // will be an array of filenames.
    return join(outputPath,
      Array.isArray(filename)
        ? filename.find(asset => /\.js$/.test(asset))
        : filename,
    )
}

function getServerRenderer(filename: string, buffer: Buffer, output: Output) {
    const errMessage = 'The "server" compiler must export a function in the form of `(output: Output) => (ctx: Koa.Context, next: () => Promise<any>) => void`'

    const outputRenderer: OutputRenderer = requireFromString(buffer.toString(), filename).default
    if (typeof outputRenderer !== 'function') {
      throw new Error(errMessage)
    }

    const serverRenderer = outputRenderer(output)
    if (typeof serverRenderer !== 'function') {
      throw new Error(errMessage)
    }

    return serverRenderer
}

function installSourceMapSupport(filesystem: typeof fs) {
    sourceMapSupport.install({
        // NOTE: If https://github.com/evanw/node-source-map-support/pull/149
        // lands we can be less aggressive and explicitly invalidate the source
        // map cache when Webpack recompiles.
        emptyCacheBetweenOperations: true,
        retrieveFile(source) {
          try {
            return filesystem.readFileSync(source, 'utf8')
          } catch (ex) {
            // Doesn't exist
            return ''
          }
      },
    })
}

/**
 * Passes the request to the most up to date "server" bundle.
 * NOTE: This must be mounted after webpackDevMiddleware to ensure this
 * middleware doesn't get called until the compilation is complete.
 */
function webpackHotServerMiddleware(multiCompiler: webpack.MultiCompiler) {

    if (!isMultiCompiler(multiCompiler)) {
      throw new Error('Expected webpack compiler to contain both a "client" and/or "server" config')
    }

    const serverCompiler = findCompiler(multiCompiler, 'server')[0]
    const clientCompilers = findCompiler(multiCompiler, 'client')

    const outputFs = (serverCompiler as any).outputFileSystem
    const outputPath = (serverCompiler as any).outputPath

    installSourceMapSupport(outputFs)

    let serverRenderer: ServerRenderer
    let error = false

    const doneHandler = (multiStats: webpack.Stats) => {
      error = false

      const serverStats = findStats(multiStats, 'server')[0]
      // Server compilation errors need to be propagated to the client.
      if (serverStats.compilation.errors.length) {
        error = serverStats.compilation.errors[0]
        return
      }

      let clientStatsJson = null

      if (clientCompilers.length) {
        const clientStats = findStats(multiStats, 'client')
        clientStatsJson = clientStats.map((obj: webpack.Stats) => obj.toJson())

        if (clientStatsJson.length === 1) {
          clientStatsJson = clientStatsJson[0]
        }
      }

      const filename = getFilename(serverStats, outputPath)
      const buffer = outputFs.readFileSync(filename)

      // Create an `Output` instance, containing our client/server stats
      const output = new Output({
        client: new Stats(clientStatsJson),
        server: new Stats(serverStats.toJson()),
      })

      try {
        serverRenderer = getServerRenderer(filename, buffer, output)
      } catch (ex) {
        error = ex
      }
    }

    // Webpack 4
    (multiCompiler as any).hooks.done.tap('WebpackHotServerMiddleware', doneHandler)

    return function createHandler() {
      return createKoaHandler(error, serverRenderer).apply(null, arguments as any)
    }
}

export default webpackHotServerMiddleware
