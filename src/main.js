import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入图标样式
import './assets/fonts/iconfont.css'
// 导入全局CSS样式
import './assets/css/global.css'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')