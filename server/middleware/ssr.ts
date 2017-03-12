import * as express from 'express'
import * as webpack from 'webpack'

export type PageTemplate = (html: string, state: string, script: string) => string
export type ServerRender = (location: string) => {
    html: string,
    state: string,
}

export const ssr = (
    pageTemplate: PageTemplate,
    serverRender: ServerRender,
): express.RequestHandler =>
    (req, res) => {
        const webpackStats: webpack.Stats = res.locals.webpackStats
        const assetsByChunkName = webpackStats.toJson().assetsByChunkName

        const { html, state } = serverRender(req.url)

        res.send(
            pageTemplate(html, state, assetsByChunkName.main),
        )
    }
