"use strict";

import { IConfigRimaAaa, EConfigRimaAaaSignatureShow } from "@colabo-rima/f-aaa/vos";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// declare let _module: any;
// declare let module: any;
// declare let _module: any;
// try {
// 	_module = module;
// 	// eslint-disable-next-line no-empty
// } finally {
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _global: IColaboGlobal;
try {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_global = (window as any)["global"] as unknown as IColaboGlobal;
	// eslint-disable-next-line no-empty
} finally {
}

// this is file is available to the rest of the system
// through the puzzle `@colabo-utils/i-config`
// please read `@colabo-utils/i-config/README.md` for more details

// NOTE: it is important that this file is not imported, but required
// and that it is therefore JS (not TS, although it can be, if we still do not import it)
// because otherwise it would be bundled in a final file during building
// and we wouldn't be able to change the config after building project

console.log("[config/global] Setting up the globalSet variable");

// import { IDebugConsoleConfig } from "@colabo-dev/f-debug";

enum EContext {
	LOCAL = "local",
	CLIMATHON = "climathon",
	KNALLEDGE = "knalledge",
	TICKER_TEST = "ticker_test",
	TICKER = "ticker",
}

// eslint-disable-next-line prefer-const
// const context: string = EContext.KNALLEDGE;
// const context: string = EContext.TICKER_TEST;
const context: string = EContext.TICKER;
// const context: string = EContext.LOCAL;

interface IColaboConfig {
	general: any;
	puzzles: any;
}

interface IColaboGlobal {
	globalSet: IColaboConfig;
}

let globalSet: IColaboConfig = {
	general: undefined,
	puzzles: undefined,
};

if (typeof window !== "undefined") {
	const _window: IColaboGlobal = window as unknown as IColaboGlobal;
	console.log("[config/global] global variable `window` is available.");
	if (!Object.prototype.hasOwnProperty.call(_window, "globalSet")) {
		console.log("[config/global] global variable `_window.globalSet` was not available: ", _window.globalSet);
		_window.globalSet = globalSet;
	} else {
		console.log("[config/global] global variable `_window.globalSet` is available: ", _window.globalSet);
		globalSet = _window.globalSet;
	}
} else {
	console.log("[config/global] global variable `window` is NOT available");
}

if (typeof _global !== "undefined") {
	if (!Object.prototype.hasOwnProperty.call(_global, "globalSet")) {
		console.log("[config/global] global variable `_global.globalSet` was not available: ", _global.globalSet);
		_global.globalSet = globalSet;
	} else {
		console.log("[config/global] global variable `_global.globalSet` is available: ", _global.globalSet);
		globalSet = _global.globalSet;
	}
} else {
	console.log("[config/global] global variable `global` is NOT available");
}

console.log("[config/global] Populating the globalSet variable");

if (!globalSet.general) {
	console.log("[config/global] Setting up globalSet.general");
	globalSet.general = {
		// RESTfull backend API url
		serverUrl: "http://127.0.0.1:8001", // LOCAL
		// 'https://fv.colabo.space/api', // colabo-space-1 (https) (ACTUAL SERVER)
		//OLD:
		// 'http://api.colabo.space',
		// 'http://158.39.75.120:8001', // colabo-space-1 (old)
		branding: {
			title: "ColaboFlow Demo - Support for collaborative flows",
			toolbarTitle: "LitTerra",
			subToolbarTitle: "@ LitTerra",
			logo: "assets/images/logo.jpg",
		},

		imagesFolder: "images",

		// active map:
		mapId: "5df15060c377ab0c32fa7627",
		// "5d791568da853c1e2a3eab5a", //UoD @ InSEA
		// '5b96619b86f3cc8057216a03', //PTW 2018
		// '5bce4f50b6b1fc5d048c706d', // Business Angelina (Karlovci)
		// '5b49e7f736390f03580ac9a7', // Vlasina 2018
		// '5be3fddce1b7970d8c6df406', // Everyday Heroes

		mapIdSDGs: "5df15060c377ab0c32fa7627",
		// "5d791568da853c1e2a3eab5a", //UoD @ InSEA
		//"5b49e7f736390f03580ac9a7",
		//5be3fddce1b7970d8c6df406

		userNodeId: "5be408d0e1b7970d8c6df40f",

		lang: "en",
		//'rs',

		/** multiple players can play on the same opening card */
		OPENNING_CARD_MULTIPLE_ANSWERS: true,

		/** multiple players can play on a card played by another player */
		PLAYER_CARD_MULTIPLE_ANSWERS: true,

		/** multiple players can play on a card played by another player */
		REPLAY_PLAYED_CARD: false,
	};
}

switch (context) {
	case EContext.LOCAL:
		// RESTfull backend API url
		globalSet.general.serverUrl = "http://127.0.0.1:37001";
		break;
	case EContext.KNALLEDGE:
		// RESTfull backend API url
		globalSet.general.serverUrl = "https://apps.colabo.space/api";
		// colabo-space-1 (https) (ACTUAL SERVER)
		//OLD:
		// 'http://api.colabo.space',
		// 'http://158.39.75.120:8001', // colabo-space-1 (old)
		break;
	case EContext.CLIMATHON:
		globalSet.general.serverUrl = "https://climathon-apps.colabo.space/api"; // Climathon backend
		break;
	case EContext.TICKER_TEST:
		globalSet.general.serverUrl = "http://test-api.tickerai.io:8080/api"; // RC backend
		break;
	case EContext.TICKER:
		globalSet.general.serverUrl = "https://api.tickerai.io/api"; // TickerAI backend
		break;
}
console.log("globalSet.general.serverUrl", globalSet.general.serverUrl);

if (!globalSet.puzzles) {
	console.log("[config/global] Setting up globalSet.puzzles");
	globalSet.puzzles = {
		"@colabo-knalledge/i-core-services": {
			debug: true,
			iAmId: "1b96619b86f3cc8057216a05",
			voId: "5edf009bbfe65bffe29b2fd5",
			name: "Test container 1",
			type: "colabo.knalledge.dataset",
			serverUrl: "http://127.0.0.1:8001",
			structureType: "colabo.knalledge.container.ordered",
		},
		"@colabo-rima/f-aaa": {
			colabo: {
				signature: {
					show: EConfigRimaAaaSignatureShow.SMALL,
				}
			},
			login: {
				signature: {
					show: EConfigRimaAaaSignatureShow.SMALL,
				},
			},
			account: {
				signature: {
					show: EConfigRimaAaaSignatureShow.NO,
				},
			},
			register: {
				signature: {
					show: EConfigRimaAaaSignatureShow.SMALL,
				},
				optional: {
					show: false,
				},
				roles: {
					show: false,
				},
				skills: {
					show: false,
					// ELO
					/*list: [
						{
							title: "Electronic/Digital Literature",
							name: "diglit",
							value: 0,
						},
						{
							title: "Collaborative Creative Writing",
							name: "colcrwr",
							value: 0,
						},
						{
							title: "Socially Engaged Writing",
							name: "sewr",
							value: 0,
						},
						{
							title: "Climate Change",
							name: "climch",
							value: 0,
						},
						{
							title: "Environmental Protection",
							name: "enwpro",
							value: 0,
						},
						{
							title: "Creative Writing on Climate/Eco topics",
							name: "crwrcleco",
							value: 0,
						},
					],*/

					// Climathon 2021
					list: [
						{
							title: "Заштитa жив. средине / Климатскe променe",
							name: "envprotclchange",
							value: 0,
						},
						{
							title: "Рад са заједницом, активистима, crowdsourcing",
							name: "crowd-comm",
							value: 0,
						},
						{
							title: "(Пејзажна) архитектура, урбанизам",
							name: "land-arch-urb",
							value: 0,
						},
						{
							title: "ИТ развоја, програмирања",
							name: "it-dev",
							value: 0,
						},
						{
							title: "диг. алати релевант. за трансф. сиво->зелено",
							name: "dig-tools-gray-green",
							value: 0,
						},
					],
					/*
					// Climathon 2020:
					[
						{
							title: "IT Technologies, Development",
							name: "it",
							value: 0,
						},
						{
							title: "Environmental Protection",
							name: "eco",
							value: 0,
						},
						{
							title: "Management",
							name: "mng",
							value: 0,
						},
						{
							title: "Psychology",
							name: "psy",
							value: 0,
						},
						{
							title: "Marketing, Promotion",
							name: "mark",
							value: 0,
						},
					]*/
				}
			}
		} as IConfigRimaAaa,
		"@colabo-topichat/f-core": {
			// socketUrl: 'http://localhost/',
			socketUrl: "http://localhost:8001/",
			// socketUrl: 'https://fv.colabo.space/',
			path: "",
			// path: '/api/socket.io'
		},
		"@colabo-topichat/f-talk": {
			messagesNumberMin: 3,
			messagesNumberMax: 5,
		},
		"@colabo-media/f-upload": {
			mediaTypes: {
				default: {
					type: "default",
					imagesFolder: "/tmp/www/fv/images/default",
					webPath: "/images/default",
				},
				user: {
					type: "user",
					imagesFolder: "/tmp/www/fv/images/users",
					webPath: "/images/users",
				},
				playsust: {
					type: "playsust",
					imagesFolder: "/tmp/www/fv/images/playsust",
					webPath: "/images/playsust",
				},
			},
		},
		"@colabo-flow/f-audit": {
			flowImages: [
				{
					name: "search",
					imageUrl: "assets/images/flows/flow-search.jpg",
					actions: [
						{
							name: "start",
							selectArea: {
								x: 55,
								y: 165,
								width: 40,
								height: 40,
							},
						},
						{
							name: "searchSoundsNoCache",
							selectArea: {
								x: 115,
								y: 155,
								width: 60,
								height: 40,
							},
						},
						{
							name: "searchSoundsWithCache",
							selectArea: {
								x: 280,
								y: 120,
								width: 60,
								height: 40,
							},
						},
					],
				},
			],
		},
		"@colabo-dev/f-debug": {
			actions: [
				{
					name: "set user 1",
					action: "MOCKUP_SET_USER_1",
					icon: "face",
				},
				{
					name: "set user 2",
					action: "MOCKUP_SET_USER_2",
					icon: "face",
				},
			],
		}// as IDebugConsoleConfig,
	};
}

globalSet.puzzles["@colabo-knalledge/i-core-services"].serverUrl = globalSet.general.serverUrl;

switch (context) {
	case EContext.LOCAL:
		// RESTfull backend API url
		globalSet.puzzles["@colabo-topichat/f-core"].socketUrl = "http://127.0.0.1:37001";
		globalSet.puzzles["@colabo-topichat/f-core"].path = "";
		break;
	case EContext.KNALLEDGE:
		globalSet.puzzles["@colabo-topichat/f-core"].socketUrl = "https://apps.colabo.space";
		globalSet.puzzles["@colabo-topichat/f-core"].path = "/api/socket.io";
		break;
	case EContext.CLIMATHON:
		globalSet.puzzles["@colabo-topichat/f-core"].socketUrl = "https://climathon-apps.colabo.space";
		globalSet.puzzles["@colabo-topichat/f-core"].path = "/api/socket.io";
		break;
	case EContext.TICKER_TEST:
		globalSet.puzzles["@colabo-topichat/f-core"].socketUrl = "http://test-api.tickerai.io:8080/";
		globalSet.puzzles["@colabo-topichat/f-core"].path = "/api/socket.io";
		break;
	case EContext.TICKER:
		globalSet.puzzles["@colabo-topichat/f-core"].socketUrl = "https://api.tickerai.io/";
		globalSet.puzzles["@colabo-topichat/f-core"].path = "/api/socket.io";
		break;
}
console.log("[config/global] globalSet.puzzles:", globalSet.puzzles);

// node support (export)
// if (typeof _module !== "undefined") {
// 	// workarround for TypeScript's `module.exports` readonly
// 	if ("exports" in _module) {
// 		if (typeof _module["exports"] !== "undefined") {
// 			_module["exports"].globalSet = globalSet;
// 		}
// 	} else {
// 		_module["exports"] = globalSet;
// 	}
// }

console.log("[config/global] finished");

// export { globalSet };
