import { UtilsNotificationService } from "@colabo-headless/i-core/colabo-utils/f-notifications";

import { IKNode, IApiRequest, KNODE_API_TYPE, EApiRequestParamType } from "@colabo-knalledge/i-core";
import { INews, NEWS_TYPE } from "./vos/news.vos";
import { ColaboKnAllEdgeNodeServiceExtended } from "@colabo-knalledge/i-core-services";

import { NewsOperators } from "./news.operators";

// TODO: ElementServiceIsomorphic
// export class NewsService implements ElementServiceIsomorphic {
export class NewsService {
	constructor(
		protected colaboKnAllEdgeNodeServiceExtended: ColaboKnAllEdgeNodeServiceExtended,
		// protected NewsService: NewsService,
		protected utilsNotificationService?: UtilsNotificationService
	) {
		console.log("[NewsService] constructed");
	}

	/**
	 * Get a News from the server by its id
	 * @param id the id of the dataset
	 * @returns the retrieved dataset
	 */
	public async getById(id: string): Promise<INews> {
		console.log(`getById(${id})`);
		const resultKNode: IKNode = await this.colaboKnAllEdgeNodeServiceExtended.getByIdWithPromise(id);
		const result: INews = NewsOperators.unpack(resultKNode);
		return result;
	}

	/**
	 * Gets dialogue ibis ideas
	 * @param ibisSubType type of the ibis entity (if null provided returns all of them)
	 * @param userIds list of users in which ideas we are interested (if an empty array or null returns for all users)
	 * @returns ideas
	 */
	public async getINewsList(ibisSubType?: string, userIds?: string[]): Promise<INews[]> {
		console.log("[getINewsList]", ibisSubType, userIds);
		let result: INews[];
		const request: IApiRequest = {
			type: KNODE_API_TYPE.INDEX_COLABO_API,
			paramsDetailed: {
				type: {
					path: "type",
					value: NEWS_TYPE,
				},
			},
		};

		if (ibisSubType && request.paramsDetailed) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			request.paramsDetailed.subType = {
				path: "dataContent.type",
				value: ibisSubType,
			}!;
		}

		if (userIds && userIds.length && request.paramsDetailed) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			request.paramsDetailed.userIds = {
				path: "iAmId",
				value: userIds,
				props: {
					type: EApiRequestParamType.IN,
				},
			}!;
		}

		console.log("request: ", JSON.stringify(request, null, 4));
		const mResult: IKNode[] = await this.colaboKnAllEdgeNodeServiceExtended.getVosWithColaboApi(request);
		console.log("mResult: ", JSON.stringify(mResult, null, 4));
		// eslint-disable-next-line prefer-const
		result = NewsOperators.unpackArray(mResult);
		// result = (mResult as unknown) as INews[];

		return result;
	}
}
