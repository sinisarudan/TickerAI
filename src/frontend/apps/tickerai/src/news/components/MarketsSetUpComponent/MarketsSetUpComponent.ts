// import { IMarket } from "@/news/store/store-news-vos";
import { Component, Prop, Vue } from "vue-property-decorator";
import MarketAspectSetupComponent from "../MarketAspectSetupComponent/MarketAspectSetupComponent.vue";
import { ISelection } from "@tickerai-news/i-core";
import { IMarket, IMarketAspectSetup, IMarketsAspectsSelection, IMarketSetup, IMarketAspectSelections } from "@tickerai-news/f-store";
// import { ColaboMaterial } from "@colabo-headless/f-components-vue";

@Component({
	components: {
		// ColaboMaterial,
		MarketAspectSetupComponent,
	},
})
export class MarketsSetUpComponent extends Vue {
	@Prop() public markets!: IMarket[];
	@Prop() public marketsSetup!: IMarketSetup[];
	@Prop() public isActive!: (marketId: string) => boolean;
	@Prop() public activeMarketIndex!: number;
	@Prop() public selectedMarkets!: IMarket[];
	@Prop() public marketsAspectsSelections!: IMarketsAspectsSelection[];
	// @Prop() public marketAspectSelections!: IMarketsAspectsSelection[];

	// @Prop() protected newsPreferences!: INews[];
	// @Prop() protected options!: IMarketsSetUpComponentOptions;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {}

	public goBack(): void {
		this.$emit("prefsBack");
	}
	public stepperChanged(): void {
		const stepperHeaderButton = this.$el?.querySelector(".md-button.md-stepper-header.md-theme-default.md-active");
		console.log("stepperHeaderButton", stepperHeaderButton);
		stepperHeaderButton?.scrollIntoView();
	}

	public isActiveMarket(mInd: number): boolean {
		console.log("mInd", mInd);
		return mInd === this.activeMarketIndex;
	}

	/**
	 * @returns all elements of the marketsSetup whose markets are selected by user:
	 */
	public get marketsSetupsForSelectedMarkets(): IMarketSetup[] {
		return this.marketsSetup.filter((mSetup: IMarketSetup) => {
			return this.selectedMarkets.findIndex((selectedMarket: IMarket) => selectedMarket.id === mSetup.market.id) !== -1;
		});
	}

	public toTitleCase(str: string): string {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
		});
	}

	public marketsAspectsSelectionForMarketAndAspect(market: IMarket, aspect: IMarketAspectSetup): IMarketAspectSelections | undefined {
		const marketsAspectsSelection: IMarketsAspectsSelection | undefined = this.marketsAspectsSelections.find((mas: IMarketsAspectsSelection) => mas.market.id === market.id);
		if (marketsAspectsSelection) {
			const marketAspectSelections: IMarketAspectSelections | undefined = marketsAspectsSelection.marketsAspectSelection.find((mAspect: IMarketAspectSelections) => mAspect.aspect.id === aspect.id);
			return marketAspectSelections;
		}
		return undefined;
	}
	public selectionToggled(toggledSelection: ISelection): void {
		// console.log("[News view::selectionToggled]", selection);
		this.$emit("selectionToggled", toggledSelection);
	}

	public selectionsSelected(selections: ISelection[]): void {
		// console.log("[News view::selectionToggled]", selection);
		this.$emit("selectionsSelected", selections);
	}

	public selectionsDeSelected(selections: ISelection[]): void {
		// console.log("[News view::selectionToggled]", selection);
		this.$emit("selectionsDeSelected", selections);
	}
}

export default MarketsSetUpComponent;
