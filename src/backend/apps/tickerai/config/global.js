"use strict";

// this is file is available to the rest of the system
// through the puzzle `@colabo-utils/i-config`
// please read `@colabo-utils/i-config/README.md` for more details

// NOTE: it is important that this file is not imported, but required
// and that it is therefore JS (not TS, although it can be, if we still do not import it)
// because otherwise it would be bundled in a final file during building
// and we wouldn't be able to change the config after building project

console.log("[config/global.js] Setting up the globalSet variable");

let globalSet = {};
if (typeof window !== "undefined" && typeof window !== "null") {
	if (!window.hasOwnProperty("globalSet")) window.globalSet = {};
	globalSet = window.globalSet;
}
if (typeof global !== "undefined" && typeof global !== "null") {
	if (!global.hasOwnProperty("globalSet")) global.globalSet = {};
	globalSet = global.globalSet;
}

console.log("Setting up the global variable");

if (!globalSet.hasOwnProperty("general")) {
	console.log("[config/global.js] Setting up globalSet.general");
	globalSet.general = {
		// active map
		// mapId: '5b96619b86f3cc8057216a03',
	};
}

var path = require("path");

// expose this function to our app using module.exports
if (!globalSet.hasOwnProperty("paths")) {
	console.log("Setting up globalSet.paths");
	globalSet.paths = {};
	globalSet.paths.DATASET_FOLDER = path.resolve(globalSet.paths.EXPERIMENTS_FOLDER + "/data");
	globalSet.paths.FOLDER_OUT = path.resolve(globalSet.paths.DATASET_FOLDER + "/out");
	globalSet.paths.FOLDER_CACHE = path.resolve(globalSet.paths.EXPERIMENTS_FOLDER + "/cache");
}

if (!globalSet.hasOwnProperty("dbConfig")) {
	console.log("Setting up globalSet.dbConfig");
	globalSet.dbConfig = {
		newConnect: true,
		dbName: "TickerAI",
		domain: "127.0.0.1",
		port: 27017,
		user: "user",
		pass: "pass",
	};
}

if (!globalSet.hasOwnProperty("puzzles")) {
	console.log("Setting up globalSet.puzzles");
	globalSet.puzzles = {
		"@colabo-knalledge/b-core": {
			typesThatNeedHumanId: ["topiChat.talk.chatMsg", "rima.user", "playsust.q.challenge", "playsust.q.skill", "playsust.q.puzzle", "playsust.q.solution", "playsust.q.quest", "playsust.q.step"],
			registerModules: [
				{
					name: "kEdge-order.plugin",
					description: "KEdge plugin for ordering edges",
					consumer: "kEdge",
					entryPoints: [
						{
							id: "__HOOK__INIT",
							name: "init",
							description: "Initializes module",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kedge_order__init",
							},
						},
						{
							id: "push",
							name: "push",
							description: "Pushes a new edge into store by creating it and setting its `value` prop to the one after the next largest value in the provided context",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kedge_order__push",
							},
						},
						{
							id: "move",
							name: "move",
							description: "Moves an edge in store by setting its `value` prop to the specified value and moving all (between the old and new value) other edges' `value` in the provided context",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kedge_order__move",
							},
						},
					],
				},
				{
					name: "kEdge-references.plugin",
					description: "Supports retrieving all the nodes referenced by a particular node",
					consumer: "kEdge",
					entryPoints: [
						{
							id: "__HOOK__INIT",
							name: "init",
							description: "Initializes the kedge-references plugin",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kedge_references__init",
							},
						},
						{
							id: "referenced",
							name: "referenced",
							description: "Get all referenced nodes",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kedge_references__referenced",
							},
						},
					],
				},
				{
					name: "kNode-pass-through.plugin",
					description: "Supports passing through web request to another services and returning results",
					consumer: "kNode",
					entryPoints: [
						{
							id: "__HOOK__INIT",
							name: "init",
							description: "Initializes the kNode-pass-through plugin",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kNode_pass_through__init",
							},
						},
						{
							id: "web_request",
							name: "web_request",
							description: "Request external",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@colabo-knalledge/b-core",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core/build/colabo_knalledge__b_core.js",
								exportName: "kNode_pass_through__web_request",
							},
						},
					],
				},
				{
					name: "kNode-news-retrieve.plugin",
					description: "Supports retrieving news in the tickerai platform",
					consumer: "kNode",
					entryPoints: [
						{
							id: "__HOOK__INIT",
							name: "init",
							description: "Initializes the the tickerai-news-retrieve plugin",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@tickerai-news/b-core",
								// not possible to build inside the tickerai env
								// moduleName: "/Users/mprinc/data/development/jobs/tickerai-zontik/tickerai-code/src/backend/puzzles/news/core/build/tickerai_news__b_core.js",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core-news/build/tickerai_news__b_core.js",
								exportName: "news_retrieve__init",
							},
						},
						{
							id: "getNews",
							name: "getNews",
							description: "Get news for the tickerai platform",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@tickerai-news/b-core",
								// not possible to build inside the tickerai env
								// moduleName: "/Users/mprinc/data/development/jobs/tickerai-zontik/tickerai-code/src/backend/puzzles/news/core/build/tickerai_news__b_core.js",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core-news/build/tickerai_news__b_core.js",
								exportName: "news_retrieve__getNews",
							},
						},
					],
				},
				{
					name: "kNode-news-manage.plugin",
					description: "Supports managing news in the tickerai platform",
					consumer: "kNode",
					entryPoints: [
						{
							id: "__HOOK__INIT",
							name: "init",
							description: "Initializes the the tickerai-news-manage plugin",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@tickerai-news/b-core",
								// not possible to build inside the tickerai env
								// moduleName: "/Users/mprinc/data/development/jobs/tickerai-zontik/tickerai-code/src/backend/puzzles/news/core/build/tickerai_news__b_core.js",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core-news/build/tickerai_news__b_core.js",
								// moduleName: "/var/services/tickerai-apps-backend/puzzles/tickerai_news__b_core.js",
								exportName: "news_manage__init",
							},
						},
						{
							id: "insertNews",
							name: "insertNews",
							description: "Insert news into the tickerai platform",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@tickerai-news/b-core",
								// not possible to build inside the tickerai env
								// moduleName: "/Users/mprinc/data/development/jobs/tickerai-zontik/tickerai-code/src/backend/puzzles/news/core/build/tickerai_news__b_core.js",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core-news/build/tickerai_news__b_core.js",
								// moduleName: "/var/services/tickerai-apps-backend/puzzles/tickerai_news__b_core.js",
								exportName: "news_manage__insertNews",
							},
						},
						{
							id: "deleteNews",
							name: "deleteNews",
							description: "Delete news from the tickerai platform",
							triggerCondition: undefined,
							excludeOriginal: true,
							importInfo: {
								moduleName: "@tickerai-news/b-core",
								// not possible to build inside the tickerai env
								// moduleName: "/Users/mprinc/data/development/jobs/tickerai-zontik/tickerai-code/src/backend/puzzles/news/core/build/tickerai_news__b_core.js",
								// moduleName: "/Users/mprinc/data/development/colabo-zontik/colabo/src/backend/dev_puzzles/knalledge/core-news/build/tickerai_news__b_core.js",
								// moduleName: "/var/services/tickerai-apps-backend/puzzles/tickerai_news__b_core.js",
								exportName: "news_manage__deleteNews",
							},
						},
					],
				},
			],
		},
		"@colabo-topichat/b-core": {
			debug: false,
		},
		"@colabo-topichat/b-talk": {
			saveTalkToMap: true,
			emitMessages: true,
			mapId: "5d791568da853c1e2a3eab5a", //UoD @ InSEA
			//mapId: "5be3fddce1b7970d8c6df406",
			iAmId: "1b96619b86f3cc8057216a05",
			nodeId: "",
		},
		"@colabo-topichat/b-clients-orchestration": {
			saveTalkToMap: true,
			emitMessages: true,
			emitMessagesToSender: true,
			mapId: "5d791568da853c1e2a3eab5a", //UoD @ InSEA
			//mapId: "5be3fddce1b7970d8c6df406",
			iAmId: "1b96619b86f3cc8057216a05",
			nodeId: "",
		},
		"@colabo-flow/b-audit": {
			limitFindNo: 100,
		},
		"@colabo-flow/b-services": {
			debug: true,

			// https://www.rabbitmq.com/uri-spec.html
			// amqp://user:pass@host.com:port/vhost
			// url: 'amqp://guest:guest@localhost:5672',
			// url: 'amqp://colabo:colabo_usr56@158.39.75.31:5672',
			url: "amqp://localhost:5672",
			cancelCunsumerTags: false,
			// queue: 'colabo-service',
			queue: "colabo-service-localhost",

			shouldRequestResult: true,
			noAck: true,

			shouldListenOnSeparateResponseQueue: false,
			separateResponseQueue: "colabo-service-response",
			// separateResponseQueue: 'colabo-service-response-localhost'
		},
		"@colabo-flow/b-topichat": {
			saveFlowInteractionToMap: true,
			mockupQueueAccess: false,
			mapId: "5d791568da853c1e2a3eab5a", //UoD @ InSEA
			//mapId: "5be3fddce1b7970d8c6df406",
		},
		"@colabo-media/b-upload": {
			tmpUpload: "/tmp/uploads",
			mediaTypes: {
				default: {
					type: "default",
					destinationFolder: "/tmp/www/fv/images/default",
					webPath: "/images/default",
				},
				user: {
					type: "user",
					mediaFormat: "image",
					destinationFolder: "/tmp/www/fv/images/users",
					webPath: "/images/users",
				},
				playsust: {
					type: "playsust",
					mediaFormat: "image",
					destinationFolder: "/tmp/www/fv/images/playsust",
					webPath: "/images/playsust",
				},
			},
		},
	};
}

console.log("[config/global.js] globalSet.puzzles:", globalSet.puzzles);

// node support (export)
if (typeof module !== "undefined") {
	// workarround for TypeScript's `module.exports` readonly
	if ("exports" in module) {
		if (typeof module["exports"] !== "undefined") {
			module["exports"].globalSet = globalSet;
		}
	} else {
		module["exports"] = globalSet;
	}
}

console.log("[config/global.js] finished");
