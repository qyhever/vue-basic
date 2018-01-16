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

   ## 左上角返回按钮

   1. 后退使用vue-router中的`this.$router.go(-1)`

      ```javascript
      backto(){
      	this.$router.go(-1);
      }
      ```

   2. 控制返回按钮在首页（或者tab页面）隐藏，其他页面显示

      ```javascript
      '$route' (to, from) {
          if (to.path.toLowerCase() == '/home' ||
              to.path.toLowerCase() == '/userinfo' ||
              to.path.toLowerCase() == '/shopcar' ||
              to.path.toLowerCase() == '/setting') {
              this.isShow = false;
          } else {
              this.isShow = true;
          }
          // console.log(to.path)
          // console.log(from.path)

          const toDepth = to.path.split('/').length;
          const fromDepth = from.path.split('/').length;

          // 根据路由深度判断是进入页面还是返回页面
          // 例如当前页面 路由地址是 /photo/photolist 路由深度就是 3 
          // 进入 /photo/photoinfo/37 路由深度就是4
          // 进入页面就使用 slide-left 返回页面就是要slide-right
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

      }
      ```

   3. 路由切换动画

      ```html
      <-- 用transition标签包裹 -->
      <transition :name="transitionName">
        <keep-alive>
        	<router-view class="child-view" />
        </keep-alive>
      </transition>
      <style>
      	.slide-left-enter, .slide-right-leave-active {  
            opacity: 0; 
            transform: translate(100%, 0);  
          }  
        .slide-left-leave-active, .slide-right-enter {  
          opacity: 0; 
          transform: translate(-100%, 0);  
        }
      </style>
      ```

   4. `vue-router` 默认 hash 模式，改用路由的 **history 模式**(需要后台配置支持)

      ```javascript
      new VueRouter({
        mode: 'history',
        routes: [...]
      })
      ```

      ​