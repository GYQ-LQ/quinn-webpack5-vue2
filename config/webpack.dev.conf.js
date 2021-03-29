/*
 * @Author: Quinn
 * @Date: 2021-01-15 14:03:18
 * @LastEditTime: 2021-03-26 20:58:05
 * @LastEditors: quinn
 * @Description:
 */
const webpack = require('webpack')
const {
    merge
} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config');

module.exports = merge(require('./webpack.base.conf'), {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: config.dev.index,
            template: 'index.html',
            inject: true,
            favicon: 'favicon.ico',
        }),
    ]
})