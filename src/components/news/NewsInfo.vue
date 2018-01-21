<template>
	<div>
		<div class="info">{{id}}</div>
	</div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      id: 0
    };
  },
  created() {
      this.id = this.$route.params.id;
      console.log(this.id)
  },
  methods: {
    
  }
};
</script>

<style scoped>
	.info {
        width: 300px;
        height: 300px;
    }
</style>