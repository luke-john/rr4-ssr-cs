module.exports = {
    entry: './index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname,
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
        extensions: [
            '.tsx', '.ts', '.js',
        ],
    },
    devtool: 'inline-source-map',
}
