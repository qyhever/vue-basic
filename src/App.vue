<template>
	<div>
		<!-- 1.0利用mint-ui组件实现页面头部 -->
		<mt-header fixed title="头部"></mt-header>
		
		<!-- 2.0 利用vue-router的 <router-view>进行占位 -->
		<router-view />
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
					<span id="badge" class="mui-badge">0</span>
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
export default {

}
</script>

<style scoped lang="scss">
	
</style>