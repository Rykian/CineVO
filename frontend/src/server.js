/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import express from 'polka'
import webpackConfig from '../webpack.config.babel'

const app = express()
const compiler = webpack(webpackConfig)

app.use(middleware(compiler, {
  // webpack-dev-middleware options
  publicPath: '/',
}))

app.use(require('webpack-hot-middleware')(compiler))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
