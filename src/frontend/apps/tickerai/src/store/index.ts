// throw new Error("REAL STORE TEST!");
// console.error("REAL STORE TEST!");

// import vue
import Vue from "vue";
// import vuex
import Vuex, { ModuleTree } from "vuex";
import { Store } from "vuex";

import { StoreKnAllEdge } from "@colabo-knalledge/f-core";

import { debugStoreDefault } from "@colabo-dev/f-debug";
import { DebugStore } from "@colabo-dev/f-debug";

// injects `Vuex` into `Vue` which is necessary for example to provide access to `this.$store`
Vue.use(Vuex);

// import { GlobalMutations } from "./store-vos";

const MOCKUP_STORE: boolean = false;
import { storeDefault } from "./store-default";

/* news-specialized: solved */
// import { NewsStore, mockupNews } from "@tickerai-news/f-store";
import { storeModule, TStateStore, STORE_PROP_NAME } from "@tickerai-news/f-store";

/** default, mockup data for all parts of the store */
let storeDefaultAll = {
	...storeDefault,
	...debugStoreDefault,
};

storeDefaultAll = {
	...storeDefaultAll,
	/* news-specialized: solved */
	...storeModule.stateMockup,
};

// console.log("storeDefaultAll: ", JSON.stringify(storeDefaultAll, null, 4));

// `GlobalStore` is not used any more, as on this level and in this particular store we WANT to know (to support strong TypeScript typing) that we import `NewsStore` as a sub-store. In other more generic stores (like the CMS's store we do not want (as we cannot) know and we will user `GlobalStore`-like form without extending it into `GlobalStoreWithModules`)
// import { GlobalStore } from "./store-vos";
import { TStateGlobalStore } from "./store-vos";
import { storeRimaDefault, StateRimaBlanco, StoreRima, RimaActions, RimaMagicVars } from "@colabo-rima/f-core";
type TStateGlobalStoreWithModules = TStateGlobalStore & TStateStore;
type GlobalStoreWithModules =  Store<TStateGlobalStoreWithModules>;

// creates the initial store's state
const state: TStateGlobalStoreWithModules = MOCKUP_STORE
	? (storeDefaultAll as unknown as TStateGlobalStoreWithModules)
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
			/* news-specialized: solved */
			[STORE_PROP_NAME]: storeModule.stateBlanco,
			knalledge: {
				kNodesArray: [],
				kNodes: {},
				kEdgesArray: [],
				kEdges: {},
			},
			rima: {
				currentUserId: undefined,
				users: [],
			},
	  };

const StoreModules: ModuleTree<GlobalStoreWithModules> = {
	knalledge: StoreKnAllEdge,
	/* news-specialized: solved */
	[STORE_PROP_NAME]: storeModule.store,
	debugStore: DebugStore,
	rima: StoreRima,
};

/** creates vuex's store based on the initial state `state` and injects it in `Vue`
 * (remember, Vuex is injected in `Vue` already with `Vue.use(Vuex);`)
 * In this way it becomes available in any part of Vue ecosystem as a **singleton**
 *
 * NOTE: It will instantiate all Vuex modules (`VuexModule`) from `vuex-module-decorators`
 */
function createStore(): GlobalStoreWithModules {
	const store: GlobalStoreWithModules = new Vuex.Store({
		state,
		modules: StoreModules,
		getters: {},
		mutations: {},
		actions: {},
	});
	return store;
}

/** singleton Vuex store available across whole Vue ecosystem */
const store: GlobalStoreWithModules = createStore();
/** anyone doing default import will get singleton Vuex store available across whole Vue ecosystem */
export default store;
export { TStateGlobalStoreWithModules, GlobalStoreWithModules };
