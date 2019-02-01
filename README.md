![banner](https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/banner.png)

<p align="center">
  <a><img src="https://img.shields.io/github/release/d2-projects/d2-admin.svg"/></a>
  <a><img src="https://img.shields.io/npm/v/@d2-admin/ice-scaffold.svg"/></a>
  <a href="https://www.travis-ci.org/d2-projects/d2-admin"><img src="https://www.travis-ci.org/d2-projects/d2-admin.svg?branch=master"/></a>
  <a><img src="https://img.shields.io/github/last-commit/d2-projects/d2-admin.svg"/></a>
  <a><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/></a>
</p>


## 功能

* 使用 vue-cli3 构建
* 首屏加载等待动画
* 五款主题
* 详细的文档
* 登录和注销
* 分离的路由和菜单设置
* 可折叠侧边栏
* 多国语
* 富文本编辑器
* Markdown 编辑器
* 全屏
* Fontawesome 图标库
* 图标选择器
* 自动注册 SVG 图标
* 模拟数据
* 剪贴板封装
* 图表库
* 时间日期计算工具
* 导入 Excel （ xlsx + csv ）
* 数据导出 Excel （ xlsx + csv ）
* 数据导出文本
* 数字动画
* 可拖拽调整大小的区块布局
* 可拖拽调整大小和位置的网格布局
* 开箱即用的页面布局组件
* 加载并解析 markdown 文件
* GitHub 样式的 markdown 显示组件
* markdown 内代码高亮
* 为 markdown 扩展了百度云链接解析和优化显示
* 右键菜单组件
* 自定义滚动条和滚动控制
* 公用样式抽离，方便的主题定制
* 支持临时菜单配置
* 系统功能展示模块 `1.1.4 +`
* 多标签页模式 `1.1.4 +`
* 美化滚动条 `1.1.4 +`
* json view `1.1.4 +`
* cookie 封装 `1.1.5 +`
* 多标签页全局控制 API `1.1.5 +`
* 菜单全局控制 API `1.1.5 +`
* 多标签页关闭控制支持右键菜单 `1.1.10 +`
* 模块化全局状态管理 `1.2.0 +`
* 多种数据持久化方式：区分用户，区分路由，页面数据快照功能 `1.2.0 +`
* 支持跳出外部链接的菜单系统 `1.2.0 +`
* 支持菜单 svg 图标 `1.3.0 +`
* 日志记录和错误捕捉 `1.3.0 +`
* 全局菜单搜索 `1.3.0 +`
* 自定义登录重定向 `1.3.0 +`

## TODO

* 可以折叠后显示一行输入控件的的表格搜索栏组件
* 用户管理示例界面（用户管理、权限管理、角色管理等）方便对接后台
* 更多的错误信息页面以及美化错误页面（404、401...）

## 安装依赖

将终端切换到项目目录之后安装依赖：

```
npm i
```

如果遇到问题比如 网络问题，请切换cnpm。

## 开发调试

在项目目录内启动项目：

```
npm run dev
```

或者使用：

```
npm start
```


## 目录结构

```
├─ dev
│  └─ snippets 帮助开发的代码片段
├─ docs 文档
├─ public 静态资源
├─ src
│  ├─ assets 资源
│  ├─ components 组件
│  ├─ i18n 多国语
│  ├─ layout 布局
│  ├─ libs 通用库
│  ├─ menu 菜单
│  ├─ mock 模拟数据
│  ├─ pages 页面
│  ├─ plugin 插件
│  ├─ router 路由
│  ├─ store 全局状态
│  ├─ App.vue
│  ├─ main.js
│  └─ setting.js 设置
├─ tests 单元测试
├─ .env 环境变量
├─ .env.development 环境变量 开发环境
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .postcssrc.js
├─ LICENSE
├─ README.md
├─ babel.config.js
├─ jest.config.js
├─ package.json
└─ vue.config.js 配置文件
```


##快速上手

更多帮助请参考[开发文档](https://sunzhiyuan.gitee.io/suntray-admin-doc/zh/learn-guide/getting-started.html#安装环境)
