<template>
	<div class="news_view">
		<!-- <v-card>
			<v-tabs v-model="selectedTabId" dark background-color="teal darken-3" show-arrows>
				<v-tab v-for="tabTitleId in 15" :key="tabTitleId" :href="'#tab-' + tabTitleId"> табулар {{ tabTitleId }} </v-tab>
			</v-tabs>

			<v-tabs-items v-model="selectedTabId">
				<v-tab-item v-for="tabContentId in 15" :key="tabContentId" :value="`tab-${tabContentId}`">
					<v-card flat>
						<v-card-text v-text="`tekst-${tabContentId}-${text}`"></v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-card>
		selectedTabId: {{ selectedTabId }} -->

		<!-- <div class="controls_top_right">
			<button is="ColaboMaterial" type="button" :info="{ icon: true }" @click="changePersona()">
				<icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">fact_check</icon>
			</button>
			<button is="ColaboMaterial" type="button" :info="{ icon: true }" @click="getPersonalizedNews()">
				<icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">expand</icon>
			</button>
			<button is="ColaboMaterial" type="button" :info="{ icon: true }" @click="savePersonalization()">
				<icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">save</icon>
			</button>
			<button is="ColaboMaterial" type="button" :info="{ icon: true }" @click="loadPersonalization()">
				<icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">upload_file</icon>
			</button>
		</div> -->

		<HeadingNewsListComponent class="heading_news_list" :newsList="headingNewsList" :options="headingNewsListOptions"></HeadingNewsListComponent>

		<div v-if="headings.mainHeadline">
			<a v-if="headings.mainHeadlineLink" :href="headings.mainHeadlineLink" target="”_blank”">
				<h1 class="mainHeadline">
					{{ headings.mainHeadline }}
				</h1>
			</a>
			<h1 v-if="headings.mainHeadline && !headings.mainHeadlineLink">
				{{ headings.mainHeadline }}
			</h1>
		</div>

		<div class="logo">
			<a href="https://tickerai.io/">
				<svg width="613" height="128" viewBox="0 0 613 128" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%">
					<g filter="url(#filter0_d)">
						<path
							d="M48.296 89.912C48.104 91.256 48.008 92.12 48.008 92.504C48.008 96.92 50.408 99.128 55.208 99.128C57.8 99.128 60.536 98.36 63.416 96.824L66.872 115.688C61.496 118.76 54.728 120.296 46.568 120.296C38.504 120.296 32.072 118.28 27.272 114.248C22.568 110.216 20.216 104.6 20.216 97.4C20.216 94.616 20.456 92.168 20.936 90.056L26.12 64.28H14.6L18.776 43.832H30.152L34.184 23.528H61.544L57.512 43.832H75.224L71.192 64.28H53.48L48.296 89.912ZM91.9663 40.952H119.182L103.63 119H76.4143L91.9663 40.952ZM109.39 32.312C104.686 32.312 100.894 31.016 98.0143 28.424C95.1343 25.832 93.6943 22.616 93.6943 18.776C93.6943 14.264 95.2783 10.568 98.4463 7.68799C101.71 4.712 105.982 3.224 111.262 3.224C116.062 3.224 119.902 4.472 122.782 6.96799C125.662 9.368 127.102 12.488 127.102 16.328C127.102 21.032 125.47 24.872 122.206 27.848C118.942 30.824 114.67 32.312 109.39 32.312ZM164.906 120.296C156.65 120.296 149.402 118.856 143.162 115.976C137.018 113 132.218 108.824 128.762 103.448C125.402 98.072 123.722 91.832 123.722 84.728C123.722 76.184 125.786 68.504 129.914 61.688C134.042 54.872 139.802 49.496 147.194 45.56C154.586 41.624 162.89 39.656 172.106 39.656C180.938 39.656 188.57 41.528 195.002 45.272C201.434 48.92 206.138 54.104 209.114 60.824L185.786 71.912C182.906 65 177.866 61.544 170.666 61.544C165.098 61.544 160.49 63.56 156.842 67.592C153.29 71.624 151.514 76.808 151.514 83.144C151.514 87.752 152.81 91.448 155.402 94.232C158.09 96.92 161.882 98.264 166.778 98.264C170.426 98.264 173.642 97.448 176.426 95.816C179.21 94.184 181.61 91.592 183.626 88.04L203.642 100.136C199.898 106.472 194.618 111.416 187.802 114.968C181.082 118.52 173.45 120.296 164.906 120.296ZM271.265 75.512L297.473 119H265.505L249.521 92.36L238.289 102.152L234.977 119H207.617L228.929 12.152H256.289L245.201 67.592L276.737 40.952H311.297L271.265 75.512ZM388.421 73.928C388.421 77.672 387.893 81.944 386.837 86.744H329.525C330.485 95.192 336.389 99.416 347.237 99.416C350.693 99.416 354.053 98.888 357.317 97.832C360.581 96.776 363.509 95.192 366.101 93.08L377.477 110.216C368.357 116.936 357.269 120.296 344.213 120.296C335.957 120.296 328.661 118.856 322.325 115.976C316.085 113 311.237 108.872 307.781 103.592C304.421 98.216 302.741 91.928 302.741 84.728C302.741 76.184 304.709 68.504 308.645 61.688C312.677 54.776 318.245 49.4 325.349 45.56C332.549 41.624 340.757 39.656 349.973 39.656C357.749 39.656 364.517 41.096 370.277 43.976C376.133 46.76 380.597 50.744 383.669 55.928C386.837 61.112 388.421 67.112 388.421 73.928ZM348.677 59.096C344.261 59.096 340.565 60.296 337.589 62.696C334.613 65 332.453 68.216 331.109 72.344H363.221C363.317 68.216 362.021 65 359.333 62.696C356.645 60.296 353.093 59.096 348.677 59.096ZM431.721 49.592C438.249 42.968 447.657 39.656 459.945 39.656L455.193 64.28C452.793 63.992 450.729 63.848 449.001 63.848C442.857 63.848 437.913 65.336 434.169 68.312C430.521 71.192 428.073 75.8 426.825 82.136L419.337 119H391.977L407.529 40.952H433.449L431.721 49.592ZM522.943 99.416H480.031L468.367 119H438.27L502.927 18.2H531.007L555.343 119H526.975L522.943 99.416ZM518.623 78.392L511.855 45.704L492.559 78.392H518.623ZM583.73 18.2H612.242L592.082 119H563.57L583.73 18.2Z"
							fill="black"
						></path>
					</g>
					<defs>
						<filter id="filter0_d" x="0.599976" y="0.223999" width="611.642" height="127.072" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
							<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
							<feOffset dx="-9" dy="2"></feOffset>
							<feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
							<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
						</filter>
					</defs>
				</svg>
			</a>
		</div>

		<SearchNewsComponent class="search-news" @doSearch="doSearch"> </SearchNewsComponent>
		<!-- <div>Selected market '{{ $route.params.market }}', marketaspect: '{{ $route.params.marketaspect }}', subfilter: '{{ $route.params.subfilter }}'</div> -->
		<div v-if="!isPrefSettingUpFinishedOnce" class="note-unpersonalized">
			You are seeing unpersonalized news. In order to <b>improve your experience</b>, we invite you to
			<v-btn class="personalize-btn" @click="personalizeNews()">
				<!-- @Joe doesn't like the icon: <icon class="personalize-btn-icon" is="ColaboMaterial" type="icon" :info="{ size: 1 }">tune</icon> -->
				PERSONALIZE NEWS
			</v-btn>
		</div>
		<NewsListComponent class="news_list" :newsList="newsList" :markets="markets" :showPersonalizedNews="showPersonalizedNews" :marketsAspectsSelections="marketsAspectsSelections" :marketSetups="marketSetups" :options="newsListOptions" :getMarketForSelectionId="getMarketForSelectionId"></NewsListComponent>
	</div>
</template>

<style lang="scss" scoped>
@import "../../variables";
.news_view {
	position: relative;

	.logo {
		line-height: 1.15;
		-webkit-text-size-adjust: 100%;
		--swiper-theme-color: #007aff;
		font-family: "Montserrat", sans-serif;
		box-sizing: inherit;
		text-align: center;
		margin: 0 auto;
		// margin-bottom: 30px;
		width: 100%;
	}

	.mainHeadline {
		color: black !important;
		font-family: "Times New Roman", Times, serif !important;
		@media only screen and (min-width: $mobile-desktop-threshold) {
			font-size: 48px;
		}
		@media only screen and (max-width: $mobile-desktop-threshold) {
			font-size: 36px;
		}
		max-width: 750px;
		margin: auto;
		line-height: normal;
		text-decoration: underline;
	}
	.controls_top_right {
		position: absolute;
		top: -40px !important;
		right: 15px;
		z-index: 1000;
		display: grid;
	}

	.note-unpersonalized {
		border: $main-color solid 1px;
		margin: auto;
		margin-bottom: 5px;
		padding: 3px;
		max-width: 1240px;
		background: $header-hlt-bg-color;
	}

	.heading_news_list {
	}

	.search-news {
	}

	.news_list {
		margin: auto;
		// depends on screen
		max-width: 1240px;
	}
}
</style>

<script lang="ts" src="./News.ts"></script>
