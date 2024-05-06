<template>
	<div class="mark-asp">
		<div class="asp-title">{{ toTitleCase(marketAspectSetup.title) }}</div>
		<!-- <div class="subtitle">{{ marketAspectSetup.subtitle }}</div> -->
		<!-- <div v-if="options && !options.marketsLoaded">
			<h3>loading ...</h3>
		</div>
		<div v-else> -->
		<div>
			<md-field v-if="marketAspectSetup.filter" class="filter">
				<label>{{ marketAspectSetup.filter.label }}</label>
				<md-input v-model="filter"></md-input>
				<md-icon>search</md-icon>
			</md-field>

			<!-- <div>DEBUG: <span v-if="filter">filter text not empty</span></div>

			<div v-if="filter">
				<md-button :class="{ 'md-toggle': isSelected(selection.id) }" v-for="selection in selectionsAllToShow" v-bind:key="selection.id" v-on:click="toggled(selection)">DB.{{ selection.title }}</md-button>
			</div>

			<div v-if="filter">Selected Recommended subfilters:</div> -->
			<div class="subfilters">
				<md-button :class="{ selection: true, selected: isSelected(selection.id) }" v-for="selection in selectionsRecommendedToShow" v-bind:key="selection.id" v-on:click="toggled(selection)">{{ selection.title }}</md-button>
				<md-button class="button-general" v-on:click="selectAll()">Select all</md-button>&nbsp;
			</div>
			<!-- <div v-if="showSelectAll">
			<md-button class="button-general" v-on:click="selectAll()">Select all</md-button>&nbsp;
			<md-button class="button-general" v-on:click="deselectAll()">Deselect all</md-button>
		</div> -->

			<!-- <md-button-toggle>
				<md-button class="md-toggle">Works</md-button>
				<md-button class="md-toggle">With</md-button>
				<md-button>Text</md-button>
				<md-button>Too</md-button>
			</md-button-toggle> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.selected {
	color: white !important;
	font-size: $font-size + 1 !important;
}
// .selection:nth-child(2) {
// 	background: red !important;
// }
// .selected:nth-child(1) {
// 	color: blue !important;
// }
.selected:nth-child(1n) {
	background: #F2994A !important;
}
.selected:nth-child(2n) {
	background: #EF5DA8 !important;
}
.selected:nth-child(3n) {
	background: #F2C94C !important;
}
.selected:nth-child(4n) {
	background: #9B51E0 !important;
}
.selected:nth-child(5n) {
	background: #27AE60 !important;
}
.selected:nth-child(6n) {
	background: #56CCF2 !important;
}
.selected:nth-child(7n) {
	background: #EB5757 !important;
}
.rotate {
	transform: rotate(-180deg);
}
.mark-asp:first-of-type {
	// border-top: none !important;
}
.mark-asp {
	padding-bottom: 45px;
	padding-top: 16px;
}
.title {
	font-size: 32px;
	color: $main-color;
	font-family: Montserrat;
	font-weight: bold;
}
.asp-title {
	font-size: 18px;
	border-bottom: #dde2e5 solid 1px !important;
	font-weight: bold;
	padding: 3px;
	margin-bottom: 16px;
	padding-bottom: 10px;
	color: $main-color;
	// text-transform: capitalize;
	text-align: left;
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

// .md-toggle::after {
// 	content: "";
// 	display: block;
// 	height: 40px; /*height of icon */
// 	width: 40px; /*width of icon */
// 	position: absolute;
// 	/*where to replace the icon */
// 	top: 0px;
// 	left: -40px;
// 	/*background */
// 	background: #f8e6ae url(https://i.stack.imgur.com/W2kYp.png) no-repeat 0px 0px;
// }

// .md-toggle::before {
// 	font-family: "Font Awesome 5 Free";
// 	font-weight: 900;
// 	content: "\f007";
// }
</style>

<script lang="ts" src="./MarketAspectSetupComponent.ts"></script>
