/*
 * @Author: Quinn
 * @Date: 2020-12-01 17:17:51
 * @LastEditTime: 2021-03-29 15:46:11
 * @LastEditors: quinn
 * @Description:  webpack开发、生产 构建配置
 */
const path = require('path');

// 是否为构建生产
const PROD = process.env.NODE_ENV === 'production'

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: 'eval',
        index: path.resolve(__dirname, '../dist/index.html'),
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '../dist/',
        devtool: 'source-map'
    },
    assetsPath: function (_path = '') {
        // 静态资源存放的 根目录
        const assetsSubDirectory = PROD ? this.build.assetsSubDirectory : this.dev.assetsSubDirectory
        // path.posix 提供 path 的方法，不过总是以 posix 兼容的方式交互
        return path.posix.join(assetsSubDirectory, _path)
    },
    resolve: function (dir = '') {
        // 根目录 路径方法 
        return path.join(__dirname, '..', dir)
    }
}