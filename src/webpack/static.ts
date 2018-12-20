import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { mergeWith } from 'lodash'
import * as webpack from 'webpack'

import client from './client'
import { defaultMerger } from './common'

const base: webpack.Configuration = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/views/static.html',
      title: 'account-viewer',
    }),
  ],
}

export default mergeWith({}, client, base, defaultMerger)
