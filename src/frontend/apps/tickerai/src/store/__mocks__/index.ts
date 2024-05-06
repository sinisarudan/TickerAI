// throw new Error("MOCKUP STORE TEST!");
console.log("MOCKUP STORE TEST!");

import Vue from "vue";
import Vuex, { Store } from "vuex";

// import { StoreKnAllEdge } from "@/store/store-knalledge";
// import { StoreRima, IStateRimaStore, StateRimaBlanco, storeRimaDefault } from "@/store/store-rima";
// import { StoreKnAllEdge } from "./store-knalledge";
// TODO: import { IStateRimaStore, StateRimaBlanco, storeRimaDefault } from "@colabo-rima/f-core";
// import { StoreTopiChat } from "@colabo-dialogue/f-core";

Vue.use(Vuex);

const MOCKUP_STORE: boolean = true;
import { storeDefault } from "../store-default";

const storeDefaultAll = {
	...storeDefault,
// TODO: 	...storeRimaDefault,
};

// console.log("storeDefaultAll: ", JSON.stringify(storeDefaultAll, null, 4));

import { IStateGlobal } from "../store-vos";
/* // TODO:
const state: StateType & IStateRimaStore = MOCKUP_STORE
	? (storeDefaultAll as unknown as StateType & IStateRimaStore)
	: {
			debug: false,
			settings: {
				advancedSettings: false,
			},
			app: {
				name: "",
				description: "",
			},
			rima: {
				...StateRimaBlanco,
			},
	  };

function createStore(): Store<StateType & IStateRimaStore> {
	const store: Store<StateType & IStateRimaStore> = new Store({
		state,
		modules: {
			// rima: StoreRima,
		},
		getters: {},
		mutations: {},
		actions: {},
	});
	return store;
}

const store: Store<StateType & IStateRimaStore> = createStore();
*/
const store: any = null;
export default store;

// throw new Error("MOCKUP STORE TEST!");
// console.error("MOCKUP STORE TEST!");
