import { IKNode, KnAlledgeNodeOperators } from "@colabo-knalledge/i-core";
import { INews, NEWS_TYPE } from "../lib/vos/news.vos";

/**
 * The idea of operators is to slim data, clean from any business, ORM, persistency logic, etc
 * It also should be very portable
 */
export class NewsOperators {
	static create(): INews {
		const News: INews = {} as INews;
		return News;
	}

	public static pack(news: INews, kNode?: IKNode): IKNode {
		if (!kNode) kNode = KnAlledgeNodeOperators.createWithUnderlyingLayer();
		// pack kNode's under-underlying layer (IKNode)
		kNode.type = NEWS_TYPE;
		//TODO: NewsContainer.mapId = MAP_ID;
		kNode._id = news.id;
		kNode.name = news.title;
		// TODO, we need to agree on time formats
		kNode.createdAt = new Date(news.time);

		// pack the entity's layer (INews)
		kNode.dataContent = kNode?.dataContent ?? {};
		kNode.dataContent = {
			...kNode.dataContent,
			description: news.text,
			hash: news.hash,
			url: news.url,
			image: {
				url: news.image,
			},
			tags: news.tags,
			headingNews: news.headingNews,
			titleNews: news.titleNews,
			subfilter: news.subfilter,
		}

		return kNode;
	}

	public static unpack(kNode: IKNode): INews {
		if (!kNode) throw new Error("[NewsOperators::unpack] kNode is null");

		const news: INews = NewsOperators.create();

		// unpack the entity's layer (INews)
		news.text = kNode?.dataContent?.description;
		news.hash = kNode?.dataContent?.hash;
		news.url = kNode?.dataContent?.url;
		news.image = kNode?.dataContent?.image?.url;

		news.tags = kNode?.dataContent?.tags;
		news.manual = kNode?.dataContent?.manual;
		news.headingNews = kNode?.dataContent?.headingNews;
		news.titleNews = kNode?.dataContent?.titleNews;
		news.subfilter = kNode?.dataContent?.subfilter;

		// unpack the under-underlying layer (IKNode)
		news.id = kNode._id ?? "undefined";
		news.title = kNode.name;
		// TODO, we need to agree on time formats
		news.time = kNode.createdAt?.toISOString() ?? "undefined";

		return news;
	}

	public static unpackArray(containers: IKNode[]): INews[] {
		const newsList: INews[] = [];
		for (let i: number = 0; i < containers.length; i++) {
			newsList.push(NewsOperators.unpack(containers[i]));
		}
		return newsList;
	}
}
