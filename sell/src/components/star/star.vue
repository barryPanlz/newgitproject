<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" class="star_item" :class="itemClass"></span>
	</div>
</template>
<script type="text/ecmascript-6">
  const olenth = 5
  const clsOn = 'on'
  const clsHalf = 'half'
  const clsOff = 'off'
  export default {
  props: {
  	size: {
		type: Number
  	},
  	score: {
  		type: Number
  	}
  },
  computed: {
  	starType () {
  		return 'star_' + this.size
  	},
  	itemClasses () {
  		let result = []
  		let score = Math.floor(this.score * 2) / 2
  		let hasDecimal = score % 1 !== 0
  		let integer = Math.floor(score)
  		for (let i = 0; i < integer; i++) {
  			result.push(clsOn)
  		}
  		if (hasDecimal) {
  			result.push(clsHalf)
  		}
  		while (result.length < olenth) {
  			result.push(clsOff)
  		}
  		return result
  	}
  }
}
</script>
<style type="text/css">
	.star{
		width: auto;
		font-size: 0;
		text-align: center;
	}
	.star_item{
		width: 0.4rem;
        height: 0.4rem;
		display: inline-block;
		margin-right:0.44rem ;
		background-repeat:no-repeat ;
	}
	 .on{
		background: url(star48_on@2x.png);
		background-size:0.4rem 0.4rem ;
	}
	 .half{
		background: url(star48_half@2x.png);
		background-size:0.4rem 0.4rem ;
	}
	 .off{
		background: url(star48_off@2x.png);
		background-size:0.4rem 0.4rem ;
	}
	.star_48{
		background-size:0.4rem 0.4rem ;
	}
</style>
