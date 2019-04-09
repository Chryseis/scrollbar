/**
 * Created by Administrator on 2017/12/10.
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const serverConfig = require('../server-conf.json');
const isPc = require('../package.json').isPC;
const upyunPath=require('../package.json').upyunServer.target;

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
        app: [path.resolve(__dirname, '../src/h5'), path.resolve(__dirname, '../src/common/css/reset'), path.resolve(__dirname, '../src/common/css/base')],
        web: [path.resolve(__dirname, '../src/pc'), path.resolve(__dirname, '../src/common/css/reset'), path.resolve(__dirname, '../src/common/css/base')]
    },
    output: {
        path: path.resolve(__dirname, `../dist/${serverConfig.upyunName}/${serverConfig.version}`),
        publicPath: `https://fe.fuckyourmother.com${upyunPath}/${serverConfig.upyunName}/${serverConfig.version}/`,
        filename: 'static/js/[name].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ].concat(htmlWebpackPlugins)
})