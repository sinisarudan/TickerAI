console.log = jest.fn();

/********************************
 * Mockup and preload config params for all puzzles
 ********************************/
import { MODULE_NAME } from "../../lib/params";
/** Setting up global config */
console.log("[config/global.js] Setting up the globalSet variable");
const globalSet: any = {};
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
import { COLABO_API_TYPES, IKNode, KnAlledgeNodeOperators } from "@colabo-knalledge/i-core";
import { NEWS_TYPE, INews } from "../../lib/vos/news.vos";
import { NewsOperators } from "../../lib/news.operators";

/********************************
 * Start testing
 ********************************/
describe(`In NewsOperators `, async function () {
	/** mocked parameters, ids, names, etc */
	const mockedId1 = "mock-id-with-24-chars-01";
	const mockedName1 = "mockedName_01";
	const mockedIAmId1 = "mock-iAmId-w-24-chars-01";
	const mockedHumanId1 = 1;
	const mockedIsPublic1 = true;
	const mockedDesc1 = "mocked-desc-1";
	const mockedTime1 = "2015-04-25T09:49:09.208Z";

	const mockedId2 = "mock-id-with-24-chars-02";
	const mockedName2 = "mockedName_02";
	const mockedIAmId2 = "mock-iAmId-w-24-chars-02";
	const mockedHumanId2 = 2;
	const mockedIsPublic2 = true;
	const mockedDesc2 = "mocked-desc-2";
	const mockedTime2 = "2015-04-28T09:49:09.208Z";

	beforeEach(async function () {});

	afterEach(function () {
	});

	it("should have CRUD methods available", () => {
		expect(NewsOperators.create).toBeDefined();
	});

	it("`create` should return the new INews entity  ", () => {
		const NewsResult = NewsOperators.create();
		expect(typeof NewsResult).toBe("object");
	});

	it("`TYPE` should return the correct type  ", () => {
		const NewsTypeResult = NEWS_TYPE;
		expect(NewsTypeResult).toBe("tickerai.news");
	});

	it("`pack` should properly distribute INews values in the underlying objects  ", () => {
		const news: INews = {
			...NewsOperators.create(),
			id: mockedId1,
			title: mockedName1,
			text: mockedDesc1,
			time: mockedTime1,
			tags: [],
			// TODO: understand and decide about this
			// memberIds: [],
		};

		const NewsKNodeExpected: IKNode = {
			...KnAlledgeNodeOperators.createWithUnderlyingLayer(),
			_id: news.id,
			type: NEWS_TYPE,
			name: news.title,
			createdAt: new Date(news.time),
			dataContent: {
				description: news.text,
				headingNews: news.headingNews,
				url: news.url,
				tags: news.tags,
				titleNews: news.titleNews,
				hash: news.hash,
				subfilter: news.subfilter,
				image: {
					url: news.image,
				},
			},
		};

		const kNode: IKNode = KnAlledgeNodeOperators.createWithUnderlyingLayer();
		const NewsKNodeResult: IKNode = NewsOperators.pack(news, kNode);
		// deep equal
		expect(NewsKNodeResult).toEqual(NewsKNodeExpected);
	});

	it("`unpack` should properly unpack INews values from the underlying objects  ", () => {
		const NewsExpected: INews = {
			...NewsOperators.create(),
			id: mockedId1,
			title: mockedName1,
			text: mockedDesc1,
			time: mockedTime1,
		};

		const kNodeINews: IKNode = {
			...KnAlledgeNodeOperators.createWithUnderlyingLayer(),
			_id: NewsExpected.id,
			type: NEWS_TYPE,
			name: NewsExpected.title,
			createdAt: new Date(mockedTime1),
			dataContent: {
				description: NewsExpected.text,
				tags: NewsExpected.tags,
			},
		};

		const NewsResult: INews = NewsOperators.unpack(kNodeINews);
		expect(NewsResult).toEqual(NewsExpected);
	});

	it("`unpackArray` should properly unpack INews values from the underlying objects  ", () => {
		const NewssExpected: INews[] = [
			{
				...NewsOperators.create(),
				id: mockedId1,
				title: mockedName1,
				text: mockedDesc1,
				time: mockedTime1,
			},
			{
				...NewsOperators.create(),
				id: mockedId2,
				title: mockedName2,
				text: mockedDesc2,
				time: mockedTime2,
			},
		];

		const kNodeINewss: IKNode[] = [
			{
				...KnAlledgeNodeOperators.createWithUnderlyingLayer(),
				_id: NewssExpected[0].id,
				type: NEWS_TYPE,
				name: NewssExpected[0].title,
				createdAt: new Date(NewssExpected[0].time),
				dataContent: {
					description: NewssExpected[0].text,
					tags: NewssExpected[0].tags,
				},
			},
			{
				...KnAlledgeNodeOperators.createWithUnderlyingLayer(),
				_id: NewssExpected[1].id,
				type: NEWS_TYPE,
				name: NewssExpected[1].title,
				createdAt: new Date(NewssExpected[1].time),
				dataContent: {
					description: NewssExpected[1].text,
					tags: NewssExpected[1].tags,
				},
			},
		];

		const NewssResult: INews[] = NewsOperators.unpackArray(kNodeINewss);
		expect(NewssResult).toEqual(NewssExpected);
	});
});
