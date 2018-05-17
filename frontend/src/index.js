import { render } from 'react-dom'

let root
function init() {
  const { App } = require('./app') // eslint-disable-line global-require
  root = render(App(), document.body, root)
}

if (module.hot) {
  // require('preact/devtools') // eslint-disable-line global-require
  module.hot.accept('./app', () => requestAnimationFrame(init))
}

init()
