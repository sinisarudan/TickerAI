<template>
	<div class="news-preferences">
		<!-- <div class="close">
			<a v-on:click="close()">
				<md-icon class="close">cancel</md-icon>
			</a>
		</div> -->
		<div v-if="!preferencesFinished">
			<div class="breadcrumbs" v-if="showBreadCrumbs">
				<!-- <span class="instructions">Let’s set up Markets: </span> -->
				<div :class="{ 'active-done': isActive(market.id, markInd) || isDone(markInd), market: true }" v-for="(market, markInd) in selectedMarkets" v-bind:key="market.id">
					<span :class="{ markInd: true, 'done-ind': isDone(markInd) }">
						<span v-if="!isDone(markInd)">{{ markInd + 1 }} </span>
						<md-icon v-if="isDone(markInd)" class="done-icon">done</md-icon>
					</span>
					<span class="market-title">{{ toTitleCase(market.title) }}</span>
					<span class="divider"></span>
				</div>
			</div>
			<MarketsSelectionComponent v-if="showComp('MarketsSelectionComponent')" :markets="markets" :selectedMarkets="selectedMarkets" @marketToggled="marketToggled" />
			<MarketsSetUpComponent :markets="markets" :marketsSetup="marketsSetup" :isActive="isActive" :selectedMarkets="selectedMarkets" :activeMarketIndex="activeMarketIndex" :marketsAspectsSelections="marketsAspectsSelections" @selectionToggled="selectionToggled" @selectionsSelected="selectionsSelected" @selectionsDeSelected="selectionsDeSelected" @prefsBack="prefsBack" v-if="showComp('MarketsSetUpComponent')" />
			<div>
				<md-button v-on:click="nextClicked()" :class="{ continue: true }">Continue</md-button>
			</div>
			<div>
				<md-button v-on:click="skipClicked()" :class="{ skip: true }">{{ skipText }}</md-button>
			</div>
			<!-- UX.1.0
			<div class="navigation">
				<div v-if="ifPrev" class="flex-child left-button">
					<a class="prev-next-button" v-on:click="prefsBack()">
						<md-button :class="{ 'md-toggle': true, selection: true }">&lt;&lt;</md-button>
						<span class="compact subtitle">{{ prev_subtitle }}</span>
					</a>
				</div>
				<div v-if="ifNext" class="flex-child right-button">
					<a class="prev-next-button" v-on:click="nextClicked()">
						<md-button :class="{ continue: true }">Continue</md-button>
						<span class="compact subtitle">{{ next_subtitle }}</span>
					</a>
				</div>
			</div>
			-->
		</div>
		<div v-if="preferencesFinished">You have successfully set up your News Preferences.<br />You can view and change them by reopening the News Preferences, by clicking the My News Portfolio Icon<icon class="personalize-btn-icon" is="ColaboMaterial" type="icon" :info="{ size: 1 }">tune</icon></div>
		<div class="login-warning inversed" v-if="preferencesFinished && !isUserLoggedIn">
			To keep your preferences safe and to be able to use them on other devices, please register your account
			<v-btn to="/account"> <icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">manage_accounts</icon>ACCOUNT</v-btn>
			<!-- <v-btn to="/account"> <icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">login</icon>LOGIN / REGISTER</v-btn> -->
		</div>
		<!-- <note
			is="ColaboMaterial"
			type="snackbar"
			:info="{
				duration: 3000,
				activeGet: () => snBar.show,
				activeSet: (isActive) => {
					snBar.show = isActive;
				},
			}"
		>
			<span>{{ snBar?.text }}</span>
			<button is="ColaboMaterial" type="button" :info="{ primary: true, raised: true }" @click="snBar.show = false">{{ snBar?.btn }}</button>
		</note> -->

		<!-- <md-snackbar :md-duration="snBar?.duration" :md-active.sync="snBar?.show" md-persistent>
			<span>{{ snBar?.text }}</span>
			<md-button class="md-primary" @click="showSnackbar = false">{{ snBar?.btn }}</md-button>
		</md-snackbar> -->
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.breadcrumbs {
	position: absolute;
	top: -80px;
	right: 0px;
	display: flex;
	flex-direction: row;

	.market {
		margin: 0 3px;
		opacity: 0.5;
		// border-right: solid 2px $main-color;
		padding-right: 3px;
		display: flex;
		flex-direction: row;
	}
	.active-done {
		opacity: 1 !important;
		// color: red;
		// color: #0ad1a2;
		// text-transform: uppercase;
		// font-weight: bold;
		// font-size: 18px;
		// text-decoration: underline;
	}
	.markInd {
		color: $bg-color;
		background: $header-bg-color;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		text-align: center;
		padding: 7px;
		font-size: 18px;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;

		.done-icon {
			color: $bg-color;
			padding: 0px !important;
			margin: -7px !important;
			width: 10px !important;
			height: 10px !important;
			font-size: 20px !important;
		}
	}
	.done-ind {
		background: $highlight-color !important;
	}
	.divider {
		height: 5px;
		background: linear-gradient(to bottom, transparent 2px, black 2px, black 3px, transparent 3px);
		width: 30px;
		margin: 15px;
		margin-top: 10px;
	}
	.market:last-of-type .divider {
		width: 0px !important;
		margin: 0px !important;
	}

	.market-title {
		color: $main-color;
		margin-top: 2px;
		margin-left: 12px;
		font-weight: bold;
		text-transform: none !important;
	}
}
.login-warning {
	margin: 5px;
	padding: 10px;
}

.flex-child {
	flex: 1;
	// border: 1px solid red;
}

.skip {
	// display: flex;
	// flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 15px 26px;
	gap: 10px;
	color: $header-bg-color;
	text-transform: none !important;
	font-weight: bold;

	width: 80%;
	max-width: 400px;
	height: 45px;
	background: $bg-color !important;
	border-radius: 5px !important;
}
.continue {
	// display: flex;
	// flex-direction: row;
	margin: 8px 0px !important;
	justify-content: center;
	align-items: center;
	padding: 15px 26px;
	gap: 10px;
	color: white;
	text-transform: none !important;
	font-weight: bold;

	width: 80%;
	max-width: 400px;
	height: 45px;
	background: #5677ac !important;
	border-radius: 5px !important;
}

.close {
	position: absolute;
	top: 10px;
	right: 30px;
}

.prev-next-button {
	display: inline-grid;
}

.compact {
	display: inline-block;
	line-height: 30px;
	// border: 1px solid blue;
}

.flex-child:first-child {
	// margin-right: 20px;
}
.rotate {
	transform: rotate(-180deg);
}
.arrow {
	// font-size: 84px !important;
	// height: 100px;
	color: $nav-color !important;
	padding: 0px;
	margin: 0px;
	// width: 20px;
	top: -15px;
	position: relative;
	// font-stretch: ultra-condensed;
}
.left {
	left: 20px;
}

.right {
	left: -20px;
}
.news-preferences {
	position: relative;
	margin-top: 35px;
	border: 1px solid #dde2e5;
	padding: 40px;
	// border: solid 1px gray;
	// padding: 5px;
	// padding-bottom: 50px;
	// margin: 10px;
	// margin-left: 20px;
}
a {
	text-decoration: none !important;
	color: $nav-color !important;
	cursor: pointer;
	font-size: 32px;
}
.subtitle {
	font-size: 12px;
	margin-top: -10px;
}

.navigation {
	display: flex;
	position: relative;
	// padding: 10px;
	// filter: drop-shadow(30px 10px 4px #4444dd);
}
.nav-btn {
	// // display: inline-flex;
	// display: flex;
}

.right-button {
	// position: absolute;
	right: 0px;
}

.left-button {
	// position: absolute;
	left: 0px;
}
</style>

<script lang="ts" src="./NewsPreferencesComponent.ts"></script>
