<template>
	<div class="els">
		<!-- <div class="title">CHARTS title</div> -->
		<div class="el-widget">
			<div>
				<iframe class="widget el-widget-iframe" src="/widgets-news.html" height="1770px" width="480px" loading="eager">loading news-frame ...</iframe>
			</div>
			<!-- <script type="text/javascript" src="https://s3.tradingview.com/tv.js" async>
			new TradingView.widget({ autosize: true, symbol: "NASDAQ:AAPL", interval: "D", timezone: "Etc/UTC", theme: "dark", style: "8", locale: "en", toolbar_bg: "#f1f3f6", enable_publishing: false, withdateranges: true, hide_side_toolbar: false, allow_symbol_change: true, details: true, show_popup_button: true, popup_width: "1000", popup_height: "650", container_id: "tradingview_74560" });
			</script> -->
			<div>
				<iframe class="widget el-widget-iframe" name="MarketOverview" src="https://darqube.com/external-embedding/7?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aWRnZXQiOnsib3ZlcnZpZXdfc2VjdGlvbnMiOltdLCJpbnN0cnVtZW50cyI6eyJDUllQVE8iOltdLCJTVE9DS1MiOltdLCJGT1JFWCI6W119fSwid190eXBlIjoiTWFya2V0T3ZlcnZpZXciLCJmZV9jZmciOnsiY2hjbHIiOiJyZ2JhKDYxLCAxODcsIDE1NCwgMSkiLCJjbW9kZSI6MCwiZmNsciI6InJnYmEoMjU1LCAyNTUsIDI1NSwgMSkiLCJiZyI6InJnYmEoMjEsIDI1LCAzMCwgMSkiLCJoIjo5NDAsInciOjMzMCwiYXN6IjpmYWxzZSwiaGRpY24iOmZhbHNlLCJ3dG1WIjp7InR5cGUiOiJEYXJxdWJlIiwiZW5hYmxlZCI6dHJ1ZX0sInNtYiI6eyJCVENVU0QuQUdSIjoiQml0Y29pbiIsIkVUSFVTRC5BR1IiOiJFdGhlcmV1bSIsIlhSUFVTRC5BR1IiOiJYUlAiLCJCQ0hVU0QuQUdSIjoiQml0Y29pbiBDYXNoIiwiTFRDVVNELkFHUiI6IkxpdGVjb2luIiwiVVNEVFVTRC5BR1IiOiJUZXRoZXIiLCJUU0xBLlVTIjoiVGVzbGEgSW5jIiwiQUFQTC5VUyI6IkFwcGxlIEluYyIsIk1FVEEuVVMiOiJNZXRhIFBsYXRmb3JtcyBJbmMuIiwiQU1aTi5VUyI6IkFtYXpvbi5jb20gSW5jIiwiR09PR0wuVVMiOiJBbHBoYWJldCBJbmMgQ2xhc3MgQSIsIk1TRlQuVVMiOiJNaWNyb3NvZnQgQ29ycG9yYXRpb24iLCJFVVJVU0QuRk9SRVgiOiJFdXJvIC8gVVMgRG9sbGFyIiwiVVNESlBZLkZPUkVYIjoiVVMgRG9sbGFyIC8gSmFwYW5lc2UgWWVuIiwiR0JQVVNELkZPUkVYIjoiUG91bmQgU3RlcmxpbmcgLyBVUyBEb2xsYXIiLCJBVURVU0QuRk9SRVgiOiJBdXN0cmFsaWFuIERvbGxhciAvIFVTIERvbGxhciIsIlVTRENBRC5GT1JFWCI6IlVTIERvbGxhciAvIENhbmFkaWFuIERvbGxhciIsIlVTRENIRi5GT1JFWCI6IlVTIERvbGxhciAvIFN3aXNzIEZyYW5jIn19LCJleHAiOjE2NjgxMzA2NzUsInN1YiI6ImFjY2VzcyJ9.F4DHXxBOAXaY2pi2zQjx-FR2JUmzQU6zXRQt83bo-gY" id="MarketOverview" width="330" height="940"></iframe>
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
}

.el-widget-iframe {
	height: 1200px !important;
	width: 850px !important;
}
.widget {
	padding-bottom: 30px;
	border-bottom: solid 1px gray;
	padding-top: 20px;
}
</style>

<script lang="ts" src="./WidgetNews.ts"></script>
