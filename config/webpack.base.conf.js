/*
 * @Author: Quinn
 * @Date: 2021-03-26 14:46:50
 * @LastEditTime: 2021-03-29 13:45:54
 * @LastEditors: quinn
 * @Description:  
 */
const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = require('./config');

const IS_PROD = process.env.NODE_ENV === 'production'
console.log('IS_PROD', IS_PROD);
// 根目录 路径方法 
function resolve(dir = '') {
    return path.join(__dirname, '..', dir)
}

function assetsPath(_path = '') {
    // 静态资源存放的 根目录
    const assetsSubDirectory = IS_PROD ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

    // path.posix 提供 path 的方法，不过总是以 posix 兼容的方式交互
    return path.posix.join(assetsSubDirectory, _path)
}
// 全局文件引入 当然只想编译一个文件的话可以省去这个函数
function resolveResource(name) {
    return path.resolve(__dirname, '../src/assets/style/' + name)
}

const Common_Css_Loader = ['vue-style-loader', IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']

module.exports = {
    mode: 'production',
    // 基础目录，绝对路径 即项目的根目录
    context: resolve(),
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
            '@': resolve('src'),
            static: path.resolve(__dirname, '../static')
        }
    },
    // 输出文件
    output: {
        // output 目录对应一个绝对路径
        path: resolve('dist'),
        // 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
        filename: 'src/[name].min.[chunkhash:8].js',
        // 此选项决定了非入口(non-entry) chunk 文件的名称
        chunkFilename: 'src/[id].chunk.[chunkhash:8].js',
    },
    // loader 打包资源
    module: {
        rules: [
            // 加载 vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // 加载 js
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /node_modules/,
                include: [resolve('src'), resolve('test')],
                options: {
                    cacheDirectory: true
                }
            },
            // 加载 CSS
            {
                test: /\.(sa|c)ss$/,
                use: [...Common_Css_Loader, 'sass-loader', ],
            },
            {
                test: /\.scss$/,
                use: [...Common_Css_Loader, 'sass-loader',
                    // {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         resources: [resolveResource('theme.scss')]
                    //     },
                    // },
                ],
            },
            {
                test: /\.less$/,
                use: [...Common_Css_Loader, 'less-loader'],
            },
            {
                test: /\.styl(us)?$/,
                use: [...Common_Css_Loader, 'stylus-loader'],
            },
            // 加载 typescript
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            // 加载 images 图像
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: assetsPath('img/[name].[hash:8].[ext]')
                }
            },
            // 加载 video 视频
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: assetsPath('media/[name].[hash:8].[ext]')
                }
            },
            // 加载 fonts 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: assetsPath('fonts/[name].[hash:8].[ext]')
                }
            }
        ]
    },
    plugins: [
        // vue-loader 插件！
        new VueLoaderPlugin(),
        // 注册全局变量 项目内可通过 process.env 访问开发dev环境相关变量
        new webpack.DefinePlugin({
            'process.env': require('./env/dev.env')
        }),
    ]
};