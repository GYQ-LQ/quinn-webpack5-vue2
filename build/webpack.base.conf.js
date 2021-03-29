/*
 * @Author: Quinn
 * @Date: 2021-03-26 14:46:50
 * @LastEditTime: 2021-03-29 17:03:43
 * @LastEditors: quinn
 * @Description:  
 */
const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');

// 是否为构建生产
const PROD = process.env.NODE_ENV === 'production'
console.log('构建环境：', PROD ? '生产环境' : '开发环境');


const CssTest = /\.(sa|c)ss$/
const StyTest = /\.styl(us)?$/
const LessTest = /\.less$/
const ScssTest = /\.scss$/
const CssModuleTest = /\.module\.css$/
const LessModuleTest = /\.module\.less$/

const Sty_Loader = PROD ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
        // locals 报错解决
        esModule: false,
        publicPath: config.build.assetsPublicPath
    }
} : 'style-loader';

const Css_Loader = {
    loader: 'css-loader',
    options: {
        modules: {
            localIdentName: "[name]_[local]__[hash:6]"
        }
    },
}

const BaseCssUse = ['vue-style-loader', Sty_Loader, 'css-loader', 'postcss-loader']
const BaseCssModuleUse = ['vue-style-loader', Sty_Loader, Css_Loader, 'postcss-loader']

module.exports = {
    // 默认按生产构建
    mode: 'production',
    // 基础目录，绝对路径 即项目的根目录
    context: config.resolve(),
    // 入口起点
    entry: {
        bundle: ['./src/main.js']
    },
    // 配置模块如何解析
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        symlinks: false,
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': config.resolve('src'),
            static: config.resolve('static')
        }
    },
    // 输出文件
    output: {
        // output 目录对应一个绝对路径
        path: config.resolve('dist'),
        // 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
        filename: config.assetsPath('js/[name].min.[chunkhash:8].js'),
        // 此选项决定了非入口(non-entry) chunk 文件的名称 配置按需加载文件
        chunkFilename: config.assetsPath('js/[id].chunk.[chunkhash:8].js'),
        // 公共路径(publicPath)
        publicPath: PROD ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // loader 打包资源
    module: {
        rules: [
            // 添加解析 .vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 配置Babel 将 ES6+转换为ES5
            {
                test: /\.(js|jsx)?$/,
                include: [config.resolve('src'), config.resolve('test')],
                // 排除node_modules文件夹
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            },
            // 加载 typescript
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            // 添加解析 css sass
            {
                test: CssTest,
                exclude: CssModuleTest,
                use: [...BaseCssUse, 'sass-loader']
            },
            // 添加解析 scss
            {
                test: ScssTest,
                use: [...BaseCssUse, 'sass-loader',
                    // 如果需要注册全局scss变量 则使用sass-resources-loader
                    /*  {
                         loader: 'sass-resources-loader',
                         options: {
                             sourceMap: true,
                             resources: [config.resolve('src/assets/style/theme.scss')]
                         },
                     }, */
                ],
            },
            // 添加解析 less
            {
                test: LessTest,
                exclude: LessModuleTest,
                use: [...BaseCssUse, 'less-loader']
            },
            // 添加解析 stylus
            {
                test: StyTest,
                use: [...BaseCssUse, 'stylus-loader'],
            },
            {
                test: CssModuleTest,
                use: BaseCssModuleUse
            },
            {
                test: LessModuleTest,
                use: [...BaseCssModuleUse, 'less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 8 * 1024,
                    name: config.assetsPath('img/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 8 * 1024,
                    name: config.assetsPath('media/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 8 * 1024,
                    name: config.assetsPath('fonts/[name].[hash:8].[ext]')
                }
            }
        ]
    },
    plugins: [
        // vue-loader 插件！
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: config.assetsPath('css/[name].[contenthash:8].css'),
            chunkFilename: config.assetsPath('css/[name].[contenthash:8].css'),
            ignoreOrder: true
        }),
    ],
    performance: {
        hints: false
    }
};