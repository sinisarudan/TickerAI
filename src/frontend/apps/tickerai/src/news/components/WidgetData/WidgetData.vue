<template>
	<div class="els">
		<!-- <div class="title">CHARTS title</div> -->
		<div class="el-widget">
			<div>
				<iframe class="ScreenerWidget" name="ScreenerWidget" src="https://darqube.com/external-embedding/5?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aWRnZXQiOnsic2NyZWVuZXJfYXNzZXRfY2xhc3NlcyI6WyJTVE9DS1MiLCJDUllQVE8iLCJGT1JFWCJdfSwid190eXBlIjoiU2NyZWVuZXJXaWRnZXQiLCJmZV9jZmciOnsiY21vZGUiOjAsImZjbHIiOiJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpIiwiYmciOiJyZ2JhKDIxLCAyNSwgMzAsIDEpIiwiaCI6NTEwLCJ3Ijo5NjAsImFzeiI6ZmFsc2UsImhkaWNuIjpmYWxzZSwid3RtViI6eyJ0eXBlIjoiRGFycXViZSIsImVuYWJsZWQiOnRydWV9fSwiZXhwIjoxNjY4MTMxODU2LCJzdWIiOiJhY2Nlc3MifQ._1FgeKjABy6Bgb1oCrpvP0Yyp41bqxHJBS0hAYf5Yng" id="ScreenerWidget" width="960" height="510"></iframe>
			</div>
			<!-- <script type="text/javascript" src="https://s3.tradingview.com/tv.js" async>
			new TradingView.widget({ autosize: true, symbol: "NASDAQ:AAPL", interval: "D", timezone: "Etc/UTC", theme: "dark", style: "8", locale: "en", toolbar_bg: "#f1f3f6", enable_publishing: false, withdateranges: true, hide_side_toolbar: false, allow_symbol_change: true, details: true, show_popup_button: true, popup_width: "1000", popup_height: "650", container_id: "tradingview_74560" });
			</script> -->
			<div>
				<iframe class="widget el-widget-iframe" src="/widgets-data.html" loading="eager">loading data-frame ...</iframe>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../variables";
</style>

<style lang="scss" scoped>
@import "../../../variables";

.el-widget {
	padding: 10px;
	height: 1820px !important;
}

.el-widget-iframe {
	height: 1200px !important;
	width: 550px !important;
}
.widget {
	padding-bottom: 30px;
	border-bottom: solid 1px gray;
	padding-top: 20px;
}
.ScreenerWidget {
	height: 510px !important;
}
.profit-calculator {
	height: 510px !important;
}
</style>

<script lang="ts" src="./WidgetData.ts"></script>
