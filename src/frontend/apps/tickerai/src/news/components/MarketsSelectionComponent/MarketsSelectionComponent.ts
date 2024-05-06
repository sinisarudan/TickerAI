import { IMarket } from "@tickerai-news/f-store";
import { Component, Prop, Vue } from "vue-property-decorator";
// import NewsComponent from "../NewsComponent/NewsComponent.vue";
// import { ColaboMaterial } from "@colabo-headless/f-components-vue";

@Component({
	components: {
		// ColaboMaterial,
	},
})
export class MarketsSelectionComponent extends Vue {
	@Prop() public markets!: IMarket[];
	@Prop() public selectedMarkets!: IMarket[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public options: any = null;
	// @Prop() protected newsPreferences!: INews[];
	// @Prop() protected options!: IMarketsSelectionComponentOptions;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {}

	public toggled(marketId: string): void {
		const marketIndex: number = this.selectedMarkets.findIndex((market: IMarket) => market.id === marketId);
		if (marketIndex !== -1) {
			this.$emit("marketToggled", this.selectedMarkets[marketIndex]);
			// this.selectedMarkets.splice(marketIndex, 1);
		} else {
			const market: IMarket | undefined = this.markets.find((market: IMarket) => market.id === marketId);
			if (!market) {
				console.error("[MarketsSelectionComponent] selected market not found!");
			} else {
				this.$emit("marketToggled", market);
			}
		}
	}

	public isSelected(marketId: string): boolean {
		return this.selectedMarkets.findIndex((market: IMarket) => market.id === marketId) !== -1;
	}
}

export default MarketsSelectionComponent;
