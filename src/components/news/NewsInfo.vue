<template>
	<div>
		<div class="info-wrap">
			<div class="title">
				<h4 v-text="info.title"></h4>
				<p>{{info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
			</div>
			<div id="content" v-html="info.content"></div>
			<!-- 发表评论，子组件 -->
			<v-comment :receive-id="id"></v-comment>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui';
	import VComment from '../subcomponents/comment.vue';
	export default {
		components: {
			VComment
		},
		data() {
			return {
				id: 0,
				info: {}
			};
		},
		created() {
			this.id = this.$route.params.id;
			console.log(this.id);
			this.getNewsInfo();
		},
		methods: {
			getNewsInfo(){
				const url = '/api/getnew/' + this.id;
				this.$axios.get(url).then((response)=>{
					let data = response.data;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.info = data.message[0];
				});
			}
		},
		activated() {
            console.log('activated');
            if (this.id !== this.$route.params.id){
                 this.$destroy();
            }
        }
	};
</script>

<style scoped>
	.info-wrap {
		margin: 10px;
		padding: 10px;
		box-shadow: 0px 0px 4px #000;
    	border-radius: 6px;
	}
	.title h4 {
		color: #0094ff;
	}
	.title p {
		color: rgba(0,0,0.5);
	}
	#content {
		padding: 5px;
	}
</style>