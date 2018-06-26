// @flow
import express from 'express'
import { join } from 'path'

const app = express()

app.use(express.static(join(__dirname, './dist')))

app.get('*', (req, res) => res.sendFile(join(__dirname, './dist/index.html')))

app.listen(4000)
