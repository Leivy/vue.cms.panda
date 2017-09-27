var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //1. 入口文件
    entry: path.join(__dirname, "./src/main.js"),
    //2. 配置出口路径
    output: {
        path: path.join(__dirname, "dist"),
        filename: "build.js"
    },
    //3. 配置加载器
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.(jpg|gif|png|svg)$/, loader: "url-loader"},
            {test: /\.(woff2|ttf|woff|eot)$/, loader: "url-loader"},
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
            {test: /\.vue$/, loader: "vue-loader"}
        ]
    },
    //4. 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}