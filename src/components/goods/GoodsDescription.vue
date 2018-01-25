<template>
    <div>
        <h4 v-text="goodsDesc.title"></h4>
        <hr>
        <p v-html="goodsDesc.content"></p>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            id: 0,
            goodsDesc: {}
        }
    },
    created() {
        this.id = this.$route.params.id;
        console.info(this.id);
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc() {
            const url = '/api/goods/getdesc/' + this.id;
            this.$axios.get(url).then((response) => {
                let data = response.data;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.goodsDesc = data.message[0];
                console.info(this.goodsDesc);
            });
        }
    }
}
</script>
<style scoped>
	h4 {
	    color: #26a2ff;
	    text-indent: 1em;
	}
</style>