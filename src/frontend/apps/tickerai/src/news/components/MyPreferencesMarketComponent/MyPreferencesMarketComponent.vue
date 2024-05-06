<template>
	<div>
		<!-- <h1 class="title">{{ marketsAspectsSelection.market.title }}</h1> -->
		<MyPreferencesAspectComponent v-for="marketsAspectSelection in marketsAspectsSelection.marketsAspectSelection" v-bind:key="marketsAspectSelection.aspect.id" :marketsAspectsSelection="marketsAspectSelection" />
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.title {
	font-style: normal;
	color: $main-color !important;
	font-weight: bold;
	font-size: 32px;
	line-height: 45px;
	/* or 125% */

	text-align: right;

	// color: #FFFFFF;
}

.rotate {
	transform: rotate(-180deg);
}

.subtitle {
	font-size: 24px;
	padding: 3px;
}

.filter {
	width: 300px;
	padding: 5px;
	border: 1px solid $main-color;
	border-radius: 4px;
	margin: auto;
}

.filter label {
	color: $main-color !important;
	font-weight: bold !important;
	top: 15px;
	left: 15px;
}
</style>

<script lang="ts" src="./MyPreferencesMarketComponent.ts"></script>
