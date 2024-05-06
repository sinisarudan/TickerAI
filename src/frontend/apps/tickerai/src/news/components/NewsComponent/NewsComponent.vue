<template>
	<div class="news_component">
		<!-- <span>setup {{setup}}</span> -->
		<!-- <md-button v-if="setup.showSubfilter" :class="{ 'md-toggle': true, disabled: true, selection: true, test: true }">{{ selectionTitle }}</md-button> -->
		<!-- OLD UX.1.0 <div v-if="setup.showSubfilter" class="subfilter">{{ selectionTitle }}</div> -->
		<article class="news">
			<div class="text-wrapper">
				<!-- <div class="tags">
					<div v-if="tagInfo" class="tag" :style="{ 'background-color': tagInfo.color }">{{ tagInfo.title }}</div>
				</div> -->
				<a :href="news.url" target="_blank"
					><span class="title">{{ newsTitle }}</span></a
				>
				<div class="text" v-html="newsText(50)"></div>
				<div class="time">{{ newsTime }}</div>
				<div class="selection-title">{{ selectionTitle }}</div>
			</div>
			<div class="image_wrapper">
				<a :href="news.url" target="_blank">
					<img :class="{ image: true, 'no-img': !news.image }" loading="lazy" :alt="news.title" :src="news.image" />
				</a>
			</div>
		</article>
		<!-- TODO <div class="date">
			{{ date }}
		</div> -->
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>

<style lang="scss" scoped>
@import "../../../variables";
.news_component {
	margin: 10px 0px;
	// max-width: 400px;
	text-align: left;
	color: $main-color;
	position: relative;
}

.selection-title {
	font-size: 8px;
	color: $header-bg-color;
	padding: 3px;
}

.news {
	line-height: 1.15;
	-webkit-text-size-adjust: 100%;
	--swiper-theme-color: #007aff;
	font-family: "Montserrat", sans-serif;
	display: flex;
	position: relative;
	background: $bg-color;
	overflow: hidden;
	padding: 10px 5px;
	border-bottom: 1px solid $light-border-color;
	align-items: stretch;

	// phone:
	@media only screen and (max-width: $mobile-desktop-threshold) {
		//it is same as for desktkop - Because Joe wanted to make it the same on phone as on dekstop:
		// flex-direction: row-reverse;
		// but this was original phone setup:
		flex-direction: column-reverse;
		align-items: flex-start;
	}
	// desktop:
	@media only screen and (min-width: $mobile-desktop-threshold) {
		// flex-direction: row;
		flex-direction: row-reverse;
	}

	.image_wrapper {
		@media only screen and (max-width: $mobile-desktop-threshold) {
			//when Joe wanted to make it the same on phone as on dekstop, it was like this:
			// flex-basis: 25%;
			width: 100%; //for making images fully-wide yet cut in height
		}
		// desktop
		@media only screen and (min-width: $mobile-desktop-threshold) {
			flex-basis: 13%;
		}
		// order: 1;
		position: relative;
		// overflow: hidden;
		// display: block;
		.image {
			line-height: 1.15;
			// depends on screen
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			font-family: "Montserrat", sans-serif;
			box-sizing: inherit;
			border-style: none;
			// position: absolute;
			top: 0;
			object-fit: cover;
			overflow: hidden;
			// min-width: 50% !important;
			//
			// phone
			@media only screen and (max-width: $mobile-desktop-threshold) {
				//when Joe wanted to make it the same on phone as on dekstop, it was like this:
				// height: 100%;
				// this was original phone setup:
				width: 100%;
				max-height: 120px;
			}
			// desktop
			@media only screen and (min-width: $mobile-desktop-threshold) {
				height: 100%;
				max-height: 250px;
			}
			// iPhone bug fix:
			align-self: flex-start;
			//if there is no image for the news
			&.no-img {
				@media only screen and (max-width: $mobile-desktop-threshold) {
					content: url("/img/no-img-h.jpg");
				}
				@media only screen and (min-width: $mobile-desktop-threshold) {
					content: url("/img/no-img-v.jpg");
				}
			}
		}
	}

	.text-wrapper {
		flex-basis: 100%;
		// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Ordering_Flex_Items
		// order: 2;
		display: block;
		//@media rule is commented because Joe wanted to make it the same on phone as on dekstop:
		//@media only screen and (min-width: $mobile-desktop-threshold) {
		margin-left: 3px;
		//}
		.tags {
			.tag {
				line-height: 1.15;
				-webkit-text-size-adjust: 100%;
				--swiper-theme-color: #007aff;
				font-family: "Montserrat", sans-serif;
				box-sizing: inherit;
				padding: 5px;
				display: inline-block;
			}
		}

		.title {
			line-height: 1.15;
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			font-family: "Montserrat", sans-serif;
			box-sizing: inherit;
			color: #111827;
			font-weight: 600;
			margin-top: 10px;
			font-size: 1.25em;
			margin-bottom: 0;
		}
		.text {
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			font-family: "Montserrat", sans-serif;
			box-sizing: inherit;
			color: $light-main-color;
			line-height: 1.4;
			margin-bottom: 2px;
			margin-top: 2px;
		}
	}
}

.text {
	font-size: 12px;
}

.date {
	display: none;
}

.subfilter {
	margin: 15px 0px;
	filter: drop-shadow(5px 5px 4px black);
	font-size: 24px !important;
	text-transform: uppercase !important;
	font-weight: bold;
	background-color: $main-color;
	border-radius: $border-radius;
	color: $bg-color;
	padding: 0px 15px;
	width: fit-content;
	text-align: center;
}
</style>

<script lang="ts" src="./NewsComponent.ts"></script>
