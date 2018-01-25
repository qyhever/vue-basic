<template>
	<div>
		<v-comment :receive-id="id"></v-comment>
	</div>
</template>

<script>
import VComment from '../subcomponents/Comment.vue';
export default {
	components: {
		VComment
	},
	data(){
		return {
			id: 0
		}
	},
	created(){
		this.id = this.$route.params.id;
		console.info(this.id);
	}
}
</script>

<style scoped>
	
</style>