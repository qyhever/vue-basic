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
       ├──	tools			#公共的工具方法
       ├──	router 			#路由规则
       ├─  store
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

## 商品列表GoodsList.vue组件

下拉/上拉刷新功能，使用mint-ui的loadmore组件

- 在外面加上mt-loadmore标签

```html
<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
</mt-loadmore>
```

- 执行方法

```javascript
// 下拉时触发 请求最新数据
loadTop() {
	console.log('下拉');
	this.pageIndex = 1;
	this.getGoodList();
},
// 上拉加载更多
loadBottom() {
	console.log('上拉');
	this.pageIndex++;
	this.getGoodList();
},
// 1.2 获取商品列表数据
getGoodList(){
	const url = '/api/getgoods?pageindex=' + this.pageIndex;
	this.$axios.get(url).then((response)=>{
		let data = response.data;
		if(data.status != 0){
			Toast(data.message);
			return;
		}
		if (this.pageIndex == 1) {
			// 重置下拉状态
			this.$refs.loadmore.onTopLoaded();
			// 直接赋值第一页的数据
			this.goodList = data.message;
		} else {
			// 重置上拉状态
			if (data.message.length == 0) { // 如果没有数据了
				this.allLoaded = true;
			}
			this.$refs.loadmore.onBottomLoaded();
			this.goodList = this.goodList.concat(data.message);
		}

	});
}
```

## 商品详情GoodsInfo.vue组件

- 子向父传值，发布-订阅模式
  - 子组件声明一个方法，用来发布事件+数据，每次有数据改变时调用它
  - 父组件注册（订阅）这个事件，第一个参数就是接受的数据

```javascript
// 子组件，InputNumber.vue
methods: {
    substrictCount() {
        this.count--;
        if (this.count < 1) {
            this.count = 1;
        }
        this.sendCount(); // 数据变化时调用（发布）
    },
    addCount() {
        this.count++;
        this.sendCount(); // 数据变化时调用（发布）
    },
    sendCount() { // 声明一个发布消息的方法
        this.$emit('dataObj', this.count);
    }
}
```

```javascript
// 父组件，GoodsInfo.vue
<input-number @dataObj="getCount"></input-number>

getCount(data){
	this.inputNumberCount = data;
}
```

## 集成高德地图

1. 在高德地图开发者网站申请key
2. 引入高德地图文件（由于异步加载，在组件中引入比较特殊，所以直接在index.html中引入）
   - 组件引入方式查看[官方文档](https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install)

```html
<script src="http://webapi.amap.com/maps?v=1.3&key=密钥"></script>
```

3. 在组件中实例化地图，在mounted中操作

```javascript
mounted() {
    let map, geolocation, _this = this;
    map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 60), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        // 定位之后的回调
        AMap.event.addListener(geolocation, 'complete', _this.onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', _this.onError); //返回定位出错信息
    });

    // 添加地图控件
    AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
        // 添加缩放控件
        map.addControl(new BasicControl.Zoom({
            // position: 'rb'
            position: { bottom: '60px',right: '20px' }
        }));
        //图层切换控件
        map.addControl(new BasicControl.LayerSwitcher({
            // position: 'rt'
            position: { top: '50px',right: '20px' }
        }));
    });
},
methods: {
    //解析定位结果
    onComplete(data) {
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        if (data.accuracy) {
            str.push('精度：' + data.accuracy + ' 米');
        } //如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        console.info(str);
    },
    //解析定位错误信息
    onError(data) {
        console.info('定位失败');
    }
}
```

4. 添加控件还需要引入UI组件库

```html
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
```





## 路由懒加载

> 当没有访问到某个页面路由是，不去加载对应的组件代码，节约数据请求量，加快首页DOM渲染速度

1. 安装插件包

```
npm install babel-plugin-syntax-dynamic-import --save-dev
```

2. 在.babelrc配置文件中加入

```javascript
"plugins": ["transform-runtime","syntax-dynamic-import"]
```

3. 改变引入入组件的方式

```javascript
// 之前的引入方式
import home from '../components/Home.vue';
// 换成下面的箭头函数引入方式
const home = () => import('../components/Home.vue');
```

