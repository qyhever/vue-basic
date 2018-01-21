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

export default new VueRouter({
	linkActiveClass: 'mui-active', // 改变路由激活时的class名称，默认值为: "router-link-active"
	mode: 'history',
	routes: [
		{ path: '/', redirect: '/home' }, // 默认进入home页面(将根页面重定向到首页home)
		{ path: '/home', component: home },
		{ path: '/userinfo', component: userinfo },
		{ path: '/shopcar', component: shopcar },
		{ path: '/setting', component: setting },
		{ path: '/news/newslist', component: newslist },
		{ path: '/photo/photolist', component: photolist },
		{ path: '/goods/goodslist', component: goodslist },
		{ path: '/goods/newsinfo/:id', component: newsinfo },
	]
});