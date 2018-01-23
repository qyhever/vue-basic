<template>
	<div>
		<!-- 评论组件 -->
		<!-- 1.1 提交评论信息的静态结构 -->
		<div class="commit-comment">
			<h3>提交评论</h3>
			<p class="line"></p>
			<textarea placeholder="请输入评论内容" v-model="commentContent"></textarea>
			<mt-button type="primary" size="large" @click="submitComment">发表</mt-button>
		</div>

        <!-- 2.1 展示评论信息列表-->
		<div class="comment-list">
			<h3>评论列表</h3>
			<p class="line"></p>
			<div v-for="(item,index) in CommentList" :key="index">
				<div class="title">
					<span>第{{index + 1}}楼</span>
					<span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-text="item.content"></li>
				</ul>
			</div>
		</div>

        <!--3.1 获取更多按钮-->
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

	</div>
</template>

<script>
	import {Toast} from 'mint-ui';
	export default {
        props: {
            // 接受父组件传过来的id值
            receiveId : {
                type: String,
                required: true
            }
        },
		data() {
			return {
                commentContent: '', // 用户填写的评论内容
				pageIndex: 1,	// 获取评论信息的第几页数据
				CommentList: []

			};
		},
		created() {
            console.log(this.receiveId);
            // 2.3 调用获取评论信息的方法
            this.getCommentList(this.pageIndex);
		},
		methods: {
            // 3.2 加载更多
            getMore(){
                this.pageIndex++;
                console.log(this.pageIndex);
				// 调用获取评论信息的方法
				this.getCommentList(this.pageIndex);

            },
            // 2.2 获取评论信息列表
            getCommentList(pageIndex){
                pageIndex = pageIndex || 1; // pageIndex:代表的是当前获取的是哪一页的数据，默认值是1
                // const url = '/api/getcomments/' + this.receiveId + '?pageIndex=' + pageIndex;
                const url = '/api/getcomments/' + this.receiveId;
                this.$axios.get(url,{
                    params: {pageIndex: pageIndex}
                }).then((response)=> {
                    // console.log(response);
                    let data = response.data;
                    if (data.status != 0) {
                        // Toast(data.message);
                        Toast('服务器故障，请稍后再试');
                        return;
                    }
                    this.CommentList = this.CommentList.concat(data.message);
                });

            },
            // 1.2 点击发表提交评论内容
			submitComment(){
                if(this.commentContent.trim().length <= 0){
					Toast('评论内容不能为空');
					return;
				}
				const url = '/api/postcomment/' + this.receiveId;
				// 发送post请求，使用qs库进行序列化
				this.$axios.post(url,this.$qs.stringify({content: this.commentContent})).then((response)=>{
                    // console.log(response);
                    let data = response.data;
					Toast(data.message);
					// 4.0 将最新的评论立刻渲染到列表最前面
					/*this.CommentList = [{
						user_name: '匿名用户',
						add_time: new Date(),
						content: this.commentContent
                    }].concat(this.CommentList);*/
                    
					this.CommentList.unshift({
						user_name: '匿名用户',
						add_time: new Date(),
						content: this.commentContent
                    });

                    // 清空文本框中输入的内容
					this.commentContent = '';
				});

            }
		}
	};
</script>

<style scoped lang="scss">
	/* 1.0 提交评论样式 */
    .commit-comment {
        padding: 5px;
        .line{
            height: 1px;
            width: 100%;
            border-bottom: 1px solid rgba(0,0,0,0.3);
        }
    }
    /*2.0 评论列表的样式*/
    .comment-list {
        padding: 5px;
        .title {
            padding: 5px;
            color: #6d6d72;
            font-size: 15px;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
</style>