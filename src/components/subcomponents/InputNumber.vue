<template>
	<div>
		<button class="mui-btn substrict" @click="substrictCount">-</button>
		<button class="mui-btn count" v-text="count"></button>
		<button class="mui-btn add" @click="addCount">+</button>
	</div>
</template>

<script>
export default {
	data(){
		return {
			count: 1
		}
	},
	methods: {
		substrictCount(){
			this.count--;
			if(this.count < 1){
				this.count = 1;
			}
			this.sendCount();
		},
		addCount(){
			this.count++;
			this.sendCount();
		},
		sendCount(){
			this.$emit('dataObj', this.count);
		}
	}
}
</script>

<style scoped>
	
</style>