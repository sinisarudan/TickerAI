/** Info
 * NEW:
 * + multiple entry points -> output bundles
 * 	+ we can isolate particular code and libraries into a separate bundle
 * 	+ `/dist` is cleaned on each build
 * 		+ this might be an issue if we want to build separate projects inside the same `/dist`
 *
 * From before
 * + single output bundle
 * + support for
 * 	+ TypeScript, there are various loaders that we added and can change between
 * 		+ ts-loader
 * 		+ ts-loader
 * 		+ babel-loader
 * 	+ HTML template and dynamic injection of bundles
 * 	+ SourceMaps for TypeScript files
 */
const path = require("path");
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dev = process.env.NODE_ENV !== "production";

// load (as JSON5) `tsconfig.colabo.json`
var fs = require("fs");
const tsconfigStr = fs.readFileSync("./tsconfig.colabo.json", "utf8");
const JSON5 = require("json5");
const tsconfig = JSON5.parse(tsconfigStr);
const tsPaths = tsconfig.compilerOptions.paths;

const tsAlias = {};
for (const tsPath in tsPaths) {
	// `*`-suffixed are not necessary in webpack
	if (tsPath.endsWith("*")) continue;
	const mappings = tsPaths[tsPath];
	tsAlias[tsPath] = `${path.resolve(__dirname, mappings[0])}/`;
}
console.log("[tsconfig.colabo.json] alias: ", tsAlias);
const libraryName = "global";
console.log(`[webpack.config.js] building library: ${libraryName}`);
module.exports = {
	// It should be a single entry
	entry: `./${libraryName}.ts`,

	externals: {
		// "fs-extra": "commonjs2 fs-extra",
		events: "events",
		util: "util",
	},

	// tell webpack to extract these source maps and include in our final bundle
	// inline, inside of the file itself, which is not good for production
	devtool: "inline-source-map",
	// configuration for the `webpack-dev-server`
	devServer: {
		contentBase: "./build",
	},
	optimization: {
		// https://webpack.js.org/configuration/optimization/
		// disable minimization, just for debugging webpack process
		// we do need it to debug the app, as we are building sourceMap that shows the original code
		// that we can debug easily
		minimize: false,
	},
	module: {
		rules: [
			// use babel loader for ts files
			// it will transpile it to particular (set in .babelrc) version of JS
			// {
			// 	test: /\.tsx?$/,
			// 	loader: 'babel-loader',
			// },

			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			// {
			// 	test: /\.tsx?$/,
			// 	loader: "ts-loader"
			// },

			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: tsAlias,
	},
	output: {
		// we need to specify single output
		filename: `${libraryName}.js`,

		// https://webpack.js.org/guides/author-libraries/
		// we need to specify the library
		// https://webpack.js.org/configuration/output/#outputlibrary
		library: {
			name: `${libraryName}`,
			// https://webpack.js.org/configuration/output/#outputlibrarytype
			// type: 'umd',
			type: 'window',
		},

		// path: path.resolve(__dirname, "build"),
		path: path.resolve(__dirname, "../../public/config/"),
	},
	// https://webpack.js.org/configuration/target/
	target: "web",
	// target: "node13.9",
	plugins: [
		// new CleanWebpackPlugin()
		new webpack.DefinePlugin({
			"global.GENTLY": false,
		}),
		new webpack.ContextReplacementPlugin(/events/, "events", {
			events: "events",
			util: "util",
		}),
	],
};
