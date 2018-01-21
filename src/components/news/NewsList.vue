<template>
	<div>
		<!-- 使用mui的media-list组件实现图文列表 -->
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">
					<img class="mui-media-object mui-pull-left" src="../../assets/logo.png">
					<div class="mui-media-body">
						CBD
						<p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
					</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a class='mui-navigate-right' href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../../assets/logo.png">
					<div class="mui-media-body">
						远眺
						<p class='mui-ellipsis'>静静的看这个世界，最后终于疯了</p>
					</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">
					<img class="mui-media-object mui-pull-left" src="../../assets/logo.png">
					<div class="mui-media-body">
						幸福
						<p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
					</div>
				</a>
			</li>
		
			<li class="mui-table-view-cell mui-media" v-for="(item,index) in list" :key="index">
				<router-link class="mui-navigate-right" v-bind="{to:'/news/newsinfo/'+item.id}">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<p class="title">{{item.title}}</p>
						<p class='mui-ellipsis' v-text="item.zhaiyao"></p>
						<div class="ft">
							<span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
							<span class="click">点击数：{{item.click}}</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
	  this.getNewList();
  },
  methods: {
    // 获取新闻列表数据
    getNewList() {
		// const url = 'http://www.lovegf.cn:8899/api/getnewslist';
		const url = '/api/getnewslist';
		this.$axios.get(url).then((res)=>{
			let data = res.data;
			if(data.status != 0){
				Toast(data.message);
				return;
			}
			this.list = data.message;
		});
	}
  }
};
</script>

<style scoped>
	.title, .ft {
		white-space: nowrap;      /* 1. 强制一行内显示文本 */
        overflow: hidden;         /* 2. 文字超出隐藏 */
        text-overflow: ellipsis; /*  3. 文字显示不开用省略号替代 */

	}
</style>