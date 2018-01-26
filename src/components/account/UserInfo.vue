<template>
    <div class="layout">
        <div class="user-photo">
            <img src="" alt="">
        </div>
        <div class="mui-content-padded">
            <button class="mui-btn mui-btn-block mui-btn-primary" @click="logout">退出</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        //注销
        logout() {
            //删除sessionid并跳到登录页
            localStorage.removeItem('sessionid');

            // 模拟
            setTimeout(() => {
                this.$router.push('/login/');
            }, 1000)
        }
    }
}
</script>

<style scoped>
.user-photo {
    width: 80px;
    height: 80px;
    margin: 50px auto;
    border-radius: 50%;
    border: 4px solid #eee;
}
</style>