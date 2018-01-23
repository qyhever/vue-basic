<template>
	<div>
		<!-- 1.1 图片分类 -->
		<div class="category" ref="category-wrap">
			<ul v-bind="{style: 'width:' + ulWidth + 'px'}">
				<li>全部</li>
				<li v-for="(item,index) in categoryList" :key="index" v-text="item.title" @click="getImages(item.id)"></li>
			</ul>
		</div>

		<!-- 2.1 图片列表 -->
		<div id="imglist">
			<ul>
				<li v-for="(item,index) in imgList" :key="index">
					<!-- <router-link v-bind="{to: '/photo/photoinfo/'+item.id}"> -->
					<a href="javascript:;">
						<!-- <img v-lazy="item.img_url"> -->
						<img src="../../../static/images/slider02.jpg">
						<div id="desc">
							<h5 v-text="item.title"></h5>
							<p v-text="item.zhaiyao"></p>
						</div>
					</a>
					<!-- </router-link> -->
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
	data(){
		return {
			ulWidth: 320,
			categoryList: [],
			imgList: []
		}
	},
	created(){
		// 1.3
		this.getCategoryList();
		// 2.3
		this.getImages();
	},
	mounted(){

	},
	methods: {
		// 2.2 获取图片列表
		getImages(id){
			// console.log(id);
			id = id || 0;
			const url = '/api/getimages/' + id;
			this.$axios.get(url).then((response)=>{
				let data = response.data;
				if(data.status != 0){
					Toast(data.message);
					return;
				}
				this.imgList = data.message;
			});
		},
		// 1.2 加载图片分类数据
		getCategoryList(){
			const url = '/api/getimgcategory';
			this.$axios.get(url).then(response=>{
				let data = response.data;
				console.log(data)
				if(data.status != 0){
					Toast(data.message);
					return;
				}
				this.categoryList = data.message;
				var liWidth = 60;
				var count = data.message.length + 1;
				this.ulWidth = liWidth * count;

				this.$nextTick(()=>{
					this._initScroll();
				});
			});
		},
		// 1.4 better-scroll初始化
		_initScroll(){
            this.cateScroll = new BScroll(this.$refs['category-wrap'],{
				// click: true,
				eventPassthrough: 'vertical',
				scrollX: true,
				scrollY: false,
				preventDefault: false
            });
        },
	}
}
</script>

<style scoped lang="scss">

	/* 1.0 图片分类 */
	.category {
		background: #eee;
		border-bottom: 1px solid #ccc;
		overflow: hidden;
		ul {
			background: #fff;
			font-size: 0;
			li {
				display: inline-block;
				width: 60px;
				line-height: 26px;
				text-align: center;
				font-size: 12px;
			}
		}
	}

		/*实现图片列表样式*/
	#imglist{

	}
	#imglist ul {
		padding-left: 0px;
	}
	#imglist li{
		list-style:none;
		position: relative ;
	}
	#imglist img{
		width:100%;
		height: 150px;
	}

	#desc{
		width: 100%;
		background-color: rgba(0,0,0,0.2);
		position: absolute;
		bottom: 2px;
		left: 0px;
	}

	#desc h5{
		color: #ffffff;
		font-weight: bold;
	}
	#desc p{
		color:#fff;
	}

	image[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
	}

</style>