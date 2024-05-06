// throw new Error("REAL STORE TEST!");
// console.error("REAL STORE TEST!");

// import vue
import Vue from "vue";
// import vuex
import Vuex, { Store, ActionContext } from "vuex";

import { EMarketId, IMarket, IStateNews, IStateNewsStore, MARKETS } from "@/news/store/store-news-vos";
import { NewsStore } from "@/news/store/store-news";

import { IDebugStoreState, IDebugStoreStateWrapper, debugStoreDefault } from "@colabo-dev/f-debug";
import { DebugStore } from "@colabo-dev/f-debug";
import { KnalledgeActions } from "@colabo-knalledge/f-core";
import { IApiRequest, KEDGE_API_TYPE, IKNode } from "@colabo-knalledge/i-core";
import mockupNews from "../../../news/store/mockup-news.json";

// injects `Vuex` into `Vue` which is necessary for example to provide access to `this.$store`
Vue.use(Vuex);

// import { GlobalMutations } from "./store-vos";

const MOCKUP_STORE: boolean = true;
import { StateType } from "./store-vos";
import { storeDefault } from "./store-default";
import { ECFlowState } from "@/news/vos/preferences-vos";
import { newsStoreDefault } from "./mock_store-news-defaults";

const storeDefaultAll = {
	...storeDefault,
	...newsStoreDefault,
	...debugStoreDefault,
};

// console.log("storeDefaultAll: ", JSON.stringify(storeDefaultAll, null, 4));

// creates the initial store's state
const state: StateType & IStateNewsStore & IDebugStoreStateWrapper = MOCKUP_STORE
	? (storeDefaultAll as unknown as StateType & IStateNewsStore & IDebugStoreStateWrapper)
	: {
			debug: {
				actions: [],
				visible: false,
			},
			settings: {
				advancedSettings: false,
			},
			app: {
				name: "",
				description: "",
			},
			newsStore: {
				news: {
					// currentNewsId: undefined,
					newsLoaded: mockupNews.showMockupNews,
					newsList: mockupNews.showMockupNews ? mockupNews.newsList : [],
					tags: {},
					search: "",
				},
				markets: {
					marketsAll: {},
					marketsSetup: [],
					recommendedSubFilters: [],
				},
				myPreferences: {
					markets: [],
					optionsPerMarket: [],
					marketsAspectsSelections: [],
					activeMarketIndex: 5,
					isPrefSettingUpFinishedOnce: false,
					preferencesStatus: ECFlowState.NON_INITIATED,
					// serializedPersonalization: [],
					selectionsSerializedToIDs: [],
				},
			},
	  };

// TODO: would be better if we can set up the mock inside the test itself, but I am not sure how to do it for the store actions
export const KnalledgeActions_GET_NODES_mock = async (context: ActionContext<any, any>, request: IApiRequest): Promise<IKNode[]> => {
	return [{ title: "NewsA" } as unknown as IKNode, { title: "NewsB" } as unknown as IKNode];
};
export const KnalledgeActions_GET_NODES_mock_jest: jest.Mock<Promise<IKNode[]>, [ActionContext<any, any>, IApiRequest]> = jest.fn(KnalledgeActions_GET_NODES_mock);

/** creates vuex's store based on the initial state `state` and injects it in `Vue`
 * (remember, Vuex is injected in `Vue` already with `Vue.use(Vuex);`)
 * In this way it becomes available in any part of Vue ecosystem as a **singleton**
 *
 * NOTE: It will instantiate all Vuex modules (`VuexModule`) from `vuex-module-decorators`
 */
function createStore(): Store<StateType & IStateNews & IDebugStoreState> {
	const store: Store<StateType & IStateNews & IDebugStoreState> = new Vuex.Store({
		state,
		modules: {
			newsStore: NewsStore,
			debugStore: DebugStore,
		},
		getters: {},
		mutations: {},
		actions: {
			// TODO: would be better if we can set up the mock inside the test itself, but I am not sure how to do it for the store actions
			[KnalledgeActions.GET_NODES]: KnalledgeActions_GET_NODES_mock_jest,
		},
	});
	return store;
}

/** singleton Vuex store available across whole Vue ecosystem */
const store: Store<StateType & IStateNews & IDebugStoreState> = createStore();
/** anyone doing default import will get singleton Vuex store available across whole Vue ecosystem */
export default store;
