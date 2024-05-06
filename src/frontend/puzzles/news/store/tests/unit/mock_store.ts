// throw new Error("MOCKUP STORE TEST!");
console.log("MOCKUP STORE TEST!");

import Vue from "vue";
import Vuex, { Store } from "vuex";

// import { StoreKnAllEdge } from "@/store/store-knalledge";

Vue.use(Vuex);

export interface StateType {
	debug: boolean;
	settings: {
		advancedSettings: boolean;
	};
	commentsRefId: string;
	app: {
		name: string;
		description: string;
	};
	rem: {
		evaluate: boolean;
	};
};

export const storeDefault: StateType = {
	debug: false,
	settings: {
		advancedSettings: false,
	},
	commentsRefId: "50ffda0",
	app: {
		name: "Retracing Connections",
		description: "BYZANTINE STORYWORLDS IN GREEK, ARABIC, GEORGIAN, AND OLD SLAVONIC (C. 950 – C. 1100)",
	},
	rem: {
		evaluate: true,
	},
};


const MOCKUP_STORE: boolean = true;

const storeDefaultAll = {
	...storeDefault,
};

const state: StateType = MOCKUP_STORE
	? ((storeDefaultAll as unknown) as StateType)
	: {
			debug: false,
			settings: {
				advancedSettings: false,
			},
			app: {
				name: "",
				description: "",
			},
			commentsRefId: "50ffda0",
			rem: {
				evaluate: false,
			},
	};

function createStore(): Store<StateType> {
	const store: Store<StateType> = new Store({
		state,
		modules: {
		},
		getters: {},
		mutations: {},
		actions: {},
	});
	return store;
}

const store: Store<StateType> = createStore();

export default store;

// throw new Error("MOCKUP STORE TEST!");
// console.error("MOCKUP STORE TEST!");
