/*
 * @Author: Quinn
 * @Date: 2021-03-26 14:41:20
 * @LastEditTime: 2021-03-29 13:48:26
 * @LastEditors: quinn
 * @Description:  
 */
// CSS resets 样式重置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './utils/gyq'

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');