/*
 * @Author: Quinn
 * @Date: 2020-12-01 17:17:51
 * @LastEditTime: 2021-03-30 09:50:49
 * @LastEditors: quinn
 * @Description:  webpack开发、生产 构建配置
 */
const path = require('path');

// 是否为构建生产
const PROD = process.env.NODE_ENV === 'production'

module.exports = {
    dev: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsPublicPath: '/',
        assetsSubDirectory: '',
        // 开发环境 eval, eval-source-map, cheap-eval-source-map, cheap-module-eval-source-map, cheap-module-source-map
        devtool: 'eval',
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsPublicPath: '../dist/',
        // 静态资源存放路径 js css img ...
        assetsSubDirectory: '',
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 生产环境 source-map hidden-source-map nosources-source-map
        devtool: '',
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