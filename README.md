# vue-basic
一个简单的vue项目

## 项目基本结构和环境配置

1. 安装依赖模块

   ```
   npm install
   ```

2. 项目结构

   ```
   ├─ api
   	└──	... #抽取出API请求
   ├─ components
   ├─ main.js
   ├─ store
       ├── index.js		# 定义初始state，组装模块并导出 store 的地方
       ├── actions.js		# 根级别的 action，用于通过dispatch触发的方法
       ├── mutations.js	# 根级别的 mutation，用于接收actions通过commit调用对应方法
       ├── getters.js		# 获取从store中的state中的派生出一些状态
       └── modules
           ├── cart.js      # 购物车模块
           └── products.js  # 产品模块
   ```

   ```
   ├─ src
       ├── assets			#放置静态文件，之后可能有改变的
       ├── components		#组件
       ├──	kits			#公共的js
       ├──	router 			#路由规则
       ├──	App.vue			#根组件
       └──	main.js			#入口文件
   ├─ static				#放置静态文件
   ├─ .babelrc				#babel配置文件
   ├─ .gitgnore			#git提交忽略文件
   ├─ .postcssrc.js		#postcss处理css前缀配置文件
   ├─ README.md			#项目说明文档
   ├─ index.html			#项目模板文件
   ├─ package.json			#npm包文件配置
   ├─ webpack.develop.config.js	#webpack开发环境配置文件
   └─ webpack.publish.config.js	#webpack生产环境配置文件
   ```

   ## 实现根组件头部和底部

   1. mui  header组件实现头部
   2. router-view占位
   3. mui tabbar实现底部

   ## 首页（home组件）轮播图

   1. mint-ui swipe组件实现轮播图
   2. 抽取单独的slider（轮播图）组件，在Home组件引入



	## 使用mui实现九宫格

1. grid-default组件
2. a链接改为router-link