/*
 * @Author: Quinn
 * @Date: 2021-01-15 14:03:18
 * @LastEditTime: 2021-03-29 17:59:30
 * @LastEditors: quinn
 * @Description:
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
    merge
} = require('webpack-merge')

const config = require('./config');

module.exports = merge(require('./webpack.base.conf'), {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('./env/' + process.env.env_config + '.env')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            favicon: 'favicon.ico',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
    ],
})