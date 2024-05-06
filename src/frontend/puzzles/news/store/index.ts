/*
 * Public API Surface of `@tickerai-news/f-store`
 */
import { IHeadings } from "@tickerai-news/i-core";
import { NewsStore } from "./store-news";
export { NewsStore };
import { IStateNewsTotal, IStateNewsStore, NEWS_STORE_PROP_NAME, LOADING_STATUS } from "./store-news-vos";
import { EPrefCFlowState } from "@tickerai-news/i-core";
export { NewsActions, NewsMutations, MyPreferencesActions, MyPreferencesMutations, EMarketId, LOADING_STATUS, IBrowsingLocation } from "./store-news-vos";
export type { TMarkets, IStateNewsStore } from "./store-news-vos";

// https://stackoverflow.com/a/43801887/257561
import mockupNews from "./mockup-news.json";
export { mockupNews };

export type { IMarket, IMarketsAspectsSelection, IMarketSelectionsSerialized, IMarketSetup, TNewsStoreWrapper, IMarketAspectSetup, IMarketAspectSelections } from "./store-news-vos";

const newsStateTotalMockup: IStateNewsTotal = {
	news: {
		// currentNewsId: undefined,
		newsLoadingStatus: mockupNews.showMockupNews ? LOADING_STATUS.LOADED : LOADING_STATUS.NON_INITIATED,
		newsList: mockupNews.showMockupNews ? mockupNews.newsList : [],
		tags: {},
		search: "",
		browsingLocation: {
			market: undefined,
			marketAspect: undefined,
			subfilter: undefined,
		},
	},
	headings: {} as IHeadings,
	markets: {
		marketsAll: {},
		marketsSetup: [],
		recommendedSubFilters: [],
	},
	myPreferences: {
		preferencesManagement: {
			activeMarketIndex: 0,
			isPrefSettingUpFinishedOnce: false,
			preferencesStatus: EPrefCFlowState.NON_INITIATED,
			// prefSettingCanceled: false,
		},
		preferencesPersistent: {
			markets: [],
			marketsAspectsSelections: [],
			// serializedPersonalization: [],
			selectionsSerializedToIDs: [],
		},
	},
	rima: {
		currentUserId: undefined,
		users: [],
	},
};

import { VuexModule } from "vuex-module-decorators";
import { newsStateTotalBlanco } from "./store-news-vos";

/** Support for importing the store generically */
type TStateTotal = IStateNewsTotal;
type TStateStore = IStateNewsStore;
export interface IStoreModule {
	name: string;
	store: VuexModule;
	shouldMockupData: boolean;
	stateBlanco: TStateTotal;
	stateMockup: TStateTotal;
}

const storeModule: IStoreModule = {
	name: "newsStore",
	// necessary to avoid a silly error
	// `Property 'context' is missing in type 'typeof NewsStore' but required in type 'VuexModule<ThisType<any>, any>'`
	// maybe it is due to different versions of `VuexModule` referred here and at the level of the news store but I didn't find two of them
	store: NewsStore as unknown as VuexModule,
	shouldMockupData: mockupNews.showMockupNews,
	stateBlanco: newsStateTotalBlanco,
	stateMockup: newsStateTotalMockup,
};

export { storeModule, TStateTotal, TStateStore, NEWS_STORE_PROP_NAME as STORE_PROP_NAME };
