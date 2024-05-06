// https://cli.vuejs.org/config/#vue-config-js

const appTitle = "TickerAI - A Mark Cuban Company - AI-based, Personalized Financial Market News Aggregator";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// https://webpack.js.org/configuration/devtool/#development
const mapType = "source-map";
// const mapType = "eval-source-map";
console.log("[vue.config.js] mapType: ", mapType);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// load (as JSON5) `tsconfig.colabo.json`
var fs = require("fs");
const tsconfigStr = fs.readFileSync("./tsconfig.colabo.json", "utf8");
const JSON5 = require("json5");
const tsconfig = JSON5.parse(tsconfigStr);
const tsPaths = tsconfig.compilerOptions.paths;

const VERSION_ID = Math.random() * 10000;

module.exports = {
	publicPath: "/",
	// https://github.com/vuejs/vue-cli/issues/1623
	// baseUrl: "/",
	devServer: {
		port: 37006,
		headers: {
			"Cache-Control": "max-age=0",
			get etag() {
				return Math.random() + "";
			},
		},
	},
	css: {
		sourceMap: true,
		loaderOptions: {
			sass: {
				sourceMap: true,
			},
		},
	},
	pwa: {
		name: appTitle,
		themeColor: "#ccccff",
		msTileColor: "#aaaaff",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "red",
	},
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === "development") {
			// development environment configuration
			// https://webpack.js.org/configuration/devtool/#devtool
			// TODO: figure out where is the best place to have it
			// though: it was recommended here: https://github.com/vuejs/vue-cli/issues/2978#issuecomment-440311125
			config.devtool = mapType;
			console.log("[vue.config.js:configureWebpack] mapType: ", mapType);
		}

		// config.output.devtoolModuleFilenameTemplate = (info) => {
		// 	var $filename = "sources://" + info.resourcePath;
		// 	if (info.resourcePath.match(/\.vue$/) && !info.query.match(/type=script/)) {
		// 		$filename = "webpack-generated:///" + info.resourcePath + "?" + info.hash;
		// 	}
		// 	return $filename;
		// };
		// config.output.devtoolFallbackModuleFilenameTemplate = "webpack:///[resource-path]?[hash]";

		// adding support for paths structure in the `tsconfig.json` file
		// config.resolve.plugins = [
		// 	new TsconfigPathsPlugin({
		// 		logLevel: "info",
		// 		logInfoToStdOut: true,
		// 	}),
		// ];
		const tsAlias = {};
		for (const tsPath in tsPaths) {
			// `*`-suffixed are not necessary in webpack
			if (tsPath.endsWith("*")) continue;
			const mappings = tsPaths[tsPath];
			tsAlias[tsPath] = `${path.resolve(__dirname, mappings[0])}/`;
		}
		console.log("[tsconfig.colabo.json] alias: ", tsAlias);
		config.resolve.alias = tsAlias;
	},
	// modify webpack config
	chainWebpack: (config) => {
		config
			// access the `html-webpack-plugin` plugin
			.plugin("html")
			// the arguments that the plugin will get
			.tap((args) => {
				// modify the arguments that the plugin will get
				// the 0th-parameter that the plugin expects contains options
				// https://github.com/jantimon/html-webpack-plugin#options
				args[0].title = appTitle;
				// https://stackoverflow.com/a/65497871/257561
				args[0].version = VERSION_ID;
				// return the modified params
				return args;
			});

		// config.resolve.alias.delete("@");
		config.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
		// 	new TsconfigPathsPlugin({
		// 		logLevel: "info",
		// 		logInfoToStdOut: true,
		// 	}),

		if (process.env.NODE_ENV === "development") {
			config.plugins.delete("preload");
		}

		// config.devtool("source-map");
		config.devtool("eval-source-map");

		// config.plugins
		return config;
	},
	// https://cli.vuejs.org/config/#pages
	// pages: {
	// 	index: "src/main.ts",
	// 	// 	index: {
	// 	// 		entry: "src/main.ts",
	// 	// 		template: "public/index.html",
	// 	// 		// output as dist/index.html
	// 	// 		filename: "index.html",
	// 	// 		// when using title option,
	// 	// 		// template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
	// 	// 		title: "AnnoTata within LitTerra",
	// 	// 		// chunks to include on this page, by default includes
	// 	// 		// extracted common chunks and vendor chunks.
	// 	// 		chunks: ["chunk-vendors", "chunk-common", "index"],
	// 	// 	},
	// },
};
