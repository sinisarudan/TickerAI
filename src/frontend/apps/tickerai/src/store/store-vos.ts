export enum GlobalMutations {}

export interface IStateGlobal {
	debug: {
		actions: any[],
		visible: boolean,
	},
settings: {
		advancedSettings: boolean;
	};
	app: {
		name: string;
		description: string;
	};
}

import { Store } from "vuex";
import { IStateKnAllEdgeStore } from "@colabo-knalledge/f-core";
import { IStateRimaStore } from "@colabo-rima/f-core";

/* news-specialized: solved */
// import { IStateNewsStore } from "@tickerai-news/f-store";
/* news-specialized: solved */
export type TStateGlobalStore = IStateGlobal & IStateKnAllEdgeStore & IStateRimaStore;

export type GlobalStore = Store<TStateGlobalStore>;
