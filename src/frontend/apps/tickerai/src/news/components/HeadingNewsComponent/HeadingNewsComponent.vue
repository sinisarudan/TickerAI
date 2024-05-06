<template>
	<article class="heading_news--component">
		<a :href="news && news.url" target="_blank" class="link">
			<div class="tags">
				<div v-if="tagInfo" class="tag" :style="{ 'background-color': tagInfo.color }">{{ tagInfo.title }}</div>
			</div>
			<img class="image" loading="lazy" :alt="news && news.title" :src="news && news.image" />
			<h3 class="news-title">{{ news && newsTitle }}</h3>
		</a>
	</article>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../../variables";
.heading_news--component {
	line-height: 1.15;
	-webkit-text-size-adjust: 100%;
	--swiper-theme-color: #007aff;
	font-family: "Montserrat", sans-serif;
	list-style: none;
	box-sizing: inherit;
	flex-shrink: 0;
	height: 100%;
	// height: 400px;
	// width: 100% !important;
	// object-fit: cover;
	// overflow: hidden;
	position: relative;
	transition-property: transform;
	// phone
	@media only screen and (max-width: $mobile-desktop-threshold) {
		width: 100%;
	}
	// desktop
	@media only screen and (min-width: $mobile-desktop-threshold) {
		width: 33.3333333333%;
	}

	.link {
		line-height: 1.15;
		-webkit-text-size-adjust: 100%;
		--swiper-theme-color: #007aff;
		font-family: "Montserrat", sans-serif;
		list-style: none;
		box-sizing: inherit;
		background-color: transparent;
		display: block;
		position: relative;
		height: 0;
		padding-top: 66%;
		overflow: hidden;

		.tags {
			.tag {
				line-height: 1.15;
				-webkit-text-size-adjust: 100%;
				--swiper-theme-color: #007aff;
				font-family: "Montserrat", sans-serif;
				list-style: none;
				box-sizing: inherit;
				z-index: 1;
				position: absolute;
				top: 0;
				left: 0;
				padding: 5px;
				color: white;
				text-transform: lowercase;
				background-color: #247ba0;
			}
		}
		.image {
			line-height: 1.15;
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			font-family: "Montserrat", sans-serif;
			list-style: none;
			box-sizing: inherit;
			border-style: none;
			max-width: 100%;
			position: absolute;
			top: 0;
			// I added manually to fix images
			left: 0;
			object-fit: cover;
			height: 100%;
			width: 100%;
			transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}

		.news-title {
			line-height: 1.15;
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			font-family: "Montserrat", sans-serif;
			list-style: none;
			box-sizing: inherit;
			position: absolute;
			bottom: 0px;
			left: 0px;
			color: white;
			// margin-right: 10px;
			padding: 10px;

			/* making width of title and its background cover all the image width: */
			width: 100%;
			width: -moz-available; /* WebKit-based browsers will ignore this. */
			width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
			width: stretch;

			background: #00000040;
			@media only screen and (max-width: 1100px) and (min-width: $mobile-desktop-threshold) {
				font-size: 16px !important;
			}
			@media only screen and (max-width: 900px) and (min-width: $mobile-desktop-threshold) {
				font-size: 14px !important;
			}
			@media only screen and (max-width: 700px) and (min-width: $mobile-desktop-threshold) {
				font-size: 12px !important;
			}
		}
	}
}
</style>

<script lang="ts" src="./HeadingNewsComponent.ts"></script>
