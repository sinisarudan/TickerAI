<template>
	<div class="heading_news_list--container">
		<div v-if="options && !options.newsLoaded">
			<h3>loading heading news ...</h3>
		</div>
		<div v-else>
			<div class="swipe--wrapper_container">
				<div class="swipe--container">
					<div class="swipe--wrapper">
						<HeadingNewsComponent class="narrow-news" :news="firstNews"> </HeadingNewsComponent>
						<!-- <HeadingNewsComponent class="wide-news" v-for="news in newsList" v-bind:key="news.id" :news="news"> </HeadingNewsComponent> -->
						<HeadingNewsComponent class="wide-news" :news="newsList[0]"> </HeadingNewsComponent>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../variables";
.rotate {
	transform: rotate(-180deg);
}
.heading_news_list--container {
	// border: 2px black solid;
	// margin: 15px;
	// margin-left: 20px;

	.swipe--wrapper_container {
		line-height: 1.15;
		-webkit-text-size-adjust: 100%;
		--swiper-theme-color: #007aff;
		font-family: "Montserrat", sans-serif;
		box-sizing: inherit;
		border-top: 4px solid #d4af37;
		margin-bottom: 30px;

		.swipe--container {
			line-height: 1.15;
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			font-family: "Montserrat", sans-serif;
			box-sizing: inherit;
			margin-left: auto;
			margin-right: auto;
			position: relative;
			overflow: hidden;
			list-style: none;
			padding: 0;
			z-index: 1;
			.swipe--wrapper {
				// background: $header-bg-color;
				background-image: url("/img/logos/tickerAI-logo-sm.jpg");
  				background-repeat: repeat;
				line-height: 1.15;
				-webkit-text-size-adjust: 100%;
				--swiper-theme-color: #007aff;
				font-family: "Montserrat", sans-serif;
				list-style: none;
				position: relative;
				width: 100%;
				height: 100%;
				z-index: 1;
				display: flex;
				transition-property: transform;
				box-sizing: content-box;
				transform: translate3d(0px, 0, 0);

				//on phone:
				.narrow-news {
					// phone
					@media only screen and (max-width: $mobile-desktop-threshold) {
						display: block;
					}
					// desktop
					@media only screen and (min-width: $mobile-desktop-threshold) {
						display: none;
					}
				}

				//on desktop:
				.wide-news {
					margin: auto;
					width: 33%;
					// phone
					@media only screen and (max-width: $mobile-desktop-threshold) {
						display: none;
					}
					// desktop
					@media only screen and (min-width: $mobile-desktop-threshold) {
						display: block;
					}
				}
			}
			.swipe--wrapper::after {
				content: "";
				background: rgba($header-bg-color, 0.97);
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}

			.swipe--wrapper > * {
				z-index: 10;
			}
		}
	}
}
</style>

<script lang="ts" src="./HeadingNewsListComponent.ts"></script>
