import * as express from 'express'

import { webpackDev } from './middleware/webpack-dev'
import { ssr } from './middleware/ssr'

import { pageTemplate } from './lib/page-template'
import { serverRender } from './lib/server-render'

const app = express()

app.use(webpackDev)

app.use('/favicon', (_, res) => res.send(404))

app.use('/', ssr(pageTemplate, serverRender))

app.listen(3000)
