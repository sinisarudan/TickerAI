<template>
	<div class="my-preferences">
		<!-- <div class="subtitle">{{ marketAspectSetup.subtitle }}</div> -->
		<!-- <div v-if="options && !options.marketsLoaded">
			<h3>loading ...</h3>
		</div>
		<div v-else> -->
		<!-- <div>
			<md-field v-if="marketAspectSetup.filter" class="filter">
				<label>{{ marketAspectSetup.filter.label }}</label>
				<md-input v-model="filter"></md-input>
				<md-icon>search</md-icon>
			</md-field>

			<md-button :class="{ 'md-toggle': isSelected(selection.id) }" v-for="selection in marketAspectSetup.recommended" v-bind:key="selection.id" v-on:click="toggled(selection)">{{ selection.title }}</md-button>
		</div> -->

		<header is="ColaboMaterial" class="toolbar" type="toolbar" :info="{ elevation: 20 }">
			<h1 class="title" is="ColaboMaterial" type="subheader" :info="{ primary: true }">
				<!-- @Joe doesn't want this icon <icon is="ColaboMaterial" dark type="icon">tune</icon>  -->
				{{ whose }} News Portfolio
			</h1>
			<div class="edit-container">
				<span class="navbutton">
					<a v-on:click="editMyPreferences()"> <md-icon class="arrow">mode_edit</md-icon><span class="compact">Edit portfolio</span> </a>
				</span>
				<span class="navbutton">
					<a v-on:click="cleanMyPreferences()"> <md-icon class="arrow">delete</md-icon><span class="compact">Clean portfolio</span> </a>
				</span>
				<!-- <button is="ColaboMaterial" type="button" :info="{ icon: true }" @click="goToAccount">
					<icon is="ColaboMaterial" type="icon" :info="{ size: 2 }">account_circle</icon>
				</button> -->
			</div>
		</header>
		<!--
		<md-field class="market-selector">
			<label for="movie">Market</label>
			<md-select v-model="selectedMarket" name="market" id="market">
				<md-option v-for="marketsAspectsSelection in marketsAspectsSelections" v-bind:key="marketsAspectsSelection.market.id" :value="marketsAspectsSelection.market.id">{{ marketsAspectsSelection.market.title }}</md-option>
			</md-select>
		</md-field> -->

		<vsa-list>
			<!-- Here you can use v-for to loop through items  -->
			<vsa-item v-for="marketsAspectsSelection in marketsAspectsSelections" v-bind:key="marketsAspectsSelection.market.id">
				<vsa-heading> {{ marketsAspectsSelection.market.title }} </vsa-heading>
				<vsa-content>
					<MyPreferencesMarketComponent :marketsAspectsSelection="marketsAspectsSelection" />
				</vsa-content>
			</vsa-item>
		</vsa-list>

		<!-- <div>
			<MyPreferencesMarketComponent :v-if="marketsAspectsSelection.market.id === selectedMarket" v-for="marketsAspectsSelection in marketsAspectsSelections" v-bind:key="marketsAspectsSelection.market.id" :marketsAspectsSelection="marketsAspectsSelection" />
			<MyPreferencesMarketComponent :marketsAspectsSelection="marketsAspectsSelectionActive" />
		</div> -->
		<!-- <div class="tabs-div">
			<md-tabs :md-swipeable="true" md-alignment="fixed" :md-active-tab="selectedMarket">
				<md-tab v-for="marketsAspectsSelection in marketsAspectsSelections" v-bind:key="marketsAspectsSelection.market.id" :id="marketsAspectsSelection.market.id" :md-label="marketsAspectsSelection.market.title" to="" exact>
					<MyPreferencesMarketComponent :marketsAspectsSelection="marketsAspectsSelection" />
				</md-tab>
			</md-tabs>
		</div> -->
		<br />
		<br />
		<br />
		<div class="close-container">
			<div class="close">
				<a v-on:click="closeMyPreferences()">
					<span>Close</span>
					<span>
						<md-icon class="md-size-2x arrow compact right">navigate_next</md-icon>
					</span>
				</a>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../variables";
//copy of these are also in the 'scoped' part of the style
$mypref-bg-color: $main-color;
$front-color: $bg-color;
.vsa-list,
.vsa-item__content,
.vsa-item__trigger__content,
.vsa-item__content {
	color: $front-color !important;
	background: transparent !important;
	text-align: center;
}

.vsa-list {
	background-color: $mypref-bg-color;
}

.vsa-item__trigger {
	background: $header-bg-color !important;
}

.vsa-item vsa-item--is-active {
	background: $header-hlt-bg-color !important;
}

.vsa-item__heading {
	color: $front-color !important;
	background: $header-bg-color !important;
	// text-align: center;
}

.vsa-item__trigger__content {
	text-align: left;
}

.market-selector label {
	color: $front-color !important;
}
.market-selector input {
	color: $front-color !important;
}

.md-content,
.md-tabs,
.md-tabs-content,
.md-drawer,
.md-tabs-navigation,
.md-toolbar,
md-tabs-container {
	background: transparent !important;
}

.toolbar {
	padding-left: 0px !important;
}

.market-selector.md-field {
	margin-bottom: 0px !important;
}

.my-preferences {
	.md-tabs-navigation {
		display: none;
	}

	.md-tabs-navigation .md-button {
		max-width: fit-content !important;
	}
	.md-tab-nav-button {
		font-weight: bolder;
	}

	.md-icon {
		color: $front-color !important;
		margin: 0px 5px;
	}
}
</style>

<style lang="scss" scoped>
@import "../../../variables";
//copy of these are also in the 'unscoped' part of the style
$header-bg-color: #5677ac;
$mypref-bg-color: $main-color;
$front-color: $bg-color;
.tabs-div {
	position: relative;
}
.my-preferences {
	background: $mypref-bg-color;
	padding: 10px;
	// background: linear-gradient(180deg, $main-color 0%, #575491 45.31%, rgba(255, 255, 255, 0.88) 100%);
	box-shadow: -10px 4px 15px 6px rgba(38, 36, 80, 0.34);
	min-height: 400px;
	color: $front-color !important;
	// background: transparent !important;
}
.close-container {
	position: relative;
}
.close {
	font-size: 24px;
	padding: 10px;
	line-height: 39px;
	color: $front-color !important;
	position: absolute;
	bottom: 0px;
	right: 0px;
	cursor: pointer;
}

.edit-container {
	position: relative;
	display: flex;
}

.navbutton {
	// position: absolute;
	// right: 0px;
	margin: 5px;
	font-size: 16px;
	line-height: 20px;
	color: $front-color !important;
	cursor: pointer;
	border: solid white 1px;
	border-radius: 20px;
	padding-right: 10px;
	padding-left: 5px;
	padding-top: 3px;
	padding-bottom: 3px;
}

a {
	text-decoration: none !important;
	color: $front-color !important;
}

.title {
	font-style: normal;
	font-weight: bold;
	font-size: 38px !important;
	color: $front-color !important;
	line-height: 45px;
	/* or 125% */

	text-align: right;
}
.rotate {
	transform: rotate(-180deg);
}
.title {
	font-size: 32px;
	color: $main-color;
	font-family: Montserrat;
	font-weight: bold;
	padding-left: 0px !important;
}
.md-button {
	border-radius: 4px;
	background: $bg-color;
	border: 1px solid $main-color;
	filter: drop-shadow(5px 5px 4px gray);
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

.md-toggle {
	background: $main-color !important;
	color: $bg-color !important;
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

<script lang="ts" src="./MyPreferencesComponent.ts"></script>
