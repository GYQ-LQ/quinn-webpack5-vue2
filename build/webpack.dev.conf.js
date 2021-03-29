/*
 * @Author: Quinn
 * @Date: 2021-01-15 14:03:18
 * @LastEditTime: 2021-03-29 17:04:05
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
        // 注册全局变量 项目内可通过 process.env 访问开发dev环境相关变量
        new webpack.DefinePlugin({
            'process.env': require('./env/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: config.dev.index,
            template: 'index.html',
            inject: true,
            favicon: 'favicon.ico',
        }),
    ]
})