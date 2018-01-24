<template>
	<div class="good-list-layout">
		<ul class="good-list-wrap">

			<li class="good-list-item" v-for="(item,index) in goodList" :key="index">
				<a href="#" class="item-link">
					<img class="good-pic" :src="item.img_url">
					<h5 class="item-title"  v-text="item.title"></h5>
					<div class="description">
						<p>
							<b class="now-price">￥{{item.sell_price}}</b>
							<s>￥{{item.market_price}}</s>
						</p>
						<p>
							<b class="left">热卖中</b>
							<b class="right">剩余{{item.stock_quantity}}件</b>
						</p>
					</div>
				</a>
			</li>

		</ul>
	</div>
</template>

<script>
export default {
	data(){
		return {
			goodList: []
		}
	},
	created(){
		this.getGoodList();
	},
	methods: {
		getGoodList(){
			const url = '/api/getgoods?pageindex=1';
			this.$axios.get(url).then((response)=>{
				let data = response.data;
				if(data.status != 0){
					Toast(data.message);
					return;
				}
				this.goodList = data.message;
			});
		}
	}
}
</script>

<style scoped lang="scss">
	.good-list-layout {
		background: #f2f2f2;
		padding: 5px;
	}
	.good-list-wrap {
		width: 100%;
		font-size: 0;
		.good-list-item {
			display: inline-block;
			width: 49%;
			margin: 5px 0 0 0;
			box-shadow: 0px 0px 8px rgba(0,0,0,.3);
			background: #fff;
			&:nth-of-type(2n){
				margin-left:2%;
			}
			.item-link {
				display: block;
				padding: 5px;
				.good-pic {
					width: 100%;
				}
				.item-title {
					color: #26a2ff;
					font-size: 16px;
				    font-weight: 700;
				    line-height: 20px;
				    white-space: nowrap;
			        overflow: hidden;
			        text-overflow: ellipsis;
				}
				.description {
					font-size: 14px;
					.now-price {
						color: #e92322;
					}
					p {
						margin-bottom: 0;
					}
				}
			}
		}
	}
</style>