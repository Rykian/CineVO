/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'polka'
import webpackConfig from '../webpack.config.babel'

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, { publicPath: '/' }))
app.use(webpackHotMiddleware(compiler))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
