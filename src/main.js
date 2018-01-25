/**
 * 入口文件
 */
// vue核心包
import Vue from 'vue';
// 导入根组件
import App from './App.vue';
// 导入路由规则
import router from './router/router';
// 阻止 vue 在启动时的生产提示，一般默认就是false
Vue.config.productionTip = false;

// 导入rem适配包
// import 'lib-flexible';
import '../static/js/adapter.js';

// 导入fastclick，解决点击延迟问题
import FaskClick from 'fastclick';
FaskClick.attach(document.body);

// 导入公共全局样式
import '../static/css/base.css';
import '../static/css/site.css';

// 导入mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';

// 导入mui
import '../static/mui/css/mui.css';

// 导入axios请求库
import axios from 'axios';
Vue.prototype.$axios = axios;
// 设置接口根路径
// axios.defaults.baseURL = 'http://webhm.top:8899';
axios.defaults.baseURL = 'http://www.lovegf.cn:8899';
// axios.defaults.baseURL = 'http://182.254.146.100:8899';

// 导入axios的post请求参数序列化
import qs from 'qs';
Vue.prototype.$qs = qs;

// 导入moment.js日期格式化类库
import moment from 'moment';
// 定义日期格式化全局过滤器
Vue.filter('datefmt', function (input, fmtStr) {
    return moment(input).format(fmtStr);
});

// 使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);



new Vue({
    el: '#app',
    router,
    template: '<App/>',
    // components: { App } // 脚手架写法
    // render:function(create){create(App)} //es5的写法
    render: c => c(App)  // es6的函数写法
});
