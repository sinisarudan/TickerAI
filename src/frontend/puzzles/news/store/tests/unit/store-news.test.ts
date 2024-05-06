console.log = jest.fn();
console.info = jest.fn();

// In Node v7 unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
	process.on("unhandledRejection", (reason) => {
		throw reason;
	});
	// Avoid memory leak by adding too many listeners
	((process.env.LISTENING_TO_UNHANDLED_REJECTION as unknown) as boolean) = true;
}

// tell jest to pick up the mocked file **INSTEAD** of the real file (an explicit way)
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.setMock("../../store/store-news-defaults.ts", require("./mock_store-news-defaults.ts"));
// or we can use a semi-automatic mechanism (if the mock file is at proper place)
// jest.mock("../../store/store-news-defaults.ts");


import { getModule } from "vuex-module-decorators"
import { NewsStore, INewsListRequestPersonalized } from "../../store/store-news";
import { INews } from "@tickerai-news/i-core";

// import _store from "@/store";
// import _store from "./mock_store";
import _store, { KnalledgeActions_GET_NODES_mock_jest } from "./mock_store_from_real";
import { IApiRequest, IApiRequestParam } from "@colabo-knalledge/i-core";

describe("In ColaboKEdgeEngine ", () => {
	/**
	 * the element we are testing within this test module
	 */
	let testingElement: NewsStore;
	console.log("[describe::ColaboKEdgeEngine]");

	beforeAll(async () => {
		// mockupModule = await import(mockupModuleName1Full);
	});

	beforeEach(async () => {
		// create an instance of element we are testing
		// testingElement = new NewsStore({});
		testingElement = getModule(NewsStore, _store);

		// console.log("[describe::ColaboKEdgeEngine::beforeEach] entity: ", testingElement);
	});

	afterEach(() => {
		// clean the mock history
		KnalledgeActions_GET_NODES_mock_jest.mockClear();
	});

	it("should have CRUD methods available", () => {
		expect(testingElement.currentNews).toBeDefined();
	});

	it("NewsActions.GET_PERSONALIZED_NEWS", async () => {
		const news: INews[] = await testingElement['NewsActions.GET_PERSONALIZED_NEWS_LIST']();
		expect(news).toBeDefined();
		expect(news.length).toBe(2);
		expect(KnalledgeActions_GET_NODES_mock_jest.mock.calls.length).toBe(1);
		const get_nodes_request: IApiRequest = KnalledgeActions_GET_NODES_mock_jest.mock.calls[0][1];
		const markets: string[] = (get_nodes_request?.paramsDetailed?.markets as IApiRequestParam)?.value as string[] ?? [];
		expect(markets.length).toBe(2);
		expect(markets[0]).toBe("STOCKS");
		expect(markets[1]).toBe("CRYPTO");
		// console.warn(`markets: ${JSON.stringify(markets, null, 4)}`);
		const personalization: INewsListRequestPersonalized = (get_nodes_request?.paramsDetailed?.personalization as IApiRequestParam)?.value as INewsListRequestPersonalized ?? [];
		// console.warn(`personalization: ${JSON.stringify(personalization, null, 4)}`);
		expect(personalization.markets.length).toBe(2);
		expect(personalization.markets[0].market).toBe("STOCKS");
		expect(personalization.markets[0].aspects.length).toBe(1);
		expect(personalization.markets[0].aspects[0].title).toBe("INDIVIDUAL STOCKS");
		expect(personalization.markets[1].market).toBe("CRYPTO");
		expect(personalization.markets[1].aspects.length).toBe(1);
		expect(personalization.markets[1].aspects[0].title).toBe("SPECIFIC CRYPTOCURRENCIES");
	})
});

