<template>
	<div>
		<form class="mui-input-group" @submit="loginSubmit">
			<div class="mui-input-row">
				<label>账号</label>
				<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
			</div>
			<div class="mui-input-row">
				<label>密码</label>
				<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
			</div>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary">登录</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data(){
		return {
			username: '',
			password: ''
		};
	},
	methods: {
		loginSubmit(){
			let randomString = Math.random().toString(36).substr(2);
			localStorage.setItem('sessionid', randomString);
			this.$router.push('/userinfo/');
		}
	}
}
</script>

<style scoped>
	
</style>