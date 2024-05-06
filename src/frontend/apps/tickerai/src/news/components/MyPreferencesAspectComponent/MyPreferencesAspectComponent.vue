<template>
	<div>
		<!-- <h1 class="title">{{ getMarketAspect }}</h1> -->
		<h1 class="title">{{ marketsAspectsSelection.aspect.title }}</h1>
		<md-button :class="{ 'md-toggle': true, disabled: true, selection: true }" v-for="selection in selections" v-bind:key="selection.id">{{ selection.title }}</md-button>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.title {
	border-top: 1px solid white;
	font-style: normal;
	font-weight: bold !important;
	font-size: 20px;
	text-transform: uppercase;
	line-height: 45px;
	/* or 125% */

	text-align: left;

	color: #fdfdff !important;
}
.rotate {
	transform: rotate(-180deg);
}

// .md-button {
// 	border-radius: 4px;
// 	font-weight: bold;
// 	background: white !important;
// 	border: 1px solid $main-color;
// 	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) !important;
// 	background: transparent !important;
// 	// background: $main-color !important;
// 	border: white solid 2px;
// 	color: white !important;
// }
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

.md-button {
	background: transparent !important;
	border: 1px solid $bg-color !important;
	filter: none !important;
}

.md-toggle {
	background: transparent !important;
}

.md-toggle::after {
	content: "";
	display: block;
	height: 40px; /*height of icon */
	width: 40px; /*width of icon */
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

<script lang="ts" src="./MyPreferencesAspectComponent.ts"></script>
