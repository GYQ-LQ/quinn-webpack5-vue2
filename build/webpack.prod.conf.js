/*
 * @Author: Quinn
 * @Date: 2021-01-15 14:03:18
 * @LastEditTime: 2021-03-29 17:04:22
 * @LastEditors: quinn
 * @Description:
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 打包速度分析
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
// 打包体积分析
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
    merge
} = require('webpack-merge')

const config = require('./config');

const prodWebpackConf = merge(require('./webpack.base.conf'), {
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
        // 打包体积分析，本地打包分析时使用
        new BundleAnalyzerPlugin(),
    ],
})

// 打包时间速度分析，本地打包分析时使用
const smp = new SpeedMeasureWebpack5Plugin();
module.exports = smp.wrap(prodWebpackConf)
// module.exports = prodWebpackConf