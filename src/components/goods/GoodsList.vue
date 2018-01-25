<template>
<div>
	<mt-loadmore :autoFill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		<!-- 1.1 页面布局 -->
		<div class="good-list-layout">
			<ul class="good-list-wrap" v-infinite-scroll="loadMore"  infinite-scroll-distance="10">

				<li class="good-list-item" v-for="(item,index) in goodList" :key="index">
					<router-link class="item-link" v-bind="{to:'/goods/goodsinfo/'+item.id}">
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
					</router-link>
				</li>

			</ul>
		</div>
	</mt-loadmore>
</div>
</template>

<script>
import { Toast, Loadmore } from 'mint-ui';
export default {
	data(){
		return {
			goodList: [],
			allLoaded: false,
			pageIndex: 1,
			flag: true
		}
	},
	created(){
		// 1.3
		this.getGoodList();
	},
	methods: {
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
		},
		loadMore(){
			if(!this.flag){
				return;
			}
			this.flag = false;
			this.pageIndex++;
			const url = '/api/getgoods?pageindex=' + this.pageIndex;
			this.$axios.get(url).then((response)=>{
				this.flag = true;
				let data = response.data;
				if(data.status != 0){
					Toast(data.message);
					return;
				}
				this.goodList = this.goodList.concat(data.message);
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