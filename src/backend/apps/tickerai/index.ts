const MODULE_NAME: string = "@tickerai-apps/b-tickerai";
process.chdir(__dirname);
const portHttp = process.argv[2] || process.env.PORT || 8001;
const configFilePath = process.argv[3] || "./config/global";

// let chalk = require('chalk');
import chalk from "chalk";

const appNameText = chalk.red.bold("Ticker") + chalk.blue.bold("AI") + chalk.green.bold(".io");
console.log(appNameText + " is starting ...");

// import * as express from "express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const configFile: any = require("./config/global");
// eslint-disable-next-line @typescript-eslint/ban-types
declare let __non_webpack_require__: Function;
// eslint-disable-next-line @typescript-eslint/ban-types
const dynamicRequre: Function = typeof __non_webpack_require__ !== "undefined" ? __non_webpack_require__ : require;
const configFile: any = dynamicRequre(configFilePath);
const globalSet: any = configFile.globalSet;

console.log("[TickerAI:index] globalSet.paths: %s", JSON.stringify(globalSet.paths));
const config = require("@colabo-utils/i-config");
config.init(globalSet);

// let async = require('async');
const express = require("express");
const resource = require("express-resource");
const fs = require("fs");
const http = require("http");
const https = require("https");

// this bootstraps mongo storage access
const puzzleKnalledgeStorageMongo = require("@colabo-knalledge/b-storage-mongo");

function supportCrossOriginScript(req, res, next) {
	// https://developer.mozilla.org/en-US/docs/Glossary/preflight_request

	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
	// res.header("Access-Control-Allow-Headers", "Origin");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	let allowedHeaders: string = "Content-Type";
	allowedHeaders += ", x-user-id, x-access-token";
	// The value "*" only counts as a special wildcard value for requests **without credentials** (requests without HTTP cookies or HTTP authentication information)
	// let allowedHeaders:string = "*";
	res.header("Access-Control-Allow-Headers", allowedHeaders);
	console.log("allowedHeaders: ", allowedHeaders);

	// res.header("Access-Control-Allow-Methods","POST, OPTIONS");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, HEAD");
	res.header("Allow", "POST, GET, OPTIONS, DELETE, PUT, HEAD");
	// res.header("Access-Control-Max-Age","1728000");

	// res.header("Access-Control-Allow-Origin", "*");
	// http://stackoverflow.com/questions/15026016/set-cookie-in-http-header-is-ignored-with-angularjs
	const origin = req.headers.origin;

	//console.log("Access-Control-Allow-Origin: %s", origin);

	//var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	// console.log("Access-Control-Allow-Origin: %s", ip);
	//console.log("Access-Control-Allow-Origin: %s", origin);

	console.log("[supportCrossOriginScript] Access-Control-Allow-Origin: %s", origin);
	res.header("Access-Control-Allow-Origin", origin);
	res.header("Access-Control-Allow-Credentials", true);
	// console.log(`[supportCrossOriginScript] res.headers(): ${JSON.stringify(res.headers())}`);

	//console.log("[supportCrossOriginScript] setting up headers");

	res.status(200);
	next();
}

const expressApp = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// exported in v4.*
// expressApp.use(express.logger());
expressApp.use(morgan("combined"));
// exported in v4.*
// expressApp.use(express.cookieParser()); // cookie parser is used before the session
expressApp.use(cookieParser());

// multer and body-parser resolution
// https://github.com/expressjs/multer/issues/251

// parse application/x-www-form-urlencoded
// note this might conflict with multer, it was with express v3.* probably not any more with v4.*
expressApp.use(bodyParser.urlencoded({ extended: false }));
// expressApp.use(express.urlencoded());

// parse application/json
// note this might conflict with multer, it was with express v3.* probably not any more with v4.*
expressApp.use(bodyParser.json());
// expressApp.use(express.json());

console.log("process.argv: %s", JSON.stringify(process.argv));
expressApp.set("port", portHttp);

expressApp.use(supportCrossOriginScript);
// not used anymore in v4.*
// expressApp.use(expressApp.router);

/* Knalledge Maps */

import { KnAllEdgeCoreRegister } from "@colabo-knalledge/b-core";
KnAllEdgeCoreRegister(expressApp);

/* AAA */
import * as ColaboRimaAaaApi from "@colabo-rima/b-aaa";
ColaboRimaAaaApi.initialize(expressApp);

const httpServer = http.Server(expressApp);

/* */
httpServer.listen(portHttp, function () {
	console.log("%s is listening on the %s", appNameText, chalk.bold.blue("*:" + portHttp));
});

console.log(appNameText + " started ...");
