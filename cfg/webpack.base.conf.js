/**
 * Created by Administrator on 2017/12/10.
 */
const path = require('path')

module.exports = {
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)?/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                loader: ['babel-loader', 'eslint-loader']
            },
            {
                test: /.(css|less)$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/img/[name][hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/fonts/[name][hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".less"],
        alias: {
            '@': path.resolve(__dirname,'../src')
        }
    }
}