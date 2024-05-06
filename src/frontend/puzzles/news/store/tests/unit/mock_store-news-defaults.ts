import { ECFlowState } from "../../vos/preferences-vos";
import { EMarketId, IMarket, IStateNewsStore, MARKETS } from "../../store/store-news-vos";
import { ESelectionType } from "@tickerai-news/i-core";
import mockupNews from "../../../news/store/mockup-news.json";

export const newsStoreDefault: IStateNewsStore = {
	newsStore: {
		news: {
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
			newsLoaded: mockupNews.showMockupNews,
			newsList: mockupNews.showMockupNews ? mockupNews.newsList : [],
			search: "",
		},
		markets: {
			recommendedSubFilters: [],
			marketsAll: MARKETS,
			marketsSetup: [
				{
					market: MARKETS[EMarketId.STOCKS] as IMarket,
					aspects: [
						{
							id: "306bd9f172a103093eb50200",
							filter: {
								label: "FILTER THE STOCKS ...",
							},
							title: "INDIVIDUAL STOCKS",
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK INDIVIDUAL STOCKS YOU WANT TO SEE NEWS ON",
							recommended: [
								{
									id: "AMZN",
									title: "AMZN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "TSLA",
									title: "TSLA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "FB",
									title: "FB",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "AAPL",
									title: "AAPL",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "NFLX",
									title: "NFLX",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "GOOG",
									title: "GOOG",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "MSFT",
									title: "MSFT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "BABA",
									title: "BABA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "BRK.A",
									title: "BRK.A",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "V",
									title: "V",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "JPM",
									title: "JPM",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "JNJ",
									title: "JNJ",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "WMT",
									title: "WMT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "NVDA",
									title: "NVDA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "MA",
									title: "MA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "UNH",
									title: "UNH",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "DIS",
									title: "DIS",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "PYPL",
									title: "PYPL",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "ADBE",
									title: "ADBE",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "HD",
									title: "HD",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "XOM",
									title: "XOM",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "KO",
									title: "KO",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "PG",
									title: "PG",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "ABT",
									title: "ABT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "ORCL",
									title: "ORCL",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "NKE",
									title: "NKE",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "PFE",
									title: "PFE",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "CRM",
									title: "CRM",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "CSCO",
									title: "CSCO",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "VZ",
									title: "VZ",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "INTC",
									title: "INTC",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "PEP",
									title: "PEP",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "MRK",
									title: "MRK",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "AVGO",
									title: "AVGO",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "WFC",
									title: "WFC",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "TXN",
									title: "TXN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "MDT",
									title: "MDT",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "MCD",
									title: "MCD",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "HON",
									title: "HON",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "COST",
									title: "COST",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "LLY",
									title: "LLY",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "BIIB",
									title: "BIIB",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "UNP",
									title: "UNP",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "UPS",
									title: "UPS",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "TMUS",
									title: "TMUS",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "AMGN",
									title: "AMGN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "BMY",
									title: "BMY",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "SHOP",
									title: "SHOP",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "BA",
									title: "BA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "SBUX",
									title: "SBUX",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50201",
							title: "STOCK SECTORS",
							type: ESelectionType.UNKNOWN,
							subtitle: "CHOOSE STOCK SECTORS YOU WANT NEWS ON",
							recommended: [
								{
									id: "Agriculture Stocks",
									title: "Agriculture Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Airline Stocks",
									title: "Airline Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Automaker Stocks",
									title: "Automaker Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Bank Stocks",
									title: "Bank Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Basic Materials Stocks",
									title: "Basic Materials Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Biotechnology Stocks",
									title: "Biotechnology Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Commodities",
									title: "Commodities",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Consumer Stocks",
									title: "Consumer Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Defense Stocks",
									title: "Defense Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Energy Stocks",
									title: "Energy Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Financial Stocks",
									title: "Financial Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Food Stocks",
									title: "Food Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Healthcare Stocks",
									title: "Healthcare Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Housing Stocks",
									title: "Housing Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Industrial Stocks",
									title: "Industrial Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Insurance Stocks",
									title: "Insurance Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Marijuana Stocks",
									title: "Marijuana Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Mining Stocks",
									title: "Mining Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Pharmaceutical Stocks",
									title: "Pharmaceutical Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Railroad Stocks",
									title: "Railroad Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Restaurant stocks",
									title: "Restaurant stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Retail Stocks",
									title: "Retail Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Solar stocks",
									title: "Solar stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Tech Stocks",
									title: "Tech Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Tobacco Stocks",
									title: "Tobacco Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Transportation and Shipping Stocks",
									title: "Transportation and Shipping Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
								{
									id: "Utility Stocks",
									title: "Utility Stocks",
									type: ESelectionType.STOCK_SECTOR,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50202",
							title: "STOCK MARKET TOPICS",
							type: ESelectionType.UNKNOWN,
							subtitle: "CHOOSE STOCK MARKET TOPICS YOU WANT NEWS ON",
							recommended: [
								{
									id: "Earnings",
									title: "Earnings",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Wall Street Analyst Coverage ",
									title: "Wall Street Analyst Coverage ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Upgrades and Downgrades ",
									title: "Upgrades and Downgrades ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Price Targets ",
									title: "Price Targets ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Buy Ratings",
									title: "Buy Ratings",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Sell Ratings ",
									title: "Sell Ratings ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Technical Analysis ",
									title: "Technical Analysis ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Fundamental Analysis ",
									title: "Fundamental Analysis ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "NASDAQ stocks",
									title: "NASDAQ stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "DOW stocks",
									title: "DOW stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "S&P 500 stocks",
									title: "S&P 500 stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "FAANG stocks",
									title: "FAANG stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Growth",
									title: "Growth",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Value",
									title: "Value",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Warren Buffet",
									title: "Warren Buffet",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Jim Cramer",
									title: "Jim Cramer",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Penny stocks",
									title: "Penny stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Day Trading ",
									title: "Day Trading ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Buyouts / M&A activity",
									title: "Buyouts / M&A activity",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Stock recommendations",
									title: "Stock recommendations",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Opinion articles",
									title: "Opinion articles",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Insider Trading ",
									title: "Insider Trading ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Volume ",
									title: "Volume ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Options ",
									title: "Options ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Nano-cap stocks ($0M--50M mcap)",
									title: "Nano-cap stocks ($0M--50M mcap)",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Micro-cap stocks ($50M--300M mcap)",
									title: "Micro-cap stocks ($50M--300M mcap)",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Small-cap stocks ($300M--2B mcap)",
									title: "Small-cap stocks ($300M--2B mcap)",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Mid-cap stocks ($2B--10B mcap)",
									title: "Mid-cap stocks ($2B--10B mcap)",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Lagre-cap stocks ($10b--300b mcap)",
									title: "Lagre-cap stocks ($10b--300b mcap)",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Mega-cap stocks ($300B mcap and above)",
									title: "Mega-cap stocks ($300B mcap and above)",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "IPOs",
									title: "IPOs",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "General market index news ",
									title: "General market index news ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "The federal reserve / interest rates ",
									title: "The federal reserve / interest rates ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Infrastructure stocks",
									title: "Infrastructure stocks",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Swing trading",
									title: "Swing trading",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Mututal funds ",
									title: "Mututal funds ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "ETFs",
									title: "ETFs",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Short interest ",
									title: "Short interest ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Institutional Buying ",
									title: "Institutional Buying ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Hedge Funds ",
									title: "Hedge Funds ",
									type: ESelectionType.STOCK_TOPIC,
								},
								{
									id: "Investment Banking",
									title: "Investment Banking",
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
							filter: {
								label: "FILTER THE CRYPTO ...",
							},
							title: "SPECIFIC CRYPTOCURRENCIES",
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK SPECIFIC CRYPTOCURRENCIES YOU WANT TO SEE NEWS ON",
							recommended: [
								{
									id: "Bitcoin",
									title: "Bitcoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Bitcoin cash",
									title: "Bitcoin cash",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Ethereum",
									title: "Ethereum",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Binance Coin",
									title: "Binance Coin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "XRP",
									title: "XRP",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Litecoin",
									title: "Litecoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Dogecoin",
									title: "Dogecoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Tether",
									title: "Tether",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Cardano",
									title: "Cardano",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Chainlink",
									title: "Chainlink",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "VeChain",
									title: "VeChain",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Stellar",
									title: "Stellar",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Polkadot",
									title: "Polkadot",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Uniswap",
									title: "Uniswap",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "NEO",
									title: "NEO",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Filecoin",
									title: "Filecoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Tron",
									title: "Tron",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Sola Token",
									title: "Sola Token",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Ether",
									title: "Ether",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50204",
							title: "CRYPTOCURRENCY MARKET TOPICS",
							type: ESelectionType.UNKNOWN,
							subtitle: "CHOOSE CRYPTOCURRENCY MARKET TOPICS YOU WANT NEWS ON",
							recommended: [
								{
									id: "Blockchain",
									title: "Blockchain",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Crypto Banking",
									title: "Crypto Banking",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Altcoins",
									title: "Altcoins",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Stablecoins",
									title: "Stablecoins",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Defi",
									title: "Defi",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "NFTs",
									title: "NFTs",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "dApps",
									title: "dApps",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Trading Volume",
									title: "Trading Volume",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Mining",
									title: "Mining",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Smart contracts",
									title: "Smart contracts",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Cold Storage",
									title: "Cold Storage",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "ICO",
									title: "ICO",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "IEO",
									title: "IEO",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Digital Economy",
									title: "Digital Economy",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Binance",
									title: "Binance",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Coinbase",
									title: "Coinbase",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Support & Resistance",
									title: "Support & Resistance",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Technical Analysis",
									title: "Technical Analysis",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Microstrategy",
									title: "Microstrategy",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Fiat Currencies",
									title: "Fiat Currencies",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Tokens",
									title: "Tokens",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Market capitalizations",
									title: "Market capitalizations",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Institutional Buying",
									title: "Institutional Buying",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Cryptocurrency Exchanges",
									title: "Cryptocurrency Exchanges",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Cryptocurrency Regulation",
									title: "Cryptocurrency Regulation",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Monero",
									title: "Monero",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Dash",
									title: "Dash",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Zcash",
									title: "Zcash",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "DAG",
									title: "DAG",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Moon",
									title: "Moon",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Whale",
									title: "Whale",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Hard Fork",
									title: "Hard Fork",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Bitcoin Miners",
									title: "Bitcoin Miners",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Cryptocurrency Innovation",
									title: "Cryptocurrency Innovation",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Cryptocurrency Indexes",
									title: "Cryptocurrency Indexes",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Opinion Articles",
									title: "Opinion Articles",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Crypto as Payment",
									title: "Crypto as Payment",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Industry Reports & News",
									title: "Industry Reports & News",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Cryptocurrency Funds",
									title: "Cryptocurrency Funds",
									type: ESelectionType.CRYPTOCURRENCY_TOPIC,
								},
								{
									id: "Crypto Frauds & Scam News",
									title: "Crypto Frauds & Scam News",
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
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK ECONOMY TOPICS YOU WANT TO SEE NEWS ON",
							recommended: [
								{
									id: "U.S. Economy",
									title: "U.S. Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Federal Reserve",
									title: "Federal Reserve",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Jerome Powell",
									title: "Jerome Powell",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Treasury Secretary Yellen",
									title: "Treasury Secretary Yellen",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Jobless Claims",
									title: "Jobless Claims",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Unemployment",
									title: "U.S. Unemployment",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Employment",
									title: "U.S. Employment",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Job market",
									title: "Job market",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "US GDP",
									title: "US GDP",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "China GDP",
									title: "China GDP",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Inflation",
									title: "Inflation",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Global Inflation",
									title: "Global Inflation",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Economic Sentiment",
									title: "Economic Sentiment",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Consumer Prices",
									title: "Consumer Prices",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Consumer Pricing Index (CPI)",
									title: "Consumer Pricing Index (CPI)",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Deflation",
									title: "Deflation",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Interest Rates",
									title: "Interest Rates",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Housing Market",
									title: "Housing Market",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "5G",
									title: "5G",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Artificial Intelligence",
									title: "Artificial Intelligence",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Job Displacement",
									title: "Job Displacement",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Treasury Department Press Releases",
									title: "Treasury Department Press Releases",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Fed Press Releases",
									title: "Fed Press Releases",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Yield Curve",
									title: "Yield Curve",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Fiscal Policy",
									title: "U.S. Fiscal Policy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. National Debt",
									title: "U.S. National Debt",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Monetary Policy",
									title: "Monetary Policy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Washington Spending",
									title: "Washington Spending",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Gas Prices",
									title: "Gas Prices",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Oil Market",
									title: "Oil Market",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Economic Policy",
									title: "U.S. Economic Policy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Stimulus",
									title: "Stimulus",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Deficits",
									title: "Deficits",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Trade",
									title: "U.S. Trade",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Economic Recovery",
									title: "U.S. Economic Recovery",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Economic Data",
									title: "U.S. Economic Data",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Economic Value",
									title: "U.S. Economic Value",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "China Trade",
									title: "China Trade",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Shortages",
									title: "Shortages",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Economist Opinions",
									title: "Economist Opinions",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Trading Relations",
									title: "Trading Relations",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "USMCA",
									title: "USMCA",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Manufacturing",
									title: "Manufacturing",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Manufacturing Jobs",
									title: "Manufacturing Jobs",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Factory Activity",
									title: "U.S. Factory Activity",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Labor Market",
									title: "U.S. Labor Market",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "CBO Forecasts",
									title: "CBO Forecasts",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Economic Outlook & Forecasts",
									title: "U.S. Economic Outlook & Forecasts",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Participation Rate",
									title: "U.S. Participation Rate",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Home Ownership",
									title: "Home Ownership",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Economic Expansion",
									title: "Economic Expansion",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Economic Contraction",
									title: "Economic Contraction",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Economic Recovery",
									title: "Economic Recovery",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Economic Cycle",
									title: "Economic Cycle",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Chinese Economy",
									title: "Chinese Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "European Economy",
									title: "European Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Japanese Economy",
									title: "Japanese Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Canadian Economy",
									title: "Canadian Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Russian Economy",
									title: "Russian Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Saudia Arabia",
									title: "Saudia Arabia",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "German Economy",
									title: "German Economy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Oil Markets",
									title: "Oil Markets",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Corporate Profits",
									title: "Corporate Profits",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "US-China Relations",
									title: "US-China Relations",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "European Union",
									title: "European Union",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Bubbles",
									title: "Bubbles",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Rising Prices",
									title: "Rising Prices",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "IMF Forecasts",
									title: "IMF Forecasts",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Huawei",
									title: "Huawei",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "ZTE",
									title: "ZTE",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Green Energy",
									title: "Green Energy",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Wall Street Economic Forecasts",
									title: "Wall Street Economic Forecasts",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "Infrastructure Bills",
									title: "Infrastructure Bills",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
								{
									id: "U.S. Sanctions",
									title: "U.S. Sanctions",
									type: ESelectionType.ECONOMY_BUSINESS_TOPIC,
								},
							],
						},
					],
				},
				{
					market: MARKETS[EMarketId.COMMODITIES_FOREX] as IMarket,
					aspects: [
						// {
						// 	id: "306bd9f172a103093eb50206",
						// 	title: "MARKETS",
						// 	type: ESelectionType.UNKNOWN,
						// 	subtitle: "PICK MARKETS YOU WANT TO SEE NEWS ON",
						// 	recommended: [
						// 		{
						// 			id: "Commodities & Futures",
						// 			title: "Commodities & Futures",
						// 			type: ESelectionType.COMMODITIES_FOREX_MARKET,
						// 		},
						// 		{
						// 			id: "Forex",
						// 			title: "Forex",
						// 			type: ESelectionType.COMMODITIES_FOREX_MARKET,
						// 		},
						// 	],
						// },
						{
							id: "306bd9f172a103093eb50207",
							title: "INDIVIDUAL COMMODITIES & FUTURES",
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK FOREX INDIVIDUAL SECURITIES YOU WANT TO SEE NEWS ON",
							filter: {
								label: "FILTER THE SECURITIES",
							},
							recommended: [
								{
									id: "Crude Oil",
									title: "Crude Oil",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Brent Oil",
									title: "Brent Oil",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Natural Gas",
									title: "Natural Gas",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Gold",
									title: "Gold",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Silver",
									title: "Silver",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Corn",
									title: "Corn",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Soybeans",
									title: "Soybeans",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Lumber",
									title: "Lumber",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Copper",
									title: "Copper",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Cotton",
									title: "Cotton",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Oats",
									title: "Oats",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Rice",
									title: "Rice",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Sugar",
									title: "Sugar",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Coffee",
									title: "Coffee",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Orange Juice",
									title: "Orange Juice",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Cocoa",
									title: "Cocoa",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Wheat",
									title: "Wheat",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "RBOB gasoline",
									title: "RBOB gasoline",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "heating oil",
									title: "heating oil",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Platinum",
									title: "Platinum",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Aluminum",
									title: "Aluminum",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "Zinc",
									title: "Zinc",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "U.S. Treasury Bond Futures",
									title: "U.S. Treasury Bond Futures",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "10-Year T-Note Futures",
									title: "10-Year T-Note Futures",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "5-Year T-Note Futures",
									title: "5-Year T-Note Futures",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "3-Year Note Futures",
									title: "3-Year Note Futures",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
								{
									id: "2-Year Note Futures",
									title: "2-Year Note Futures",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_COMMODITY,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50208",
							title: "FOREX INDIVIDUAL SECURITIES",
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK FOREX INDIVIDUAL SECURITIES YOU WANT TO SEE NEWS ON",
							filter: {
								label: "FILTER THE SECURITIES",
							},
							recommended: [
								{
									id: "US Dollar",
									title: "US Dollar",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "Japanese Yen",
									title: "Japanese Yen",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "British Pound",
									title: "British Pound",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "Euro",
									title: "Euro",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "Swiss Franc",
									title: "Swiss Franc",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "New Zealand Dollar",
									title: "New Zealand Dollar",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
								{
									id: "Mexican Peso",
									title: "Mexican Peso",
									type: ESelectionType.COMMODITIES_FOREX_INDIVIDUAL_FOREX,
								},
							],
						},
						{
							id: "306bd9f172a103093eb50209",
							title: "COMM-FOREX MARKET TOPICS",
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK COMM-FOREX MARKET TOPICS YOU WANT TO SEE NEWS ON",
							recommended: [
								{
									id: "OPEC",
									title: "OPEC",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Tariffs",
									title: "Tariffs",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Oil market",
									title: "Oil market",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Trade Setups",
									title: "Trade Setups",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Hedging",
									title: "Hedging",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Supply & Demand News",
									title: "Supply & Demand News",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Price Highs",
									title: "Price Highs",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Price Lows",
									title: "Price Lows",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "World Bank",
									title: "World Bank",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Chinese Gold Consumption",
									title: "Chinese Gold Consumption",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Technical Analysis",
									title: "Technical Analysis",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Fundamental Analysis",
									title: "Fundamental Analysis",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Bearish Opinions",
									title: "Bearish Opinions",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Bullish Opinions",
									title: "Bullish Opinions",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Fibonacci Levels",
									title: "Fibonacci Levels",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Iraq",
									title: "Iraq",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Russia",
									title: "Russia",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Saudi Arabia",
									title: "Saudi Arabia",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Pipelines",
									title: "Pipelines",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "RSI",
									title: "RSI",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Rs",
									title: "Rs",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Gm",
									title: "Gm",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Kg",
									title: "Kg",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Inflation Relating to Commodities",
									title: "Inflation Relating to Commodities",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "CBOE",
									title: "CBOE",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Commodity Shortages",
									title: "Commodity Shortages",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Commodity Exports",
									title: "Commodity Exports",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Commodity Imports",
									title: "Commodity Imports",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Farmers & Growers",
									title: "Farmers & Growers",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "U.S. data / Policy Cues",
									title: "U.S. data / Policy Cues",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Forex Forecasts",
									title: "Forex Forecasts",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Pairs",
									title: "Pairs",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Forex Technical Analysis",
									title: "Forex Technical Analysis",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Dollar Strength",
									title: "Dollar Strength",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Dollar Weakness",
									title: "Dollar Weakness",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Volatility",
									title: "Volatility",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Forex Weekly Outlook",
									title: "Forex Weekly Outlook",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Bank of England",
									title: "Bank of England",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "US Central Bank",
									title: "US Central Bank",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "US NFP",
									title: "US NFP",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Weather Impacting Commodity Prices",
									title: "Weather Impacting Commodity Prices",
									type: ESelectionType.COMMODITIES_FOREX_TOPIC,
								},
								{
									id: "Futures Trading",
									title: "Futures Trading",
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
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK FIXED INCOME SECURITIES YOU WANT TO SEE NEWS ON",
							recommended: [
								{
									id: "Corporate Bonds",
									title: "Corporate Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "Municipal Bonds",
									title: "Municipal Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "Government Bonds",
									title: "Government Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "High-Yield Bonds",
									title: "High-Yield Bonds",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "Mortgage Backed Securities",
									title: "Mortgage Backed Securities",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "Debt Market",
									title: "Debt Market",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
								{
									id: "Real Estate",
									title: "Real Estate",
									type: ESelectionType.FIXED_INCOME_SECURITY,
								},
							],
						},
						{
							id: "306bd9f172a103093eb5020b",
							title: "MARKET TOPICS",
							type: ESelectionType.UNKNOWN,
							subtitle: "PICK MARKET TOPICS YOU WANT TO SEE NEWS ON",
							recommended: [
								{
									id: "US Bond Market",
									title: "US Bond Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Bond Sales",
									title: "Bond Sales",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Interest Rates",
									title: "Interest Rates",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "U.S. Federal Reserve",
									title: "U.S. Federal Reserve",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Fed Bond Buying & Selling",
									title: "Fed Bond Buying & Selling",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "U.S. Private Debt",
									title: "U.S. Private Debt",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Default Rate",
									title: "Default Rate",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Treasury Secretary Yellen",
									title: "Treasury Secretary Yellen",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Inflation",
									title: "Inflation",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Biden Spending Proposals",
									title: "Biden Spending Proposals",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Debt Outlook",
									title: "Debt Outlook",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Quantitative Easing",
									title: "Quantitative Easing",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Quantitative Tightening",
									title: "Quantitative Tightening",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Global Bond Market",
									title: "Global Bond Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Treasury Bonds",
									title: "Treasury Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Treasury Bills",
									title: "Treasury Bills",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Corporate Bonds",
									title: "Corporate Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Corporate Debt Securities Market",
									title: "Corporate Debt Securities Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Public Companies Issuing Debt",
									title: "Public Companies Issuing Debt",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Investment Grade Bonds",
									title: "Investment Grade Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Junk Bonds & High-Yield Bonds",
									title: "Junk Bonds & High-Yield Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Municipal Bonds",
									title: "Municipal Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Debt Articles",
									title: "Debt Articles",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Mortgage Bonds (MBS)",
									title: "Mortgage Bonds (MBS)",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Housing Market",
									title: "Housing Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Treasury Department",
									title: "Treasury Department",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Jerome Powell",
									title: "Jerome Powell",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Infrastructure",
									title: "Infrastructure",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Digital Bonds",
									title: "Digital Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Duration Bets",
									title: "Duration Bets",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Australian Bonds",
									title: "Australian Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Canadian Bonds",
									title: "Canadian Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Michael Hsu",
									title: "Michael Hsu",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "EU Issuance",
									title: "EU Issuance",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Green Bonds",
									title: "Green Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Sovereign Bonds",
									title: "Sovereign Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Bond Arbitrage",
									title: "Bond Arbitrage",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Certificates of Deposit (CDs)",
									title: "Certificates of Deposit (CDs)",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "GO Bonds",
									title: "GO Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Revenue Bonds",
									title: "Revenue Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Economic Cycle",
									title: "Economic Cycle",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Coupon Rate",
									title: "Coupon Rate",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Annuity",
									title: "Annuity",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "United Kingdom Bonds",
									title: "United Kingdom Bonds",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Duration",
									title: "Duration",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "European Bond market",
									title: "European Bond market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Chinese Bond Market",
									title: "Chinese Bond Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Real Estate Market",
									title: "Real Estate Market",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Commercial Real Estate",
									title: "Commercial Real Estate",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
								{
									id: "Real Estate Deals",
									title: "Real Estate Deals",
									type: ESelectionType.FIXED_INCOME_TOPIC,
								},
							],
						},
					],
				},
			],
		},
		myPreferences: {
			selectionsSerializedToIDs: [],
			markets: [MARKETS[EMarketId.STOCKS] as IMarket, MARKETS[EMarketId.CRYPTO] as IMarket],
			optionsPerMarket: [],
			marketsAspectsSelections: [
				{
					market: MARKETS[EMarketId.STOCKS] as IMarket,
					marketsAspectSelection: [
						{
							aspect: {
								id: "306bd9f172a103093eb50200",
								title: "INDIVIDUAL STOCKS",
								type: ESelectionType.UNKNOWN,
								subtitle: "PICK INDIVIDUAL STOCKS YOU WANT TO SEE NEWS ON",
								recommended: [
									{
										id: "AMZN",
										title: "AMZN",
										type: ESelectionType.STOCK_INDIVIDUAL,
									},
									{
										id: "TSLA",
										title: "TSLA",
										type: ESelectionType.STOCK_INDIVIDUAL,
									},
									{
										id: "FB",
										title: "FB",
										type: ESelectionType.STOCK_INDIVIDUAL,
									},
								],
							},
							selections: [
								{
									id: "AMZN",
									title: "AMZN",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
								{
									id: "TSLA",
									title: "TSLA",
									type: ESelectionType.STOCK_INDIVIDUAL,
								},
							],
						},
					],
				},
				{
					market: MARKETS[EMarketId.CRYPTO] as IMarket,
					marketsAspectSelection: [
						{
							aspect: {
								id: "306bd9f172a103093eb50203",
								title: "SPECIFIC CRYPTOCURRENCIES",
								type: ESelectionType.UNKNOWN,
								subtitle: "PICK SPECIFIC CRYPTOCURRENCIES YOU WANT TO SEE NEWS ON",
								recommended: [
									{
										id: "Bitcoin",
										title: "Bitcoin",
										type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
									},
									{
										id: "Bitcoin cash",
										title: "Bitcoin cash",
										type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
									},
									{
										id: "Ethereum",
										title: "Ethereum",
										type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
									},
									{
										id: "Binance Coin",
										title: "Binance Coin",
										type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
									},
								],
							},
							selections: [
								{
									id: "Bitcoin",
									title: "Bitcoin",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
								{
									id: "Ethereum",
									title: "Ethereum",
									type: ESelectionType.CRYPTOCURRENCY_INDIVIDUAL,
								},
							],
						},
					],
				},
			],
			activeMarketIndex: 1,
			isPrefSettingUpFinishedOnce: false,
			preferencesStatus: ECFlowState.NON_INITIATED,
		},
	},
};
