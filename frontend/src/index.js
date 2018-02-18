import { render } from 'preact'
import { App } from './app'

let root = render(App(), window.document.body)

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const reloadedApp = require('./app.jsx') // eslint-disable-line
    root = render(reloadedApp.App(), window.document.body, root)
  })
}
