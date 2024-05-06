import { IMarketAspectSetup, IMarketAspectSelections } from "@tickerai-news/f-store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISelection } from "@tickerai-news/i-core";

const MIN_TO_showSelectAll: number = 5;
const SORT_BY_TITLE: boolean = true;

@Component({
	components: {
		// ColaboMaterial,
	},
})
export class MarketAspectSetupComponent extends Vue {
	// public options: unknown = null;
	// @Prop() protected newsPreferences!: INews[];
	@Prop() public marketAspectSetup!: IMarketAspectSetup;
	/** `marketAspectSelections` had to be designed as a function `() => IMarketAspectSelections` instead of just `IMarketAspectSelections` because the IMarketAspectSelections is created only when its first ISelection is made, so when this component is created it might be `undefined` and is created after `this.$emit("selectionToggled", toggledSelection)`. By having a function, it is dynamically accessed each time */
	@Prop() public marketAspectSelections!: () => IMarketAspectSelections;
	public filter: string = "";

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {}

	public selectAll(): void {
		// this.marketAspectSetup.recommended.forEach((selection: ISelection) => this.$emit("selectionsSelected", selection));
		this.$emit("selectionsSelected", this.marketAspectSetup.recommended);
	}

	/*
	public colorNo: number = 1;
	public get colorRand(): string {
		// const rnd: number = 1 + Math.floor(Math.random() * 7);
		this.colorNo++;
		if (this.colorNo > 7) this.colorNo = 1;
		return this.colorNo.toString();
	}
	*/

	public get showSelectAll(): boolean {
		return this.selectionsRecommendedToShow?.length > MIN_TO_showSelectAll;
	}

	public deselectAll(): void {
		// this.marketAspectSetup.recommended.forEach((selection: ISelection) => this.$emit("selectionsDeSelected", selection));
		this.$emit("selectionsDeSelected", this.marketAspectSetup.recommended);
	}

	public toTitleCase(str: string): string {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
		});
	}

	public toggled(toggledSelection: ISelection): void {
		// const selectionIndex: number = this.marketsAspectsSelections ? this.marketsAspectsSelections.selections.findIndex((selection: ISelection) => selection.id === toggledSelection.id) : -1;
		// if (selectionIndex !== -1) {
		// 	this.marketsAspectsSelections.selections.splice(selectionIndex, 1);
		// } else {
		// 	const selection: ISelection | undefined = this.marketAspectSetup.recommended.find((selection: ISelection) => selection.id === toggledSelection.id);
		// 	if (!selection) {
		// 		console.error("[MarketAspectSetupComponent] selected selection not found!");
		// 	} else {
		// 		this.marketsAspectsSelections.selections.push(selection);
		// 	}
		// }

		// toggledSelection.marketAspectId = this.marketAspectSetup.id;
		// toggledSelection.marketId = this.marketAspectSetup.;
		this.$emit("selectionToggled", toggledSelection);
		// this.selectedMarkets.push(toggledSelection);
	}

	public isSelected(selectionId: string): boolean {
		// if (!this.marketsAspectsSelections) {
		// 	return false;
		// } else {
		const marketsAspectsSelections: IMarketAspectSelections = this.marketAspectSelections();
		return marketsAspectsSelections ? marketsAspectsSelections.selections.findIndex((selection: ISelection) => selection.id === selectionId) !== -1 : false;
		// }
	}

	/* instead of this the centralized and IMPROVED `getSelectingSortingId` from `store-news.ts` should be used
	protected getSelectingSortingId(selection: ISelection, byTitle: boolean = true): string {
		let sortingId: string = "";
		if (byTitle) {
			sortingId = selection?.title as string;
			if (!sortingId) {
				console.error(`getSelectingSortingId: title for selection ${JSON.stringify(selection)} not found`);
			}
		} else {
			sortingId = selection.id as string;
			if (!(selection && selection.id)) {
				console.error(`getSelectingSortingId: id for selection ${JSON.stringify(selection)} not found`);
			}
		}
		return sortingId;
	}*/

	public get selectionsRecommendedToShow(): ISelection[] {
		/* we've done sorting directly in the `NewsActions.GET_PERSONALIZED_NEWS_LIST`:
		this.marketAspectSetup.recommended.sort((a: ISelection, b: ISelection) => {
			const aTitle: string = this.getSelectingSortingId(a, SORT_BY_TITLE);
			const bTitle: string = this.getSelectingSortingId(b, SORT_BY_TITLE);
			return aTitle > bTitle ? 1 : aTitle < bTitle ? -1 : 0;
		});
		*/
		return this.marketAspectSetup.recommended;
		// return this.filter ? this.marketAspectSetup.recommended.filter((s: ISelection) => this.isSelected(s.id)) : this.marketAspectSetup.recommended;
	}

	public get selectionsAllToShow(): ISelection[] {
		return this.marketAspectSetup.recommended.filter((s: ISelection) => s.title.toUpperCase().indexOf(this.filter.toUpperCase()) !== -1);
	}
}

export default MarketAspectSetupComponent;
