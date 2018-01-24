<template>
    <div>
        <!-- 1.1 图片详情 -->
		<div class="description">
			<div class="title-wrap">
				<h4 v-text="photoInfo.title" class="title"></h4>
				<p>
					{{photoInfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}} {{photoInfo.click}}次浏览
				</p>
				<p class="line"></p>
				<!--2.1 缩略图-->
				<div class="mui-content">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li v-for="(item, index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                            
							<img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, list)">
						</li>
					</ul>
				</div>

				<p v-html="photoInfo.content"></p>
			</div>
		</div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                id: 0,
                photoInfo: {}, // 图片详情
                list: [] // 缩略图
            }
        },
        created(){
            // console.log(this.$route.params);
            this.id = this.$route.params.id;
            // 1.3
            this.getImgs();
            // 2.3
            this.getThumbnails();
        },
        methods: {
            // 2.2 获取缩略图
            getThumbnails(){
                const url = '/api/getthumimages/' + this.id;
				this.$axios.get(url).then((response)=>{
                    let data = response.data;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					// 由于vue-preview组件要求的数据是{src:,w:,h:},但是服务器的数据没有w:,h:
					// 将正常的逻辑数据赋值给this.list数组
					data.message.forEach((item)=>{
						var img = document.createElement('img');
						img.src = item.src;
						img.onload = function(){
							item.w = img.width;
							item.h = img.height;
						};
						this.list = data.message;
					});
				});
            },
            // 1.2 获取图片详情数据
            getImgs(){
                const url = '/api/getimageInfo/' + this.id;
				this.$axios.get(url).then((response)=>{
                    let data = response.data;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.photoInfo = data.message[0];
				});
            }
        },
        activated() {
            console.log('deactivated');
            if (this.id !== this.$route.params.id){
                 this.$destroy();
            }
         }
    }
</script>

<style lang="scss" scoped>
    .description{
        padding: 10px;
        .title-wrap {
            .title {
                color: #0094ff;
            }
            p {
                color:rgba(0,0,0,0.4);
                margin-top: 10px;
            }
            .line {
                width: 100%;
                height: 1px;
                border-bottom: 1px solid rgba(0,0,0,0.4);
            }
        }
    }

    .mui-content,.mui-content ul{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right:0px;
        border-bottom:0px;
    }
    .mui-grid-view.mui-grid-9{
        border-top:0px;
        border-left:0px;
    }

</style>
