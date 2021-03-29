/*
 * @Author: Quinn
 * @Date: 2020-08-12 10:26:02
 * @LastEditTime: 2021-03-29 14:39:13
 * @LastEditors: quinn
 * @Description: 构建主入口文件
 */

'use strict'

// chalk：node终端 样式库
const chalk = require('chalk')
const Start = new Date();
console.log(chalk.green('构建开始时间 ----- ' + Start.getHours() + ':' + Start.getMinutes() + ':' + Start.getSeconds()))

// ora：一个优雅的 node终端 加载动画效果
const ora = require('ora')

// rimraf：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除，用于清空dist目录
const rm = require('rimraf')

const path = require('path')


const webpack = require('webpack')

const config = require('./config')

// 采用production的webpack配置文件
const webpackConfig = require('./webpack.prod.conf')

// 加载动画 -- 开始构建生产
const spinner = ora('building for production...')
spinner.start()

// 清空 build环境下的 dist/static 目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    // 捕获错误
    if (err) throw err
    // webpack打包
    webpack(webpackConfig, (err, stats) => {
        // 加载动画 -- 构建构建结束
        spinner.stop()

        // 捕获错误
        if (err) throw err

        // 打印 打包结果
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + '\n\n'
        )

        // 打包错误
        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        // 无错误 打印打包结束
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(
            chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                "  Opening index.html over file:// won't work.\n"
            )
        )
        const End = new Date();
        console.log(chalk.green('构建结束时间 ----- ' + End.getHours() + ':' + End.getMinutes() + ':' + End.getSeconds()))

        console.log(chalk.green('总构建毫秒时间 ----- ' + (End.getTime() - Start.getTime()) + 'ms'))
    })
})