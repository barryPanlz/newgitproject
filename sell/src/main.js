// The Vue build version to load with the `import` command
// 这个vue创建版本加载的是你 “inport”命令的
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// (runtime-only or standalone) 已经设置在webpack .base.conf
import Vue from 'vue'
import App from './App'
// 引入router的文件夹
import router from './router'
// 引入resource的文件夹
import resource from './resource'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
// 注册router文件
  router: router,
// 注册resource文件
  resource,
  template: '<App/>',
  components: { App }
})
