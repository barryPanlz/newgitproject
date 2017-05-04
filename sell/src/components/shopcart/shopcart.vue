<template>
	<div class="shopcart" @click="toggleList">
		<div class="car_content">
			<div class="car_content_left">
				<div class="car_logo_wrapp">
					<!--如果totalCount>0 则添加.heighlight-->
					<div class="car_logo" :class="{'heighlight':totalCount>0}">
						<span class="icon-shopping_cart"></span>
						
					</div>
					<div class="car_car_logo_number" v-show='totalPrice>0'>
						{{totalCount}}
					</div>
				</div>
				<div class="car_price" :class="{'heighlight1':totalPrice>0}">
					￥{{totalPrice}}
				</div>
				<div class="car_desc">
					还需配送费￥{{deliveruPrice}} 元
				</div>
			</div>
			<div class="content_right">
				<div class="pay" :class="payClass">
          			{{payDesc}}
        		</div>
			</div>
		</div>	
		<div class="ball-container">
	        <div v-for="ball in balls">
	          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
	          	<div class="ball" v-show="ball.show">
	              <div class="inner inner-hook"></div>
	            </div>
	          </transition>
	        </div>
	    </div>
	    <transition name="fold">
		    <div class="shopcart_list" v-show="listShow">
		    	<div class="list_header">
		    		<h1 class="list_title">购物车</h1>
		    		<span class="empty">清空</span>
		    	</div>
		    	<div class="list_content" ref="listContent">
		    		<ul>
		    			<li class="food" v-for="food in sellectFoods">
		    				<span class="list_name">{{food.name}}</span>
		    				<div class="list_price">
		    					<span>￥{{food.price*food.count}}</span>
		    				</div>
		    				<div class="cartcontrol_wrapper">
		    					<cartcontrol :food="food"></cartcontrol>
		    					
		    				</div>
		    			</li>
		    		</ul>
		    		
		    	</div>
		    	
		    </div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol'
	export default {
		// 接收deliveruPrice、minPrice
		props: {
			sellectFoods: {
				type: Array,
				default () {
					return [
						{
							price: 10,
							count: 2
						}
					]
				}
			},
			deliveruPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: [],
				fold: true
			}
		},
		// 计算属性
		computed: {
			// 计算totalPrice中单价*数量的总和
			totalPrice () {
				let total = 0
				this.sellectFoods.forEach((food) => {
					total += food.price * food.count
				})
				return total
			},
			// 计算totalPrice中数量的总和
			totalCount () {
				let count = 0
				this.sellectFoods.forEach((food) => {
					count += food.count
				})
				return count
			},
			payDesc () {
//				console.log(this.totalPrice)
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}元起送`
				} else {
					return '去结算'
				}
			},
			payClass () {
				if (this.totalPrice < this.minPrice) {
					return 'not_enough'
				} else {
					return 'enough'
				}
			},
			listShow () {
				// 等于0
				if (!this.totalCount) {
					this.fold = true
					return false
				}
				let show = !this.fold
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return show
			}
		},
		components: {
			cartcontrol
		},
		methods: {
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i]
					if (!ball.show) {
						ball.show = true
						ball.el = el
						this.dropBalls.push(ball)
						return
					}
				}
			},
			beforeDrop (el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect()
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 22)
						el.style.display = ''
						el.style.webkitTransform = `translate3d(0,${y}px,0)`
						el.style.transform = `translate3d(0,${y}px,0)`
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`
						inner.style.transform = `translate3d(${x}px,0,0)`
					}
				}
			},
			dropping (el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)'
					el.style.transform = 'translate3d(0,0,0)'
					let inner = el.getElementsByClassName('inner-hook')[0]
					inner.style.webkitTransform = 'translate3d(0,0,0)'
					inner.style.tranform = 'translate3d(0,0,0)'
					el.addEventListener('transitionend', done)
				})
			},
			afterDrop (el) {
				let ball = this.dropBalls.shift()
				console.log(ball)
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			},
			toggleList () {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			}
		}
	}
</script>

<style>
	.shopcart{
		position: fixed;
	    left: 0;
	    bottom: 0;
	    z-index: 50;
	    width: 100%;
	}
	.car_content{
		display: flex;
	    background: #141d27;
	    font-size: 0;
	    height: 0.96rem;
	    color: rgba(255,255,255,0.4);	
	}
	.car_content_left{
		flex: 1;
	}
	.car_logo_wrapp{
		display: inline-block;
	    vertical-align: top;
	    position: relative;
	    top: -0.1rem;
	    margin: 0 0.24rem;
	    padding: 0.12rem;
	    width: 1.12rem;
	    height: 1.12rem;
	    box-sizing: border-box;
	    border-radius: 50%;
	    background: #141d27;
	    font-size: 0.2rem;
	}
	.car_logo{
		width: 100%;
	    height: 100%;
	    border-radius: 50%;
	    text-align: center;
	    background: #2b343c;
	}
	.car_logo>span{
		line-height: 0.88rem;
	    font-size: 0.48rem;
	    color: #80858a;
	}
	.heighlight{
		background: rgb(0,460,220);
	}
	.heighlight>span{
		color: #FFFFFF;
	}
	.car_car_logo_number{
		position: absolute;
		top: 0;
		right: 0;
		width: 0.48rem;
		height: 0.32rem;
		line-height: 0.32rem;
		text-align: center;
		font-size: 0.18rem;
		font-weight: 900;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow:0px 4px 8px 0 rgba(0,0,0,0.4);
		border-radius:16px;
	}
	.car_price{
		display: inline-block;
	    vertical-align: top;
	    margin-top: 0.24rem;
	    line-height: 0.48rem;
	    padding-right: 0.24rem;
	    box-sizing: border-box;
	    border-right: 1px solid rgba(255,255,255,0.1);
	    font-size: 0.32rem;
	    font-weight: 700;
	}
	.heighlight1{
		color: #FFFFFF;
	}
	.car_desc{
	 	    display: inline-block;
		    vertical-align: top;
		    margin-top:0.24rem ;
		    line-height: 0.48rem;
		    font-size: 0.16rem;
	} 
	.content_right{
		flex: 0 0 2.1rem;
    	width: 2.1rem;
	}
	.content_right .pay{
		height: 0.96rem;
	    line-height: 0.96rem;
	    text-align: center;
	    font-size: 0.24rem;
	    font-weight: 700;
	    background: #2b333b;
	}  
	.content_right .not_enough {
		background: #2b333b;
	} 
	.content_right .enough {
		background: #00b43c;
		color: #FFFFFF;
	}  
	/**/
	.ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}  
	.ball .inner{
		width: 16px;
	    height: 16px;
	    border-radius: 50%;
	    background: rgb(0, 160, 220);
	    transition: all 0.4s linear;
	}
      /*ss*/    
    .shopcart_list{
    	position: absolute;
    	top: 0;
    	left: 0;
    	z-index: -1;
    	width: 100%;
    	transform: translate3d(0, -100%, 0);
    }
    .shopcart_list .fold-enter-active, .shopcart_list .fold-leave-active{
    	transition: all 0.5s;
    }
    .shopcart_list .fold-enter, .shopcart_list .fold-leave-active{
    	transform: translate3d(0, 0, 0);
    }
    .list_header{
    	height: 0.8rem;
    	line-height: 0.8rem;
    	padding: 0 0.36rem;
    	background: #F3F5F7;
    	border-bottom:1px solid rgba(7,17,27,0.1) ;
    }  
    .list_title{
    	float: left;
    	font-size: 0.28rem;
    	color: rgb(7, 17, 27);
    }
    .empty{
    	float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
    }
    .list_content{
    	padding: 0 0.36rem;
    	max-height: 4.24rem;
    	background: #FFFFFF;
    	overflow: hidden;
    }
    .list_content .food{
    	position: relative;
    	padding-bottom:0.24rem;
    	box-sizing: border-box;
    	border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .list_content .list_name{
    	font-size: 0.28rem;
    	color: rgb(7,17,27);
    }
    .list_content .list_price{
    	position: absolute;
	    right: 1.8rem;
	    bottom: 0.24rem;
	    line-height: 0.48rem;
	    font-size: 0.28rem;
	    font-weight: 700;
	    color: rgb(240, 20, 20);
    }
    .list_content .cartcontrol_wrapper{
    	position: absolute;
        right: 0;
        bottom: 0.18rem;
    }
            
</style>
