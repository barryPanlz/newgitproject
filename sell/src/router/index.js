import Vue from 'vue'
import Router from 'vue-router' // 安装router
import Hello from '@/components/Hello'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
Vue.use(Router)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  }, {
    path: '/goods',
    name: 'goods',
    component: goods
  }, {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  }, {
    path: '/seller',
    name: 'seller',
    component: seller
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default new Router({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
})

