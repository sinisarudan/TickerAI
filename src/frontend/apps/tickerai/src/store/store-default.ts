import { IStateGlobal } from "./store-vos";

export const storeDefault: IStateGlobal = {
	debug: {
		actions: [],
		visible: false,
	},
	settings: {
		advancedSettings: false,
	},
	app: {
		name: "TickerAI.io",
		description: "An AI-driven, centralized news platform covering the highest ranked articles from the largest financial markets",
	},
};
