<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="crat_decrease" @click.stop="decreaseCart" v-show="food.count>0" transition="move" >
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart_count" v-show="food.count>0">
			{{food.count}}
		</div>
		<div class="cart_add" @click.stop="addCart">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart (event) {
				if (!event._constructed) {
					return
				}
//				console.log('click')
				if (!this.food.count) {
//					this.food.count = 1
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count ++
				}
				this.$emit('add', event.target)
			},
			decreaseCart (event) {
				if (!event._constructed) {
					return
				}
				if (this.food.count) {
					this.food.count --
				}
			}
		}
	}
</script>

<style>
	.cartcontrol{
		font-size: 0;
	}
	.crat_decrease, .cart_add{
		display: inline-block;
		font-size: 0.24rem;
		line-height: 0.24rem;
		padding: 0.12rem;
		color: rgb(0,160,220);
	}
	.cart_count{
		display: inline-block;
	    vertical-align: top;
	    width: 0.24rem;
	    height: 0.48rem;
	    line-height: 0.48rem;
	    text-align: center;
	    font-size: 10px;
	    color: #93999f;
	}
	.crat_decrease{
		transition: all 0.4s linear;
		transform: translate3D(0,0,0);
	}
	.move-transition{
		opacity: 1;
		transform: translate3D(0,0,0);
	}
	.move-enter-active, .move-leave-active{
		 transition: all 0.4s linear;
	}
       
	.move-enter, .move-leave-active{
		opacity: 0;
		transform: translate3D(0.48rem,0,0);
	}
	.inner{
		display: inline-block;
		transition: all 0.4s linear;
		transform: rotate(0)
	}
	.move-enter .inner{
		transform: rotate(360deg)
	}
	.move-leave-active .inner{
		transform: rotate(360deg)
	}
</style>
