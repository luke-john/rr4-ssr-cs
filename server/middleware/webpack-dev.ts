import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpack from 'webpack'
import * as express from 'express'

import { config } from '../../config/webpack-client'

export const webpackDev: express.RequestHandler = (req, res, next) =>
    webpackDevMiddleware(
        webpack(config),
        {
            lazy: false,
            serverSideRender: true,
            publicPath: '/assets/',
        },
    )(req, res, next)
