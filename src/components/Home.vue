<template>
	<div>
		<!-- 1.1使用slider轮播图组件 -->
		<slider></slider>

		<div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/feedback">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/video">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/callme">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </router-link>
                </li>
            </ul>
        </div>

	</div>
</template>

<script>
// 1.0 引入slider组件
import slider from '../components/subcom/Slider.vue';
export default {
	components: { slider },
	created(){

	}
}
</script>

<style scoped lang="scss">
.mui-content,
.mui-content ul {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0px;
    border-bottom: 0px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 {
    border-top: 0px;
    border-left: 0px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: round;
}

.mui-icon-home:before {
    background-image: url(../../static/images/1.png);
}

.mui-icon-email:before {
    background-image: url(../../static/images/2.png);
}

.mui-icon-chatbubble:before {
    background-image: url(../../static/images/3.png);
}

.mui-icon-location:before {
    background-image: url(../../static/images/4.png);
}

.mui-icon-search:before {
    background-image: url(../../static/images/5.png);
}

.mui-icon-phone:before {
    background-image: url(../../static/images/6.png);
}
</style>