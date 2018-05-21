import React from 'react'
import { render } from 'react-dom'

function init() {
  const { App } = require('./app') // eslint-disable-line global-require
  render(<App />, document.body) // eslint-disable-line react/jsx-filename-extension
}

if (module.hot) {
  // require('preact/devtools') // eslint-disable-line global-require
  module.hot.accept('./app', () => requestAnimationFrame(init))
}

init()
