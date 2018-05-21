/* eslint-disable import/no-extraneous-dependencies */
import serve from 'webpack-serve'
import history from 'connect-history-api-fallback'
import convert from 'koa-connect'
import config from './webpack.config.babel'

serve({
  config,
  port: 4000,
  add: app => app.use(convert(history())),
})
