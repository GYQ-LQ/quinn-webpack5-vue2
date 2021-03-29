/*
 * @Author: Quinn
 * @Date: 2020-12-01 17:17:51
 * @LastEditTime: 2021-03-26 20:57:17
 * @LastEditors: quinn
 * @Description:  webpack开发、生产 配置
 */
const path = require('path');

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: 'eval',
        index: path.resolve(__dirname, '../dist/index.html'),
    },
    build: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '../../',
        devtool: 'source-map'
    },
}