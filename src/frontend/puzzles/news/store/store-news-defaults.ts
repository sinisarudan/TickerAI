import { EPrefCFlowState, ESelectionType } from "@tickerai-news/i-core";
import { EMarketId, IMarket, IStateNewsStore, LOADING_STATUS, MARKETS } from "./store-news-vos";
import mockupNews from "./mockup-news.json";
import { IHeadings } from "@tickerai-news/i-core";

/**
 * !IMPORTANT: Subfilters - ISelection-s are stored redundantly (for now) in TWO places in the `newsStore`: 1) `markets.marketsSetup.aspects.recommended` and 2) `markets.recommendedSubFilters`
 * Reasons for this are explained in `tickerai-infrastructure/markets-structure.md`
 */
export const newsStoreDefault: IStateNewsStore = {
	newsStore: {
		news: {
			newsLoadingStatus: mockupNews.showMockupNews ? LOADING_STATUS.LOADED : LOADING_STATUS.NON_INITIATED,
			tags: {
				"tag-stocks": {
					id: "tag-stocks",
					color: "#247ba0",
					title: "stocks",
				},
				"tag-crypto": {
					id: "tag-crypto",
					color: "#8a9b10",
					title: "crypto",
				},
				"tag-economy-and-business": {
					id: "tag-economy-and-business",
					color: "#9d2ace",
					title: "economy-and-business",
				},
				"tag-futures-and-commodities": {
					id: "tag-futures-and-commodities",
					color: "#f25f5c",
					title: "futures-and-commodities",
				},
				"tag-fixed-income": {
					id: "tag-fixed-income",
					color: "#bd1550",
					title: "fixed-income",
				},
			},
			newsList: mockupNews.showMockupNews ? mockupNews.newsList : [],
			search: "",
			browsingLocation: {
				market: undefined,
				marketAspect: undefined,
				subfilter: undefined,
			},
		},
		headings: {} as IHeadings,
		markets: {
			marketsAll: MARKETS,
			marketsSetup: [
				{
					market: MARKETS[EMarketId.STOCKS] as IMarket,
					aspects: [
						{
							id: "306bd9f172a103093eb50200",
							// filter: {
							// 	label: "Search Stocks ...",
							// },
							title: "INDIVIDUAL STOCKS",
							subtitle: "", //"Select your Stocks",
							type: ESelectionType.STOCK_INDIVIDUAL,
							recommended: [
								{
									id: "61b76db88c90be3d8598983c",
									title: "AMZN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598983d",
									title: "TSLA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598983e",
									title: "FB",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598983f",
									title: "AAPL",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989840",
									title: "NFLX",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989841",
									title: "GOOG",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989842",
									title: "MSFT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989843",
									title: "BABA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989844",
									title: "BRK.A",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989845",
									title: "V",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989846",
									title: "JPM",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989847",
									title: "JNJ",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989848",
									title: "WMT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989849",
									title: "NVDA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598984a",
									title: "MA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598984b",
									title: "UNH",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598984c",
									title: "DIS",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598984d",
									title: "PYPL",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598984e",
									title: "ADBE",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598984f",
									title: "HD",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989850",
									title: "XOM",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989851",
									title: "KO",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989852",
									title: "PG",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989853",
									title: "ABT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989854",
									title: "ORCL",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989855",
									title: "NKE",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989856",
									title: "PFE",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989857",
									title: "CRM",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989858",
									title: "CSCO",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989859",
									title: "VZ",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598985a",
									title: "INTC",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598985b",
									title: "PEP",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598985c",
									title: "MRK",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598985d",
									title: "AVGO",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598985e",
									title: "WFC",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d8598985f",
									title: "TXN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989860",
									title: "MDT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db88c90be3d85989861",
									title: "MCD",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989862",
									title: "HON",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989863",
									title: "COST",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989864",
									title: "LLY",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989865",
									title: "BIIB",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989866",
									title: "UNP",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989867",
									title: "UPS",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989868",
									title: "TMUS",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989869",
									title: "AMGN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598986a",
									title: "BMY",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598986b",
									title: "SHOP",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598986c",
									title: "BA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598986d",
									title: "SBUX",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50201",
							title: "STOCK SECTORS",
							subtitle: "", //"Choose your Sectors",
							type: ESelectionType.STOCK_SECTOR,
							recommended: [
								{
									id: "61b76db98c90be3d8598986e",
									title: "Agriculture Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598986f",
									title: "Airline Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989870",
									title: "Automaker Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989871",
									title: "Bank Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989872",
									title: "Basic Materials Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989873",
									title: "Biotechnology Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989874",
									title: "Commodities",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989875",
									title: "Consumer Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989876",
									title: "Defense Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989877",
									title: "Energy Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989878",
									title: "Financial Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989879",
									title: "Food Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598987a",
									title: "Healthcare Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598987b",
									title: "Housing Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598987c",
									title: "Industrial Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598987d",
									title: "Insurance Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598987e",
									title: "Marijuana Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d8598987f",
									title: "Mining Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989880",
									title: "Pharmaceutical Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989881",
									title: "Railroad Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989882",
									title: "Restaurant stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989883",
									title: "Retail Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989884",
									title: "Solar stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989885",
									title: "Tech Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989886",
									title: "Tobacco Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989887",
									title: "Transportation and Shipping Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "61b76db98c90be3d85989888",
									title: "Utility Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50202",
							title: "STOCK MARKET TOPICS",
							subtitle: "", //"CHOOSE STOCK MARKET TOPICS YOU WANT NEWS ON",
							type: ESelectionType.STOCK_TOPIC,
							recommended: [
								{
									id: "61b76db98c90be3d85989889",
									title: "Earnings",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d8598988a",
									title: "General Stock Market News",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d8598988b",
									title: "Wall Street Analyst Coverage",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d8598988c",
									title: "Technical Analysis",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d8598988d",
									title: "Top Movers & Unusual Options Activity",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d8598988e",
									title: "Growth & Value Stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d8598988f",
									title: "Penny Stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d85989890",
									title: "Dow Jones, NASDAQ, & S&P 500",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d85989891",
									title: "Meme Stocks & Short Selling",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "61b76db98c90be3d85989892",
									title: "Stocks Opinion Articles Bullish & Bearish",
									type: ESelectionType.STOCK_TOPIC,
								},
							],
						},
					],
				},
				{
					market: MARKETS[EMarketId.CRYPTO] as IMarket,
					aspects: [
						{
							id: "306bd9f172a103093eb50203",
							// filter: {
							// 	label: "FILTER THE CRYPTO ...",
							// },
							title: "SPECIFIC CRYPTOCURRENCIES",
							subtitle: "", //"PICK SPECIFIC CRYPTOCURRENCIES YOU WANT TO SEE NEWS ON",
							type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
							recommended: [
								{
									id: "61b76db98c90be3d85989893",
									title: "Bitcoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								// {
								// 	id: "61b76db98c90be3d85989894",
								// 	title: "Bitcoin cash",
								// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								// },
								{
									id: "61b76db98c90be3d85989895",
									title: "Ethereum",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989896",
									title: "Binance Coin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989897",
									title: "XRP",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989898",
									title: "Litecoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d85989899",
									title: "Dogecoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598989a",
									title: "Tether",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598989b",
									title: "Cardano",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598989c",
									title: "Chainlink",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								// {
								// 	id: "61b76db98c90be3d8598989d",
								// 	title: "VeChain",
								// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								// },
								{
									id: "61b76db98c90be3d8598989e",
									title: "Stellar",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d8598989f",
									title: "Polkadot",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								// {
								// 	id: "61b76db98c90be3d859898a0",
								// 	title: "Uniswap",
								// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								// },
								{
									id: "61b76db98c90be3d859898a1",
									title: "NEO",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "61b76db98c90be3d859898a2",
									title: "Filecoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								// {
								// 	id: "61b76db98c90be3d859898a3",
								// 	title: "Tron",
								// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								// },
								// {
								// 	id: "61b76db98c90be3d859898a4",
								// 	title: "Sola Token",
								// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								// },
								// {
								// 	id: "61b76db98c90be3d859898a5",
								// 	title: "Ether",
								// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								// },
							],
						},
						{
							id: "306bd9f172a103093eb50204",
							title: "CRYPTO MARKET TOPICS",
							subtitle: "", //"CHOOSE CRYPTOCURRENCY MARKET TOPICS YOU WANT NEWS ON",
							type: ESelectionType.CRYPTOCURRENCY_TOPIC,
							recommended: [
								{
									id: "61b76db98c90be3d859898a6",
									title: "Blockchain-DeFi",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898a7",
									title: "NFTs",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898a8",
									title: "Institutional Adoption",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898a9",
									title: "ICOs-IEOs",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898aa",
									title: "Dapps",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898ab",
									title: "Stablecoins & CBDCs",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898ac",
									title: "Mining",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898ad",
									title: "Technical Analysis",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898ae",
									title: "Crypto Opinion Articles Bullish & Bearish",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898af",
									title: "Crypto Industry Innovation",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
							],
						},
					],
				},
				{
					market: MARKETS[EMarketId.ECONOMY_BUSINESS] as IMarket,
					aspects: [
						{
							id: "306bd9f172a103093eb50205",
							title: "ECONOMY TOPICS",
							subtitle: "", //"PICK ECONOMY TOPICS YOU WANT TO SEE NEWS ON",
							type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
							recommended: [
								{
									id: "61b76db98c90be3d859898b0",
									title: "U.S. Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b1",
									title: "U.S. Monetary Policy & Federal Reserve",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b2",
									title: "Inflation",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b3",
									title: "Job Market",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b4",
									title: "Consumer Prices, Spending & Sentiment",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b5",
									title: "Manufacturing & Factory Activity",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b6",
									title: "U.S. Treasury & Yield Curve",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b7",
									title: "Trade",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b8",
									title: "Business News",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898b9",
									title: "Business Innovation - Artificial Intelligence & 5G",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f9",
									title: "Tech Innovation - Artificial Intelligence & 5G",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
							],
						},
					],
				},
				{
					market: MARKETS[EMarketId.COMMODITIES_FOREX] as IMarket,
					aspects: [
						// {all removed
						// 	id: "306bd9f172a103093eb50206",
						// 	title: "MARKETS",
						// 	subtitle: "",
						// 	type: ESelectionType.COMMODITIES_FOREX_MARKET,
						// 	recommended: [
						// 		// {
						// 		// 	id: "61b76db98c90be3d859898ba",
						// 		// 	title: "Commodities & Futures",
						// 		// 	type: ESelectionType.COMMODITIES_FOREX_MARKET,
						// 		// },
						// 		// {
						// 		// 	id: "61b76db98c90be3d859898bb",
						// 		// 	title: "Forex",
						// 		// 	type: ESelectionType.COMMODITIES_FOREX_MARKET,
						// 		// },
						// 	],
						// },
						{
							id: "306bd9f172a103093eb50207",
							title: "INDIVIDUAL COMMODITIES & FUTURES",
							subtitle: "", //"Choose your Commodities",
							// filter: {
							// 	label: "FILTER THE SECURITIES",
							// },
							type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
							recommended: [
								{
									id: "61b76db98c90be3d859898bc",
									title: "Crude Oil",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								// {
								// 	id: "61b76db98c90be3d859898bd",
								// 	title: "Brent Oil",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								{
									id: "61b76db98c90be3d859898be",
									title: "Natural Gas",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898bf",
									title: "Gold",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c0",
									title: "Silver",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c1",
									title: "Corn",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c2",
									title: "Soybeans",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c3",
									title: "Lumber",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c4",
									title: "Copper",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c5",
									title: "Cotton",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								// {
								// 	id: "61b76db98c90be3d859898c6",
								// 	title: "Oats",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								// {
								// 	id: "61b76db98c90be3d859898c7",
								// 	title: "Rice",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								{
									id: "61b76db98c90be3d859898c8",
									title: "Sugar",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898c9",
									title: "Coffee",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898ca",
									title: "Orange Juice",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898cb",
									title: "Cocoa",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898cc",
									title: "Wheat",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898cd",
									title: "RBOB gasoline",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								// {
								// 	id: "61b76db98c90be3d859898ce",
								// 	title: "heating oil",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								{
									id: "61b76db98c90be3d859898cf",
									title: "Platinum",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898d0",
									title: "Aluminum",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "61b76db98c90be3d859898d1",
									title: "Zinc",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								// {
								// 	id: "61b76db98c90be3d859898d2",
								// 	title: "U.S. Treasury Bond Futures",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								// {
								// 	id: "61b76db98c90be3d859898d3",
								// 	title: "10-Year T-Note Futures",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								// {
								// 	id: "61b76db98c90be3d859898d4",
								// 	title: "5-Year T-Note Futures",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								// {
								// 	id: "61b76db98c90be3d859898d5",
								// 	title: "3-Year Note Futures",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
								// {
								// 	id: "61b76db98c90be3d859898d6",
								// 	title: "2-Year Note Futures",
								// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								// },
							],
						},
						{
							id: "306bd9f172a103093eb50208",
							title: "FOREX INDIVIDUAL SECURITIES",
							subtitle: "", //"Choose your Currencies",
							// filter: {
							// 	label: "Filter Currencies",
							// },
							type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
							recommended: [
								{
									id: "61b76db98c90be3d859898d7",
									title: "US Dollar",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "61b76db98c90be3d859898d8",
									title: "Japanese Yen",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "61b76db98c90be3d859898d9",
									title: "British Pound",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "61b76db98c90be3d859898da",
									title: "Euro",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "61b76db98c90be3d859898db",
									title: "Swiss Franc",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "61b76db98c90be3d859898dc",
									title: "New Zealand Dollar",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "61b76db98c90be3d859898dd",
									title: "Mexican Peso",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50209",
							title: "COMM-FOREX MARKET TOPICS",
							subtitle: "", //"PICK COMM-FOREX MARKET TOPICS YOU WANT TO SEE NEWS ON",
							type: ESelectionType.COMMODITIES_FOREX_TOPIC,
							recommended: [
								{
									id: "61b76db98c90be3d859898de",
									title: "Oil Market & OPEC",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898df",
									title: "General Forex News",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e0",
									title: "General Commodities News",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e1",
									title: "Technical Analysis",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e2",
									title: "Supply & Demand",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e3",
									title: "Commodity Imports & Exports",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e4",
									title: "Farmers & Growers",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e5",
									title: "Commodities Forex Market Sentiment",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e6",
									title: "Monetary & Policy Cues for Currencies",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898e7",
									title: "Commodities Forex Opinion Articles Bullish & Bearish",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
							],
						},
					],
				},
				{
					market: MARKETS[EMarketId.FIXED_INCOME] as IMarket,
					aspects: [
						{
							id: "306bd9f172a103093eb5020a",
							title: "FIXED INCOME SECURITIES",
							subtitle: "",
							type: ESelectionType.FIXED_INCOME_SECURITY,
							recommended: [
								{
									id: "61b76db98c90be3d859898e8",
									title: "Corporate Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "61b76db98c90be3d859898e9",
									title: "Municipal Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "61b76db98c90be3d859898ea",
									title: "Government Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "61b76db98c90be3d859898eb",
									title: "High-Yield Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "61b76db98c90be3d859898ec",
									title: "Mortgage Backed Securities",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								// {
								// 	id: "61b76db98c90be3d859898ed",
								// 	title: "Debt Market",
								// 	type: ESelectionType.FIXED_INCOME_SECURITY,
								// },
								{
									id: "61b76db98c90be3d859898ee",
									title: "Real Estate",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
							],
						},
						{
							id: "306bd9f172a103093eb5020b",
							title: "MARKET TOPICS",
							subtitle: "",
							type: ESelectionType.FIXED_INCOME_TOPIC,
							recommended: [
								{
									id: "61b76db98c90be3d859898ef",
									title: "U.S. Bond Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f0",
									title: "US Treasury & Yield Curve",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f1",
									title: "Fed Buying Activity & Other Fed News",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f2",
									title: "Debt News",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f3",
									title: "MBS & Housing Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f4",
									title: "Interest Rates",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f5",
									title: "Bond Issuance & Corporate Credit Ratings",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f6",
									title: "Foreign Bond Markets & Sovereign Debt",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f7",
									title: "Private Equity",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "61b76db98c90be3d859898f8",
									title: "Real Estate",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
							],
						},
					],
				},
			],
			recommendedSubFilters: [
				{
					id: "61b76db88c90be3d8598983c",
					title: "AMZN",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598983d",
					title: "TSLA",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598983e",
					title: "FB",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598983f",
					title: "AAPL",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989840",
					title: "NFLX",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989841",
					title: "GOOG",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989842",
					title: "MSFT",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989843",
					title: "BABA",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989844",
					title: "BRK.A",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989845",
					title: "V",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989846",
					title: "JPM",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989847",
					title: "JNJ",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989848",
					title: "WMT",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989849",
					title: "NVDA",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598984a",
					title: "MA",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598984b",
					title: "UNH",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598984c",
					title: "DIS",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598984d",
					title: "PYPL",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598984e",
					title: "ADBE",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598984f",
					title: "HD",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989850",
					title: "XOM",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989851",
					title: "KO",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989852",
					title: "PG",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989853",
					title: "ABT",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989854",
					title: "ORCL",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989855",
					title: "NKE",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989856",
					title: "PFE",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989857",
					title: "CRM",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989858",
					title: "CSCO",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989859",
					title: "VZ",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598985a",
					title: "INTC",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598985b",
					title: "PEP",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598985c",
					title: "MRK",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598985d",
					title: "AVGO",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598985e",
					title: "WFC",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d8598985f",
					title: "TXN",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989860",
					title: "MDT",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db88c90be3d85989861",
					title: "MCD",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989862",
					title: "HON",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989863",
					title: "COST",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989864",
					title: "LLY",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989865",
					title: "BIIB",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989866",
					title: "UNP",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989867",
					title: "UPS",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989868",
					title: "TMUS",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989869",
					title: "AMGN",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598986a",
					title: "BMY",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598986b",
					title: "SHOP",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598986c",
					title: "BA",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598986d",
					title: "SBUX",
					type: ESelectionType.STOCK_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598986e",
					title: "Agriculture Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598986f",
					title: "Airline Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989870",
					title: "Automaker Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989871",
					title: "Bank Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989872",
					title: "Basic Materials Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989873",
					title: "Biotechnology Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989874",
					title: "Commodities",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989875",
					title: "Consumer Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989876",
					title: "Defense Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989877",
					title: "Energy Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989878",
					title: "Financial Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989879",
					title: "Food Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598987a",
					title: "Healthcare Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598987b",
					title: "Housing Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598987c",
					title: "Industrial Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598987d",
					title: "Insurance Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598987e",
					title: "Marijuana Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d8598987f",
					title: "Mining Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989880",
					title: "Pharmaceutical Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989881",
					title: "Railroad Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989882",
					title: "Restaurant stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989883",
					title: "Retail Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989884",
					title: "Solar stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989885",
					title: "Tech Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989886",
					title: "Tobacco Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989887",
					title: "Transportation and Shipping Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989888",
					title: "Utility Stocks",
					type: ESelectionType.STOCK_SECTOR,
				},
				{
					id: "61b76db98c90be3d85989889",
					title: "Earnings",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d8598988a",
					title: "General Stock Market News",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d8598988b",
					title: "Wall Street Analyst Coverage",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d8598988c",
					title: "Technical Analysis",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d8598988d",
					title: "Top Movers & Unusual Options Activity",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d8598988e",
					title: "Growth & Value Stocks",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d8598988f",
					title: "Penny Stocks",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d85989890",
					title: "Dow Jones, NASDAQ, & S&P 500",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d85989891",
					title: "Meme Stocks & Short Selling",
					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d85989892",
					title: "Stocks Opinion Articles Bullish & Bearish",

					type: ESelectionType.STOCK_TOPIC,
				},
				{
					id: "61b76db98c90be3d85989893",
					title: "Bitcoin",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				// {
				// 	id: "61b76db98c90be3d85989894",
				// 	title: "Bitcoin cash",
				// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				// },
				{
					id: "61b76db98c90be3d85989895",
					title: "Ethereum",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989896",
					title: "Binance Coin",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989897",
					title: "XRP",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989898",
					title: "Litecoin",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d85989899",
					title: "Dogecoin",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598989a",
					title: "Tether",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598989b",
					title: "Cardano",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598989c",
					title: "Chainlink",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				// {
				// 	id: "61b76db98c90be3d8598989d",
				// 	title: "VeChain",
				// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				// },
				{
					id: "61b76db98c90be3d8598989e",
					title: "Stellar",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d8598989f",
					title: "Polkadot",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				// {
				// 	id: "61b76db98c90be3d859898a0",
				// 	title: "Uniswap",
				// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				// },
				{
					id: "61b76db98c90be3d859898a1",
					title: "NEO",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				{
					id: "61b76db98c90be3d859898a2",
					title: "Filecoin",
					type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				},
				// {
				// 	id: "61b76db98c90be3d859898a3",
				// 	title: "Tron",
				// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				// },
				// {
				// 	id: "61b76db98c90be3d859898a4",
				// 	title: "Sola Token",
				// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				// },
				// {
				// 	id: "61b76db98c90be3d859898a5",
				// 	title: "Ether",
				// 	type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
				// },
				{
					id: "61b76db98c90be3d859898a6",
					title: "Blockchain-DeFi",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898a7",
					title: "NFTs",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898a8",
					title: "Institutional Adoption",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898a9",
					title: "ICOs-IEOs",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898aa",
					title: "Dapps",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898ab",
					title: "Stablecoins & CBDCs",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898ac",
					title: "Mining",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898ad",
					title: "Technical Analysis",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898ae",
					title: "Crypto Opinion Articles Bullish & Bearish",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898af",
					title: "Crypto Industry Innovation",
					type: ESelectionType.CRYPTOCURRENCY_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b0",
					title: "U.S. Economy",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b1",
					title: "U.S. Monetary Policy & Federal Reserve",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b2",
					title: "Inflation",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b3",
					title: "Job Market",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b4",
					title: "Consumer Prices, Spending & Sentiment",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b5",
					title: "Manufacturing & Factory Activity",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b6",
					title: "U.S. Treasury & Yield Curve",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b7",
					title: "Trade",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b8",
					title: "Business News",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898b9",
					title: "Business Innovation - Artificial Intelligence & 5G",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f9",
					title: "Tech Innovation - Artificial Intelligence & 5G",
					type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
				},
				// {
				// 	id: "61b76db98c90be3d859898ba",
				// 	title: "Commodities & Futures",
				// 	type: ESelectionType.COMMODITIES_FOREX_MARKET,
				// },
				// {
				// 	id: "61b76db98c90be3d859898bb",
				// 	title: "Forex",
				// 	type: ESelectionType.COMMODITIES_FOREX_MARKET,
				// },
				{
					id: "61b76db98c90be3d859898bc",
					title: "Crude Oil",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				// {
				// 	id: "61b76db98c90be3d859898bd",
				// 	title: "Brent Oil",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				{
					id: "61b76db98c90be3d859898be",
					title: "Natural Gas",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898bf",
					title: "Gold",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c0",
					title: "Silver",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c1",
					title: "Corn",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c2",
					title: "Soybeans",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c3",
					title: "Lumber",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c4",
					title: "Copper",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c5",
					title: "Cotton",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				// {
				// 	id: "61b76db98c90be3d859898c6",
				// 	title: "Oats",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				// {
				// 	id: "61b76db98c90be3d859898c7",
				// 	title: "Rice",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				{
					id: "61b76db98c90be3d859898c8",
					title: "Sugar",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898c9",
					title: "Coffee",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898ca",
					title: "Orange Juice",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898cb",
					title: "Cocoa",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898cc",
					title: "Wheat",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898cd",
					title: "RBOB gasoline",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				// {
				// 	id: "61b76db98c90be3d859898ce",
				// 	title: "heating oil",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				{
					id: "61b76db98c90be3d859898cf",
					title: "Platinum",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898d0",
					title: "Aluminum",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				{
					id: "61b76db98c90be3d859898d1",
					title: "Zinc",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				},
				// {
				// 	id: "61b76db98c90be3d859898d2",
				// 	title: "U.S. Treasury Bond Futures",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				// {
				// 	id: "61b76db98c90be3d859898d3",
				// 	title: "10-Year T-Note Futures",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				// {
				// 	id: "61b76db98c90be3d859898d4",
				// 	title: "5-Year T-Note Futures",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				// {
				// 	id: "61b76db98c90be3d859898d5",
				// 	title: "3-Year Note Futures",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				// {
				// 	id: "61b76db98c90be3d859898d6",
				// 	title: "2-Year Note Futures",
				// 	type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
				// },
				{
					id: "61b76db98c90be3d859898d7",
					title: "US Dollar",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898d8",
					title: "Japanese Yen",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898d9",
					title: "British Pound",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898da",
					title: "Euro",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898db",
					title: "Swiss Franc",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898dc",
					title: "New Zealand Dollar",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898dd",
					title: "Mexican Peso",
					type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
				},
				{
					id: "61b76db98c90be3d859898de",
					title: "Oil Market & OPEC",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898df",
					title: "General Forex News",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e0",
					title: "General Commodities News",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e1",
					title: "Technical Analysis",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e2",
					title: "Supply & Demand",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e3",
					title: "Commodity Imports & Exports",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e4",
					title: "Farmers & Growers",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e5",
					title: "Commodities Forex Market Sentiment",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e6",
					title: "Monetary & Policy Cues for Currencies",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e7",
					title: "Commodities Forex Opinion Articles Bullish & Bearish",
					type: ESelectionType.COMMODITIES_FOREX_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898e8",
					title: "Corporate Bonds",
					type: ESelectionType.FIXED_INCOME_SECURITY,
				},
				{
					id: "61b76db98c90be3d859898e9",
					title: "Municipal Bonds",
					type: ESelectionType.FIXED_INCOME_SECURITY,
				},
				{
					id: "61b76db98c90be3d859898ea",
					title: "Government Bonds",
					type: ESelectionType.FIXED_INCOME_SECURITY,
				},
				{
					id: "61b76db98c90be3d859898eb",
					title: "High-Yield Bonds",
					type: ESelectionType.FIXED_INCOME_SECURITY,
				},
				{
					id: "61b76db98c90be3d859898ec",
					title: "Mortgage Backed Securities",
					type: ESelectionType.FIXED_INCOME_SECURITY,
				},
				// {
				// 	id: "61b76db98c90be3d859898ed",
				// 	title: "Debt Market",
				// 	type: ESelectionType.FIXED_INCOME_SECURITY,
				// },
				{
					id: "61b76db98c90be3d859898ee",
					title: "Real Estate",
					type: ESelectionType.FIXED_INCOME_SECURITY,
				},
				{
					id: "61b76db98c90be3d859898ef",
					title: "U.S. Bond Market",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f0",
					title: "US Treasury & Yield Curve",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f1",
					title: "Fed Buying Activity & Other Fed News",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f2",
					title: "Debt News",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f3",
					title: "MBS & Housing Market",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f4",
					title: "Interest Rates",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f5",
					title: "Bond Issuance & Corporate Credit Ratings",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f6",
					title: "Foreign Bond Markets & Sovereign Debt",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f7",
					title: "Private Equity",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
				{
					id: "61b76db98c90be3d859898f8",
					title: "Real Estate",
					type: ESelectionType.FIXED_INCOME_TOPIC,
				},
			],
		},
		myPreferences: {
			preferencesManagement: {
				activeMarketIndex: 0,
				isPrefSettingUpFinishedOnce: false,
				preferencesStatus: EPrefCFlowState.NON_INITIATED,
				// prefSettingCanceled: false,
			},
			preferencesPersistent: {
				markets: [],
				marketsAspectsSelections: [],
				// serializedPersonalization: [],
				selectionsSerializedToIDs: [],
			},
		},
		rima: {
			currentUserId: undefined,
			users: [],
		},
	},
};
