<template>
	<div>
		<!-- <span style="color: red">showSubfilters {{ showSubfilters }}</span> -->
		<!-- <span>newsList ({{ this.newsList.length }}) : {{ JSON.stringify(this.newsList, null, 4) }}</span> -->
		<NewsComponent v-for="news in newsList" v-bind:key="news.id" :news="news" :setup="{ showSubfilter: showSubfilters ? (showSubfilters[news.id] ? showSubfilters[news.id] : false) : false }" />
		<div v-if="newsList.length == 0" class="no-news">NO NEWS ...</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.no-news {
	padding: 50px;
	font-weight: bold;
	font-size: 24px;
	color: $main-color !important;
}
</style>

<script lang="ts" src="./NewsListAspectComponent.ts"></script>
