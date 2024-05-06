<template>
	<div class="markets-setup">
		<!-- <span class="active">STOCKS</span> | ECONOMY & BUSINESS  -->

		<!-- UX.1.0: now moved to `Preferences.vue`
		<div>
			<span :class="{ active: isActive(market.id), market }" v-for="(market, markInd) in selectedMarkets" v-bind:key="market.id"
				><span class="markInd"> {{markInd}} </span><span class="market-title">{{ market.title }}</span></span
			>
		</div> -->
		<!-- We create (using `v-for`) as many `steppers` as markets users has selected and we use `v-if` and  `activeMarketIndex` (chanbed by Prev/Next butons) to display only the active one -->
		<div class="market-setup" v-if="mInd === activeMarketIndex" v-for="(marketSetup, mInd) in marketsSetupsForSelectedMarkets" v-bind:key="marketSetup.market.title">
			<md-icon class="back-icon" v-on:click.native="goBack()">arrow_back</md-icon>
			<div class="title">{{ toTitleCase(marketSetup.market.title) }}</div>
			<!-- We create (using `v-for`) as many `steps` as aspects there are for specific market, each containing recommended `ISelection`-s -->
			<div class="md-step" v-for="marketAspectSetup in marketSetup.aspects" v-bind:key="marketAspectSetup.title" :md-label="marketAspectSetup.title">
				<MarketAspectSetupComponent :marketAspectSetup="marketAspectSetup" :marketAspectSelections="() => marketsAspectsSelectionForMarketAndAspect(marketSetup.market, marketAspectSetup)" @selectionToggled="selectionToggled" @selectionsSelected="selectionsSelected" @selectionsDeSelected="selectionsDeSelected" />
			</div>

			<!-- <md-step id="second" md-label="Choose STOCK SECTORS">
				<SectorsSelectionComponent :sectorsSelectionComponentOptions="marketsSetUpComponentOptions.sectorsSelectionComponentOptions" />
			</md-step>

			<md-step id="third" md-label="Choose MARKET TOPICS">
				<TopicsSelectionComponent :topicsSelectionComponentOptions="marketsSetUpComponentOptions.topicsSelectionComponentOptions" />
			</md-step> -->
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../variables";
.md-stepper-label {
	color: $main-color !important;
	font-size: 28px !important;
}
// .md-stepper-number {
// 	background-color: gray !important;
// }

.md-done .md-stepper-number {
	background-color: $main-color !important;
}

.md-active .md-stepper-number {
	background-color: $main-color !important;
}
</style>

<style lang="scss" scoped>
@import "../../../variables";

.market-setup {
	position: relative;
}

.back-icon {
	cursor: pointer !important;
	color: $main-color !important;
	position: absolute;
	left: 0px; //40px;
	// top: 40px;
}

.markets-setup {
	margin: 10px;

	.title {
		font-size: 30px !important;
		color: $main-color;
		font-family: Montserrat;
		font-weight: bold;
	}
	.rotate {
		transform: rotate(-180deg);
	}
	.instructions {
		font-size: 14px;
		color: $main-color;
		font-family: Montserrat;
	}

	.news {
		// border: 2px black solid;
		// margin: 15px;
		margin-left: 20px;
	}
}
</style>

<script lang="ts" src="./MarketsSetUpComponent.ts"></script>
