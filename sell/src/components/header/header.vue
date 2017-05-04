<template>
	<div class="header">
		<div class="content_wrapper">
			<div class="avatar">
				<img :src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="descriotion">
					{{seller.description}}/{{seller.deliveryTime}}送达
				</div>
				<!--如果没有supports，则不显示-->
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support_count" @click="showDetail">
		        <span class="count">{{seller.supports.length}}个</span>
		        <i class="icon-keyboard_arrow_right"></i>
		    </div>
		</div>
		<div class="bulletin_wrapper" @click="showDetail">
			<span class="bul_icon"></span>
			<span class="bul_conten">{{seller.bulletin}}</span>
			<span class="bul_jiantou">
				<i class="icon-keyboard_arrow_right"></i>
			</span>
		</div>
		<div class="backg">
			<img :src="seller.avatar" width="100%" height="100%"/>
		</div>
		<div v-show="detailShow" class="detail">
			 <div class="detail_wrapper cleafix" >
			 	<div class="detail_main">
			 		<h1 class="name1">{{seller.name}}</h1>
			 		<div class="star_wrapper">
			 			<star :size="48" :score="seller.score"></star>
			 		</div>
			 		<div class="he_title">
			 			<div class="line"></div>
			 			<div class="text1">
			 				优惠信息
			 			</div>
			 			<div class="line"></div>
			 		</div>
			 		<ul v-if="seller.supports" class="supports">
			 			<li class="suppot_item" v-for="(item,index) in seller.supports">
			 				<span class="icon" :class="classMap[seller.supports[index].type]"></span>
			 				<span class="text2">{{seller.supports[index].description}}</span>
			 			</li>
			 		</ul>
			 		<div class="he_title">
			 			<div class="line"></div>
			 			<div class="text1">
			 				商家公告
			 			</div>
			 			<div class="line"></div>
			 		</div>
			 		<div class="bulletin">
		              <p class="content1">{{seller.bulletin}}</p>
		            </div>
			 	</div>
			 </div>
			 <div class="detail_close">
			 	<i @click="hideDetail" class="icon-close"></i>
			 </div>
		</div>
	</div>
</template>

<script>
  import star from '../star/star'
  export default {
  	props: {
  		seller: {
  			type: Object
  		}
  	},
  	data () {
  		return {
  			detailShow: false
  		}
  	},
  	methods: {
  		showDetail () {
  			this.detailShow = true
       },
        hideDetail () {
  			this.detailShow = false
       }
  	},
  	created () {
  		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  	},
  	components: {
  		star
  	}
  }
</script>
<style type="text/css">
	.header{
		color: #ffffff;
		background-color:rgba(7,17,27,0.2) ;
		position: relative;
	}
	.content_wrapper{
		padding: 0.48rem 0.24rem 0.36rem 0.48rem;
		font-size: 0;
		overflow: hidden;
		position: relative;
	}
	.avatar{
		float: left;
	}
	.avatar>img{
		width: 1.28rem;
		height: 1.28rem;
	}
	.content{
		float: left;
		margin-left:0.32rem ;
		font-size: 0.28rem;
	}
	.title{
		margin: 0.04rem 0 0.16rem 0;
		font-size:0 ;
		overflow: hidden;
	}
	.brand{
		float: left;
		width: 0.6rem;
		height: 0.36rem;
		background: url(brand@3x.png) no-repeat;
		background-size:0.6rem 0.36rem ;
	}
	.name{
		float: left;
		font-size: 0.32rem;
		color: rgb(255,255,255);
		font-weight:bold ;
		margin-left:0.12rem ;
		margin-top:0.04rem ;
	}
	.descriotion{
		text-align: left;
		width: 100%;
		font-size: 0.24rem;
		color: rgb(255,255,255);
		font-weight: 200;
		margin-top:0.16rem ;
	}
	.support{
		width: 100%;
		margin-top:0.2rem ;
	}
	.icon{
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		float: left;
		
	}
	.text{
		font-size: 0.2rem;
		float: left;
		margin-top:0.02rem ;
		margin-left:0.08rem ;
	}
	.decrease{
		background: url(decrease_1@3x.png) no-repeat;
		background-size:0.24rem 0.24rem ;
	}
	.discount{
		background: url(discount_1@3x.png) no-repeat;
		background-size:0.24rem 0.24rem  ;
	}
	.invoice{
		background: url(invoice_1@3x.png) no-repeat;
		background-size:0.24rem 0.24rem  ;
	}
	.special{
		background: url(special_1@3x.png) no-repeat;
		background-size:0.24rem 0.24rem  ;
	}
	.guarantee{
		background: url(guarantee_1@3x.png) no-repeat;
		background-size:0.24rem 0.24rem  ;
	}
	.bulletin_wrapper{
		padding: 0.16rem 0.24rem;
		font-size: 0;
		overflow: hidden;
		position: relative;
		background-color:rgba(7,17,27,0.2) ;
	}
	.bul_icon{
		display: inline-block;
		width: 0.44rem;
		height: 0.24rem;
		background: url(bulletin@3x.png) no-repeat;
		background-size:0.44rem 0.24rem;
		float: left;
		
	}
	.bul_conten{
		margin: 0 0.08rem;
		color: rgb(255,255,255);
		font-size: 0.2rem;
		font-weight: 200;
		width: 87%;
		display:block;
		white-space:nowrap;
		overflow:hidden; 
		text-overflow:ellipsis;
		float: left;
	}
	.bul_jiantou{
		position: absolute;
		font-size: 0.2rem;
		right: 0.2rem;
		top: 0.16rem;
	}
	.backg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(0.1rem);
	}
	.support_count{
		position: absolute;
		bottom: 0.3rem;
		right: 0.24rem;
		width: 0.86rem;
		height: 0.48rem;
		background: rgba(0,0,0,0.2);
		font-size: 0px;
		line-height: 0.48rem;
		border-radius:25px ;
	}
	.support_count i{
		font-size: 0.24rem;
		margin-left:0.04rem ;
	}
	.count{
		font-size: 0.24rem;
		margin-left:0.12rem ;
	}
	.detail{
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(7,17,27,0.8);
		overflow: auto;
	}
	.detail_wrapper{
		width: 100%;
		min-height: 100%;
	}
	.detail_main{
		margin-top: 1.28rem;
		padding-bottom:1.28rem ;
	}
	.detail_close{
		position: relative;
		width: 0.64rem;
		height: 0.64rem;
		margin: -1.28rem auto 0 auto;
		clear: both;
		font-size: 0.64rem;
	}
	.detail_main .name1{
		width: 100%;
		line-height: 0.32rem;
		text-align: center;
		font-size: 0.32rem;
		font-weight: 700;
	}
	.star_wrapper{
		margin-top:0.36rem ;
		padding: 0.04rem 0;
		text-align: center;
	}
	.he_title{
		width: 80%;
		margin: 0.56rem auto 0.48rem auto;
		display: flex;
	}
	.he_title .line{
		flex: 1;
		position: relative;
		top: -0.12rem;
		border-bottom: 1px solid rgba(255,255,255,0.2);
		
	}
	.he_title .text1{
		padding: 0 0.24rem;
		font-size: 0.28rem;
		font-weight: 700;
		
	}
	.supports{
		width: 80%;
		margin: 0 auto;
		
	}
	.suppot_item{
		padding: 0 0.24rem;
		margin-bottom:0.24rem ;
		font-size: 0;
		overflow: hidden;
	}
	.supports_item:last-child{
		margin-bottom:0 ;
	}
	.icon{
		width: 0.32rem;
		height: 0.32rem;
		margin-right:0.12rem ;
		background-size:0.32rem 0.32rem;
		background-repeat:no-repeat ;
		float: left;
	}
	.text2{
		line-height: 0.24rem;
		font-size: 0.24rem;
		float: left;
	}
	.bulletin{
		width: 80%;
		margin: 0 auto;
		padding: 0 0.24rem;
		font-size: 0;
		overflow: hidden;
	}
	.bulletin .content1{
		font-size: 0.24rem;
		font-weight: 200;
		line-height: 0.48rem;
		color: #FFFFFF;		
	}
</style>
