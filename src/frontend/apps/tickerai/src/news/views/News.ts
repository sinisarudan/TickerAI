import { Component, Vue } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import HeadingNewsListComponent from "@/news/components/HeadingNewsListComponent/HeadingNewsListComponent.vue";
import { IHeadingNewsListComponentOptions } from "../components/HeadingNewsListComponent/HeadingNewsListComponent";
import SearchNewsComponent from "@/news/components/SearchNewsComponent/SearchNewsComponent.vue";
import NewsListComponent from "@/news/components/NewsListComponent/NewsListComponent.vue";
import { INewsListComponentOptions } from "../components/NewsListComponent/NewsListComponent";
import { INews, IHeadings } from "@tickerai-news/i-core";
import { IMarket, IMarketsAspectsSelection, TMarkets, TNewsStoreWrapper, IMarketSetup, IBrowsingLocation, NewsMutations, NewsActions, IMarketSelectionsSerialized, MyPreferencesActions, LOADING_STATUS } from "@tickerai-news/f-store";

import _store from "@/store";
import { EDialogType, MSG_CS_DIALOG } from "@/util/DialogCS/DialogCS";

@Component({
	components: {
		HeadingNewsListComponent,
		SearchNewsComponent,
		NewsListComponent,
		ColaboMaterial,
	},
})
class News extends Vue {
	// private store: TNewsStoreWrapper = this["$store"] as TNewsStoreWrapper;
	private store: TNewsStoreWrapper = _store as unknown as TNewsStoreWrapper;

	protected alert: boolean = false;

	mounted(): void {
		console.log(`News View: mounted:: market ${this.$route.params.market}', marketaspect: '${this.$route.params.marketaspect}', subfilter: '${this.$route.params.subfilter}`);
		const browsingLocation: IBrowsingLocation = {
			market: this.$route.params.market ? this.$route.params.market.toUpperCase() : this.$route.params.market,
			marketAspect: this.$route.params.marketaspect,
			subfilter: this.$route.params.subfilter,
		};
		console.log(`News View: mounted: browsingLocation:`, browsingLocation);
		//decodeURI is automatically done:
		// if (browsingLocation.market) browsingLocation.market = decodeURI(browsingLocation.market);
		// if (browsingLocation.marketAspect) browsingLocation.market = decodeURI(browsingLocation.marketAspect);
		// if (browsingLocation.subfilter) browsingLocation.market = decodeURI(browsingLocation.subfilter);
		// console.log(`News View: mounted: browsingLocation (afterDecode):`, browsingLocation);
		this.store.commit(NewsMutations.SET_BROWSING_LOCATION, browsingLocation);
	}

	/******************************
	 * Preferences
	 * ***************************/

	public getMarketForSelectionId(selectionId: string): IMarket {
		return this.store.getters.getMarketForSelectionId(selectionId);
	}

	protected get marketsAspectsSelections(): IMarketsAspectsSelection[] {
		return this.store.getters.marketsAspectsSelectionsOrdered;
	}

	protected get marketSetups(): IMarketSetup[] {
		return this.store.state.newsStore.markets.marketsSetup;
	}

	public get isPrefSettingUpFinishedOnce(): boolean {
		return this.store.state.newsStore.myPreferences.preferencesManagement.isPrefSettingUpFinishedOnce;
	}

	protected get selectedMarkets(): IMarket[] {
		return this.store.state.newsStore.myPreferences.preferencesPersistent.markets;
	}

	get headings(): IHeadings {
		const headings: IHeadings = this.store.state.newsStore.headings;
		headings.mainHeadline = headings?.mainHeadline?.toUpperCase();
		return headings;
	}

	public personalizeNews(): void {
		this.$emit("personalizeNews");
	}

	protected get markets(): TMarkets {
		return this.store.state.newsStore.markets.marketsAll;
	}

	public get showPersonalizedNews(): boolean {
		return this.store.state.newsStore.myPreferences.preferencesManagement.isPrefSettingUpFinishedOnce;
	}

	/******************************
	 * News
	 * ***************************/
	protected get headingNewsList(): INews[] {
		return this.store.state.newsStore.news.newsList.filter((news: INews) => news.headingNews);
		// return [this.store.state.newsStore.news.newsList[0]];
	}

	protected get newsList(): INews[] {
		// return this.store.state.newsStore.news.newsList;
		const filteredNews: INews[] = this.store.state.newsStore.news.newsList.filter((news: INews) => !news.headingNews);
		return filteredNews;
	}

	protected get headingNewsListOptions(): IHeadingNewsListComponentOptions {
		return {
			newsLoaded: this.store.state.newsStore.news.newsLoadingStatus === LOADING_STATUS.LOADED,
		};
	}

	protected get newsListOptions(): INewsListComponentOptions {
		return {
			newsLoadingStatus: this.store.state.newsStore.news.newsLoadingStatus,
		};
	}

	protected get newsLoaded(): boolean {
		return this.store.state.newsStore.news.newsLoadingStatus === LOADING_STATUS.LOADED;
	}

	protected async getPersonalizedNews(): Promise<void> {
		const newsList: INews[] = await this.store.dispatch(NewsActions.GET_PERSONALIZED_NEWS_LIST);
		console.log(`newsList: ${newsList}`);
	}

	public async doSearch(search: string): Promise<void> {
		console.log("[News] doSearch", search);
		this.store.commit(NewsMutations.SET_NEWS_SEARCH, search);
		await this.store.dispatch(NewsActions.GET_PERSONALIZED_NEWS_LIST);
		// this.$emit("do-search", search);
	}

	protected async savePersonalization(): Promise<void> {
		const marketsSelectionsSerialized: IMarketSelectionsSerialized[] = await this.store.dispatch(MyPreferencesActions.SERIALIZE_PERSONALIZATION);
		console.log(`marketsSelectionsSerialized: ${marketsSelectionsSerialized}`);
	}

	protected async loadPersonalization(): Promise<void> {
		const marketsSelectionsSerialized: IMarketSelectionsSerialized[] = await this.store.dispatch(MyPreferencesActions.DESERIALIZE_PERSONALIZATION);
		console.log(`marketsSelectionsSerialized: ${marketsSelectionsSerialized}`);
	}
}

export default News;
