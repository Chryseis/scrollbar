/**
 * Created by Administrator on 2017/12/10.
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const {ip} = require('./utils');
const isPc = require('../package.json').isPC;

let htmlWebpackPlugins = isPc ? [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../template/index.html'),
    chunks: [`app`]
}),
    new HtmlWebpackPlugin({
        filename: 'web.html',
        template: path.resolve(__dirname, '../template/web.html'),
        chunks: [`web`]
    })] : [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../template/index.html'),
    chunks: [`app`]
})]


module.exports = merge(baseWebpackConfig, {
    entry: {
        app: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, '../src/h5'), path.resolve(__dirname, '../src/common/css/reset'), path.resolve(__dirname, '../src/common/css/base')],
        web: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, '../src/pc'), path.resolve(__dirname, '../src/common/css/reset'), path.resolve(__dirname, '../src/common/css/base')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({
        //     "React": "react",
        //     "ReactDOM": "react-dom"
        // })
    ].concat(htmlWebpackPlugins)
})