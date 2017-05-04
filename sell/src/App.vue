<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
	    <div class="tab border_1px">
	    	<div class="tab_item">
	    		<router-link to="/goods">商品</router-link>
		    </div>
		    <div class="tab_item">
		    	<router-link to="/ratings">评论</router-link>
		    </div>
		    <div class="tab_item">
		    	<router-link to="/seller">商家</router-link>
		    </div>
	    </div>
	    <!--路由外链-->
	    <!--传递seller数据-->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from './components/header/header'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {}
      }
    },
    // 钩子
    created () {
     // vue-resource获取数据请求
      this.$http.get('api/seller').then((response) => {
      // 获取接口数据（object格式）
        response = response.body
        if (response.errno === ERR_OK) {
        // 如果errno=0，则获取数据 然后将response.data赋值给data的seller
          this.seller = response.data
          console.log(response.data)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style>
 @import './common/stylus/style.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app .tab{
	display: flex;
	width: 100%;
	line-height:0.8rem ;
	height: 0.8rem;
	position: relative;
	
}
.tab:after{
	display: block;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	border-top:1px solid #2C3E50 ;
	content: '';
}
#app .tab .tab_item{
	flex: 1;
	text-align: center;
}
.tab_item a{
	display: block;
	color: rgb(77,85,93);
	font-size: 0.28rem;
}
.tab_item .active{
	color: rgb(240,20,20);
}
</style>
