[TOC]

# vue-basic

一个简单的vue项目

## 项目基本结构和环境配置

1. 安装依赖模块

   ```
   npm install
   ```

2. 项目结构

   ```
   ├─ src
       ├── assets			#放置静态文件，之后可能有改变的
       ├── components		#组件
       ├──	kits			#公共的js
       ├──	router 			#路由规则
       ├─ store
           ├── index.js	 # 定义初始state，组装模块并导出 store 的地方
           ├── actions.js	 # 根级别的 action，用于通过dispatch触发的方法
           ├── mutations.js # 根级别的 mutation，用于接收actions通过commit调用对应方法
           ├── getters.js	 # 获取从store中的state中的派生出一些状态
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
      <-- 用transition标签包裹，keep-alive用于保留组件状态或避免重新渲染。 -->
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



## 新闻列表页NewsList.vue

1. mui的media-list组件实现布局
2. 设置axios统一根路径
3. 请求数据，填充数据

## 新闻详情页NewsInfo.vue

1. NewsList.vue组件router-link写法

   ```javascript
   // NewsList.vue
   v-bind="{to:'/news/newsinfo/'+item.id}"
   ```

2. router.js配置路由规则

   ```javascript
   // router.js
   { path: '/news/newsinfo/:id', component: newsinfo }
   ```

3. NewsInfo.vue组件获取id，通过this.$route.params对象获取

   ```javascript
   // NewsInfo.vue
   created() {
       this.id = this.$route.params.id;
   }
   ```


## Comment.vue评论子组件

通讯问题：父向子传值

```html
<!-- 父组件 NewsInfo.vue -->
<v-comment :receive-id="id"></v-comment>
```

使用子组件，把父组件的id传递到子组件，子组件通过props接受receiveId

```javascript
// 子组件 comment.vue
props: ['receiveId']
// 或者进行验证
props: {
    // 接受父组件传过来的id值
    receiveId : {
        type: String,
        required: true
    }
}
```

## 图片列表PhotoList.vue组件

图片分类横向滑动，使用better-scroll

```javascript
this.$nextTick(()=>{
    this.cateScroll = new BScroll(this.$refs['category-wrap'],{
        eventPassthrough: 'vertical',
        scrollX: true,
        scrollY: false,
        preventDefault: false
    });
});
```

调用实例对象的$nextTick方法，确保DOM已渲染完成

## 图片详情PhotoInfo.vue组件

图片预览功能，[vue-preview插件](https://github.com/LS1231/vue-preview)

- 需要在webpack配置文件中进行配置

```javascript
{
    test: /vue-preview.src.*?js$/,
    loader: 'babel'
}
```

- 在入口文件引入

```javascript
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
```



