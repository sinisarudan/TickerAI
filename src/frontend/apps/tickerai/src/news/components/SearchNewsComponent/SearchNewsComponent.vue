<template>
	<div class="search_news--component">
		<!-- <p class="title">Search any market topic for organized search results</p> -->
		<md-field class="search">
			<label>Search any market topic...</label>
			<md-input v-model="search" @keyup.native.enter="doSearch"></md-input>
			<md-icon class="search-icon" v-on:click.native="doSearch()">search</md-icon>
		</md-field>
		<!-- OLD <form method="get" class="form" action="" autocomplete="off">
			<input class="input-hidden" name="q" type="hidden" />
			<input class="input" id="autoComplete" type="text" placeholder="" role="combobox" aria-haspopup="true" aria-expanded="false" aria-controls="autoComplete_list" aria-autocomplete="both" />
		</form> -->
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../variables";
.search_news--component {
	// line-height: 1.15;
	-webkit-text-size-adjust: 100%;
	--swiper-theme-color: $header-bg-color;
	// font-family: "Montserrat", sans-serif;
	box-sizing: inherit;
	padding: 0 10px 10px;
	margin-bottom: 10px;
	// display: inline-block;
	margin: 0 auto 20px;
	// width: 520px;
	max-width: 100%;

	// .title {
	// 	line-height: 1.15;
	// 	-webkit-text-size-adjust: 100%;
	// 	--swiper-theme-color: #007aff;
	// 	font-family: "Montserrat", sans-serif;
	// 	box-sizing: inherit;
	// 	font-size: 15px;
	// 	font-weight: 900;
	// 	text-align: left;
	// 	color: #111827;
	// }

	.search.md-has-value {
		label {
			top: -2px !important;
			// color: blue !important;
		}
	}

	.search {
		max-width: 600px;
		padding: 5px;
		border: 1px solid $main-color;
		border-radius: 4px;
		margin: auto;

		.md-input {
			height: auto !important; // to avoid text-input overlapping with the label text
		}

		.search-icon {
			cursor: pointer !important;
			color: $header-bg-color !important;
		}

		label {
			color: $header-bg-color !important;
			top: 15px !important; //for centering, by default it is on the top of the input field and @joe wants it centered
			// color: $main-color !important;
			font-weight: bold !important;
			// padding-top: 15px !important;
			padding-left: 10px !important;
			// color: red !important;
			// left: 15px;
			/* TODO:
			.md-has-value {
				// top: reset;
				color: red;
			}
			*/
			// top: 15px;
		}
		// label.md-has-value {
		// 	top: 0px !important;
		// }
	}

	/*
	.form {
		.input-hidden {
			-input-adjust: 100%;
			--swiper-theme-color: #007aff;
			box-sizing: inherit;
			font-family: inherit;
			font-size: 100%;
			line-height: 1.15;
			margin: 0;
			overflow: visible;
		}
		.input {
			-webkit-text-size-adjust: 100%;
			--swiper-theme-color: #007aff;
			box-sizing: inherit;
			font-family: inherit;
			margin: 0;
			overflow: visible;
			width: 100%;
			padding: 9px 10px;
			font-size: 14px;
			line-height: 18px;
			color: #575756;
			background-color: white;
			background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-size: 19px 19px;
			background-position: 95% center;
			border-radius: 50px;
			border: 1px solid #c9cbcf;
			transition: all 250ms ease-in-out;
			backface-visibility: hidden;
			transform-style: preserve-3d;
		}
	}
	*/
}
</style>

<script lang="ts" src="./SearchNewsComponent.ts"></script>
