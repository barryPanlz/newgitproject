<template>
	<div class="goods">
		<div class="menu_wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu_item" :class="{'current': currentIndex === index}" @click="selerMenu(index, $event)">
					<span class="menu_text">
						<span v-show="item.type > 0" class="menu_icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods_wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food_list" ref="foodList" >
					<h1 class="food_list_tile">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food_item border_1px">
							<div class="food_item_icon">
								<img :src="food.icon" alt="" />
							</div>
							<div class="food_itemcontent">
								<h2 class="food_item_name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}</span>
								</div>
								<div class="price">
									<span><em>￥</em>{{food.price}}</span>
									<del v-show="food.oldPrice">￥{{food.oldPrice}}</del>
								</div>
								<div class="cartcontrol_wrapper">
									<cartcontrol @add="addFood" :food="food"></cartcontrol>
								</div>
							</div>

						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!--传递delivery-price、min-price-->
		<shopcart ref="shopcart" :sellectFoods="sellectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>

</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  const ERR_OK = 0
  export default {
  	data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
	computed: {
		// 获取listHeight数组里面的高度，然后判断区间返回i值（索引）
		currentIndex () {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i]
				let height2 = this.listHeight[i + 1]
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i
				}
			}
			return 0
		},
		sellectFoods () {
			let foods = []
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
  	props: {
  		seller: {
  			type: Object
  		}
  	},
  	created () {
  		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		this.$http.get('api/goods').then((response) => {
			response = response.body
			if (response.errno === ERR_OK) {
				this.goods = response.data
//				console.log(this.goods)
				// 异步请求数据操作之后，相当于添加一个未来事件$nextTick
				this.$nextTick(() => {
					this._initScroll()
					this._calculateHeight()
				})
			}
		})
   },
	components: {
		shopcart,
		cartcontrol
	},
	methods: {
		// 通过点击左侧li值获取的index 然后通过scrollToElement方法跳转到对应右侧 foodList[index]；
		selerMenu (index, event) {
			if (!event._constructed) {
				return
			}
			let foodList = this.$refs.foodList
			let el = foodList[index]
			this.foodsScroll.scrollToElement(el, 300)
//			console.log(index)
		},
		// 注册BScroll 获取滚动的pos(x,y),并传递给scrollY（绝对值）
		_initScroll () {
			this.meunScroll = new BScroll(this.$refs.menuWrapper, {
				click: true
			})
			this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
				click: true,
				probeType: 3
			})
			this.foodsScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))
//				console.log(pos)
			})
		},
		// 获取每个高度范围，传入数组listHeight
		_calculateHeight () {
			let foodList = this.$refs.foodList
			let height = 0
//			console.log(foodList)
			this.listHeight.push(height)
			for (let i = 0; i < foodList.length; i++) {
				let item = foodList[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		},
		addFood (target) {
			this._drop(target)
		},
		_drop (target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
	}
  }
</script>
<style type="text/css">
	.goods{
		position: absolute;
		width: 100%;
		top: 3.51rem;
		bottom: 0.92rem;
		display: flex;
		overflow: hidden;
	}
	.goods .menu_wrapper{
		flex: 0 0 1.6rem;
		width: 1.6rem;
		background: #f3f5f7;
	}
	.menu_item{
		display: table;
		height: 1.08rem;
		width: 1.12rem;
		line-height: 0.28rem;
		font-size: 0.24rem;
		padding:0 0.24rem ;
		position: relative;

	}
	.menu_item:after{
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top:1px solid #2C3E50 ;
		border-color: rgba(7,17,27,0.1);
		content: '';
		}
	.menu_icon{
		width: 0.24rem;
	    height: 0.24rem;
	    margin-right: 0.04rem;
	    background-size: 0.24rem 0.24rem;
	    background-repeat: no-repeat;
	    float: left;
	}
	.menu_text{
		font-size: .24rem;
		width: 1.12rem;
		display: table-cell;
		vertical-align: middle;
	}
	
	.current{
		position: relative;
		margin-top:-1px ;
		background: #FFFFFF;
		font-weight: 700;
	}
	.current .text{
		color: #F01414;
	}
	
	
	
	.foods_wrapper{
		flex: 1;
	}
	.food_list{

	}
	.food_list_tile{
		padding-left:0.28rem ;
		height: 0.52rem;
		line-height: 0.52rem;
		border-left:0.04rem solid #d9ddel ;
		font-size: 0.24rem;
		color: rgb(147,153,159);
		background:#f3f5f7;
	}
	.food_item{
		display: flex;
		margin: 0.36rem;
	}
	.food_item:after{
		border-color:rgba(7,17,27,0.1) ;
	}
	.food_item_icon{
		flex: 0 0 1.14rem;
		width: 1.14rem;
		height: 1.14rem;
	}
	.food_item_icon img{
		width: 100%;
		height: 100%;
	}
	.food_itemcontent{
		flex: 1;
		margin-left:0.2rem ;
	}
	.food_itemcontent .food_item_name{
		margin-top: 0.04rem;
		height: 0.28rem;
		line-height: 0.28rem;
		font-size: 0.28rem;
		color: rgb(7,17,27);
	}
	.food_itemcontent .desc{
		margin-top:0.16rem ;
		font-size: 0.2rem;
		line-height: 0.2rem;
		height: 0.2rem;
		color: rgb(147,153,159);
	}
	.extra{
		margin-top:0.16rem ;
		font-size: 0;
	}
	.extra span{
		font-size: 0.2rem;
		line-height: 0.2rem;
		height: 0.2rem;
		color: rgb(147,153,159);
		margin-right:0.24rem ;
	}
	.price{
		font-size: 0;
	}
	.price span{
		font-size: 0.28rem;
		line-height: 0.48rem;
		height: 0.48rem;
		color: #f01414;
	}
	.price span em{
		font-style: normal;
		font-size: 0.2rem;
	}
	.price del{
		font-size: 0.2rem;
		line-height: 0.48rem;
		height: 0.48rem;
		color: rgb(147,153,159);
		font-weight:700 ;
		margin-left:0.16rem ;
	}
	.cartcontrol_wrapper{
		position: absolute;
		right: 0rem;
		bottom: 0.06rem;
	}
</style>
