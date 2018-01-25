<template>
	<div class="number-control">
		<button class="mui-btn substrict" @click="substrictCount">-</button>
		<input type="text" class="mui-btn count" v-model="count">
		<button class="mui-btn add" @click="addCount">+</button>
	</div>
</template>

<script>
// 不同于InputNumber.vue组件，此组件需要传入id，操作哪件商品
export default {
	props: {
		goodsId: {
			type: Number,
			required: true
		},
		goodsAmount: {
			type: Number,
			required: true
		}
	},
	data(){
		return {
			count: 1,
			result: {goodsId: 0, type: 'add'}
		}
	},
	created(){
		console.info('goodsAmount: ', this.goodsAmount);
		this.count = this.goodsAmount;
	},
	methods: {
		substrictCount(){
			this.count--;
			if(this.count < 1){
				this.count = 1;
				return;
			}
			this.sendHandleResult('substrict');
		},
		addCount(){
			this.count++;
			this.sendHandleResult('add');
		},
		sendHandleResult(type){
			this.result.goodsId = this.goodsId;
			this.result.type = type;
			this.$emit('handleResult', this.result);
		}
	}
}
</script>

<style scoped lang="scss">

	.number-control {
		display: flex;
		justify-content: space-around;
		.mui-btn {
			flex: 1;
			padding: 0;
			width: 0.6rem;
			height: 0.6rem;
		}
		.count {
			margin: 0 5px;
		}
	}
</style>