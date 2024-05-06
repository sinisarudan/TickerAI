<template>
	<div class="market-selection">
		<span class="title">Select your Markets</span>
		<div v-if="options && !options.marketsLoaded">
			<h3>loading markets ...</h3>
		</div>
		<div v-else class="center">
			<div class="markets">
				<!-- :style="{ background: market.color + ' !important' }" -->
				<md-button :class="{ 'market-btn': true, ['market-' + market.id]: isSelected(market.id) }" v-for="market in markets" v-bind:key="market.id" v-on:click="toggled(market.id)" :market="market">{{ market.title }}</md-button>
				<!-- :class="{ {{'market-'+'crypto'}}: isSelected(market.id), 'market-btn': true }"
	:class="[`market-${'economy'}`: true]" -->
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";

.market-selection {

}

.center {
	width: 400px;
	// border: solid 1px black;
	margin: auto;
}

.market-btn {
	width: 400px;
	margin: 8px 0px !important;
	height: 50px;
	background: #E6EBF3;
	border-radius: 100px;
	text-transform: none !important;
}

.markets {
	flex-direction: column;
	display: flex;
	// width: 480px;
	margin: auto;
	// border: 1px #dde2e5 solid;
}
.rotate {
	transform: rotate(-180deg);
}
.title {
	font-size: 32px;
	color: $main-color;
	font-family: Montserrat;
	font-weight: bold;
	// padding: 30px;
}

.md-toggle::after {
	content: "";
	// display: block;
	// height: 40px; /*height of icon */
	// width: 40px; /*width of icon */
	position: absolute;
	/*where to replace the icon */
	top: 0px;
	left: -40px;
	/*background */
	background: #f8e6ae url(https://i.stack.imgur.com/W2kYp.png) no-repeat 0px 0px;
}

.md-toggle::before {
	font-family: "Font Awesome 5 Free";
	font-weight: 900;
	content: "\f007";
}
</style>

<script lang="ts" src="./MarketsSelectionComponent.ts"></script>
