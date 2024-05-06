<template>
	<div class="charts">
		<!-- <div class="title">CHARTS title</div> -->
		<div class="chart-widget">
			<iframe class="chart-widget-iframe" src="/widgets-charts.html" height="1200px" width="1050px" loading="eager">loading chart-frame ...</iframe>
			<!-- <script type="text/javascript" src="https://s3.tradingview.com/tv.js" async>
			new TradingView.widget({ autosize: true, symbol: "NASDAQ:AAPL", interval: "D", timezone: "Etc/UTC", theme: "dark", style: "8", locale: "en", toolbar_bg: "#f1f3f6", enable_publishing: false, withdateranges: true, hide_side_toolbar: false, allow_symbol_change: true, details: true, show_popup_button: true, popup_width: "1000", popup_height: "650", container_id: "tradingview_74560" });
			</script> -->
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../variables";
</style>

<style lang="scss" scoped>
@import "../../../variables";

.chart-widget {
	padding: 10px;
}

.chart-widget-iframe {
	height: 1200px !important;
	width: 1050 !important;
}
</style>

<script lang="ts" src="./Charts.ts"></script>
