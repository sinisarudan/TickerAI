export const NEWS_SELECTION_UNCATEGORIZED: string = "UNCATEGORIZED";

export enum ESelectionType {
	UNKNOWN = "UNKNOWN",
	STOCK_INDIVIDUAL = "STOCK_INDIVIDUAL",
	STOCK_SECTOR = "STOCK_SECTOR",
	STOCK_TOPIC = "STOCK_TOPIC",
	CRYPTOCURRENCY_INDIVIDUAL = "CRYPTOCURRENCY_INDIVIDUAL",
	CRYPTOCURRENCY_TOPIC = "CRYPTOCURRENCY_TOPIC",
	ECONOMY_BUSINESS_TOPIC = "ECONOMY_BUSINESS_TOPIC",
	COMMODITIES_FOREX_MARKET = "COMMODITIES_FOREX_MARKET",
	COMMODITIES_FOREX_INDIVIDUAL_COMMODITY = "COMMODITIES_FOREX_INDIVIDUAL_COMMODITY",
	COMMODITIES_FOREX_INDIVIDUAL_FOREX = "COMMODITIES_FOREX_INDIVIDUAL_FOREX",
	COMMODITIES_FOREX_TOPIC = "COMMODITIES_FOREX_TOPIC",
	FIXED_INCOME_SECURITY = "FIXED_INCOME_SECURITY",
	FIXED_INCOME_TOPIC = "FIXED_INCOME_TOPIC",
}

export interface ISelection {
	id: string;
	title: string;
	description?: string;
	type: ESelectionType;
}

/**
 * used for mapping backend (@Lazar's) array of subfilters (even though we call them traditionally ISelection in the frontend code) attached to each news and with appropriate relevance for each subfilter
 */
export interface ISelectionRel {
	/** id of a subfilter */
	id: string;
	/** subfilter's relevance for the news */
	rel: number;
}

/** describes a single news */
export interface INews {
	/** news id
	 * it is always the same, no mater if we update the news, as it is a function of the hash value (which is a function of the url)
	 * (before: if the news is updated, the id will become a new one)
	 * */
	id: string;
	/** news title */
	title: string;
	/** news text */
	text: string;
	/** time the news was published (or of not available than collected/crawled)
	 */
	time: string;
	/** example: `6983e24fe10a698455bfaa2e29a1e18e|13eac047d21f0840407024af691dd661` *
	 * It is the hash of the news url and it will stay the same even when the news itself is updated (unless the url is changed as well) */
	hash: string;
	/**
	 * pure news url
	 */
	url: string;
	/** the news' image */
	image?: string;
	/** array of subfilters (their names, for ids use the `subfilter` property) */
	tags: string[];
	/** Is the news top one that should be presented as a big heading image (true)
	 * If yes, it will be presented at the top, and NOT in the list anymore
	 */
	headingNews?: boolean;
	/** Is the news top one that should be presented as a big title  (true)
	 * If yes, it will be presented at the top under big heading news, and NOT in the list anymore
	 */
	titleNews?: boolean;
	/** (will be, currently it is a single id) array of subfilter IDs  (for names use the `tags` property) that the news belongs to*/
	subfilters: ISelectionRel[];
	/** a subfilter from `subfilters` with the highest `rel` - the most relevant subfilter for this piece of news */
	subfilter?: string;
	/** whole selection object populated based on subfilter that is eq. selection.id
	 * TODO: should be of type `ISelection`
	 */
	selection?: ISelection | undefined;

	/**
	 * `false` if news is crawled by AI.
	 *
	 * `true` if news article is created manually (through CMS).
	 *
	 * if news is updated (through CMS) it will be still `false`
	 */
	manual?: boolean;
}

export const NEWS_TYPE: string = "tickerai.news";


/**
 * state of `NewsPreferencesComponent`
 */
export enum EPrefCFlowState {
	/** initital state */
	NON_INITIATED = "NON_INITIATED",
	/** changed to this state when the setting up is started */
	SETTING_UP = "SETTING_UP",
	/** when the preefrences are being edited */
	RESETTING_UP = "RESETTING_UP",
	/** when the setup is finished */
	FINISHED_SETUP = "FINISHED_SETUP",
	// not used: FINISH = "FINISH",
}

/** describes a single tag */
export interface ITag {
	/** tag id */
	id: string;
	/** tag title */
	title: string;
	/** tag color */
	color: string;
	// marketId: string;
}

export interface IHeadings {
	id: string;
	mainHeadline: string;
	mainHeadlineLink: string;
	topEarnings: string;
	topTechnicals: string;
	topMovers: string;
};
