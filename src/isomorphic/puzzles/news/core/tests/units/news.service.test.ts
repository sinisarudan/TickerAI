console.log = jest.fn();

/********************************
 * Mockup and preload config params for all puzzles
 ********************************/
import { MODULE_NAME } from "../../lib/params";
/** Setting up global config */
console.log("[config/global.js] Setting up the globalSet variable");
const globalSet: any = {};
globalSet.general = {};
globalSet.general["serverUrl"] = "http://just.testing";
globalSet.puzzles = {};
globalSet.puzzles[MODULE_NAME] = {
	debug: false,
};
globalSet.puzzles["@colabo-knalledge/i-core-services"] = {
	serverUrl: "http://just.testing",
};

console.log("[config/global.js] starting ...");
import * as config from "@colabo-utils/i-config";
config.init(globalSet);
console.log("[config/global.js] finished");

/********************************
 * Import testing related components
 ********************************/
import { IKNode, KnAlledgeNodeOperators, IApiRequest } from "@colabo-knalledge/i-core";
import { NewsService } from "../../lib/news.service";
import { ColaboKnAllEdgeNodeServiceExtended } from "@colabo-knalledge/i-core-services";
import { INews } from "../../lib/vos/news.vos";
import { NewsOperators } from "../../lib/news.operators";

/********************************
 * Start testing
 ********************************/
describe(`In NewsService `, async function () {
	/**
	 * the element we are testing within this test module
	 */
	let newsService: NewsService;
	/**
	 * the underlying element the testing element uses
	 * so we need to mock it to avoid any "leaking" to real servers/databases, but also
	 * to have controlled environment and values fed to the element we want to test
	 */
	const nodeService: ColaboKnAllEdgeNodeServiceExtended = new ColaboKnAllEdgeNodeServiceExtended(null, null);

	/** mocked parameters, ids, names, etc */
	const mockedId1 = "mock-id-with-24-chars-01";
	const mockedName1 = "mockedName_01";
	const mockedIAmId1 = "mock-iAmId-w-24-chars-01";
	const mockedType1 = "mock-type-1";
	const mockedHumanID1 = 1;
	const mocekdIsPublic1 = true;
	const mockedDesc1 = "mocked-desc-1";
	const mockedHash1 = "mocked-hash-1";
	const mockedTags1 = ["mocked-tag-11"];
	const mockedTime1 = "2015-04-25T09:49:09.208Z";
	const mockedUrl1 = "mocked-url-1";
	const mockedSubfilter1 = "mocked-subfilter-1";
	const mockedHeadingNews1 = false;
	const mockedTitleNews1 = false;
	const mockedImage1 = "mocked-image-1";

	const mockedId2 = "mock-id-with-24-chars-02";
	const mockedName2 = "mockedName_02";
	const mockedIAmId2 = "mock-iAmId-w-24-chars-02";
	const mockedType2 = "mock-type-2";
	const mockedHumanID2 = 2;
	const mocekdIsPublic2 = false;
	const mockedDesc2 = "mocked-desc-2";
	const mockedHash2 = "mocked-hash-2";
	const mockedTags2 = ["mocked-tag-21", "mocked-tag-22"];
	const mockedTime2 = "2015-04-28T09:49:09.208Z";
	const mockedUrl2 = "mocked-url-2";
	const mockedSubfilter2 = "mocked-subfilter-2";
	const mockedHeadingNews2 = true;
	const mockedTitleNews2 = false;
	const mockedImage2 = "mocked-image-2";

	beforeEach(async function () {
		console.log(`[beforeEach::NewsService] Initializing test element of the class 'NewsService'`);
		newsService = new NewsService(
			nodeService
			// NewsService
		);

		console.log(`[beforeEach::NewsService] Initialized the test element`);
	});

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	afterEach(function () {});

	it("should have CRUD methods available", function () {
		expect(newsService.getById).toBeDefined();
	});

	describe("when called getINewsList  ", () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		beforeEach(function () {});

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		afterEach(function () {});

		it("it should properly call the nodeService and get NewsList", async () => {
			const expectedINewsList: INews[] = [
				{
					id: mockedId1,
					title: mockedName1,
					text: mockedDesc1,
					hash: mockedHash1,
					tags: mockedTags1,
					time: mockedTime1,
					url: mockedUrl1,
					subfilter: mockedSubfilter1,
					headingNews: mockedHeadingNews1,
					titleNews: mockedTitleNews1,
					image: mockedImage1,
				},
				{
					id: mockedId2,
					title: mockedName2,
					text: mockedDesc2,
					hash: mockedHash2,
					tags: mockedTags2,
					time: mockedTime2,
					url: mockedUrl2,
					subfilter: mockedSubfilter2,
					headingNews: mockedHeadingNews2,
					titleNews: mockedTitleNews2,
					image: mockedImage2,
				},
			];

			const mockedINewsKContainers: IKNode[] = [
				{
					...KnAlledgeNodeOperators.create(),
					_id: expectedINewsList[0].id,
					name: expectedINewsList[0].title,
					type: mockedType1,
					iAmId: mockedIAmId1,
					isPublic: mocekdIsPublic1,
					createdAt: new Date(expectedINewsList[0].time),
					dataContent: {
						description: expectedINewsList[0].text,
						hash: expectedINewsList[0].hash,
						tags: expectedINewsList[0].tags,
						url: expectedINewsList[0].url,
						subfilter: expectedINewsList[0].subfilter,
						headingNews: expectedINewsList[0].headingNews,
						titleNews: expectedINewsList[0].titleNews,
						image: {
							url: expectedINewsList[0].image,
						},
					},
				},
				{
					...KnAlledgeNodeOperators.create(),
					_id: mockedId2,
					name: expectedINewsList[1].title,
					type: mockedType2,
					iAmId: mockedIAmId2,
					isPublic: mocekdIsPublic2,
					createdAt: new Date(expectedINewsList[1].time),
					dataContent: {
						description: expectedINewsList[1].text,
						hash: expectedINewsList[1].hash,
						tags: expectedINewsList[1].tags,
						url: expectedINewsList[1].url,
						subfilter: expectedINewsList[1].subfilter,
						headingNews: expectedINewsList[1].headingNews,
						titleNews: expectedINewsList[1].titleNews,
						image: {
							url: expectedINewsList[1].image,
						},
					},
				},
			];

			const stub_c = (nodeService.getVosWithColaboApi = jest.fn(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async function getVosWithColaboApi(request: IApiRequest): Promise<IKNode[]> {
					return mockedINewsKContainers;
				}
			));

			const resultINewsList: INews[] = await newsService.getINewsList();
			expect(resultINewsList).toEqual(expectedINewsList);

			expect(stub_c.mock.calls.length).toBe(1);
			console.log("resultINewsList: ", JSON.stringify(resultINewsList, null, 4));
			expect(resultINewsList).toEqual(expectedINewsList);
		});
	});
});
