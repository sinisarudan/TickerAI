<template>
	<div class="logo-motto">
		<div class="mark-company motto">A Mark Cuban Company</div>
		<div class="motto-1 motto">AI-based Financial Market News Aggregator</div>
		<!-- <div class="motto-2">Personalize your news and our AI will do the rest</div> -->
	</div>
</template>

<style lang="scss" scoped>
@import "../../variables";

.logo-motto {
	text-align: left;
	margin-left: 0;
	margin-right: auto;
}
.motto {
	@media (min-width: $mobile-desktop-threshold) {
		font-size: 13px;
	}
	@media (max-width: $mobile-desktop-threshold) {
		font-size: 11px;
	}
}

.mark-company {
	// margin-left: 0;
	// margin-right: auto;
	font-weight: bolder;
	font-style: italic;
}
.motto-1 {
	// margin-left: 0;
	// margin-right: auto;
	font-weight: bold;
	margin-top: -5px;
}
.motto-2 {
	// margin-left: 0;
	// margin-right: auto;
	font-weight: bold;
}
</style>

<script lang="ts" src="./LogoMottoComponent.ts"></script>
