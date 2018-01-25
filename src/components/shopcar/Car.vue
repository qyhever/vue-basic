<template>
	<div class="layout">
		<!-- 1.1 商品列表显示 -->
		<div class="row" v-for="(item,index) in goodsList" :key="index">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<div class="pic-wrap">
				<img class="pic" v-bind="{src: 'http://ofv795nmp.bkt.clouddn.com/' + item.thumb_path}" alt="商品图片" >
			</div>
			
			<div class="goods-info">
				<h4 v-text="item.title" class="title"></h4>
				<ul class="goods-operate">
					<li class="price">￥{{item.sell_price}}</li>
					<li>
						<!-- 2.1 输入数量组件 -->
						<car-input-number :goods-id="item.id" :goods-amount="item.amount" @handleResult="getGoodsResult">
						</car-input-number>
					</li>
					<!-- 4.1 删除 -->
					<li>
						<a href="javascript:void(0)" class="delete" @click="deleteGoods(item.id, index)">删除</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="total">
			<div class="desc">
				<ul>
					<li><b>总计（不含运费）</b></li>
					<!-- 3.1 计算商品件数和总价 -->
					<li>已勾选商品{{totalCount}}件,总价:￥{{allPrice}}元</li>
				</ul>
			</div>
			<div class="to-pay">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
	{{value}}
	</div>
</template>

<script>
import {Toast} from 'mint-ui';
import {getGoodsObject, updateData, removeItem} from '../../tools/storage.js';
import CarInputNumber from '../subcomponents/CarInputNumber.vue';
export default {
	components: {CarInputNumber},
	computed: {
		// 3.2 商品数量
		totalCount(){
			// 计算逻辑：计算出this.value中的ture值有多少个
			let trueArr = this.value.filter(item => item);
			// 商品的总价格 = 当前商品的购买数量 * 商品的单价（其中两个值均从this.goodsList中来）
			let totalMoney = 0;
			this.value.forEach((item,index)=>{
				// 当前item如果为true，则这个商品的总价格需要计算
				if(item){
					let count = this.goodsList[index].amount;
					let price = this.goodsList[index].sell_price;
					let itemMoney = count * price;
					totalMoney += itemMoney;
				}
			});
			this.allPrice = totalMoney;
			return trueArr.length;
		}
	},
	data(){
		return {
			value:[],
			goodsList: [],
			allPrice: 0 // 总价格
		}
	},
	created(){
		// 1.3
		this.getGoodsList();
	},
	methods: {
		// 4.2 删除
		deleteGoods(goodsId, index){
			console.log(goodsId, index);
			// 4.2.1 将this.value数组中的index这个位置的值移除(当移除了这个值的时候就会自动触发计算属性totalCount的执行)
			this.value.splice(index,1);
			// 4.2.2 将this.goodsList中的index这个位置的值移除(当移除了这个值的时候就会自动触发计算属性totalCount的执行)
			this.datalist.splice(index,1);
			// 4.2.3 将localStroage中的goodsId对应的所有值移除
			removeItem(goodsid);
		},
		// 2.2 获取输入数量子组件传递的数据
		getGoodsResult(data){
			// console.info('GoodsResult: ', data); // data: {goodsId: 89, type: 'add'}
			// 2.2.1 更新localStorage中的数据
			updateData(data);
			// 2.2.2 更新this.goodsList中的当前数量
			for (let i = 0; i < this.goodsList.length; i++) {
				let item = this.goodsList[i];
				if(data.id == item.id){
					if(data.type == 'add'){
						item.amount++;
					}else {
						item.amount--;
					}
					break;
				}
			}
		},
		// 1.2 获取商品数据
		getGoodsList(){
			// 1.2.1 从localStorage中获取所有的商品id值，{ 87: 4,88: 1 }
			let obj = getGoodsObject();
			// 1.2.2 将id值按照api的参数格式修改
			let idJoinString = '';
			for(let k in obj){
				idJoinString += k + ','; // 87,88,
			}
			idJoinString = idJoinString.slice(0, idJoinString.length - 1); // 87,88
			const url = 'api/goods/getshopcarlist/' + idJoinString;
			this.$axios.get(url).then((response)=>{
				let data = response.data;
				if(data.status != 0){
					Toast(data.message);
					return;
				}
				data.message.forEach((item)=>{
					// 把localStorage中对应商品id的数量，添加到每个商品上
					item.amount = obj[item.id];
					// 为了解决一个bug，必须在此处初始化value数组全部为false
					this.value.push(false);
				});
				this.goodsList = data.message;
			});
		}
	}
}
</script>

<style scoped lang="scss">
@import '../../../static/scss/global.scss';
	.row {
		display: flex;
		border-bottom: 1px solid #eee;
		.switch {
			flex: 1;
		}
		.pic-wrap {
			flex: 1;
			padding: 12px 12px 12px 0;
			.pic {
				width: 100%;
			}
		}
		.goods-info {
			flex: 4;
			.title {
				color: #0094ff;
			}
			.goods-operate {
				display: flex;
				justify-content: space-around;
				align-items: center;
				.price {
					color: #f00;
				}
				li:last-of-type {
					height: 33px;
					.delete {
						display: block;
						height: 100%;
						line-height: 33px;
						font-size: 14px;
					}
				}
			}
		}
	}
	.total {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20px;
		padding: 15px 0;
		background: #eee;
		.desc {
			
		}
		.to-pay {

		}
	}
</style>