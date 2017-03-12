import * as webpack from 'webpack'
import * as path from 'path'

export const config: webpack.Configuration = {
    entry: './client/entry',
    output: {
        filename: 'bundle.js',
        path: __dirname,
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            './lib/LazyLoader':  path.resolve(__dirname, '../common/lib/ClientLazyLoader'),
        },
        extensions: [
            '.tsx', '.ts', '.js',
        ],
    },
    devtool: 'inline-source-map',
}
