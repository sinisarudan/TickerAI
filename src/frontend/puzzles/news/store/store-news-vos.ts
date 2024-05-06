import { Store } from "vuex";
import { INews, EPrefCFlowState, ITag, ESelectionType, ISelection, IHeadings } from "@tickerai-news/i-core";
import { IStateRima } from "@colabo-rima/f-core";

export enum ErrorColaboLevel {
	WARNING = "WARNING",
	ERROR = "ERROR",
	CRITICAL_ERROR = "CRITICAL_ERROR",
}

export interface ErrorColabo {
	code: string;
	msg?: string;
	level: ErrorColaboLevel;
	origin?: string;
}

/** set of actions for the News store module */
export enum NewsActions {
	// "GET_ALL_NEWS_LIST" = "NewsActions.GET_ALL_NEWS_LIST",
	GET_PERSONALIZED_NEWS_LIST = "NewsActions.GET_PERSONALIZED_NEWS_LIST",
	GET_HEADINGS = "NewsActions.GET_HEADINGS",
	GET_ASPECT_FOR_SELECTIONS = "NewsActions.GET_ASPECT_FOR_SELECTIONS",
	GET_MARKET_FOR_SELECTIONS = "NewsActions.GET_MARKET_FOR_SELECTIONS",
	INITIALIZE = "NewsActions.INITIALIZE",
	LOG_ERROR = "NewsActions.LOG_ERROR",
}

/** set of mutation for the News store module */
export enum NewsMutations {
	SET_CURRENT_NEWS_ID = "NewsMutations.SET_CURRENT_NEWS_ID",
	SET_BROWSING_LOCATION = "NewsMutations.SET_BROWSING_LOCATION",
	SET_NEWS_LIST = "NewsMutations.SET_NEWS_LIST",
	SET_HEADINGS = "NewsMutations.SET_HEADINGS",
	SET_NEWS_LOADING_STATUS = "NewsMutations.SET_NEWS_LOADING_STATUS",
	SET_NEWS_SEARCH = "NewsMutations.SET_NEWS_SEARCH",
	ORDER_SELECTIONS = "NewsMutations.ORDER_SELECTIONS",
	ORDER_NEWS_LIST = "NewsMutations.ORDER_NEWS_LIST",
}

export enum ESelectionAction {
	SELECT = "SELECT",
	// DESELECT_ALL = "DESELECT_ALL",
	DESELECT = "DESELECT",
	TOGGLE = "TOGGLE",
}

/** set of mutation for the MyPreferences NS in the News store module */
export enum MyPreferencesMutations {
	TOGGLE_MARKET_SELECTION = "MyPreferencesMutations.TOGGLE_MARKET_SELECTION",
	TOGGLE_PREFERENCES_INDIVIDUAL_SELECTION = "MyPreferencesMutations.TOGGLE_PREFERENCES_INDIVIDUAL_SELECTION",
	PREFERENCES_SETTING_FINISHED_ONCE = "MyPreferencesMutations.PREFERENCES_SETTING_FINISHED_ONCE",
	SET_PREFERENCES_STATUS = "MyPreferencesMutations.SET_PREFERENCES_STATUS",
	SET_SERIALIZED_PERSONALIZATION = "MyPreferencesMutations.SET_SERIALIZED_PERSONALIZATION",
	SELECT_PREFERENCES_SELECTIONS = "MyPreferencesMutations.SELECT_PREFERENCES_SELECTIONS",
	DESELECT_PREFERENCES_SELECTIONS = "MyPreferencesMutations.DESELECT_PREFERENCES_SELECTIONS",
	SET_ACTIVE_MARKET_INDEX = "MyPreferencesMutations.SET_ACTIVE_MARKET_INDEX",
	// PREFERENCES_SETTING_CANCELED = "PREFERENCES_SETTING_CANCELED",
}

/** set of actions for the MyPreferences NS in the News store module */
export enum MyPreferencesActions {
	DESERIALIZE_PERSONALIZATION = "MyPreferencesActions.DESERIALIZE_PERSONALIZATION",
	SAVE_PERSONALIZATION_INTO_DB = "MyPreferencesActions.SAVE_PERSONALIZATION_INTO_DB",
	LOAD_PERSONALIZATION_FROM_DB = "MyPreferencesActions.LOAD_PERSONALIZATION_FROM_DB",
	SERIALIZE_PERSONALIZATION = "MyPreferencesActions.SERIALIZE_PERSONALIZATION", //had to be an action bc it calls a mutation from itself what is not possible from the mutation but action
	CLEAN_PERSONALIZATION = "MyPreferencesActions.CLEAN_PERSONALIZATION",
	ORDER_MARKETS_AND_ASPECTS_AND_SELECTIONS = "MyPreferencesActions.ORDER_MARKETS_AND_ASPECTS_AND_SELECTIONS",
	CLEAN_EMPTY_MARKETS_AND_ASPECTS = "MyPreferencesActions.CLEAN_EMPTY_MARKETS_AND_ASPECTS",
}

export interface IMarket {
	title: string;
	text: string;
	id: string;
	thumb?: string;
}

/**
 * serialized Selections inside of a market aspect
 */
export interface IAspectSelectionsSerialized {
	aspectId: string;
	selections: string[];
}

/**
 * serialized Selections inside of markets' aspects
 */
export interface IMarketSelectionsSerialized {
	marketId: string;
	aspectsSelections: IAspectSelectionsSerialized[];
}

export interface IFilterSetup {
	label: string;
}

/**
 * aspect of a market (each market has from 1 to four etc aspects, with individual selections in them)
 */
export interface IMarketAspectSetup {
	id: string;
	title: string;
	subtitle: string;
	filter?: IFilterSetup;
	type: ESelectionType;
	recommended: ISelection[];
}

export interface IMarketSetup {
	market: IMarket;
	aspects: IMarketAspectSetup[];
}

export enum LOADING_STATUS {
	NON_INITIATED = "LOADING_STATUS.NON_INITIATED",
	LOADING = "LOADING_STATUS.LOADING",
	LOADED = "LOADING_STATUS.LOADED",
}

export interface IBrowsingLocation {
	market?: string;
	marketAspect?: string;
	subfilter?: string;
}

/** all props that the News store module should contain */
export interface IStateNews {
	currentNewsId?: string;
	newsLoadingStatus: LOADING_STATUS;
	tags: Record<string, ITag>;
	newsList: INews[];
	search: string;
	browsingLocation: IBrowsingLocation;
}

/** the default value for the store wrapped to merge properly into the main store
 * It should be used just for testing, otherwise use `stateNewsesBlanco`
 */
export enum EMarketId {
	STOCKS = "STOCKS",
	CRYPTO = "CRYPTO",
	ECONOMY_BUSINESS = "ECONOMY_BUSINESS",
	COMMODITIES_FOREX = "COMMODITIES_FOREX",
	FIXED_INCOME = "FIXED_INCOME",

	// STOCKS = "406bd9f172a103093eb50211",
	// CRYPTO = "406bd9f172a103093eb50212",
	// ECONOMY_BUSINESS = "406bd9f172a103093eb50213",
	// COMMODITIES_FOREX = "406bd9f172a103093eb50214",
	// FIXED_INCOME = "406bd9f172a103093eb50215",
}

export type TMarkets = Partial<Record<EMarketId, IMarket>>;
export interface IStateMarkets {
	/** all available markets (probably will be removed, due to redundancy - the markets can be extracted (as a getter) from `IMarketSetup`) */
	marketsAll: TMarkets;
	/** contains the markets structure, its aspects and subfilters */
	marketsSetup: IMarketSetup[];
	/** a set of all subfilters/selections recommended to users.
	 * So far they are packed all in on list but dividable to markets aspects by their type
	 * (`SubFilters` is a term used by Joe for what we call `Selections`) */
	recommendedSubFilters: ISelection[];
}

/**
 * user's selections for a specific aspect of a market:
 */
export interface IMarketAspectSelections {
	/** telling for which aspect is this setup */
	aspect: IMarketAspectSetup;
	/** an array of the selections/subfilters that user has selected to follow in this aspect */
	selections: ISelection[];
}

/**
 * user's selections for all aspects of a market
 */
export interface IMarketsAspectsSelection {
	/** telling for which market is this setup */
	market: IMarket;
	/** an array of preferences for each selected aspect of the market */
	marketsAspectSelection: IMarketAspectSelections[];
}

/** My Preferences - PERSISTENT user's preferences */
export interface IStateMyPreferencesPersistent {
	/** user's selections for all aspects in all markets */
	marketsAspectsSelections: IMarketsAspectsSelection[];
	/** selected markets */
	markets: IMarket[]; //TODO: this becomes redundant due to `marketAspects` from where it can be extracted, but `markets` are kept in the ORDER by Mutation::`TOGGLE_MARKET_SELECTION` changes, so if omitting `marketsAspectsSelections` should be kept in order
	/** TODO: (probably temporary stored here) - serialized preferences  */
	selectionsSerializedToIDs: string[];
	//serializedPersonalization: IMarketSelectionsSerialized[];
}

/** My Preferences TEMPORARY INFO required for running the process of setting up and displaying user preferences */
export interface IStateMyPreferencesManagement {
	/** index of a market being set-up in the `myPreferences.markets` array */
	activeMarketIndex: number;
	/** tells us if the preferences are set up anytime in the past (compared to `preferencesStatus` that resets for each editing of preferences) */
	isPrefSettingUpFinishedOnce: boolean;
	// prefSettingCanceled: boolean;
	preferencesStatus: EPrefCFlowState;
}

/**
 * contains:
 * - all the temporary info required for running the process of setting up and displaying user preferences of markets, their aspects and selections, as well as
 * - as persistent info about the preferences that user has made
 */
export interface IStateMyPreferences {
	/** persistent aspects of the preferences setting - the ones that should be preserved throughout sessions - e.g. saved in DB */
	preferencesPersistent: IStateMyPreferencesPersistent;
	preferencesManagement: IStateMyPreferencesManagement;
}

/** the wrapper that will be used for merging of the store module into the whole store.
 * This means that the whole module will be `scoped` under the `news` namespace.
 * !NOTE: this is not true for the actions, mutations and getters! They are all flat as basically everything with
 * store modules. That is the main reason why we added `news` namespacing here to scope data
 * !IMPORTANT: Subfilters - ISelection-s are stored redundantly (for now) in TWO places in the `newsStore`:
 * 1) `markets.marketsSetup.aspects.recommended` and 2) `markets.recommendedSubFilters`
 * Reasons for this are explained in `tickerai-infrastructure/markets-structure.md`
 */
export interface IStateNewsTotal {
	news: IStateNews;
	headings: IHeadings;
	markets: IStateMarkets; //containing static info of markets structure - their aspects and selections/subfilters
	myPreferences: IStateMyPreferences; //containing the user's selection - his preferences on which markets, aspects and subfilters/selections he's interested in
	rima: IStateRima;
}

export const NEWS_STORE_PROP_NAME = "newsStore";

export interface IStateNewsStore {
	[NEWS_STORE_PROP_NAME]: IStateNewsTotal;
}

/** this is provided for news store module clients to have simpler type
 * For example in a view:
 * ```ts
 *	import { TNewsStoreWrapper } from "@/news/store/store-news-vos";
	class News extends Vue {
		private store: TNewsStoreWrapper = this["$store"] as TNewsStoreWrapper;
	}
 * ```
 * and then use as: `this.store.state.news.newsList`
*/
export type TNewsStoreWrapper = Store<IStateNewsStore>;

/** The list of available markets - MUST be kept in the same order as `store-news::marketIdsOrdered` */
export const MARKETS: TMarkets = {
	[EMarketId.STOCKS]: {
		id: EMarketId.STOCKS, // "406bd9f172a103093eb50211",
		title: "STOCKS",
		text: "STOCKS",
	},
	[EMarketId.CRYPTO]: {
		id: EMarketId.CRYPTO, // "406bd9f172a103093eb50212",
		title: "CRYPTO",
		text: "CRYPTO",
	},
	[EMarketId.ECONOMY_BUSINESS]: {
		id: EMarketId.ECONOMY_BUSINESS, // "406bd9f172a103093eb50213",
		title: "ECONOMY & BUSINESS",
		text: "ECONOMY & BUSINESS",
	},
	[EMarketId.COMMODITIES_FOREX]: {
		id: EMarketId.COMMODITIES_FOREX, // "406bd9f172a103093eb50214",
		title: "COMMODITIES / FOREX ",
		text: "COMMODITIES / FOREX ",
	},
	[EMarketId.FIXED_INCOME]: {
		id: EMarketId.FIXED_INCOME, // "406bd9f172a103093eb50215",
		title: "FIXED INCOME",
		text: "FIXED INCOME",
	},
};

/** the blanco value for the store wrapped to merge properly into the main store */
export const stateNewsesBlanco: IStateNewsStore = {
	[NEWS_STORE_PROP_NAME]: {
		news: {
			newsLoadingStatus: LOADING_STATUS.NON_INITIATED,
			newsList: [],
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
	},
};

/** Response retrieved from the Lazar's news service provider */
export interface INewsResponse {
	newsList: INews[];
}

export const newsStateTotalBlanco: IStateNewsTotal = {
	news: {
		// currentNewsId: undefined,
		newsLoadingStatus: LOADING_STATUS.NON_INITIATED,
		newsList: [],
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
