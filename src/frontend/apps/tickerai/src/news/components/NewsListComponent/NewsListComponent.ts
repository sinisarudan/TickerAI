import { GlobalStoreWithModules } from "@/store";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import NewsComponent from "../NewsComponent/NewsComponent.vue";
import NewsListAspectComponent from "../NewsListAspectComponent/NewsListAspectComponent.vue";
// import NewsListMarketComponent from "../NewsListMarketComponent/NewsListMarketComponent.vue";
import Charts from "../Charts/Charts.vue";
import WidgetData from "../WidgetData/WidgetData.vue";
import WidgetNews from "../WidgetNews/WidgetNews.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { INews, ISelection } from "@tickerai-news/i-core";
import { EMarketId, IMarket, IMarketsAspectsSelection, TMarkets, LOADING_STATUS, IMarketAspectSelections, IMarketAspectSetup, IBrowsingLocation, NewsMutations, IMarketSetup } from "@tickerai-news/f-store";
import { MSG_CS_DIALOG } from "@/util/DialogCS/DialogCS";
import { title } from "process";
// import MyPreferencesMarketComponent from "../MyPreferencesMarketComponent/MyPreferencesMarketComponent";

export interface INewsListComponentOptions {
	newsLoadingStatus: LOADING_STATUS;
}

const SHOW_ONLY_NON_EMPTY_SUBFILTERS: boolean = true;

const HOMEPAGE_TITLE: string = "TickerAI - A Mark Cuban Company - AI-based, Personalized Financial Market News Aggregator";
const TITLE_FOR_ALL: string = "all @ TickerAI";

// if true at the beginning none of marketaspect and subfilter are preselected and we show all news. Then narrowing news when some is selected
// We agreed with Lazar to change it in this way, earlier with Joe it was made that news are preselected/narrowed by preselecting first marketaspect and subfilter and the list
const EnableShowingAllNewsUntilNarrowed: boolean = true;

@Component({
	components: {
		ColaboMaterial,
		NewsComponent,
		// NewsListMarketComponent,
		NewsListAspectComponent,
		Charts,
		WidgetData,
		WidgetNews,
		// Tabs,
		// TabItem,
	},
})
export class NewsListComponent extends Vue {
	@Prop() protected newsList!: INews[];
	@Prop() protected options!: INewsListComponentOptions;
	@Prop() protected markets!: TMarkets;
	@Prop() public marketsAspectsSelections!: IMarketsAspectsSelection[];
	@Prop() public marketSetups!: IMarketSetup[];
	@Prop() public showPersonalizedNews!: boolean;
	@Prop() public getMarketForSelectionId!: (selectionId?: string) => IMarket;
	// protected _marketsAspectsSelections!: IMarketsAspectsSelection[];
	// @Prop() public set marketsAspectsSelections(val: IMarketsAspectsSelection[]) {
	// 	this._marketsAspectsSelections = val;
	// }

	// public get marketsAspectsSelections(): IMarketsAspectsSelection[] {
	// 	return this._marketsAspectsSelections;
	// }

	// eslint-disable-next-line @typescript-eslint/no-empty-function

	private store: GlobalStoreWithModules = this["$store"] as GlobalStoreWithModules;

	public get marketsForTabs(): IMarket[] | TMarkets {
		return this.showPersonalizedNews ? this.marketsAspectsSelections.map( (mas: IMarketsAspectsSelection) => mas.market) : this.markets;
	}

	public selectedTabId: string = "";

	// when we introduced deep linking SEO support, Lazar and Sinisa decided that we need to have deep-links and ux support for non personalized news too
	// earlier Joe wanted to avoid UX for selection of marketaspects and subfilter for non-personalized users in order to motivate them to personalize.
	// Yet the still have motivation to be able to narrow and focus their news portfolio
	public SHOW_NON_PERSONALIZED_NEWS_AS_PERSONALIZED: boolean = true;
	// public marketIdSelectedInTabs: string = "";

	protected _marketIdSelectedInTabs: string = "";
	public get marketIdSelectedInTabs(): string {
		return this.browsingLocation.market ? this.browsingLocation.market : "";
		// return this._marketIdSelectedInTabs || "";
	}
	public set marketIdSelectedInTabs(market: string) {
		this._marketIdSelectedInTabs = market;
		const browsingLocationCopy: IBrowsingLocation = {
			market: market.toUpperCase().replace("-", "_"),
			marketAspect: undefined, // this.browsingLocation?.marketAspect,
			subfilter: undefined, // this.browsingLocation?.subfilter,
		};
		// console.log("[set marketIdSelectedInTabs] browsingLocationCopy", browsingLocationCopy);
		this.store.commit(NewsMutations.SET_BROWSING_LOCATION, browsingLocationCopy);
		this.setPathToBrowsingLocation();
		this.marketAspectSelect(undefined);
		// this._marketIdSelectedInTabs = market;
	}

	protected setPathToBrowsingLocation(): void {
		const marketPath: string = (this.browsingLocation.market ? "/" + this.browsingLocation.market : "").toLowerCase().replace(/_/g, "-");
		const marketAspectPath: string = this.browsingLocation.marketAspect ? "/" + this.browsingLocation.marketAspect : "";
		const subfilterPath: string = this.browsingLocation.subfilter ? "/" + this.browsingLocation.subfilter : "";
		const path: string = "/news" + marketPath + marketAspectPath + subfilterPath;
		// this.$router.push({ name: "Default" });
		const encodedPath: string = encodeURI(path);
		console.log(`[setPathToBrowsingLocation]: path`, path, "; encodedPath:", encodedPath);
		if (this.$router.currentRoute.path !== encodedPath) {
			this.$router.push({ path: encodedPath }); // -> /user/eduardo
		}
		// TODO: to hide for 'news/all'
		const title: string = (subfilterPath + marketAspectPath + marketPath + " @ TickerAI").substring(1).replace(/\//g, " - ");
		this.setTitle(title);
	}

	protected setTitle(title: string): void {
		console.log(`setTitle(${title})`);
		if (title === TITLE_FOR_ALL) title = HOMEPAGE_TITLE;
		document.title = title;
	}

	protected setMarketAspectSelectedFromBrowsedRetriesNo: number = 10;
	protected setMarketAspectSelectedFromBrowsedRetriesTm: number = 300;
	protected setMarketAspectSelectedFromBrowsed(): void {
		this.marketAspectSelected = this.store.getters.marketAspectSetupsBrowsed;
		console.log(`[setMarketAspectSelectedFromBrowsed] ${this.setMarketAspectSelectedFromBrowsedRetriesNo} this.marketAspectSelected:`, this.marketAspectSelected, ", news.browsingLocation:", this.store.state.newsStore.news.browsingLocation);
		if (!this.marketAspectSelected && this.setMarketAspectSelectedFromBrowsedRetriesNo-- > 0) {
			setTimeout(this.setMarketAspectSelectedFromBrowsed, this.setMarketAspectSelectedFromBrowsedRetriesTm);
		}
	}

	protected setSelectionFromBrowsedRetriesNo: number = 10;
	protected setSelectionFromBrowsedRetriesTm: number = 300;
	protected setSelectionFromBrowsed(): void {
		this.subfilterSelected = this.store.getters.getSelectionBrowsed;
		console.log(`[setSelectionFromBrowsed] ${this.setSelectionFromBrowsedRetriesNo} this.subfilterSelected:`, this.subfilterSelected, ", news.browsingLocation:", this.store.state.newsStore.news.browsingLocation);
		if (!this.subfilterSelected && this.setSelectionFromBrowsedRetriesNo-- > 0) {
			setTimeout(this.setSelectionFromBrowsed, this.setSelectionFromBrowsedRetriesTm);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		const browsingLocation: IBrowsingLocation = this.browsingLocation;
		this.marketAspectSelected = this.store.getters.marketAspectSetupsBrowsed;
		this.subfilterSelected = this.store.getters.getSelectionBrowsed;
		this.setMarketAspectSelectedFromBrowsed();
		this.setSelectionFromBrowsed();
		console.log("[NewsListComponent] browsingLocation: ", browsingLocation);
		// if (browsingLocation.marketAspect) {
		// 	const mas: IMarketAspectSetup | undefined = (this.store.getters.marketAspectSetups as IMarketAspectSetup[]).find((ma: IMarketAspectSetup) => ma.title === browsingLocation.marketAspect);
		// 	if (mas) {
		// 		this.marketAspectSelected = mas;
		// 	}
		// } else {
		// 	this.marketAspectSelected = this.marketAspectsListForFiltering ? this.marketAspectsListForFiltering[0].aspect : null; //this.store.state.newsStore.markets.marketsSetup[0].aspects[0];
		// }
	}

	public get browsingLocation(): IBrowsingLocation {
		const browsingLocation: IBrowsingLocation = this.store.state.newsStore.news.browsingLocation;
		return browsingLocation;
	}

	/* NOT USED ANYMORE bc of change explained at `EnableShowingAllNewsUntilNarrowed`:
	@Watch("_marketIdSelectedInTabs")
	marketIdSelectedInTabsChanged(marketIdSelectedInTabs: string): void {
		//after market is selected we select the first of its aspects
		console.log("marketIdSelectedInTabsChanged", marketIdSelectedInTabs);
		if (EnableShowingAllNewsUntilNarrowed && this.marketAspectsListForFiltering && this.marketAspectsListForFiltering.length > 0) {
			this.marketAspectSelect(this.marketAspectsListForFiltering[0]);
		}
	}
	*/

	public get selectedMarkets(): IMarket[] {
		return this.marketsAspectsSelections.map((mas: IMarketsAspectsSelection) => mas.market);
	}

	public marketIcon(marketId: string): string | null {
		switch (marketId) {
			case EMarketId.STOCKS:
				return "img/markets/ico-stocks.png";
			case EMarketId.CRYPTO:
				return "img/markets/ico-crypto.png";
			case EMarketId.ECONOMY_BUSINESS:
				return "img/markets/ico-econ-bus.png";
			case EMarketId.COMMODITIES_FOREX:
				return "img/markets/ico-comm-frx.png";
			case EMarketId.FIXED_INCOME:
				return "img/markets/ico-income.png";
			default:
				return null;
		}
	}

	// protected marketAspectSelected: string = "";
	// public get marketIdSelectedInTabs(): string {
	// 	return this.browsingLocation.market ? this.browsingLocation.market : "";
	// 	// return this._marketIdSelectedInTabs || "";
	// }
	// public set marketIdSelectedInTabs(market: string) {
	// 	this._marketIdSelectedInTabs = market;
	// 	const browsingLocationCopy: IBrowsingLocation = {
	// 		market: market,
	// 		marketAspect: this.browsingLocation?.marketAspect,
	// 		subfilter: this.browsingLocation?.subfilter,
	// 	};
	// 	this.store.commit(NewsMutations.SET_BROWSING_LOCATION, browsingLocationCopy);
	// 	// this._marketIdSelectedInTabs = market;
	// }

	/** MARKET-ASPECTS LIST FOR FILTERING */

	protected marketAspectSelected: IMarketAspectSetup | undefined = this.store.getters.marketAspectSetupsBrowsed;

	public showMarketAspectsAndFilters(marketIdSelectedInTabs: string): boolean {
		return !["ALL", "NEWS", "CHARTS", "DATA"].includes(marketIdSelectedInTabs);
	}
	public showFilters(): boolean {
		return !!this.marketAspectSelected;
	}

	// public getNewsList(): INews[] {
	// 	return this.newsList;
	// }

	public marketAspectSelect(mas: IMarketAspectSetup | undefined): void {
		this.marketAspectSelected = mas;
		if (mas) {
			if (EnableShowingAllNewsUntilNarrowed) {
				this.subfilterSelect(undefined);
			} else {
				//after market-aspect is selected we select the first of its subfilters
				if (this.subfiltersListForFiltering() && this.subfiltersListForFiltering().length > 0) {
					this.subfilterSelect(this.subfiltersListForFiltering()[0]);
				}
			}
		} else {
			this.subfilterSelect(undefined);
		}

		const browsingLocationCopy: IBrowsingLocation = {
			market: this.browsingLocation?.market,
			marketAspect: mas?.title.toLowerCase().replace(/\s/g, "-") ?? undefined,
			subfilter: undefined,
		};
		// console.log("[set marketIdSelectedInTabs] browsingLocationCopy", browsingLocationCopy);
		this.store.commit(NewsMutations.SET_BROWSING_LOCATION, browsingLocationCopy);
		this.setPathToBrowsingLocation();
		// this.$forceUpdate();
	}

	public get marketsForFiltering(): IMarket[] {
		console.log("[marketsForFiltering] marketSetups", this.marketSetups);
		if (this.showPersonalizedNews) {
			return this.marketsAspectsSelections.map( (mas: IMarketsAspectsSelection) => mas.market);
		} else {
			return this.marketSetups.map((ms: IMarketSetup) => ms.market);
		}
	}

	public get marketAspectsListForFiltering(): IMarketAspectSetup[] {
		console.log("getSelectedMarket", this.marketsAspectsSelections);
		if (this.showPersonalizedNews) {
			return (this.marketsAspectsSelections.find((m: IMarketsAspectsSelection) => m.market.id === this.marketIdSelectedInTabs)?.marketsAspectSelection ?? []).map((mas: IMarketAspectSelections) => mas?.aspect);
		} else {
			return this.marketSetups.find((ms: IMarketSetup) => ms.market.id === this.marketIdSelectedInTabs)?.aspects ?? [];
		}
	}

	public isMarketAspectSelected(selectionId: string): boolean {
		return !!this.marketAspectSelected && this.marketAspectSelected.id === selectionId;
	}

	public newsListForSelectedAspect(): INews[] {
		let selectedNewsList: INews[] = [];
		if (this.marketAspectSelected) {
			selectedNewsList = this.newsList.filter((news: INews) => news.selection?.type === (this.marketAspectSelected as IMarketAspectSetup).type);
		}
		return selectedNewsList;
	}

	public newsListForMarket(market: IMarket | undefined): INews[] {
		if (!market) return this.newsList; //return all news if market is not selected
		const filteredNews: INews[] = this.newsList.filter((news: INews) => {
			//TODO: getMarketForSelectionId is too slow. Make it faster by doing as in `newsListForSelectedAspect` but with checking type if in the list of all marketAspects under market)
			const marketOfNews: IMarket = this.getMarketForSelectionId(news.subfilter);
			return market.id && market.id === marketOfNews.id;
		});
		/* old by TAGS:
		const filteredNews: INews[] = this.newsList.filter((news: INews) =>
			news.tags.find((tagId: string) => {
				return this.tagToMarket(tagId).id === market.id;
			})
		);
		*/
		return filteredNews;
	}

	public getMarketById(marketId: string): IMarket | undefined {
		const market: IMarket | undefined = this.store.state.newsStore.markets.marketsAll[marketId as EMarketId];
		console.log("[getMarketById] market", market);
		return market;
	}

	public showThisNewsListAspectComponent(marketId: string): boolean {
		return this.marketIdSelectedInTabs === marketId;
	}

	public newsListBreadCrumbs: string = "/";
	public newsListForSelection(): INews[] {
		let localNewsListBreadCrumbs: string = "/";
		let selectedNewsList: INews[] = [];
		localNewsListBreadCrumbs = this.marketIdSelectedInTabs + "/";
		if (EnableShowingAllNewsUntilNarrowed) {
			//1) market is always selected, 2) marketAspectSelected might be undefined; 3) subfilterSelected might be undefined
			if (this.marketAspectSelected) {
				localNewsListBreadCrumbs += this.marketAspectSelected.title + "/";
				if (this.subfilterSelected) {
					localNewsListBreadCrumbs += (this.subfilterSelected as ISelection).title + "/";
					// if marketAspectSelected and subfilterSelected, we return all news for the subfilterSelected
					selectedNewsList = this.newsList.filter((news: INews) => (this.subfilterSelected ? news.selection?.id === (this.subfilterSelected as ISelection).id : false));
				} else {
					// if marketAspectSelected but not subfilterSelected, we return all news for the marketAspectSelected
					selectedNewsList = this.newsListForSelectedAspect();
				}
			} else {
				selectedNewsList = this.newsListForMarket(this.getMarketById(this.marketIdSelectedInTabs));
			}
		} else {
			if (this.marketAspectSelected) {
				selectedNewsList = this.newsList.filter((news: INews) => (this.subfilterSelected ? news.selection?.id === (this.subfilterSelected as ISelection).id : false));
			}
		}
		this.newsListBreadCrumbs = localNewsListBreadCrumbs;
		return selectedNewsList;
	}

	public numberOfNewsForSubfilter(subfilter: ISelection): number {
		if (subfilter) {
			const newsNo: number = this.newsList.reduce((summingAccumulator, news) => {
				return news.selection?.id === subfilter.id ? summingAccumulator + 1 : summingAccumulator;
			}, 0);
			return newsNo;
		} else {
			return 0;
		}
	}

	/** MARKET-ASPECTS LIST FOR FILTERING - END */

	/** SUBFILTERS LIST FOR FILTERING */
	protected subfilterSelected: ISelection | undefined = this.store.getters.getSelectionBrowsed;

	public subfiltersListForFiltering(): ISelection[] {
		if (this.marketAspectSelected) {
			if (SHOW_ONLY_NON_EMPTY_SUBFILTERS) {
				return this.marketAspectSelected.recommended.filter((selection: ISelection) => this.numberOfNewsForSubfilter(selection) > 0);
			} else {
				return this.marketAspectSelected.recommended;
			}
		} else {
			return [];
		}
	}

	public subfilterSelect(selected: ISelection | undefined): void {
		console.log(`[subfilterSelect] selected`, selected);
		this.subfilterSelected = selected;
		const browsingLocationCopy: IBrowsingLocation = {
			market: this.browsingLocation?.market,
			marketAspect: this.browsingLocation?.marketAspect,
			subfilter: selected?.title.toLowerCase().replace(/\s/g, "-" ?? undefined),
		};
		// console.log("[set marketIdSelectedInTabs] browsingLocationCopy", browsingLocationCopy);
		this.store.commit(NewsMutations.SET_BROWSING_LOCATION, browsingLocationCopy);
		this.setPathToBrowsingLocation();
		this.$forceUpdate();
	}

	public isSubfilterSelected(selection: ISelection): boolean {
		return !!this.subfilterSelected && this.subfilterSelected.id === selection.id;
		// }
	}

	/** SUBFILTERS LIST FOR FILTERING - END */

	public get newsNo(): number {
		return this.newsList.length;
	}

	public get newsNoText(): string {
		return this.newsNo === 0 ? "are no articles" : (this.newsNo > 1 ? "are " : "is ") + this.newsNo + (this.newsNo > 1 ? " articles" : " article");
	}

	public get newsSearch(): string {
		return this.store.state.newsStore.news.search;
	}

	protected get isPersonalized(): boolean {
		return this.store.state.newsStore.myPreferences.preferencesManagement.isPrefSettingUpFinishedOnce;
	}

	/** C-TABS

	protected cActiveTab: string = EMarketId.STOCKS;

	public cTabClicked(tabId: string): void {
		this.cActiveTab = tabId;
	}
	public cTabIsActive(tabId: string): boolean {
		return tabId === this.cActiveTab; //return marketId === this.markets[this.store.state.myPreferences.activeMarketIndex].id;
	}

	*/

	/* OLD:
	protected tagToMarket(tagId: string): IMarket {
		switch (tagId) {
			case "tag-stocks":
				return this.markets[EMarketId.STOCKS] as IMarket;
			case "tag-crypto":
				return this.markets[EMarketId.CRYPTO] as IMarket;
			case "tag-economy-and-business":
				return this.markets[EMarketId.ECONOMY_BUSINESS] as IMarket;
			case "tag-futures-and-commodities":
				return this.markets[EMarketId.COMMODITIES_FOREX] as IMarket;
			case "tag-fixed-income":
				return this.markets[EMarketId.FIXED_INCOME] as IMarket;
			default:
				return {} as IMarket;
		}
	}
	*/
}

export default NewsListComponent;
