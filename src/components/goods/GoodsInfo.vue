<template>
    <div>
    	<!-- 1.1 商品图片 -->
        <div class="img-wrap">
            <img :src="imgSrc" alt="">
        </div>
        
        <!-- 2.1 商品购买区 -->
        <div class="goods-buy">
			<h4 class="title" v-text="goodsInfo.title"></h4>
			<hr>
			<ul>
				<li class="price">
					市场价: <s>￥{{goodsInfo.market_price}}</s>
					销售价：<span>￥{{goodsInfo.sell_price}}</span>
				</li>
                <li class="input-li">
                	<!-- 5.1 输入数量组件 -->
					购买数量： <input-number @dataObj="getCount" class="input-number"></input-number>
					<!-- 6.1 加入购物车动画 -->
					<transition
						name="show"
						@before-enter="beforeEnter"
						@enter="enter"
						@after-enter="afterEnter">

						<div v-if="isShow" class="small-ball"></div>
					</transition>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<!-- 7.1 加入购物车 -->
					<mt-button type="danger" size="small" @click="toShopCar">加入购物车</mt-button>
				</li>
			</ul>
		</div>

		<div class="goods-params">
				<h5 class="title">商品参数</h5>
				<hr>
			<ul>
				<li>商品货号：{{goodsInfo.goods_no}}</li>
				<li>库存情况：{{goodsInfo.stock_quantity}}</li>
				<li>上架时间：{{goodsInfo.add_time | datefmt('YYYY-MM-DD')}}</li>
			</ul>
		</div>

		<div class="goods-other">
			<!--3.1 图文详情-->
			<router-link v-bind="{to:'/goods/goodsdesc/' + id}">
			    <mt-button class="img-desc" type="primary" size="large">图文详情</mt-button>
			</router-link>
			<!--4.1 商品评论-->
            <router-link v-bind="{to:'/goods/goodscomment/' + id}" class="comment-link">
                <mt-button type="danger" size="large" class="comment-button">商品评论</mt-button>
            </router-link>
		</div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import InputNumber from '../subcomponents/InputNumber.vue';
import { setItem, valueObj } from '../../tools/storage.js';
import { bus } from '../../tools/bus.js';
export default {
	components: {
		InputNumber
	},
    data() {
        return {
            id: 0,
            imgSrc: [],
            goodsInfo: {},
            inputNumberCount: 1,
            isShow: false // 控制小球显示隐藏
        }
    },
    created() {
        this.id = this.$route.params.id;
        // 1.3
        this.getImgs();
        // 2.3 
        this.getinfo();
    },
    methods: {
    	// 7.2
    	toShopCar(){
    		// 1.0触发事件
			bus.$emit('sendCount', this.inputNumberCount);
    		// 2.0 将数据保存到localStroage中
			valueObj.goodsId = this.id;
			valueObj.count = this.inputNumberCount;
			setItem(valueObj);
			// 3.0 小球动画
    		this.isShow = !this.isShow;
    	},
		// 6.2
		beforeEnter(ele){
			// 设置小球初始位置
			ele.style.transform = 'translate(0,0)';
		},
		enter(ele, done){
			// 保证小球出现动画
			ele.offsetWidth;
			// 设置小球结束位置
			ele.style.transform = 'translate(75px, 300px)';
			// 动画结束
			done();
		},

		afterEnter(ele){
			this.isShow = !this.isShow;
		},
    	// 5.2 获取子组件传递的商品数量
    	getCount(data){
    		console.info(data);
    		this.inputNumberCount = data;
    	},
    	// 1.2 获取商品图片
        getImgs() {
            const url = '/api/getthumimages/' + this.id;
            this.$axios.get(url).then((response) => {
                let data = response.data;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                let str = 'http://ofv795nmp.bkt.clouddn.com/';
                this.imgSrc = str + data.message[0].src;
                // console.info(this.imgSrc);
            });
        },
        // 2.2 获取商品信息
        getinfo(){
			const url = '/api/goods/getinfo/' + this.id;
			this.$axios.get(url).then((response)=>{
				let data = response.data;
				if(data.status != 0 ){
					Toast(data.message);
					return;
				}
				this.goodsInfo = data.message[0];
				console.info(this.goodsInfo);
			});
		}
    },
    activated() {
        console.log('activated');
        if (this.id !== this.$route.params.id) {
            this.$destroy();
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../../static/scss/global.scss';
	hr {
		margin: 5px;
	}
	ul {
		padding: 10px;
	}
	.img-wrap {
		width: 100%;
		height: rem(300);
		img {
			width: 100%;
			height: 100%;
		}
	}
	.goods-buy {
		.title {
			text-indent: 1em;
			line-height: 20px;
			color: #26a2ff;
		}
		.price {
			margin-bottom: 10px;
			s {
				margin-right: 5px;
			}
		}
	}
	.goods-params {
		.title {
			font-size: 16px;
			color: #3c3c3c;
			font-weight: 700;
			text-indent: 1em;
		}
	}
	.goods-other {

	}
	.comment-button {
		margin-top: 10px;
	}
	.input-li {
		position: relative;
		margin-bottom: 10px;
	}
	.input-number {
		display: inline-block;
	}
	.small-ball {
		z-index: 100;
		position: absolute;
		left:150px;
		top:10px;
		background-color: red;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		transition: all .6s ease;
	}
</style>