#### vue项目实践，参考文档如下：

1. [vuejs文档](https://cn.vuejs.org/v2/guide/) 
2. [vue-loader](https://vue-loader.vuejs.org/zh-cn/start/setup.html) 
3. [vue-router](https://router.vuejs.org/zh-cn/essentials/nested-routes.html)
4. [mui框架](http://dev.dcloud.net.cn/mui/ui/#cardview)
5. [mint-ui](http://mint-ui.github.io/#!/zh-cn) 

**文档查看： dist文件夹是打包好的文件** 

**文档后台数据依赖于PHPstudy的数据库，dtcmsdb4.sql 文件是数据内容，放进数据库后建立本地服务器就行了** 

#### 项目基本框架的搭建

1. 用之前做好的webpack模板项目
2. webpack.config.js中 babel-loader 加了个exclude: /node_modules/
3. 增加了ttf文件的 url-loader的配置
4. babel严格模式的移除， 在.babelrc中添加了插件
   下载插件babel-plugin-transform-remove-strict-mode

.babelrc中的配置

```
{
    presets: [],
    plugins: ["transform-remove-strict-mode"]
}
```

#### 首页

将首页分为三部分： 头部 底部  中间的部分由路由来控制显示

头部: mint-ui中的header
底部：mui中的tabbar

#### mint-ui mui的使用步骤

1. 通过npm下载mint-ui
2. 在main.js中导入 mint-ui的所有组件
3. 使用Vue.use(mint)安装mint-ui
4. 导入 mint-ui的css样式


1. 直接去github下载mui相关的内容
2. 将dist文件夹下的css js fonts 文件夹 在我们的项目中新增一个lib/mui 放进去
3. 在main.js中导入mui的css样式
4. 在使用mui的tabbar的时候，需要用到一个扩展的图标
5. 将扩展图标的css放到lib/mui/css
6. 将扩展图标的字体文件放到lib/mui/fonts
7. 在main.js中导入扩展图标的css文件

#### 新闻

1. 新建了新闻相关的组件 (list  detail)
2. 配置新闻相关的路由  

```
routes: [
    {path: "/news/list", component: NewsList},
    {path: "/news/detail/:id", component: NewsDetail},
]
```

1. 新闻列表页中使用到了
   mui的图文列表样式 （自己更改的一些样式）
2. 新闻列表中，由于要对时间进行格式化，所以我们又写了一个过滤器（在项目中新增了一个filters文件夹，用来存放所有的过滤器）
3. 时间过滤器中使用了一个第三方库 fecha
   通过npm下载这个库
   将其导入filter所在的文件

#### 评论组件

由于好多页面中都有评论功能，所以我们自己封装了一个评论的组件
评论组件有个props，用来接收使用该组件的时候，文章、图片、商品的id

获取评论列表的时候，需要注意有分页的功能， 当点击加载更多按钮的时候，需要将页码+1，然后请求数据，请求回来的数据不能直接将之前的数据替换，而是要和之前的数据进行合并操作

发布新的评论之后，不能直接调用getData方法重新获取数据，而是需要自己手动的将新的评论添加评论数组的前面！

#### 图片分享

滚动的分类信息用到了mui中的tab-top-webview-main.html

1. 需要将html代码放到页面中
2. 由于有js代码实现的功能，所以要将mui提供的js文件也导入
3. 导入之后，由于mui中有caller callee arguments的使用，所以使用babel进行转换的时候，会出现问题
4. 解决方案参照  项目基本框架的搭建 第4条
5. 调用mui提供的方法的时机，应该是在mounted中，因为只有这个时候，元素才被挂载在页面上了

点击不同的分类需要跳转到不同的路由，但是由于mui的问题，我们直接使用router-link进行跳转会没有反应，所以要换一种形式来跳转路由！

编程式的导航
this.$router.push("路由路径")

图片列表页的路由设计应该是有分类id作为参数的

```
routes: [
    {path: "/pic/list", redirect: "/pic/list/0"},
    {path: "/pic/list/:id", component: PicList}
]
```

当用户进入图片列表页之后，需要发送两个请求：

1. 获取分类数据！
2. 获取当前路由所访问的分类下面的图片的数据！

#### 路由和组件配合使用的过程

1. 创建相应的组件
2. 配置相应的路由规则
3. 写好router-link
4. 设置 router-view的位置

#### 路由参数

```js
var router = new VueRouter({
    routes:[
        {path: "/home/index/:id?", component: {template: ""}}
    ]
})
```

#### 路嵌套

```js

var router = new VueRouter({
    routes:[
        {path: "/home/:id?", component: {template: ""},
            children: [
                {path: "index", component: {""}}
            ]
        }
    ]
})
```



