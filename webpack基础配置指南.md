# webpack 基础配置指南

### 前言

基础的配置可以分为以下几个方面： entry 、 output 、 mode 、 resolve 、 module 、 optimization 、 plugin 、 source map 、 performance 等

##### webpack 五个核心概念

* Entry：指示以哪个入口起点开始打包，分析构建内部依赖图。
* Output：输出打包后的资源 bundles 输出到哪里去
* Loader：处理非 js 文件（webpack 本身只理解 js）
* Plugins：插件范围更广的任务。打包优化、压缩、重新定义环境中的变量等。
* Mode：development 开发模式、production 生产模式

> webpack 是一种前端资源构建工具，一个静态模块打包器（module bundle）。
>  
> 对于 webpack，前端的所有资源文件（js/css/img/json/less/...）都会作为模块处理。
>  
> webpack 能处理 js、json 资源，不能处理 css/img 等其他资源
>  
> 生产环境和开发环境将 es6 模块化编译成浏览器能识别的模块化
>  
> 生产环境比开发环境多一个压缩 js 代码

## 一、配置入口 entry

**入口起点(entry point)** 指示 webpack 应该使用哪个模块，来作为构建其内部 **依赖图(dependency graph)** 的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 ./src/index.js，但你可以通过在 webpack configuration 中配置 entry 属性，来指定一个（或多个）不同的入口起点。例如：

### 1、单入口

* webpack.config.js

``` 

module.exports = {
  entry: './path/to/my/entry/file.js'
};

// 或者
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

### 2、多入口（多页面应用程序）

* webpack.config.js

``` 

module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

## 二、配置出口 output

output 属性告诉 webpack在哪里输出它所创建的bundle，以及如何命名这些文件。主要输出文件的默认值是./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

* webpack.config.js

``` 

const path = require('path');
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

### 1、基础配置

1. path：output 目录对应一个绝对路径。(所有输出文件的目标路径;打包后文件在硬盘中的存储位置)
2. filename：此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
3. chunkFilename：此选项决定了非入口(non-entry) chunk 文件的名称，配置按需加载文件。
4. publicPath：webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径(publicPath)。[参考资料：publicPath为css，js，img等资源的一个基础路径....](https://juejin.cn/post/6844903601060446221)

> 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径

5. ...

### 2、浏览器缓存和hash值

对于我们开发的每一个应用，浏览器都会对静态资源进行缓存，如果我们更新了静态资源，而没有更新静态资源名称（或路径），浏览器就可能因为缓存的问题获取不到更新的资源。在我们使用 webpack 进行打包的时候，webpack 提供了 hash 的概念，所以我们可以使用 hash 来打包。

在定义包名称（例如 chunkFilename 、 filename），我们一般会用到哈希值，不同的哈希值使用的场景不同：

* **hash[范围最大]** 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值，**可以用在开发环境，生产环境不适用**。
* **chunkhash[范围其次]** 根据不同的入口文件(Entry)进行依赖文件解析，构建对应的 chunk、生成对应的哈希值，在生产环境里把一些公共库和程序入口文件区分开，打包构建，不改公共库的代码，可以保证哈希值不受影响，**适用于生产环境**。
* **contenthash[范围最小]** 和单个文件的内容相关，使用 contenthash 值，只要当前文件内容不变，那么不会重复构建，生成的相应文件哈希值也是一样。将非output的文件名设置hash或者chunkhash, 比如(css, image等)都将无效, 而且默认使用的是contenthash，**适用于生产环境**。

**注意：**

* 尽量在生产环境使用哈希
* 按需加载的块不受 filename 影响，受 chunkFilename 影响
* 使用 hash/chunkhash/contenthash 一般会配合 html-webpack-plugin （创建 html ，并捆绑相应的打包文件） 、clean-webpack-plugin （清除原有打包文件） 一起使用。

## 三、配置解析和转换文件的策略 moudle.loader

webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中 loader 有两个属性：

1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. use 属性，表示进行转换时，应该使用哪个 loader。

* webpack.config.js

``` 

module.exports = {
    module: {
        rules: [
            // 详细的loader配置
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader，use数组执行顺序：从后往前
                use: [
                    // style-loader 创建style标签，将js的样式字符串资源插入到html的head中生效
                    'style-loader',
                    // css-loader 将css文件变成commonjs模块加载到js中，样式字符串
                    'css-loader',
                ],
            },
        ],
    },
}
```

#### module.noParse

指明 webpack 不去解析某些内容，该方式有助于提升 webpack 的构建性能。

``` 

module.exports = {
  module: {
    // 指明 webpack 不去解析某些内容，该方式有助于提升 webpack 的构建性能
    noParse: /jquery/,
    rules: []
  }
}
```

#### sass-loader、less-loader、stylus-loader

分别处理 .scss/.sass、.less、.stylus/.styl文件，将这些文件编译成css文件

#### postcss-loader

对css样式添加前缀，用于兼容各个浏览器。

#### css-loader 

css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。

#### style-loader

style-loader 是通过一个JS脚本创建一个style标签，里面包含一些样式，然后把 CSS 插入到 DOM 中。

``` 

module.exports = {
   module: {
        rules: [{
                // 处理less资源
                test: /\.less$/,
                // 多个loader use用数组
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                // 问题：处理不了html中的img图片
                // 处理图片资源
                test: /\.(jpg|png|gif|jpeg)$/,
                // 使用一个loader: file-loader url-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，会被base64处理
                    // 优点：减少请求数量，减轻服务器压力
                    // 缺点： 图片体积会更大，请求速度慢
                    limit: 8 * 1024,
                    // [hash:10] 取图片的hash前十位进行重命名
                    // [ext] 文件的原本扩展名
                    name: '[hash:10].[ext]',
                },
            },
        ],
    },
}
```

#### vue-style-loader

基于 style-loader fork 过来的，跟 style-loader 类似。

#### mini-css-extract-plugin 的 MiniCssExtractPlugin.loader

把js中import导入的样式文件，单独打包成一个css文件，结合html-webpack-plugin，以link的形式插入到html文件中。
注：
此插件不支持HMR，若修改了样式文件，是不能即时在浏览器中显示出来的，需要手动刷新页面。

#### vue-loader

用于处理.vue文件，使用时plugins需要同步配置一下。

``` 

const VueLoaderPlugin = require('vue-loader/lib/plugin')
{ 
    // loader 打包资源
    module: {
        rules: [
            // 添加解析 .vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        // vue-loader 插件！
        new VueLoaderPlugin(),
    ],
}
```

#### file-loader （v5弃用）

file-loader 将文件上的 import / require（）解析为 url，并将该文件发射到输出目录中。

> v5 后弃用：请考虑使用 [asset modules](https://webpack.docschina.org/guides/asset-modules/) 代替。

#### url-loader（v5弃用）

用于将文件转换为 base64 URI 的 loader。如果图片较多，会发很多http请求，会降低页面性能。url-loader会将引入的图片编码，生成dataURl。

> v5 后弃用：请考虑使用 [asset modules](https://webpack.docschina.org/guides/asset-modules/) 代替。

#### html-loader

将 HTML 导出为字符串。当编译器要求时，HTML 被最小化。

#### babel-loader

此 package 允许你使用 Babel 和 webpack 转译 JavaScript 文件。

#### cache-loader

cache-loader 允许缓存以下 loaders 到（默认）磁盘或数据库。在一些性能开销较大的 loader 之前添加 cache-loader，以便将结果缓存到磁盘里。

#### thread-loader

多进程打包。使用时，需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。

#### val-loader

执行给定的模块以在构建时生成源代码。

#### gzip-loader

用于 webpack 的 gzip 加载器模块

#### i18n-loader

国际化

## 四、配置插件 plugins

loader 用于转换某些类型的模块，而插件 plugins 则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

``` 

module.exports = {
    plugins: [
        // 详细的plugins插件配置
    ],
}
```

#### html-webpack-plugin

用于编译 Webpack 项目中的 html 类型的文件

``` 

plugins: [
    // html-webpack-plugin
    // 功能：默认创建一个空的html文件，自动引入输出打包的所有资源（js / css）
    // 需求：需要有结构的html文件
    new HtmlWebpackPlugin({
        // 复制 ./src/index.html 文件，并自动引入打包输出所有的资源（js/css）
        template: './src/index.html',
    }),
]
```

#### copy-webpack-plugin

复制/拷贝插件，将单个文件或整个目录（已存在）复制到构建目录。

#### mini-css-extract-plugin

本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

#### optimize-css-assets-webpack-plugin

压缩单独的css文件，用于优化或者压缩CSS资源

#### css-minimizer-webpack-plugin

这个插件使用 cssnano 优化和压缩 CSS。
就像 optimize-css-assets-webpack-plugin 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。

#### webpack. DefinePlugin

DefinePlugin 允许在 编译时 创建配置的全局常量，这在需要区分开发模式与生产模式进行不同的操作时，非常有用。

#### VueLoaderPlugin

const VueLoaderPlugin = require('vue-loader/lib/plugin')

#### add-asset-html-webpack-plugin

使用add-asset-html-webpack-plugin动态添加vendor.dll.js到html

#### webpack. HotModuleReplacementPlugin()

启用模块热替换(Enable Hot Module Replacement - HMR)

#### uglifyjs-webpack-plugin

UglifyJS Webpack Plugin插件用来缩小（压缩优化）js文件。webpack 4之前的版本是通过webpack.optimize. CommonsChunkPlugin来压缩js，webpack 4版本之后被移除了，使用config.optimization.splitChunks来代替。

#### terser-webpack-plugin

该插件使用 terser 来压缩 JavaScript。

#### webpack-bundle-analyzer

打包体积分析

#### speed-measure-webpack-plugin

打包速度分析

#### webpack-parallel-uglify-plugin

ParallelUglifyPlugin插件则会开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成，但是每个子进程还是通过UglifyJS去压缩代码。无非就是变成了并行处理该压缩了，并行处理多个子任务，效率会更加的提高。但是这个插件并不是由Webpack官方维护，截止目前已经1年未更新，而且不支持老项目。

#### terser-webpack-plugin

该插件使用 terser 来压缩JavaScript，和ParallelUglifyPlugin一样，并行处理多个子任务，效率会更加的提高，且是webpack4官方推荐，有专人维护，并且连配置的方式都可以直接在optimization中配置

## 五、配置模式 mode

* mode可为：none、development、production

### 1、mode:production 默认配置

``` 

// webpack.prod.config.js
module.exports = {
  performance: {
    // 性能设置,文件打包过大时，会报警告
    hints: 'warning'
  },
  output: {
    // 打包时，在包中不包含所属模块的信息的注释
    pathinfo: false
  },
  optimization: {
    // 不使用可读的模块标识符进行调试
    namedModules: false,
    // 不使用可读的块标识符进行调试
    namedChunks: false,
    // 设置 process.env.NODE_ENV 为 production
    nodeEnv: 'production',
    // 标记块是否是其它块的子集
    // 控制加载块的大小（加载较大块时，不加载其子集）
    flagIncludedChunks: true,
    // 标记模块的加载顺序，使初始包更小
    occurrenceOrder: true,
    // 启用副作用
    sideEffects: true,
    // 确定每个模块的使用导出，
    // 不会为未使用的导出生成导出
    // 最小化的消除死代码
    // optimization.usedExports 收集的信息将被其他优化或代码生成所使用
    usedExports: true,
    // 查找模块图中可以安全的连接到其它模块的片段
    concatenateModules: true,
    // SplitChunksPlugin 配置项
    splitChunks: {
      // 默认 webpack4 只会对按需加载的代码做分割
      chunks: 'async',
      // 表示在压缩前的最小模块大小,默认值是30kb
      minSize: 30000,
      minRemainingSize: 0,
      // 旨在与HTTP/2和长期缓存一起使用 
      // 它增加了请求数量以实现更好的缓存
      // 它还可以用于减小文件大小，以加快重建速度。
      maxSize: 0,
      // 分割一个模块之前必须共享的最小块数
      minChunks: 1,
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 6,
      // 入口的最大并行请求数
      maxInitialRequests: 4,
      // 界定符
      automaticNameDelimiter: '~',
      // 块名最大字符数
      automaticNameMaxLength: 30,
      cacheGroups: { // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // 当打包时，遇到错误编译，将不会把打包文件输出
    // 确保 webpack 不会输入任何错误的包
    noEmitOnErrors: true,
    checkWasmTypes: true,
    // 使用 optimization.minimizer || TerserPlugin 来最小化包
    minimize: true,
  },
  plugins: [
    // 使用 terser 来优化 JavaScript
    new TerserPlugin(/* ... */),
    // 定义环境变量
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    // 这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```

### 2、mode:development 默认配置

``` 

// webpack.dev.config.js
module.exports = {
  devtool: 'eval',
  cache: true,
  performance: {
    // 性能设置,文件打包过大时，不报错和警告，只做提示
    hints: false
  },
  output: {
    // 打包时，在包中包含所属模块的信息的注释
    pathinfo: true
  },
  optimization: {
    // 使用可读的模块标识符进行调试
    namedModules: true,
    // 使用可读的块标识符进行调试
    namedChunks: true,
    // 设置 process.env.NODE_ENV 为 development
    nodeEnv: 'development',
    // 不标记块是否是其它块的子集
    flagIncludedChunks: false,
    // 不标记模块的加载顺序
    occurrenceOrder: false,
    // 不启用副作用
    sideEffects: false,
    usedExports: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    // 当打包时，遇到错误编译，仍把打包文件输出
    noEmitOnErrors: false,
    checkWasmTypes: false,
    // 不使用 optimization.minimizer || TerserPlugin 来最小化包
    minimize: false,
    removeAvailableModules: false
  },
  plugins: [
    // 当启用 HMR 时，使用该插件会显示模块的相对路径
    // 建议用于开发环境
    new webpack.NamedModulesPlugin(),
    // webpack 内部维护了一个自增的 id，每个 chunk 都有一个 id。
    // 所以当增加 entry 或者其他类型 chunk 的时候，id 就会变化，
    // 导致内容没有变化的 chunk 的 id 也发生了变化
    // NamedChunksPlugin 将内部 chunk id 映射成一个字符串标识符（模块的相对路径）
    // 这样 chunk id 就稳定了下来
    new webpack.NamedChunksPlugin(),
    // 定义环境变量
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ]
}
```

### 3、mode:none 默认配置

``` 

// webpack.com.config.js
module.exports = {
  performance: {
   // 性能设置,文件打包过大时，不报错和警告，只做提示
   hints: false
  },
  optimization: {
    // 不标记块是否是其它块的子集
    flagIncludedChunks: false,
    // 不标记模块的加载顺序
    occurrenceOrder: false,
    // 不启用副作用
    sideEffects: false,
    usedExports: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    // 当打包时，遇到错误编译，仍把打包文件输出
    noEmitOnErrors: false,
    checkWasmTypes: false,
    // 不使用 optimization.minimizer || TerserPlugin 来最小化包
    minimize: false,
  },
  plugins: []
}

```

### 4、production、development、none 对比

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dae06e698f234a09b2e32b742e79b5af~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cb58c0e9eb64f07b04cb52d0f7601d7~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbbad765190a47a0900620c272f92ea3~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a82b93e069594dd7b7532051a235ec60~tplv-k3u1fbpfcp-watermark.image)

## 六、配置devtool

配置 webpack 如何生成 Source Map，用来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度：

* 生产环境：默认为 null ，生产环境一般设置为 source-map hidden-source-map nosources-source-map
* 开发环境：默认为 eval ，开发环境一般设置为 eval, eval-source-map, cheap-eval-source-map, cheap-module-eval-source-map, cheap-module-source-map 、cheap-module-eval-source-map

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d034cc28c01449c28565d3a91db5b3a7~tplv-k3u1fbpfcp-watermark.image)

 

如果默认的 webpack minimizer 已经被重定义(例如 terser-webpack-plugin )，你必须提供 sourceMap：true 选项来启用 source map 支持。

## 七、配置解析策略 resolve

> 配置解析策略 resolve：自定义寻找依赖模块时的策略

webpack在启动后会从配置的入口模块触发找出所有依赖的模块，Resolve配置webpack如何寻找模块对应的文件。webpack内置JavaScript模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你可以根据自己的需要修改默认的规则。

* resolve.alias 配置项通过别名来把原来导入路径映射成一个新的导入路径。
* resolve.extensions 在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在。
* resolve.symlinks 是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)。启用时，符号链接(symlink)的资源，将解析为其 真实 路径，而不是其符号链接(symlink)的位置。注意，当使用创建符号链接包的工具（如 npm link）时，这种方式可能会导致模块解析失败。
* ......

## 八、配置优化 optimization

### 1. 最小化包

* 使用 optimization.removeAvailableModules 删除已可用模块
* 使用 optimization.removeEmptyChunks 删除空模块
* 使用 optimization.occurrenceOrder 标记模块的加载顺序，使初始包更小
* 使用 optimization.providedExports 、 optimization.usedExports 、concatenateModules 、optimization.sideEffects 删除死代码
* 使用 optimization.splitChunks 提取公共包
* 使用 optimization.minimizer || TerserPlugin 来最小化包

### 2. 拆包

当包过大时，如果我们更新一小部分的包内容，那么整个包都需要重新加载，如果我们把这个包拆分，那么我们仅仅需要重新加载发生内容变更的包，而不是所有包，有效的利用了缓存。

#### 拆分 node_modules

很多情况下，我们不需要手动拆分包，可以使用 optimization.splitChunks ：

``` 

const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      // 对所有的包进行拆分
      chunks: 'all',
    },
  },
};
```

我们不必制定拆包策略，chunks: all 会自动将 node_modules 中的所有内容放入一个名为 vendors〜main.js 的文件中。

#### 拆分业务代码

采用多入口的方式，当有业务代码更新时，更新相应的包即可

``` 

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    ProductList: path.resolve(__dirname, 'src/ProductList/ProductList.js'),
    ProductPage: path.resolve(__dirname, 'src/ProductPage/ProductPage.js'),
    Icon: path.resolve(__dirname, 'src/Icon/Icon.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
};

```

#### 拆分第三方库

``` 

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // 获取第三方包名
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm 软件包名称是 URL 安全的，但是某些服务器不喜欢@符号
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};

```

当第三方包更新时，仅更新相应的包即可。

注意，当包太多时，浏览器会发起更多的请求，并且当文件过小时，对代码压缩也有影响。

#### 动态加载

现在我们已经对包拆分的很彻底了，但以上的拆分仅仅是对浏览器缓存方面的优化，减小首屏加载时间，实际上我们也可以使用按需加载的方式来进一步拆分，减小首屏加载时间：

``` 

import React, { useState, useEffect } from 'react';
import './index.scss'

function Main() {
  const [NeighborPage, setNeighborPage] = useState(null)

  useEffect(() => {
    import('../neighbor').then(({ default: component }) => {
      setNeighborPage(React.createElement(component))
    });
  }, [])

  return NeighborPage
    ? NeighborPage
    : <div>Loading...</div>;
}

export default Main

```

## 九、配置性能 performance

当打包是出现超过特定文件限制的资产和入口点，performance 控制 webpack 如何通知：

``` 

module.exports = {
  // 配置如何显示性能提示
  performance: {
    // 可选 warning、error、false
    // false：性能设置,文件打包过大时，不报错和警告，只做提示
    // warning：显示警告，建议用在开发环境
    // error：显示错误，建议用在生产环境，防止部署太大的生产包，从而影响网页性能
    hints: false
  }
}

```

## 十、配置其它

### context

基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader

``` 

module.exports = {
  //...
  context: path.resolve(__dirname, 'app')
};
```

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

### cache

缓存生成的 webpack 模块和块以提高构建速度。在开发模式中，缓存设置为 type: 'memory' ，在生产模式中禁用。cache: true 是 cache: {type: 'memory'} 的别名。要禁用缓存传递 false ：

``` 

module.exports = {
  cache: false
}
```

在内存中，缓存仅在监视模式下有用，并且我们假设你在开发中使用监视模式。 在不进行缓存的情况下，内存占用空间较小。

### watch

监视文件更新，并在文件更新时重新编译：

``` 

module.export = {
  // 启用监听模式
  watch: true,
}
```

在 webpack-dev-server 和 webpack-dev-middleware 中，默认启用了监视模式。
或者我们可以在命令行里启动监听（ --watch ）：

``` 

webpack --watch --config webpack.config.dev.js
```

### watchOptions

``` 

module.export = {
  watch: true,
  // 自定义监视模式
  watchOptions: {
    // 排除监听
    ignored: /node_modules/,
    // 监听到变化发生后，延迟 300ms（默认） 再去执行动作，
    // 防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认 1000ms 询问一次
    poll: 1000
  }
}

```

### target

构建目标，用于为 webpack 指定一个环境：

``` 

module.exports = {
  // 编译为类浏览器环境里可用（默认）
  target: 'web'
};
```

### externals

排除打包时的依赖项，不纳入打包范围内，例如你项目中使用了 jquery ，并且你在 html 中引入了它，那么在打包时就不需要再把它打包进去：

``` 

<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

配置：

``` 

module.exports = {
  // 打包时排除 jquery 模块
  externals: {
    jquery: 'jQuery'
  }
};
```

## 相关资源

#### [GitHub：webpack5的vue2打包框架模版（开发、测试、生产环境配置）](https://github.com/GYQ-LQ/quinn-webpack5-vue2)
