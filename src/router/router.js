/**
 * 配置路由规则
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 一般加载
// import home from '../components/Home.vue';

/**
 * 使用按需加载导入组件对象（路由懒加载）
 * import('./Foo.vue') // 返回 Promise
 */
const home = () => import('../components/Home.vue');
const userinfo = () => import('../components/account/UserInfo.vue');
const shopcar = () => import('../components/shopcar/Car.vue');
const setting = () => import('../components/setting/Setting.vue');
const newslist = () => import('../components/news/NewsList.vue');
const photolist = () => import('../components/photo/PhotoList.vue');
const goodslist = () => import('../components/goods/GoodsList.vue');
const newsinfo = () => import('../components/news/NewsInfo.vue');
const photoinfo = () => import('../components/photo/PhotoInfo.vue');
const goodsinfo = () => import('../components/goods/GoodsInfo.vue');
const goodsdesc = () => import('../components/goods/GoodsDescription.vue');
const goodscomment = () => import('../components/goods/GoodsComment.vue');
const map = () => import('../components/setting/Map.vue');
const login = () => import('../components/account/Login.vue');

export default new VueRouter({
	linkActiveClass: 'mui-active', // 改变路由激活时的class名称，默认值为: "router-link-active"
	// mode: 'history',
	routes: [
		{ path: '/', redirect: '/home' }, // 默认进入home页面(将根页面重定向到首页home)
		{ path: '/home', component: home },
		{ path: '/shopcar', component: shopcar },
		{ path: '/setting', component: setting },
		{ path: '/news/newslist', component: newslist },
		{ path: '/photo/photolist', component: photolist },
		{ path: '/goods/goodslist', component: goodslist },
		{ path: '/news/newsinfo/:id', component: newsinfo },
		{ path: '/photo/photoinfo/:id', component: photoinfo },
		{ path: '/goods/goodsinfo/:id', component: goodsinfo },
		{ path: '/goods/goodsdesc/:id', component: goodsdesc },
		{ path: '/goods/goodscomment/:id', component: goodscomment },
		{ path: '/map', component: map },
		{ path: '/login', component: login },
		{ 
			path: '/userinfo',
			component: userinfo,
			meta: {
			    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			// 进入该路由前会执行
			beforeEnter: (to, from, next) => {
			    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
			        if (localStorage.getItem('sessionid')) {
			            // 通过localStorage获取当前的sessionid是否存在
			            next();
			        } else {
			            next({
			                path: '/login',
			                // query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
			            })
			        }
			    } else {
			        next();
			    }
			}
		},
	]
});