<template>
	<div class="layout">
		<!-- 1.0利用mui组件实现页面头部 -->
		<mt-header fixed title="固定在顶部"></mt-header>

		<!--1.0.1 统一的返回按钮 -->
		<div v-show="isShow" class="back-wrap">
			<a href="javascript:void(0)" @click="backto" class="back-link">
				<span class="mui-icon mui-icon mui-icon-arrowleft"></span>
			</a>
		</div>

		<!-- 4.0 使用动态的 transition name -->
		<transition :name="transitionName">
			<keep-alive>
				<!-- 2.0 利用vue-router的 <router-view>进行占位 -->
				<router-view />
			</keep-alive>
		</transition>
		
		<!-- 3.0 利用mui中的tabbar组件实现系统的底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/userinfo">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">账户</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge" id="badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/setting">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
import { bus } from './tools/bus.js';
bus.$on('sendCount', (data)=>{
	let badge = document.querySelector('#badge');
	setTimeout(()=>{
		badge.innerText = +badge.innerText + data;
	},500);
});
export default {
	data() {
		return {
			isShow: false,
			transitionName: 'slide-left'
		}
	},
	created() {
		// console.log(this.$route)
	},
	watch: {
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
	},
	methods: {
		backto() {
			// 利用路由对象中的go(-1)来实现返回到上一级页面(这个方法是vue-router的方法)
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped lang="scss">
	.layout {
		width: 100%;
		margin: 0 auto;
		min-width: 320px;
		max-width: 640px;
	}
	header,
	nav {
		z-index: 1000;
		margin: 0 auto;
		min-width: 320px;
		max-width: 640px;
	}
	.back-wrap {
		z-index: 1000;
		position: fixed;
		top: 0;
		left: 0;
		width: 40px;
		height: 40px;
		.back-link {
			display: flex;
			width: 100%;
			height: 100%;
			padding-left: 4px;
			text-align: center;
			align-items: center;
			color: #fff;
		}
	}
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate(300px, 0);
		transition: all 0.3s ease;
	}
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate(-300px, 0);
		transition: all 0.3s ease;
	}
</style>