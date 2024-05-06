/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
// load (as JSON5) `tsconfig.colabo.json`
var fs = require("fs");
var path = require("path");

const JSON5 = require("json5");

const { paths, tsconfigFolder } = loadPaths("./", "tsconfig.json");
const tsconfigFolderAbsolute = path.resolve(tsconfigFolder);
/** loads paths from tsconfig. It follows all `extends` references
 * it returns the first one found (where the bottom, the deepest one has priority over higher, shallower)
 * The reason for this "inversion" is that the bottom one is usually `tsconfig.colabo.json` that has all paths
 * and any higher might have wrong and missing
 * TODO: we can make possibility to merge them, but that can have its own issues, though smart to do
 */
function loadPaths(tsconfigFolder, tsconfigFile) {
	const tsconfigStr = fs.readFileSync(tsconfigFolder + tsconfigFile, "utf8");
	const { extends: extendsPath, compilerOptions } = JSON5.parse(tsconfigStr);
	if (extendsPath) {
		tsconfigExtended = tsconfigFolder + extendsPath;
		tsconfigFolderNext = path.dirname(tsconfigExtended) + "/";
		tsconfigFile = path.basename(tsconfigExtended);
		const paths = loadPaths(tsconfigFolderNext, tsconfigFile);

		if (paths) return { paths, tsconfigFolder: tsconfigFolderNext };
		else return { paths: compilerOptions.paths, tsconfigFolder };
	} else {
		return compilerOptions.paths;
	}
}

console.log("paths: ", JSON.stringify(paths, null, 4));
let moduleNameMapper = pathsToModuleNameMapper(paths, { prefix: "" });

console.log("moduleNameMapper BEFORE: ", JSON.stringify(moduleNameMapper, null, 4));
// we need it because deep imports like this
// `import DatatalksChooseTargetNodesComponent from "@colabo-datatalks/f-form/lib/choose-target-nodes/datatalks-choose-target-nodes-component.vue";`
// which are necessary because vue makes problem importing `*.vue` files from `index.ts` barrels
for (const key in moduleNameMapper) {
	if (key.endsWith("(.*)$")) continue;
	if (Array.isArray(moduleNameMapper[key])) {
		moduleNameMapper[key.substr(0, key.length - 1) + "/(.*)$"] = [moduleNameMapper[key][0] + "/$1"];
	} else {
		moduleNameMapper[key.substr(0, key.length - 1) + "/(.*)$"] = moduleNameMapper[key] + "/$1";
	}
}

const { resolve } = require("path");

const resolvePath = resolve(__dirname, "./node_modules/$1");
delete moduleNameMapper["^(.*)$"];

// we cannot use this one because it excludes mappings for asset extensions
// moduleNameMapper["^@/(.*)$"] = "<rootDir>/src/$1";
delete moduleNameMapper["^@/(.*)$"];
moduleNameMapper["^@/(?!assets)(.*)$"] = "<rootDir>/src/$1";

// const rootDirForNodeModules = "<rootDir>";
const rootDirForNodeModules = tsconfigFolderAbsolute;

moduleNameMapper = {
	...moduleNameMapper,

	// // Support for Vue's `@` shortcut for the src root
	// no need for it explicitly, as we have it in `paths` from tsconfig
	// "^@/(.*)$": "<rootDir>/src/$1",

	// Workaround for non-symbolic expansion in external puzzles
	// in our case for: `import { ColaboMaterial } from "@colabo-headless/f-components-vue";`
	// this is problem as JEST doesn't respect (preserve) symbolic sandbox
	// "^vue$": `${rootDirForNodeModules}/node_modules/vue`,
	// "^vue/(.*)$": `${rootDirForNodeModules}/node_modules/vue/$1`,

	// https://jestjs.io/docs/webpack
	// ["Syntax Error: Invalid or unexpected token" with .png #2663](https://github.com/facebook/jest/issues/2663)
	"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
	"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
};

// console.log("__dirname: ", __dirname);
// console.log("resolvePath: ", resolvePath);
// console.log("moduleNameMapper: ", JSON.stringify(moduleNameMapper, null, 4));

console.log("moduleNameMapper AFTER: ", JSON.stringify(moduleNameMapper, null, 4));

module.exports = {
	moduleFileExtensions: [
		"js",
		"ts",
		"jsx",
		"tsx",
		"json",
		// tell Jest to handle `*.vue` files
		"vue",
	],
	moduleDirectories: ["node_modules", "<rootDir>"],
	transform: {
		// process `*.ts` files with `ts-jest`
		"^.+\\.tsx?$": "ts-jest",
	},
	// testURL: "http://localhost/",
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

	moduleNameMapper,
};

// old version or vue suggested, but either not working well with Vue+Jest
// or we wanted to avoid babel
// module.exports = {
// 	preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
// };

// version for isomorphic code, not working well with Vue+Jest
// module.exports = {
// 	preset: 'ts-jest',
// 	testEnvironment: 'node',
//   };
