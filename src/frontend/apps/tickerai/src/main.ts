console.log("[main.ts] TickerAI-App");

/** Colabo Config */

console.log("[main.ts] Importing config ...");

import { IColaboConfig } from "@colabo-utils/i-config";

// explicitly import or ...
// import { globalSet } from "./config/web_components__colabo_rima__global";
// ... or provide separately as a global variable `globalSet`
declare const globalSet: IColaboConfig;

console.log("[main.ts] imported config.");

// let configFile = require('./config/global');
// import * as configFile from './config/global';
// let globalSet = (<any>window).globalSet;

if (typeof globalSet === "undefined") {
	console.error("[main.ts] globalSet is undefined");
} else {
	// console.log("[main.ts] globalSet.puzzles: %s", JSON.stringify(globalSet.puzzles));
}

import { init as configInit } from "@colabo-utils/i-config";

console.log("[main.ts] configuring ...");
configInit(globalSet);
console.log("[main.ts] configured");

/** Vue config */

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// https://vuejs.org/v2/api/#errorHandler
Vue.config.productionTip = true;

// https://vuejs.org/v2/api/#errorHandler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Vue.config.errorHandler = (err, vm, info) => {
// 	// `info` is a Vue-specific error info, e.g. which lifecycle hook
// 	// the error was found in. Only available in 2.2.0+
// 	debugger;
// };

// https://vuejs.org/v2/api/#warnHandler
// this only works during development and is ignored in production.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Vue.config.warnHandler = (msg, vm, trace) => {
// 	// `trace` is the component hierarchy trace
// 	debugger;
// };

/**
 * Using Full Bundle: https://vuematerial.io/getting-started/
 * Although is **not recommended** you can use the full bundle of Vue Material. This will import ALL components and UI Elements, and will hurt performance:
 **/
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(VueMaterial);
// import VueSplide from "@splidejs/vue-splide";
// Vue.use(VueSplide);

// old version:
// import { vuetify } from "@colabo-headless/f-components-vue";

// new version:
// https://stackoverflow.com/a/62033410/257561
import Vuetify from "vuetify";
Vue.use(Vuetify);
import "vuetify/dist/vuetify.min.css";
const vuetify = new Vuetify();

new Vue({
	vuetify,
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
