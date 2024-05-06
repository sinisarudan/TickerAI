<template>
	<div class="news">
		<!-- <div>options.newsLoadingStatus: {{ options.newsLoadingStatus }}</div> -->
		<!-- <div>browsingLocation: {{ browsingLocation.market }}</div> -->
		<div class="status" v-if="options">
			<h3 v-if="options.newsLoadingStatus === 'LOADING_STATUS.LOADING'">loading news ...</h3>
			<h3 v-if="options.newsLoadingStatus === 'LOADING_STATUS.LOADED'">There {{ newsNoText }} available {{ isPersonalized ? "for your preferences" : "" }} {{ !!newsSearch ? (isPersonalized ? " and search query '" : "for your search query '") + newsSearch + "'" : "" }}</h3>
		</div>
		<div v-if="!options">setting up ...</div>
		<!-- <div>[DEBUG: NewsListComponent] marketsAspectsSelections: {{ JSON.stringify(marketsAspectsSelections, null, 2) + ". value: " + (marketsAspectsSelections ? "TRUE" + ". LENGTH: " + marketsAspectsSelections.length : "FALSE") }}</div> -->
		<div v-if="options.newsLoadingStatus === 'LOADING_STATUS.LOADED'">
			<v-card v-if="showPersonalizedNews || SHOW_NON_PERSONALIZED_NEWS_AS_PERSONALIZED">
				<v-tabs fixed-tabs v-model="marketIdSelectedInTabs" light show-arrows>
					<v-tab key="all" href="#all">ALL NEWS</v-tab>
					<v-tab :class="{ ['market-' + market.id]: true }" v-for="market in marketsForTabs" :key="market.id" :href="'#' + market.id">
						<img class="market-icon" :src="marketIcon(market.id)" /><span>{{ market.title }}</span></v-tab
					>
					<v-tab key="NEWS" href="#NEWS">FEATURED NEWS</v-tab>
					<v-tab key="charts" href="#charts">CHART</v-tab>
					<v-tab key="data" href="#data">FUNDAMENTAL DATA</v-tab>
				</v-tabs>
				<v-tabs-items v-model="marketIdSelectedInTabs">
					<!-- <span v-for="mas in marketsAspectsSelections" :key="market.id">{{ market.title }}</span> -->
					<div v-if="showMarketAspectsAndFilters(marketIdSelectedInTabs)">
						<div class="mas-subfilters">
							<!-- <span>{{marketIdSelectedInTabs}}</span> -->
							<md-button :class="{ selection: true, ['market-' + marketIdSelectedInTabs]: isMarketAspectSelected(aspect.id) }" v-for="aspect in marketAspectsListForFiltering" :key="aspect.id" v-on:click="marketAspectSelect(aspect)">{{ aspect.title }}</md-button>
						</div>

						<hr class="filters-break" />
						<!-- showFilters: {{ showFilters() }} -->
						<div class="subfilters" v-if="showFilters()">
							<!-- <div>market: {{ marketIdSelectedInTabs }}</div> -->
							<md-button :class="{ selection: true, ['market-' + marketIdSelectedInTabs]: isSubfilterSelected(selection) }" v-for="selection in subfiltersListForFiltering()" v-bind:key="selection.id" v-on:click="subfilterSelect(selection)">
								<!-- <v-badge :content="numberOfNewsForSubfilter(selection)">
									<span class="selection-title">{{ selection.title }}</span>
								</v-badge> -->
								<span class="selection-title"
									>{{ selection.title }}<span class="newsNoInFilter">{{ " (" + numberOfNewsForSubfilter(selection) + ")" }}</span></span
								>
								<!-- <span class="newsNoBannerContainer"> -->
								<!-- <span class="newsNoBanner"
										>{{ numberOfNewsForSubfilter(selection) }}
										<span class="mover"><br />&nbsp;.</span></span
									>
									</span> -->
							</md-button>
						</div>
					</div>

					<v-tab-item key="ALL" value="ALL">
						<NewsComponent v-for="news in newsList" v-bind:key="news.id" :news="news" :setup="{ showSubfilter: false }" />
						<div v-if="newsNo === 0" class="no-news">NO NEWS ...</div>
					</v-tab-item>

					<v-tab-item v-for="market in marketsForFiltering" :key="market.id" :value="`${market.id}`">
						<div class="status">
							<h3 v-if="options.newsLoadingStatus === 'LOADING_STATUS.LOADED'">{{ newsListForSelection().length }} news for your selection {{ newsListBreadCrumbs }}</h3>
						</div>
						<!-- <NewsListMarketComponent :marketsAspectSelection="mas.marketsAspectSelection" :newsList="newsListForMarket(market)" /> -->
						<NewsListAspectComponent v-if="showThisNewsListAspectComponent(market.id)" :newsList="newsListForSelection()" />
					</v-tab-item>
					<v-tab-item key="charts" value="charts">
						<WidgetNews></WidgetNews>
					</v-tab-item>
					<v-tab-item key="data" value="data">
						<Charts></Charts>
					</v-tab-item>
					<v-tab-item key="news" value="news">
						<WidgetData></WidgetData>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
			<v-card v-if="!showPersonalizedNews && !SHOW_NON_PERSONALIZED_NEWS_AS_PERSONALIZED">
				<v-tabs fixed-tabs v-model="marketIdSelectedInTabs" dark show-arrows>
					<v-tab key="all" href="#all">ALL NEWS</v-tab>
					<!-- <v-tab v-for="m in markets" :key="m.id" :href="'#' + m.id"> {{ m.title }} </v-tab> -->
					<v-tab :class="{ ['market-' + m.id]: true }" v-for="m in markets" :key="m.id" :href="'#' + m.id">
						<img class="market-icon" :src="marketIcon(m.id)" /><span>{{ m.title }}</span></v-tab
					>
					<v-tab key="news" href="#news">FEATURED NEWS</v-tab>
					<v-tab key="charts" href="#charts">CHART</v-tab>
					<v-tab key="data" href="#data">FUNDAMENTAL DATA</v-tab>
				</v-tabs>

				<v-tabs-items v-model="marketIdSelectedInTabs">
					<v-tab-item key="all" value="all">
						<NewsComponent v-for="news in newsList" v-bind:key="news.id" :news="news" :setup="{ showSubfilter: false }" />
						<div v-if="newsNo === 0" class="no-news">NO NEWS ...</div>
					</v-tab-item>
					<v-tab-item v-for="m in markets" :key="m.id" :value="`${m.id}`">
						<NewsComponent v-for="news in newsListForMarket(m)" v-bind:key="news.id" :news="news" :setup="{ showSubfilter: false }" />
						<div v-if="newsListForMarket(m).length == 0" class="no-news">NO NEWS ...</div>
					</v-tab-item>
					<v-tab-item key="NEWS" value="NEWS">
						<WidgetNews></WidgetNews>
					</v-tab-item>
					<v-tab-item key="CHARTS" value="CHARTS">
						<Charts></Charts>
					</v-tab-item>
					<v-tab-item key="DATA" value="DATA">
						<WidgetData></WidgetData>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
		</div>
		<!-- selectedTabId: {{ selectedTabId }} -->
	</div>
</template>

<style lang="scss">
@import "../../../variables";
// $active-color: #5677ac;
// $highlighted-color: lighten($active-color, 20%);

.v-tabs-bar,
.v-slide-group__wrapper {
	background: none !important;
}

.v-slide-group__wrapper {
	// padding-bottom: 25px;
	// border-bottom: 3px solid $main-color;
}

.v-tab {
	font-weight: 900;
	// color: $main-color !important;
	color: $bg-color !important;
	border-radius: 50px;
	margin: 0px 5px;
	background: $bg-inactive;
	height: 44px;
	// opacity: 0.8;
}
.v-tabs-items {
	margin-top: 10px;
	border-top: 3px solid $main-color;
}

.v-tabs-slider {
	// background: $main-color !important;
	display: none;
}

.v-slide-group {
	color: black !important;
}

.v-tab--active {
	color: $bg-color !important;
	opacity: 1;
	background: $header-bg-color;
	// font-size: $font-size + 2;
	border: solid 3px black;
}

//tabs-arrows
.mdi-chevron-left::before {
	color: black !important;
}
.mdi-chevron-right::before {
	color: black !important;
}

.no-news {
	padding: 50px;
	font-weight: bold;
	font-size: 24px;
	color: $main-color !important;
}
</style>

<style lang="scss" scoped>
@import "../../../variables";

.newsNoInFilter {
	color: #5f5d5d;
	font-size: 10px;
}
// .newsNoBannerContainer {
// 	position: relative;
// 	width: 40px !important;
// 	height: 40px !important;
// }
.newsNoBanner {
	// background: rgba(255, 255, 255, 0.7);
	// margin-left: 5px;
	margin-top: 10px;
	// margin-bottom: 5px;
	width: 40px;
	font-size: 10px;
	// padding: 3px 3px;
	padding-bottom: 10px;
	border-radius: 100%;
	position: relative;
	// top: -5px;
	// right: -30px;
}
.selection-title {
	// margin-top: 40px !important;
}
.mover {
	opacity: 0;
}
.selected {
	color: $bg-color !important;
	background: $main-color !important;
	font-size: $font-size + 1 !important;
}
.status {
	color: $light-main-color !important;
	font-size: 10px;
	margin: 10px;
}
.rotate {
	transform: rotate(-180deg);
}
.news {
	// border: 2px black solid;
	// margin: 15px;
	margin-left: 20px;
}

.title {
	font-size: 28px;
	line-height: 34px;
	color: #0ad1a2;
	text-align: left;
}
.filters-break {
	color: $light-main-color !important;
	margin: 5px auto;
	width: 90%;
}
.mas-subfilters {
	margin-top: 5px;
}
.market-icon {
	// width: 20px;
	// height: 20px;
	// background: yellow;
	margin-right: 10px;
}
</style>

<script lang="ts" src="./NewsListComponent.ts"></script>
