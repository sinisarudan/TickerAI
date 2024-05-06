import { GlobalStoreWithModules } from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
// import { TradingView } from "https://s3.tradingview.com/tv.js";

@Component({
	components: {
		ColaboMaterial,
	},
})
export class Charts extends Vue {
	private store: GlobalStoreWithModules = this["$store"] as GlobalStoreWithModules;

	// widget = new TradingView.widget({ autosize: true, symbol: "NASDAQ:AAPL", interval: "D", timezone: "Etc/UTC", theme: "dark", style: "8", locale: "en", toolbar_bg: "#f1f3f6", enable_publishing: false, withdateranges: true, hide_side_toolbar: false, allow_symbol_change: true, details: true, show_popup_button: true, popup_width: "1000", popup_height: "650", container_id: "tradingview_74560" });
	/*
	<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
		<script type="text/javascript">
			new TradingView.widget({ autosize: true, symbol: "NASDAQ:AAPL", interval: "D", timezone: "Etc/UTC", theme: "dark", style: "8", locale: "en", toolbar_bg: "#f1f3f6", enable_publishing: false, withdateranges: true, hide_side_toolbar: false, allow_symbol_change: true, details: true, show_popup_button: true, popup_width: "1000", popup_height: "650", container_id: "tradingview_74560" });
		</script>
	*/

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {}
}

export default Charts;
