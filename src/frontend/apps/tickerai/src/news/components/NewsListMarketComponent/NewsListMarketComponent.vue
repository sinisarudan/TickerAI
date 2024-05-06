<template>
	<div>
		<!-- <span>newsList ({{ this.newsList.length }}) : {{ JSON.stringify(this.newsList, null, 4) }}</span> -->
		<v-card flat>
			<!-- <div>[DEBUG: NewsListMarketComponent] marketsAspectSelection {{ marketsAspectSelection }}</div> -->
			<!-- <v-card-text v-text="`tekst-${market.title}-${text}`"></v-card-text> -->

			<v-expansion-panels v-model="expansionPanel">
				<v-expansion-panel v-for="mas in marketsAspectSelection" v-bind:key="mas.aspect.id">
					<v-expansion-panel-header> {{ mas.aspect.title }} </v-expansion-panel-header>
					<v-expansion-panel-content> <NewsListAspectComponent :aspect="mas" :newsList="newsListForAspect(mas)" /> </v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-card>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.v-expansion-panel-header {
	font-weight: bolder;
	color: $main-color !important;
	font-size: 24px;
}
</style>

<script lang="ts" src="./NewsListMarketComponent.ts"></script>
