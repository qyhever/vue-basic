/**
 * 配置路由规则
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 一般加载
// import home from '../components/Home.vue';

// 使用按需加载导入组件对象
const home = ()=> import('../components/Home.vue');
const userinfo = ()=> import('../components/account/UserInfo.vue');
const shopcar = ()=> import('../components/shopcar/Car.vue');
const setting = ()=> import('../components/setting/Setting.vue');

export default new VueRouter({
	linkActiveClass: 'mui-active',
	routes: [
		{path: '', redirect: '/home'}, // 默认进入home页面
		{path: '/home', component: home},
		{path: '/userinfo',component: userinfo},
		{path: '/shopcar',component: shopcar},
		{path: '/setting',component: setting},
	]
});