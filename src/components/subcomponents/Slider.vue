<template>
	<div>
		<mt-swipe :auto="2000">
			<mt-swipe-item>
				<img src="../../../static/images/slider01.jpg"alt="">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/slider02.jpg"alt="">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/slider03.jpg"alt="">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/slider04.jpg"alt="">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/slider05.jpg"alt="">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="scss">
	 @import '../../../static/scss/global.scss';
	.mint-swipe {
		height: rem(300);
		.mint-swipe-item {
			height: rem(300);
			img {
				width: 100%;
				height: 100%;
			}
		}
	} 
</style>