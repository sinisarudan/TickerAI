import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { INews, EPrefCFlowState, ISelection, ISelectionRel, IHeadings, NEWS_SELECTION_UNCATEGORIZED } from "@tickerai-news/i-core";
import { newsStoreDefault } from "./store-news-defaults";
import { IApiRequest, KNODE_API_TYPE, IKNode, KNode, KnAlledgeNodeOperators } from "@colabo-knalledge/i-core";
import { KnalledgeActions } from "@colabo-knalledge/f-core";
import newsListMockup from "./news-list.json";
import { IStateRima } from "@colabo-rima/f-core";
import { ActionContext } from "vuex";
import { RimaMutations } from "@colabo-rima/f-core";
// import { RootState } from "vuex/types";
// import { RootState } from '@/store/types';
// import { RootState } from './types';

import { EMarketId, IMarket, IMarketAspectSetup, IMarketsAspectsSelection, IMarketAspectSelections, IStateMarkets, IStateMyPreferences, IStateNews, MyPreferencesMutations, NewsMutations, NewsActions, INewsResponse, stateNewsesBlanco, IStateNewsTotal, MyPreferencesActions, IMarketSetup, ESelectionAction, IStateMyPreferencesManagement, IMarketSelectionsSerialized, LOADING_STATUS, ErrorColabo, ErrorColaboLevel, IStateMyPreferencesPersistent, IBrowsingLocation } from "./store-news-vos";

type Context = ActionContext<IStateNewsTotal, IStateNewsTotal>;

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface INewsListRequestPersonalized_Aspect {
	id: string;
	title: string;
	subtitle: string;
	selections: ISelection[];
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface INewsListRequestPersonalized_Market {
	market: string;
	aspects: INewsListRequestPersonalized_Aspect[];
}

export interface INewsListRequestPersonalized {
	markets: INewsListRequestPersonalized_Market[];
}

const MOCKUP_STORE: boolean = true;
const SORT_SELECTIONS_BY_TITLE: boolean = true;

class StoreNewsMethods {
	public static marketIdsOrdered: string[] = [EMarketId.STOCKS, EMarketId.CRYPTO, EMarketId.ECONOMY_BUSINESS, EMarketId.COMMODITIES_FOREX, EMarketId.FIXED_INCOME];
	public static marketAspectSetups: IMarketAspectSetup[] | undefined = undefined;
	public static getSelectionById(state: IStateNewsTotal, selectionId: string | undefined): ISelection | undefined {
		if (!selectionId || selectionId === "") return undefined;
		const recommendedSubFilters: ISelection[] = (state as any)?.markets.recommendedSubFilters;
		const selection: ISelection | undefined = recommendedSubFilters.find((subfilter: ISelection) => subfilter.id === selectionId);
		return selection;
	}

	public static getSelectionByTitle(state: IStateNewsTotal, title: string | undefined): ISelection | undefined {
		if (!title || title === "") return undefined;
		const recommendedSubFilters: ISelection[] = (state as any)?.markets.recommendedSubFilters;
		const selection: ISelection | undefined = recommendedSubFilters.find((subfilter: ISelection) => {
			const subTitle: string = (subfilter.title as string).replace(" ", "-");
			const isEqual: boolean = !subTitle.localeCompare(title, "en", { sensitivity: "base" }); //returns 0 if equal
			return isEqual;
		});
		// (subfilter.title as string).replace(" ", "-") === title);
		return selection;
	}

	protected static getSelectingSortingId(selection: ISelection, byTitle: boolean = true): string {
		let sortingId: string = "";
		if (byTitle) {
			sortingId = (selection?.title as string).toUpperCase();
			if (!sortingId) {
				console.error(`getSelectingSortingId: title for selection ${JSON.stringify(selection)} not found`);
			}
		} else {
			sortingId = selection.id as string;
			if (!sortingId) {
				console.error(`getSelectingSortingId: id for selection ${JSON.stringify(selection)} not found`);
			}
		}
		return sortingId;
	}

	/**
	 * recommended Subfilters are stored at two places in `markets.recommendedSubFilters` and for each aspect
	 */
	public static orderRecommendedSubFilters(state: IStateNewsTotal): void {
		const recommendedSubFilters: ISelection[] = (state as any)?.markets.recommendedSubFilters;
		recommendedSubFilters.sort((a: ISelection, b: ISelection) => {
			const aSortingId: string = this.getSelectingSortingId(a, SORT_SELECTIONS_BY_TITLE);
			const bSortingId: string = this.getSelectingSortingId(b, SORT_SELECTIONS_BY_TITLE);
			return aSortingId.localeCompare(bSortingId); //aSortingId > bSortingId ? 1 : aSortingId < bSortingId ? -1 : 0;
		});
	}

	/**
	 * recommended Subfilters are stored at two places in `markets.recommendedSubFilters` and for each aspect
	 */
	public static orderMarketAspectsRecommendedSelections(state: IStateNewsTotal): void {
		// markets.marketsSetup.aspects.recommended
		const marketSetup: IMarketSetup[] = (state as any)?.markets.marketsSetup;
		marketSetup.forEach((ms: IMarketSetup) => {
			ms.aspects.forEach((mas: IMarketAspectSetup) => {
				mas.recommended.sort((a: ISelection, b: ISelection) => {
					const aSortingId: string = this.getSelectingSortingId(a, SORT_SELECTIONS_BY_TITLE);
					const bSortingId: string = this.getSelectingSortingId(b, SORT_SELECTIONS_BY_TITLE);
					return aSortingId.localeCompare(bSortingId); //aSortingId > bSortingId ? 1 : aSortingId < bSortingId ? -1 : 0;
				});
			});
		});
	}

	public static orderSelectedSelections(state: IStateNewsTotal): void {
		// markets.marketsSetup.aspects.recommended
		const maSelections: IMarketsAspectsSelection[] = (state as any)?.myPreferences.preferencesPersistent.marketsAspectsSelections;
		maSelections.forEach((msas: IMarketsAspectsSelection) => {
			msas.marketsAspectSelection.forEach((mas: IMarketAspectSelections) => {
				mas.selections.sort((a: ISelection, b: ISelection) => {
					const aSortingId: string = this.getSelectingSortingId(a, SORT_SELECTIONS_BY_TITLE);
					const bSortingId: string = this.getSelectingSortingId(b, SORT_SELECTIONS_BY_TITLE);
					return aSortingId.localeCompare(bSortingId); //aSortingId > bSortingId ? 1 : aSortingId < bSortingId ? -1 : 0;
				});
			});
		});
	}

	/**
	 *
	 * @param state
	 * @param what 1: orderRecommendedSubFilters; 2: orderMarketAspectsRecommendedSelections; 3: orderSelectedSelections; 4: orderRecommendedSubFilters && orderMarketAspectsRecommendedSelections && orderSelectedSelections; by DEFAULT = 4;
	 */
	public static orderSelections(state: IStateNewsTotal, what: number = 4): void {
		if (what === 1 || what === 4) StoreNewsMethods.orderRecommendedSubFilters(state);
		if (what === 2 || what === 4) StoreNewsMethods.orderMarketAspectsRecommendedSelections(state);
		if (what === 3 || what === 4) StoreNewsMethods.orderSelectedSelections(state);
	}

	/**
	 * returns uppercase string for title or `NEWS_SELECTION_UNCATEGORIZED` if undefined `selection`. If chosen, it might return `subfilter` too
	 */
	protected static getNewsSortingId(news: INews, byTitle: boolean = true): string {
		let sortingId: string = NEWS_SELECTION_UNCATEGORIZED;
		if (byTitle) {
			sortingId = (news?.selection?.title as string).toUpperCase();
			if (!sortingId) {
				console.warn(`getNewsSortingId: selection.title for News (title: ${news.title}) (url: ${news.url}) (selection: ${JSON.stringify(news.selection)}) not found`);
				sortingId = NEWS_SELECTION_UNCATEGORIZED;
			}
		} else {
			sortingId = news?.subfilter as string;
			if (!sortingId) {
				console.warn(`getNewsSortingId: subfilter for News ${JSON.stringify(news)} not found`);
				sortingId = NEWS_SELECTION_UNCATEGORIZED;
			}
		}
		return sortingId;
	}

	protected static isSortedArray(newsList: INews[]): boolean {
		let sorted: boolean = true;
		for (let i: number = 0; i < newsList.length - 1; i++) {
			const aSortingId: string = this.getNewsSortingId(newsList[i], SORT_SELECTIONS_BY_TITLE);
			const bSortingId: string = this.getNewsSortingId(newsList[i + 1], SORT_SELECTIONS_BY_TITLE);

			if (aSortingId > bSortingId) {
				sorted = false;
				break;
			}
		}
		return sorted;
	}

	public static orderNewList(newsList: INews[]): void {
		newsList.sort((a: INews, b: INews) => {
			const aSortingId: string = StoreNewsMethods.getNewsSortingId(a, SORT_SELECTIONS_BY_TITLE);
			const bSortingId: string = StoreNewsMethods.getNewsSortingId(b, SORT_SELECTIONS_BY_TITLE);
			return aSortingId.localeCompare(bSortingId); //aSortingId > bSortingId ? 1 : aSortingId < bSortingId ? -1 : 0;
		});
		console.debug(
			"[orderNewList] newsList.selection.title [after sorting]",
			newsList.map((n: INews) => n.selection?.title)
		);
		console.debug("[orderNewList] newsList [after sorting]", newsList);
		if (!StoreNewsMethods.isSortedArray(newsList)) {
			console.error("[orderNewList] newsList NOT sorted [after sorting]", newsList);
			// const error: ErrorColabo = {
			// 	code: "NO_MARKET_SETUP_FOUND",
			// 	level: ErrorColaboLevel.ERROR,
			// 	origin: "orderMarketsAndMarketsAspects",
			// };
			// await context.dispatch(NewsActions.LOG_ERROR, error);
		}
	}

	/**
	 * we call it by passing the state `this.context.state as IStateNewsTotal` bc. compiler sees this type wrongly and rises error `Argument of type 'ThisType<any>' is not assignable to parameter of type 'IStateNewsTotal'`
	 * @param state
	 * @returns
	 */
	public static userId(state: IStateNewsTotal): string | undefined {
		let userId: string | undefined = (state as any).rima.currentUserId;
		//the user is saved in `localStorage.loggedInUser` by `colabo/src/isomorphic/puzzles/rima/aaa/lib/rima-aaa.service.ts::saveLoggedInUser()`
		//TODO: @mprinc wrongly serialized logged out user into `localStorage.loggedInUser` (in `colabo/src/isomorphic/puzzles/rima/aaa/lib/rima-aaa.service.ts`) as "null" string instead of `null` value, so we have to check for `localStorage.loggedInUser !== "null"`:
		if (!userId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
			userId = JSON.parse(localStorage.loggedInUser)._id;
		}
		return userId;
	}

	/** orders selected Markets And their MarketsAspects (`state.myPreferences.preferencesPersistent.marketsAspectsSelections`) and returns it */
	public static async orderMarketsAndMarketsAspects(context: Context): Promise<IMarketsAspectsSelection[]> {
		//order markets:
		const marketsAspectsSelections: IMarketsAspectsSelection[] = (context.state as any)?.myPreferences.preferencesPersistent.marketsAspectsSelections;
		marketsAspectsSelections.sort((a: IMarketsAspectsSelection, b: IMarketsAspectsSelection) => StoreNewsMethods.marketIdsOrdered.indexOf(a.market.id) - StoreNewsMethods.marketIdsOrdered.indexOf(b.market.id));

		//order aspects of markets:
		const marketsSetup: IMarketSetup[] = (context.state as any)?.markets.marketsSetup;
		for (let index = 0; index < marketsAspectsSelections.length; index++) {
			const marketsAspectsSelection: IMarketsAspectsSelection = marketsAspectsSelections[index];
			const marketSetup: IMarketSetup | undefined = marketsSetup.find((ms: IMarketSetup) => ms.market.id === marketsAspectsSelection.market.id);
			if (marketSetup) {
				marketsAspectsSelection.marketsAspectSelection.sort((a: IMarketAspectSelections, b: IMarketAspectSelections) => marketSetup.aspects.indexOf(a.aspect) - marketSetup.aspects.indexOf(b.aspect));
			} else {
				const error: ErrorColabo = {
					code: "NO_MARKET_SETUP_FOUND",
					level: ErrorColaboLevel.ERROR,
					origin: "orderMarketsAndMarketsAspects",
				};
				await context.dispatch(NewsActions.LOG_ERROR, error);
			}
		}
		return marketsAspectsSelections;
	}

	/** TODO: it simulates action of the `colabo/src/isomorphic/puzzles/rima/aaa/lib/rima-aaa.service.ts::saveLoggedInUser()` yet it does not do all the actions provided there */
	public static saveLoggedInUser(context: Context, loggedInUser: KNode): void {
		const loggedInUserStr: string = JSON.stringify(loggedInUser);
		window.localStorage.setItem("loggedInUser", loggedInUser ? loggedInUserStr : (null as unknown as string));
		// this.loggedInUser = _loggedInUser;
		console.warn(`[saveLoggedInUser] this.loggedInUser: ${JSON.stringify(loggedInUser, null, 4)}`);
		//this._isRegistered = this.loggedInUser !== null && this.loggedInUser !== undefined;
	}

	public static async clearPreferences(context: Context): Promise<boolean> {
		const userId: string | undefined = StoreNewsMethods.userId(context.state as IStateNewsTotal);
		if (userId) {
			const requestPref: IApiRequest = {
				type: KNODE_API_TYPE.INDEX_COLABO_API,
				paramsDetailed: {
					type: {
						path: "type",
						value: KNode.TYPE_USER_PREFERENCES,
					},
					userId: {
						path: "iAmId",
						value: userId,
					},
				},
			};
			console.debug("requestPref", requestPref, "JSON.stringify(requestPref)", JSON.stringify(requestPref));
			const prefKNodes: IKNode[] = await context.dispatch(KnalledgeActions.GET_KNODES_WITH_REQUEST, requestPref);
			console.debug("prefKNodes", prefKNodes);
			if (prefKNodes && prefKNodes.length > 0) {
				for (let index = 0; index < prefKNodes.length; index++) {
					const cleanPref = prefKNodes[index];

					const requestCleanPrefs: IApiRequest = {
						type: KNODE_API_TYPE.DESTROY_COLABO_API,
						paramsDetailed: {
							id: {
								path: "id",
								value: cleanPref._id,
							},
						},
					};
					console.debug("requestCleanPrefs", requestCleanPrefs, "JSON.stringify(requestCleanPrefs)", JSON.stringify(requestCleanPrefs));
					try {
						const cleanPrefsResult = await context.dispatch(KnalledgeActions.DESTROY_KNODE_WITH_REQUEST, requestCleanPrefs);
						console.debug("cleanPrefsResult", cleanPrefsResult);
					} catch (error) {
						console.error("[StoreNewsMethods::clearPreferences] ERROR", error);
						return false;
					}
				}
			}
			return true;
		} else {
			return true;
		}
	}

	/** cleans all the empty markets and aspects (that appear after users selects their content and later deselects it) */
	public static cleanEmptyMarketsAndAspects(context: Context): void {
		const masA: IMarketsAspectsSelection[] = context.state.myPreferences.preferencesPersistent.marketsAspectsSelections;
		//!IMPORTANT we have to loop in the inversed order due to deleting array elements in the loop!:
		for (let maIndex = masA.length - 1; maIndex >= 0; maIndex--) {
			const mas: IMarketsAspectsSelection = masA[maIndex];
			if (mas.marketsAspectSelection.length !== 0) {
				//clean all empty aspects of the market:
				for (let masIndex = mas.marketsAspectSelection.length - 1; masIndex >= 0; masIndex--) {
					const aspect: IMarketAspectSelections = mas.marketsAspectSelection[masIndex];
					if (aspect.selections.length === 0) {
						mas.marketsAspectSelection.splice(masIndex, 1);
					}
				}
			}
			// after deleting empty market-aspects, we check (again) and if the market doesn't contain any marketAspect, we delete the market:
			if (mas.marketsAspectSelection.length === 0) {
				// we delete on both places, where the selected markets are stored:
				const indexOfMarket: number = context.state.myPreferences.preferencesPersistent.markets.indexOf(mas.market);
				context.state.myPreferences.preferencesPersistent.markets.splice(indexOfMarket, 1);
				masA.splice(maIndex, 1);
			}
		}
		console.debug("[cleanEmptyMarketsAndAspects] context.state.myPreferences.preferencesPersistent.marketsAspectsSelections", JSON.stringify(context.state.myPreferences.preferencesPersistent.marketsAspectsSelections, null, "  "));
	}

	/** the method is called by ESelectionAction.TOGGLE, .DESELECT AND .SELECT
	 * !IMPORTANT after this method the `cleanEmptyMarketsAndAspects` is suggested to be called to clean all the empty markets and aspects (that appear after users selects their content and later deselects it)
	 */
	public static changeSelections(state: IStateNewsTotal, selections: ISelection[], selectionAction: ESelectionAction): void {
		console.debug("[changeSelections]", selections, selectionAction);
		// protected get changeSelections() {
		// 	return (selections: ISelection[], selectionAction: ESelectionAction): void => {
		//!IMPORTANT: This FOR LOOP could cause some unhealthy results: for DESELECT_ALL case, when there are multiple selects in FOR
		//!IMPORTANT: even more complex case would appear if TOGGLE would allow multiple selections
		for (const selection of selections) {
			let aspectForSelected: IMarketAspectSetup = {} as IMarketAspectSetup;
			let marketForSelected: IMarket = {} as IMarket;

			/**
			 * finding (in marketSetup structure) a market and marketAspect of the selection
			 */
			for (let ms: number = 0; ms < state.markets.marketsSetup.length; ms++) {
				aspectForSelected = state.markets.marketsSetup[ms].aspects.find((aspect: IMarketAspectSetup) => {
					return aspect.type === selection.type;
				}) as IMarketAspectSetup;
				if (aspectForSelected) {
					marketForSelected = state.markets.marketsSetup[ms].market;
					break;
				}
			}

			if (aspectForSelected && aspectForSelected.id && marketForSelected && marketForSelected.id) {
				//TODO: CHECKING IF ALREADY SELECTED
				//finding IMarketsAspectsSelection (market with its aspects) in MyPreferences, for the selection:
				const marketsAspectsSelectionInPreferences: IMarketsAspectsSelection = state.myPreferences.preferencesPersistent.marketsAspectsSelections.find((mas: IMarketsAspectsSelection) => mas.market.id === marketForSelected.id) as IMarketsAspectsSelection;

				//if not found, we create it and add the aspect of the selection, and add the selection into it, unless we're DESELECTING:
				if (!marketsAspectsSelectionInPreferences && (selectionAction === ESelectionAction.SELECT || selectionAction === ESelectionAction.TOGGLE)) {
					const initialSelections: ISelection[] = [selection];
					state.myPreferences.preferencesPersistent.marketsAspectsSelections.push({
						market: marketForSelected,
						marketsAspectSelection: [
							{
								aspect: aspectForSelected,
								selections: initialSelections,
							},
						],
					});
				} else {
					//if found, we're searching for IMarketAspectSelections (market aspect of the selection) in MyPreferences:
					const marketAspectSelection: IMarketAspectSelections = marketsAspectsSelectionInPreferences.marketsAspectSelection.find((mAspect: IMarketAspectSelections) => mAspect.aspect.id === aspectForSelected.id) as IMarketAspectSelections;

					//if marketAspectSelection is found, we're searching for a specific selection:
					if (marketAspectSelection) {
						const selectionIndex: number = marketAspectSelection.selections.findIndex((selectionInSelections: ISelection) => selectionInSelections.id == selection.id);
						if (selectionIndex !== -1) {
							//if selection is found, we delete it (unless it'sa a wrong SELECT on existing selection):
							switch (selectionAction) {
								case ESelectionAction.TOGGLE:
									// we remove it (toggling):
									marketAspectSelection.selections.splice(selectionIndex, 1);
									break;
								case ESelectionAction.SELECT:
									break;
								case ESelectionAction.DESELECT:
									marketAspectSelection.selections.splice(selectionIndex, 1);
									break;
							}
							//to avoid "glitches" we have moved to `cleanEmptyMarketsAndAspects` from here the code that was deleting the parent marketAspect, if after deleting the selection, the selections are empty
						} else {
							//if not found:
							switch (selectionAction) {
								case ESelectionAction.TOGGLE:
									// we add it:
									marketAspectSelection.selections.push(selection);
									break;
								case ESelectionAction.SELECT:
									marketAspectSelection.selections.push(selection);
									break;
								case ESelectionAction.DESELECT:
									break;
							}
						}
					}
					// if marketAspectSelection is NOT found and we are adding/toggling a selection in it, we add it:
					// we add the selection ONLY if it is SELECT or TOGGLE (and not for a DESELECT)
					//!IMPORTANT: for DESELECT ALL case, when there are multiple selects in FOR, some might delete and later re-add the market aspect.
					//!IMPORTANT: even more complex case would appear if TOGGLE would allow multiple selections
					else if (selectionAction === ESelectionAction.SELECT || selectionAction === ESelectionAction.TOGGLE) {
						const initialSelections: ISelection[] = [selection];
						marketsAspectsSelectionInPreferences.marketsAspectSelection.push({
							aspect: aspectForSelected,
							selections: initialSelections,
						});
					}
				}
				console.debug("[changeSelections] state.myPreferences.preferencesPersistent.marketsAspectsSelections", state.myPreferences.preferencesPersistent.marketsAspectsSelections);
			}
		}
		// };
	}
}

// necessary for testing
// @Module({ name: 'news' })
// the above doesn't work for regular use case, reports missing module?!
// https://github.com/championswimmer/vuex-module-decorators/issues/116
// https://github.com/championswimmer/vuex-module-decorators/issues/116#issuecomment-484888021
// https://github.com/championswimmer/vuex-module-decorators/issues/116#issuecomment-832524522
@Module
export class NewsStore extends VuexModule implements IStateNewsTotal {
	public news: IStateNews = (MOCKUP_STORE ? newsStoreDefault : stateNewsesBlanco).newsStore.news;
	public headings: IHeadings = {} as IHeadings;
	public markets: IStateMarkets = (MOCKUP_STORE ? newsStoreDefault : stateNewsesBlanco).newsStore.markets;
	public myPreferences: IStateMyPreferences = (MOCKUP_STORE ? newsStoreDefault : stateNewsesBlanco).newsStore.myPreferences;
	public rima: IStateRima = (MOCKUP_STORE ? newsStoreDefault : stateNewsesBlanco).newsStore.rima;

	/** MARKETS */

	// get marketsList(): IMarket[] {
	// 	return this.marketsStructure.markets;
	// }

	/** NEWS */

	// [Possibility of using a getter with a parameter? #40](https://github.com/championswimmer/vuex-module-decorators/issues/40)
	get getNewsById() {
		return (id: string): INews | null => {
			let matchedNews = null;
			for (const news of this.news.newsList) {
				if (news.id == id) {
					matchedNews = news;
					break;
				}
			}
			return matchedNews;
		};
	}

	get marketAspectSetupsBrowsed(): IMarketAspectSetup | undefined {
		let mas: IMarketAspectSetup | undefined;
		console.log("[store-news::marketAspectSetupsBrowsed] this.news.browsingLocation.marketAspect:", this.news.browsingLocation.marketAspect);
		console.log("[store-news::marketAspectSetupsBrowsed] this.marketAspectSetups:", this.marketAspectSetups);
		if (this.news.browsingLocation.marketAspect) {
			const marketAspect: string = this.news.browsingLocation.marketAspect?.toUpperCase();
			// `ma.title` is in the form "INDIVIDUAL STOCKS", while `browsingLocation.marketAspect` is in the form "individual-stocks"
			mas = this.marketAspectSetups.find((ma: IMarketAspectSetup) => ma.title.replace(" ", "-") === marketAspect);
		}
		console.log("[store-news::marketAspectSetupsBrowsed] mas:", mas);
		return mas;
	}
	get marketAspectSetups(): IMarketAspectSetup[] {
		console.log("[store-news::marketAspectSetups] BEFORE StoreNewsMethods.marketAspectSetups:", StoreNewsMethods.marketAspectSetups);
		if (!StoreNewsMethods.marketAspectSetups) {
			StoreNewsMethods.marketAspectSetups = [];
			this.markets.marketsSetup.forEach((m: IMarketSetup) => m.aspects.forEach((ma: IMarketAspectSetup) => (StoreNewsMethods.marketAspectSetups as IMarketAspectSetup[]).push(ma)));
		}
		console.log("[store-news::marketAspectSetups] AFTER StoreNewsMethods.marketAspectSetups:", StoreNewsMethods.marketAspectSetups);
		return StoreNewsMethods.marketAspectSetups;
	}

	get getSelectionBrowsed(): ISelection | undefined {
		let selection: ISelection | undefined;
		if (this.news.browsingLocation.subfilter) {
			selection = this.getSelectionByTitle(this.news.browsingLocation.subfilter);
		}
		console.log("[store-news::getSelectionBrowsed] selection", selection);
		return selection;
	}

	/**
	 * @returns selection with the id equal `selectionId`. Returns `undefined` if the `selectionId` is undefined or empty or the selection with that id is not found
	 */
	get getSelectionByTitle(): (title: string | undefined) => ISelection | undefined {
		return (title: string | undefined): ISelection | undefined => {
			return StoreNewsMethods.getSelectionByTitle(this.context.state as IStateNewsTotal, title);
		};
	}

	protected get setupNews(): (newsObj: unknown) => INews {
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		return (newsObj: unknown): INews => {
			const news: INews = newsObj as INews;
			if (news.subfilters && news.subfilters.length > 0) {
				//ordering `subfilters` in descending order to get the `subfilter` with the highest `rel`:
				news.subfilter = news.subfilters.sort((a: ISelectionRel, b: ISelectionRel) => b.rel - a.rel)[0].id;
			} else {
				console.warn(`[store-news::setupNews] News '${(newsObj as any).title}' has NO subfilters`, newsObj);
				news.subfilters = [];
			}
			if (!news.subfilter) {
				news.subfilter = "";
			}
			news.selection = this.getSelectionById(news.subfilter);
			// if (newsObj.time === "") {
			// 	newsObj.time = "RECENT";
			// }
			return news;
		};
	}

	get currentNews(): INews | null {
		return this.news.currentNewsId ? this.getNewsById(this.news.currentNewsId) : null;
	}

	/* TODO:
	get tagToMarket(): (tagId: string) => IMarket {
		switch (tagId) {
			case "tag-stocks":
				return this.markets.marketsAll[EMarketId.STOCKS] as IMarket;
			case "tag-crypto":
				return this.markets.marketsAll[EMarketId.CRYPTO] as IMarket;
			case "tag-economy-and-business":
				return this.markets.marketsAll[EMarketId.ECONOMY_BUSINESS] as IMarket;
			case "tag-futures-and-commodities":
				return this.markets.marketsAll[EMarketId.COMMODITIES_FOREX] as IMarket;
			case "tag-fixed-income":
				return this.markets.marketsAll[EMarketId.FIXED_INCOME] as IMarket;
			default:
				return {} as IMarket;
		}
	}*/

	get getNewsList(): INews[] {
		return this.news.newsList;
	}

	public get arePreferencesBeingEdited(): boolean {
		// return (this.context.state as any)?.myPreferences.preferencesManagement.preferencesStatus === EPrefCFlowState.SETTING_UP;
		return [EPrefCFlowState.SETTING_UP, EPrefCFlowState.SETTING_UP].includes((this.context.state as any)?.myPreferences.preferencesManagement.preferencesStatus);
	}

	public get showPreferencesSettingsBtn(): boolean {
		const preferencesManagement: IStateMyPreferencesManagement = (this.context.state as any)?.myPreferences.preferencesManagement;
		return !this.arePreferencesBeingEdited && !preferencesManagement.isPrefSettingUpFinishedOnce;
		//OLD: return preferencesManagement.preferencesStatus !== ECFlowState.FINISH && !(preferencesManagement.prefSettingCanceled && preferencesManagement.isPrefSettingUpFinishedOnce); //this.storeNews.state.newsStore.myPreferences.finishedSettingUp;
	}

	/** TODO should be moved to some rima-store */
	public get isUserLoggedIn(): boolean {
		// return !!StoreNewsMethods.userId(this.context.state as IStateNewsTotal);
		//TODO: originally it was returned by static `StoreNewsMethods.userId` as above, but for some reason it is not triggered so we try below in direct manner:
		let userId: string | undefined = (this.context.state as any).rima.currentUserId;
		if (!userId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
			userId = JSON.parse(localStorage.loggedInUser)._id;
		}
		return !!userId;
	}

	/** should the button for NewsPortfolio be shown (prerequuisit is that the news preferences have been set up */
	public get showMyNewsPortfolioBtn(): boolean {
		const preferencesManagement: IStateMyPreferencesManagement = (this.context.state as any)?.myPreferences.preferencesManagement;
		return !this.arePreferencesBeingEdited && preferencesManagement.isPrefSettingUpFinishedOnce;
		//this.storeNews.state.newsStore.myPreferences.preferencesManagement.preferencesStatus === ECFlowState.FINISH || this.preferencesManagement.prefSettingCanceled; //this.storeNews.state.newsStore.myPreferences.finishedSettingUp;
	}

	/** MUST be kept in the same order as `tickerai-code/src/frontend/puzzles/news/store/store-news-vos.ts::MARKETS`
	 * */
	get marketIdsOrdered(): string[] {
		return StoreNewsMethods.marketIdsOrdered;
	}

	protected get marketsAspectsSelectionsOrdered(): IMarketsAspectsSelection[] {
		const preferencesPersistent: IStateMyPreferencesPersistent = (this.context.state as any)?.myPreferences.preferencesPersistent;
		return preferencesPersistent.marketsAspectsSelections.sort((a: IMarketsAspectsSelection, b: IMarketsAspectsSelection) => StoreNewsMethods.marketIdsOrdered.indexOf(a.market.id) - StoreNewsMethods.marketIdsOrdered.indexOf(b.market.id));
	}

	// protected marketIdsOrderedVar: string[] = [EMarketId.STOCKS, EMarketId.CRYPTO, EMarketId.ECONOMY_BUSINESS, EMarketId.COMMODITIES_FOREX, EMarketId.FIXED_INCOME];

	get marketsOrdered(): IMarket[] {
		return [this.markets.marketsAll[EMarketId.STOCKS] as IMarket, this.markets.marketsAll[EMarketId.CRYPTO] as IMarket, this.markets.marketsAll[EMarketId.ECONOMY_BUSINESS] as IMarket, this.markets.marketsAll[EMarketId.COMMODITIES_FOREX] as IMarket, this.markets.marketsAll[EMarketId.FIXED_INCOME] as IMarket];
	}

	/**
	 * @returns selection with the id equal `selectionId`. Returns `undefined` if the `selectionId` is undefined or empty or the selection with that id is not found
	 */
	get getSelectionById(): (selectionId: string | undefined) => ISelection | undefined {
		return (selectionId: string | undefined): ISelection | undefined => {
			return StoreNewsMethods.getSelectionById(this.context.state as IStateNewsTotal, selectionId);
		};
	}

	/**
	 * returns market that contains the selection (`selectionId`) among its aspects recommendations
	 */
	public get getMarketForSelectionId() {
		return (selectionId?: string): IMarket => {
			if (!selectionId) {
				return {} as IMarket;
			}
			const marketsSetup: IMarketSetup[] = (this.context.state as any)?.markets.marketsSetup;
			const selection: ISelection | undefined = this.getSelectionById(selectionId);
			if (selection) {
				// console.debug(`[getMarketForSelectionId] selection (${JSON.stringify(selection, null, 4)}) is found`);
				//we go through all markets:
				for (const marketSetup of marketsSetup) {
					//we go through all aspects of each market:
					for (const aspect of marketSetup.aspects) {
						//then we search for the aspect where the selection belongs to based on the `type`:
						if (selection.type === aspect.type) {
							// console.debug(`[getMarketForSelectionId] market '${marketSetup.market.title}' found by type '${aspect.type}' selection for selection (${JSON.stringify(selection, null, 4)})`);
							return marketSetup.market;
						}
					}
				}
			}
			console.error(`[getMarketForSelectionId] selection for selectionId '${selectionId}' is not found`);
			return {} as IMarket;
		};
	}

	/* TODO: getter with parameter:
	getMarketForSelectionId = (state) => (selectionId: string) => {
		const marketsSetup: IMarketSetup[] = (this.context.state as any)?.markets.marketsSetup;
		const recommendedSubFilters: ISelection[] = (this.context.state as any)?.markets.recommendedSubFilters;

		const selection: ISelection | undefined = recommendedSubFilters.find((subfilter: ISelection) => subfilter.id === selectionId);
		if (selection) {
			// console.debug(`[getMarketForSelectionId] selection (${JSON.stringify(selection, null, 4)}) is found`);
			//we go through all markets:
			for (const marketSetup of marketsSetup) {
				//we go through all aspects of each market:
				for (const aspect of marketSetup.aspects) {
					//then we search for the aspect where the selection belongs to based on the `type`:
					if (selection.type === aspect.type) {
						// console.debug(`[getMarketForSelectionId] market '${marketSetup.market.title}' found by type '${aspect.type}' selection for selection (${JSON.stringify(selection, null, 4)})`);
						return marketSetup.market;
					}
				}
			}
		}
		console.error(`[getMarketForSelectionId] selection for selectionId '${selectionId}' is not found`);
		return {} as IMarket;
	}
	*/

	@Mutation
	[NewsMutations.SET_CURRENT_NEWS_ID](currentNewsId: string): void {
		this.news.currentNewsId = currentNewsId;
	}

	@Mutation
	[NewsMutations.SET_BROWSING_LOCATION](browsingLocation: IBrowsingLocation): void {
		console.log(`NewsMutations.SET_BROWSING_LOCATION]:`, browsingLocation);
		this.news.browsingLocation = browsingLocation;
	}

	@Mutation
	[NewsMutations.ORDER_SELECTIONS](what: number = 4): void {
		StoreNewsMethods.orderSelections(this, what);
	}

	/**
	 *
	 * @param newsList the list to order. If omitted, orders the main storage news-list
	 */
	@Mutation
	[NewsMutations.ORDER_NEWS_LIST](newsList: INews[]): void {
		if (!newsList) {
			newsList = this.news.newsList;
		}
		StoreNewsMethods.orderNewList(newsList);
	}

	@Mutation
	[NewsMutations.SET_NEWS_LIST](newsList: INews[]): void {
		this.news.newsList = newsList;
	}

	@Mutation
	[NewsMutations.SET_NEWS_LOADING_STATUS](newsLoadingStatus: LOADING_STATUS): void {
		this.news.newsLoadingStatus = newsLoadingStatus;
	}

	@Mutation
	[MyPreferencesMutations.PREFERENCES_SETTING_FINISHED_ONCE](value: boolean): void {
		this.myPreferences.preferencesManagement.isPrefSettingUpFinishedOnce = value;
	}

	// @Mutation
	// [MyPreferencesMutations.PREFERENCES_SETTING_CANCELED](canceled: boolean): void {
	// 	this.myPreferences.preferencesManagement.prefSettingCanceled = canceled;
	// }

	@Mutation
	[MyPreferencesMutations.SET_PREFERENCES_STATUS](status: EPrefCFlowState): void {
		this.myPreferences.preferencesManagement.preferencesStatus = status;
	}

	@Mutation
	[MyPreferencesMutations.SET_ACTIVE_MARKET_INDEX](index: number): void {
		this.myPreferences.preferencesManagement.activeMarketIndex = index;
	}

	@Mutation
	[NewsMutations.SET_NEWS_SEARCH](search: string): void {
		this.news.search = search;
	}

	@Mutation
	[NewsMutations.SET_HEADINGS](headings: IHeadings): void {
		this.headings = headings;
	}

	@Mutation
	[MyPreferencesMutations.TOGGLE_MARKET_SELECTION](market: IMarket): void {
		console.debug("MyPreferencesMutations.TOGGLE_MARKET_SELECTION", market);
		const foundId: number = this.myPreferences.preferencesPersistent.markets.findIndex((m: IMarket) => m.id === market.id);
		//the market was selected, now removing it:
		if (foundId !== -1) {
			this.myPreferences.preferencesPersistent.markets.splice(foundId, 1);
			// TODO: removing the market's aspects selections:
			const foundMAId: number = this.myPreferences.preferencesPersistent.marketsAspectsSelections.findIndex((ma: IMarketsAspectsSelection) => ma.market.id === market.id);
			if (foundMAId !== -1) this.myPreferences.preferencesPersistent.marketsAspectsSelections.splice(foundMAId, 1);
		}
		//adding the newly selected market:
		else {
			this.myPreferences.preferencesPersistent.markets.push(market);
			this.myPreferences.preferencesPersistent.markets.sort((a: IMarket, b: IMarket) => StoreNewsMethods.marketIdsOrdered.indexOf(a.id) - StoreNewsMethods.marketIdsOrdered.indexOf(b.id));

			/** removing all market aspects when a market is removed */
			// const marketsAspectsSelectionIndex: number = this.myPreferences.preferencesPersistent.marketsAspectsSelections.findIndex((marketsAspectsSelection: IMarketsAspectsSelection) => marketsAspectsSelection.market.id === market.id);
			// if (marketsAspectsSelectionIndex !== -1) {
			// 	this.myPreferences.preferencesPersistent.marketsAspectsSelections.splice(marketsAspectsSelectionIndex, 1);
			// }
			/*
			//TODO: we are adding it on the same position as in the setup markets, to keep the order:
			const mInd: number = this.marketsStructure.markets.findIndex((m: IMarket) => m.id === market.id);
			if (mInd > 0) {
				const prevMarketInStructure: IMarket = this.marketsStructure.markets[mInd - 1];
				const prevMarketInSelectedInd: number = this.myPreferences.preferencesPersistent.markets.findIndex((m: IMarket) => m.id === prevMarketInStructure.id);
				if (prevMarketInSelectedInd !== -1) {
					this.myPreferences.preferencesPersistent.markets.splice(prevMarketInSelectedInd + 1, 0, market);
				} else {
					this.myPreferences.preferencesPersistent.markets.unshift(market);
				}
			} else {
				this.myPreferences.preferencesPersistent.markets.unshift(market);
			}
			*/
		}
		console.debug("MyPreferencesMutations.TOGGLE_MARKET_SELECTION: AFTER::", JSON.stringify(this.myPreferences.preferencesPersistent.markets, null, 2));
	}

	@Mutation
	[MyPreferencesMutations.SELECT_PREFERENCES_SELECTIONS](selections: ISelection[]): void {
		// console.debug("MyPreferencesMutations.SELECT_PREFERENCES_SELECTIONS", selections);
		StoreNewsMethods.changeSelections(this as IStateNewsTotal, selections, ESelectionAction.SELECT);
	}

	@Mutation
	[MyPreferencesMutations.DESELECT_PREFERENCES_SELECTIONS](selections: ISelection[]): void {
		// console.debug("MyPreferencesMutations.DESELECT_PREFERENCES_SELECTIONS", selections);
		StoreNewsMethods.changeSelections(this as IStateNewsTotal, selections, ESelectionAction.DESELECT);
	}

	@Mutation
	[MyPreferencesMutations.TOGGLE_PREFERENCES_INDIVIDUAL_SELECTION](selection: ISelection): void {
		// console.debug("MyPreferencesMutations.TOGGLE_PREFERENCES_INDIVIDUAL_SELECTION", selection);
		StoreNewsMethods.changeSelections(this as IStateNewsTotal, [selection], ESelectionAction.TOGGLE);
	}

	@Mutation
	[MyPreferencesMutations.SET_SERIALIZED_PERSONALIZATION](selectionsSerializedToIDs: string[]): void {
		this.myPreferences.preferencesPersistent.selectionsSerializedToIDs = selectionsSerializedToIDs;
	}

	/**
	 * @returns success status
	 */
	@Action({ rawError: true })
	async [NewsActions.LOG_ERROR](error: ErrorColabo): Promise<boolean> {
		const errorWarnString: string = `[${error.level}] ${error.code ? " <" + error.code + "> " : ""} ${error.code ? error.msg : ""} ${error.origin ? " [origin: " + error.origin + "] " : ""}`;
		switch (error.level) {
			case ErrorColaboLevel.WARNING:
				console.warn(errorWarnString);
				break;
			default:
				console.error(errorWarnString);
		}
		//TODO: store in DB and for `CRITICAL_ERROR` should send by email, etc
		return true;
	}
	/**
	 *
	 * @param `cleanOnlyLocalStorage` if true, it does NOT clean DB, but only local storage
	 * @returns success of cleaning
	 */
	@Action({ rawError: true })
	async [MyPreferencesActions.CLEAN_PERSONALIZATION](cleanOnlyLocalStorage: boolean): Promise<boolean> {
		const myPreferences: IStateMyPreferences = this.myPreferences;
		myPreferences.preferencesPersistent.markets = [];
		myPreferences.preferencesPersistent.marketsAspectsSelections = [];
		myPreferences.preferencesPersistent.selectionsSerializedToIDs = [];
		myPreferences.preferencesManagement.activeMarketIndex = 0;
		myPreferences.preferencesManagement.isPrefSettingUpFinishedOnce = false;
		myPreferences.preferencesManagement.preferencesStatus = EPrefCFlowState.NON_INITIATED;

		if (cleanOnlyLocalStorage) {
			return true;
		} else {
			return StoreNewsMethods.clearPreferences(this.context as Context);
		}
	}

	/**
	 *
	 * //`NewsActions.GET_PERSONALIZED_NEWS_LIST` serializes personalization internally and gets newslist based on it:
	 */
	@Action({ rawError: true })
	async [NewsActions.GET_PERSONALIZED_NEWS_LIST](): Promise<INews[]> {
		// const mockupNewsListMockup: boolean = true;
		const mockupNewsListMockup: boolean = false;
		console.debug(`${NewsActions.GET_PERSONALIZED_NEWS_LIST}`);
		this.context.commit(NewsMutations.SET_NEWS_LOADING_STATUS, LOADING_STATUS.LOADING);

		// console.warn(`this.myPreferences: ${(this as any).myPreferences}`);
		// const myPreferences: IMyPreferencesStoreState = this.myPreferences;

		/* OLD CODE for PERSONALIZATION, now done by
		const myPreferences: IStateMyPreferences = this.myPreferences;

		const personalization: INewsListRequestPersonalized = {
			markets: [],
		};
		const markets: string[] = myPreferences.preferencesPersistent.markets.map((market: IMarket) => market.id);

		// console.warn(`this.state.myPreferences; ${JSON.stringify(myPreferences, null, 4)}`);
		for (const market of myPreferences.preferencesPersistent.marketsAspectsSelections) {
			const aspectsRequest: INewsListRequestPersonalized_Aspect[] = [];
			for (const aspect of market.marketsAspectSelection) {
				aspectsRequest.push({
					id: aspect.aspect.id,
					title: aspect.aspect.title,
					subtitle: aspect.aspect.subtitle,
					selections: aspect.selections,
				});
			}

			const marketRequest: INewsListRequestPersonalized_Market = {
				market: market.market.id,
				aspects: aspectsRequest,
			};
			personalization.markets.push(marketRequest);
		}
		*/

		const selectionsSerializedToIDs: string[] = await this.context.dispatch(MyPreferencesActions.SERIALIZE_PERSONALIZATION);

		// get groupEdge toward the user that will let us know the group Id (as `sourceId`)
		const news: IStateNews = (this.context.state as any).news;
		const requestPersonalizedNewsList: IApiRequest = {
			type: KNODE_API_TYPE.INDEX_COLABO_API,
			activity: "getNews",
			paramsDetailed: {
				personalization: {
					path: "personalization",
					value: {
						search: {
							query: news.search,
						},
						selections: selectionsSerializedToIDs,
					},
				},
			},
		};
		console.debug(`[${NewsActions.GET_PERSONALIZED_NEWS_LIST}] requestPersonalizedNewsList: ${JSON.stringify(requestPersonalizedNewsList, null, 4)}`);

		console.debug(`[NewsActions.GET_PERSONALIZED_NEWS_LIST}] mockupNewsListMockup = ${mockupNewsListMockup}`);
		let newsList: INews[] = [];
		if (mockupNewsListMockup) {
			console.warn(`[NewsActions.GET_PERSONALIZED_NEWS_LIST] !!!MOCKUP!!! mockupNewsListMockup = ${mockupNewsListMockup}`);
			newsList = newsListMockup.newsList.map((newsObj: any) => this.setupNews(newsObj));
		} else {
			const kNodes: IKNode[] = await this.context.dispatch(KnalledgeActions.UPDATE_KNODES_WITH_REQUEST, requestPersonalizedNewsList);
			const newsListRaw: any[] = kNodes && kNodes.length >= 0 ? (kNodes[0] as unknown as INewsResponse).newsList : [];
			const nonPersonalizedView: boolean = !((this.context.state as any)?.myPreferences as IStateMyPreferences).preferencesManagement.isPrefSettingUpFinishedOnce;
			newsList = newsListRaw.flatMap((newsObj: unknown) => {
				const news: INews = this.setupNews(newsObj);
				return nonPersonalizedView || news.headingNews || news.selection ? [news] : []; //in `nonPersonalizedView` we display all the news, while in the personalized we display only those that are categorized under some subfilter (we don't filter out headingNews neither)
			});
			if (newsListRaw.length !== newsList.length) console.warn(`[NewsActions.GET_PERSONALIZED_NEWS_LIST] list is reduced from ${newsListRaw.length} to ${newsList.length} after eliminating news without subfilter!`);
		}
		console.debug(`[NewsActions.GET_PERSONALIZED_NEWS_LIST] newsList: ${JSON.stringify(newsList, null, 4)}`);
		console.debug(
			`[NewsActions.GET_PERSONALIZED_NEWS_LIST] newsList: ${JSON.stringify(
				newsList.map((n: INews) => (n.selection ? n.selection.title + ": " + n.selection.type : "<selection not defined yet>")),
				null,
				4
			)}`
		);

		// newsList = [
		// 	{
		// 		title: "Why Rite Aid Is Sinking This Week",
		// 		text: "Author Bio Eric has been writing about stocks and finance since the mid-1990s, when he lived Prague, Czech Republic...",
		// 		id: "506bd9f172a103093eb50213",
		// 		time: "59 minutes ago",
		// 		hash: "6983e24fe10a698455bfaa2e29a1e18e|13eac047d21f0840407024af691dd661",
		// 		url: "https://www.fool.com/investing/2021/06/24/why-rite-aid-is-sinking-this-week/",
		// 		image: "https://dev.tickerai.io/legacy/index_files/1f606cfa6614e53ef78ca1679e1705b6.jpg",
		// 		tags: ["tag-stocks"],
		// 		headingNews: true,
		// 		subfilter: "",
		// 	},
		// 	{
		// 		title: "Bitcoin Hits $35k After Biden Reveals Infrastructure Deal, Paraguay Proposes Btc Bill",
		// 		text: "Bitcoin price traded above $35,000 as the stock market hit new highs and Paraguay aims to become the second country to adopt BTC as legal tender.. 301 Total views Total shares...",
		// 		id: "506bd9f172a103093eb50215",
		// 		time: "1 hour ago",
		// 		hash: "6983e24fe10a698455bfaa2e29a1e18e|13eac047d21f0840407024af691dd661",
		// 		url: "https://cointelegraph.com/news/bitcoin-hits-35k-after-biden-reveals-infrastructure-deal-paraguay-proposes-btc-bill",
		// 		image: "https://dev.tickerai.io/legacy/index_files/90c46308e8ce2c4a748e47dacb87112e.jpg",
		// 		tags: ["tag-crypto"],
		// 		subfilter: "Bitcoin",
		// 	},
		// 	{
		// 		title: "Ethereum price shoots up after Elon Musk reveals personal investment",
		// 		text: "The price of Ethereum (ether) has shot up after Elon Musk revealed that he personally invested in the cryptocurrency. The technology billionaire was speaking at The ₿ Word conference on Wednesday ...",
		// 		id: "506bd9f172a103093eb50212",
		// 		time: "1 hour ago",
		// 		hash: "6983e24fe10a698455bfaa2e29a1e18e|13eac047d21f0840407024af691dd661",
		// 		url: "https://www.independent.co.uk/life-style/gadgets-and-tech/ethereum-price-elon-musk-bitcoin-b1888181.html",
		// 		image: "https://static.independent.co.uk/2021/05/14/12/newFile-11.jpg?width=640&auto=webp&quality=75",
		// 		tags: ["tag-crypto"],
		// 		subfilter: "Ethereum",
		// 	}
		// ];
		this.context.commit(NewsMutations.SET_NEWS_LIST, newsList);
		this.context.commit(NewsMutations.ORDER_NEWS_LIST);
		this.context.commit(NewsMutations.SET_NEWS_LOADING_STATUS, LOADING_STATUS.LOADED);
		return newsList;
	}

	/**
	 * loads HEADINGS that are generic, non-related to user preferences or search (thus should be set-up only once per site loading) //TODO: yet maybe loaded if the website is being open for more than a day
	 */
	@Action({ rawError: true })
	async [NewsActions.GET_HEADINGS](): Promise<IHeadings> {
		console.debug(`${NewsActions.GET_HEADINGS}`);

		const requestHeadings: IApiRequest = {
			type: KNODE_API_TYPE.INDEX_COLABO_API,
			paramsDetailed: {
				type: {
					path: "type",
					value: "tickerai.news.headings",
				},
			},
		};
		const headingsKNodes: IKNode[] = await this.context.dispatch(KnalledgeActions.GET_KNODES_WITH_REQUEST, requestHeadings);
		if (headingsKNodes?.length) {
			const headingsKNode = headingsKNodes[0];
			console.debug(`[${NewsActions.GET_HEADINGS}] requestHeadings: ${JSON.stringify(requestHeadings, null, 4)}`);

			// TODO use `colabo/src/frontend/apps/colaboflow-app/public/config/polises/tickerai/schemas/headings.transformations.schema.json5`

			const headings: IHeadings = {
				id: headingsKNode._id,
				mainHeadline: headingsKNode.name,
				mainHeadlineLink: headingsKNode.dataContent?.mainHeadlineLink,
				topEarnings: headingsKNode.dataContent?.topEarnings,
				topTechnicals: headingsKNode.dataContent?.topTechnicals,
				topMovers: headingsKNode.dataContent?.topMovers,
			} as IHeadings;
			console.debug(`[${NewsActions.GET_HEADINGS}] headings: ${JSON.stringify(headings, null, 4)}`);
			this.context.commit(NewsMutations.SET_HEADINGS, headings);
			return headings;
		} else {
			throw new Error(`[${NewsActions.GET_HEADINGS}] no headingsKNodes`);
		}
	}

	/*
	@Action({ rawError: true })
	async [MyPreferencesActions.SAVE_PERSONALIZATION_W_STRUCTURE](): Promise<IMarketSelectionsSerialized[]> {
		console.debug(`${MyPreferencesActions.SAVE_PERSONALIZATION}`);

		// console.warn(`this.myPreferences: ${(this as any).myPreferences}`);
		// const myPreferences: IMyPreferencesStoreState = this.myPreferences;
		const myPreferences: IStateMyPreferences = (this.context.state as any)?.myPreferences;

		// const marketName: EMarketId = myPreferences.preferencesPersistent.markets[0].id;
		// console.debug(marketName);
		// const markets: Record<EMarketId, IAspectSelections[]>[] = { hello: [] };
		const marketsSelectionsSerialized: IMarketSelectionsSerialized[] = [];

		//plain selections, without the structure (which is reconstructed based on selections' types):

		// myPreferences.preferencesPersistent.markets.map((market: IMarket) => {market.id: []});

		// myPreferences.preferencesPersistent.markets.map((market: IMarket) => {
		// 	'hello': [];
		// });
*/
	/**
		EXAMPLE OF HOW DATA WILL BE EXPORTED:
		[
			{
				"market1":
				[
					{
					"aspect1": {
						"selection1id", "selection2id", "selection3id",
					}
					"aspect2": {
						"selection1id", "selection2id"
					}
				]
				"market3": [
					"aspect1": {
						"selection1id", "selection2id", "selection3id", "selection4id",
					}
				]
			}
		]
		*/
	/*
		for (const market of myPreferences.preferencesPersistent.marketsAspectsSelections) {
			const ms: IMarketSelectionsSerialized = { marketId: market.market.id, aspectsSelections: [] };
			for (const aspect of market.marketsAspectSelection) {
				ms.aspectsSelections.push({ aspectId: aspect.aspect.id, selections: aspect.selections.map((selection: ISelection) => selection.id) });
			}
			marketsSelectionsSerialized.push(ms);
		}

		console.debug(`[MyPreferencesActions.SAVE_PERSONALIZATION] marketsSelectionsSerialized: ${JSON.stringify(marketsSelectionsSerialized, null, 4)}`);
		this.context.commit(MyPreferencesMutations.SET_SERIALIZED_PERSONALIZATION, marketsSelectionsSerialized);
		return marketsSelectionsSerialized;
	}
	*/

	/**
	 *
	 * @returns  //this had to be an action bc it calls a mutation from itself what is not possible from the mutation but action
	 */
	@Action
	[MyPreferencesActions.SERIALIZE_PERSONALIZATION](): string[] {
		console.debug(`${MyPreferencesActions.SERIALIZE_PERSONALIZATION}`);

		// console.warn(`this.myPreferences: ${(this as any).myPreferences}`);
		// const myPreferences: IMyPreferencesStoreState = this.myPreferences;
		const myPreferences: IStateMyPreferences = (this.context.state as any)?.myPreferences;

		// const marketName: EMarketId = myPreferences.preferencesPersistent.markets[0].id;
		// console.debug(marketName);
		// const markets: Record<EMarketId, IAspectSelections[]>[] = { hello: [] };

		//plain selections, without the structure (which is reconstructed based on selections' types):
		const seletionsSerializedToIDs: string[] = [];

		// myPreferences.preferencesPersistent.markets.map((market: IMarket) => {market.id: []});

		// myPreferences.preferencesPersistent.markets.map((market: IMarket) => {
		// 	'hello': [];
		// });

		for (const market of myPreferences.preferencesPersistent.marketsAspectsSelections) {
			for (const aspect of market.marketsAspectSelection) {
				seletionsSerializedToIDs.push(...aspect.selections.map((selection: ISelection) => selection.id));
			}
		}

		// console.debug(`[MyPreferencesActions.SAVE_PERSONALIZATION] seletionsSerializedToIDs (${seletionsSerializedToIDs.length} elements) : ${JSON.stringify(seletionsSerializedToIDs, null, 4)}`);
		this.context.commit(MyPreferencesMutations.SET_SERIALIZED_PERSONALIZATION, seletionsSerializedToIDs);
		return seletionsSerializedToIDs;
	}

	/**
	 * loads the saved preferences object filtered for the logged in User and of `type` = `TYPE_USER_PREFERENCES = "rima.preferences"`
	 * if user is NOT loggedIn doesn't do anything!
	 * sets both SERIALIZED personalization object in store by committing `MyPreferencesMutations.SET_SERIALIZED_PERSONALIZATION`, but also unpacks it to the main preferences object in store, by dispatching `MyPreferencesActions.DESERIALIZE_PERSONALIZATION`
	 * @returns true if personalization preferences are loaded; false if not
	 */
	@Action({ rawError: true })
	async [MyPreferencesActions.LOAD_PERSONALIZATION_FROM_DB](): Promise<boolean> {
		const MOCKUP_PREFS: boolean = false; //true;
		let prefObj;
		const userId: string | undefined = StoreNewsMethods.userId(this.context.state as IStateNewsTotal);

		//we try to load preferences only if the user is logged in:
		if (userId || MOCKUP_PREFS) {
			if (MOCKUP_PREFS) {
				prefObj = {
					visual: {
						isOpen: false,
					},
					isPublic: true,
					_id: "624e06173e9386a823251b32",
					type: "rima.preferences",
					iAmId: "624c6f6b956b57021e995899",
					name: "rima.preferences",
					dataContent: {
						preferences: ["61b76db88c90be3d85989840", "61b76db88c90be3d85989851", "61b76db88c90be3d85989861", "61b76db98c90be3d85989883", "61b76db98c90be3d85989890", "61b76db98c90be3d85989891", "61b76db98c90be3d85989896", "61b76db98c90be3d85989898", "61b76db98c90be3d859898a8"],
					},
					createdAt: "2022-04-06T21:28:55.258Z",
					updatedAt: "2022-04-06T21:28:55.258Z",
				};
			} else {
				const requestPref: IApiRequest = {
					type: KNODE_API_TYPE.INDEX_COLABO_API,
					paramsDetailed: {
						type: {
							path: "type",
							value: KNode.TYPE_USER_PREFERENCES,
						},
						userId: {
							path: "iAmId",
							value: userId,
						},
					},
				};
				console.debug("requestPref", requestPref, "JSON.stringify(requestPref)", JSON.stringify(requestPref));
				const prefKNodes: IKNode[] = await this.context.dispatch(KnalledgeActions.GET_KNODES_WITH_REQUEST, requestPref);
				console.debug("prefKNodes", prefKNodes);
				if (!prefKNodes || prefKNodes.length === 0) {
					return false;
				}
				prefObj = prefKNodes[prefKNodes.length - 1]; //the latest (in the erroneous case when there are multiple of pref objects)
				//TODO: we might also do CLEANING PREVIOUS PREFERENCES if there are more of them to clean all from index 0 to `prefKNodes.length - 1`, before that we might sort them by created date, and maybe warn the user of that duplicated case
			}
			console.debug("prefObj", prefObj);
			// if the preferences object is found, we load it and set up preferences:
			if (prefObj) {
				this.context.commit(MyPreferencesMutations.SET_SERIALIZED_PERSONALIZATION, prefObj.dataContent?.preferences);
				const marketsSelectionsSerialized: IMarketSelectionsSerialized[] = await this.context.dispatch(MyPreferencesActions.DESERIALIZE_PERSONALIZATION);
				console.debug("marketsSelectionsSerialized", marketsSelectionsSerialized);
				return true;
			}
		}
		return false;
	}

	@Action({ rawError: true })
	async [MyPreferencesActions.SAVE_PERSONALIZATION_INTO_DB](): Promise<IKNode> {
		// const state = this.context.state;
		// if (!state.rima.currentUserId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
		// 	const localStoreUserId: string = JSON.parse(localStorage.loggedInUser)._id;
		// 	this.context.commit(RimaMutations.SET_CURRENT_USER_ID, localStoreUserId);
		// 	console.debug(`[App::mounted] set state.rima.currentUserId ${state.rima.currentUserId} to the val of localStorage.loggedInUser ${localStoreUserId}`);
		// }
		// console.debug("[SAVE_PERSONALIZATION_INTO_DB] (this.context.state as any).rima.currentUserId", (this.context.state as any).rima.currentUserId);

		//CLEANING PREVIOUS PREFERENCES:
		StoreNewsMethods.clearPreferences(this.context as Context);

		const persKNode: IKNode = {
			...KnAlledgeNodeOperators.create(),
			type: KNode.TYPE_USER_PREFERENCES,
			//TODO @mprinc: this is not working `undefined`:  iAmId: (this.context.state as any).rima.currentUserId
			iAmId: StoreNewsMethods.userId(this.context.state as IStateNewsTotal), //JSON.parse(localStorage.loggedInUser)._id, //"624c6f6b956b57021e995899",
			name: KNode.TYPE_USER_PREFERENCES,
			// ideaId: this.dataInfo.type,
			// ideaVersion: this.dataInfo?.schema.version,
			dataContent: {
				preferences: this.myPreferences.preferencesPersistent.selectionsSerializedToIDs,
			}, // is email expected somewhere?
		};
		return this.context.dispatch(KnalledgeActions.CREATE_KNODE, persKNode);
	}

	/** deserializes from store `myPreferences.preferencesPersistent.selectionsSerializedToIDs` into store's `myPreferences.preferencesPersistent` */
	@Action({ rawError: true })
	async [MyPreferencesActions.DESERIALIZE_PERSONALIZATION](): Promise<IMarketsAspectsSelection[]> {
		// console.debug(`${MyPreferencesActions.DESERIALIZE_PERSONALIZATION}`);

		const myPreferencesPersistent: IStateMyPreferencesPersistent = (this.context.state as any)?.myPreferences.preferencesPersistent;
		const seletionsSerializedToIDs: string[] = myPreferencesPersistent.selectionsSerializedToIDs;
		console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] seletionsSerializedToIDs (${seletionsSerializedToIDs.length} elements) : ${JSON.stringify(seletionsSerializedToIDs, null, 4)}`);

		const marketsSetup: IMarketSetup[] = (this.context.state as any)?.markets.marketsSetup;

		//cleaning old preferences:
		myPreferencesPersistent.markets = [];
		myPreferencesPersistent.marketsAspectsSelections = [];
		let selectionsDeserializedNo: number = 0;

		// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] myPreferencesPersistent.markets: ${JSON.stringify(myPreferencesPersistent.markets, null, 4)}`);
		// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] myPreferencesPersistent.marketsAspectsSelections: ${JSON.stringify(myPreferencesPersistent.marketsAspectsSelections, null, 4)}`);

		let selection: ISelection | undefined;
		// for each of the serialized selection:
		let selectionFound: boolean;
		for (const selectionId of seletionsSerializedToIDs) {
			selectionFound = false;
			//we find selection among all selections (subfilters) by its ID:
			selection = this.getSelectionById(selectionId);
			if (selection) {
				// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] selection (${JSON.stringify(selection, null, 4)}) is found`);
				//we go through all markets:
				for (const marketSetup of marketsSetup) {
					//we go through all aspects of each market:
					for (const aspect of marketSetup.aspects) {
						//then we search for the aspect where the selection belongs to based on the `type`:
						if (selection.type === aspect.type) {
							// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] aspect '${aspect.title}' found by type '${aspect.type}' selection for selection (${JSON.stringify(selection, null, 4)})`);
							//we look for the market of the selection inside of those already in `myPreferences`:
							if (!myPreferencesPersistent.markets.find((market: IMarket) => market.id === marketSetup.market.id)) {
								//market to which the selections belongs was not added to myPreferences yet
								myPreferencesPersistent.markets.push(marketSetup.market);
								myPreferencesPersistent.markets.sort((a: IMarket, b: IMarket) => StoreNewsMethods.marketIdsOrdered.indexOf(a.id) - StoreNewsMethods.marketIdsOrdered.indexOf(b.id));
							}
							//
							let marketsAspectsSelection: IMarketsAspectsSelection | undefined = myPreferencesPersistent.marketsAspectsSelections.find((marketsAspectsSelection: IMarketsAspectsSelection) => marketsAspectsSelection.market.id === marketSetup.market.id);
							if (!marketsAspectsSelection) {
								//entry for the market with all array of aspect to which the selections belongs was not added to its market in myPreferences yet
								marketsAspectsSelection = {
									market: marketSetup.market,
									marketsAspectSelection: [],
								};
								myPreferencesPersistent.marketsAspectsSelections.push(marketsAspectsSelection);
							}
							//
							const marketAspectSelections: IMarketAspectSelections | undefined = marketsAspectsSelection.marketsAspectSelection.find((masSelection: IMarketAspectSelections) => masSelection.aspect.id === aspect.id);
							if (!marketAspectSelections) {
								//if the selection's aspect is not already added, we add it
								marketsAspectsSelection.marketsAspectSelection.push({
									aspect: aspect,
									selections: [],
								});
							}
							for (const marketAspectSelection of marketsAspectsSelection.marketsAspectSelection) {
								if (marketAspectSelection.aspect.id === aspect.id) {
									selectionsDeserializedNo++;
									// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] (${selectionsDeserializedNo}) Selection '${selectionId}' is added to aspect '${aspect.title}' found by type '${aspect.type}'`);
									marketAspectSelection.selections.push(selection);
									break;
								}
							}
							selectionFound = true;
							break; //this selection is found and de-serialized, we continue to the next selection
						}
					}
					if (selectionFound) {
						//this selection is found and de-serialized, we continue to the next selection
						break;
					}
				}
			} else {
				console.error(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] selection for selectionId '${selectionId}' is not found`);
			}
		}
		if (selectionsDeserializedNo !== seletionsSerializedToIDs.length) {
			console.error(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] NOT ALL ${seletionsSerializedToIDs.length} seletionsSerializedToIDs elements were found and deserialiazed, but only ${selectionsDeserializedNo} of them`);
		} else {
			// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] ALL ${seletionsSerializedToIDs.length} seletionsSerializedToIDs elements were found and deserialized`);
		}
		// console.debug(`[MyPreferencesActions.DESERIALIZE_PERSONALIZATION] myPreferencesPersistent.marketsAspectsSelections: ${JSON.stringify(myPreferencesPersistent.marketsAspectsSelections, null, 4)}`);

		await StoreNewsMethods.orderMarketsAndMarketsAspects(this.context as Context);
		//after loading the preferences, the rest of the app should know that preferences have been set-up:
		this.context.commit(MyPreferencesMutations.PREFERENCES_SETTING_FINISHED_ONCE, true);
		return myPreferencesPersistent.marketsAspectsSelections;
	}

	@Action({ rawError: true })
	async [MyPreferencesActions.ORDER_MARKETS_AND_ASPECTS_AND_SELECTIONS](): Promise<void> {
		await StoreNewsMethods.orderMarketsAndMarketsAspects(this.context as Context);
		StoreNewsMethods.orderSelectedSelections(this.context.state as any);
	}

	@Action({ rawError: true })
	async [MyPreferencesActions.CLEAN_EMPTY_MARKETS_AND_ASPECTS](): Promise<void> {
		await StoreNewsMethods.cleanEmptyMarketsAndAspects(this.context as Context);
	}

	/**
	 * 1) cleans previous local personalization; loads personalization from DB, gets personalized news list; gets headings
	 * @returns result
	 */
	@Action({ rawError: true })
	async [NewsActions.INITIALIZE](): Promise<boolean> {
		// updateRimaUserIdToLocalStoreUserId
		if (!(this.context.state as any).rima.currentUserId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
			const localStoreUserId: string = JSON.parse(localStorage.loggedInUser)._id;
			this.context.commit(RimaMutations.SET_CURRENT_USER_ID, localStoreUserId);
			console.debug(`[App::mounted] set (this.context.state as any).rima.currentUserId ${(this.context.state as any).rima.currentUserId} to the val of localStorage.loggedInUser ${localStoreUserId}`);
		}
		this.context.commit(NewsMutations.SET_NEWS_SEARCH, "");
		await this.context.dispatch(MyPreferencesActions.CLEAN_PERSONALIZATION, true); //just to be sure, but this is shallow deleting (only local)
		await this.context.dispatch(MyPreferencesActions.LOAD_PERSONALIZATION_FROM_DB);
		await this.context.dispatch(NewsActions.GET_PERSONALIZED_NEWS_LIST);
		const headings: IHeadings = await this.context.dispatch(NewsActions.GET_HEADINGS);
		console.debug(`[App.ts:mounted] headings: ${JSON.stringify(headings, null, 4)}`);
		return true;
	}

	@Action({ rawError: true })
	async [NewsActions.GET_ASPECT_FOR_SELECTIONS](selectionId: string): Promise<IMarketAspectSetup> {
		console.debug(`[NewsActions.GET_ASPECT_FOR_SELECTIONS] selectionId = ${selectionId}`);

		const marketsSetup: IMarketSetup[] = (this.context.state as any)?.markets.marketsSetup;
		const selection: ISelection | undefined = StoreNewsMethods.getSelectionById(this.context.state as IStateNewsTotal, selectionId);
		if (selection) {
			console.debug(`[NewsActions.GET_ASPECT_FOR_SELECTIONS] selection (${JSON.stringify(selection, null, 4)}) is found`);
			//we go through all markets:
			for (const marketSetup of marketsSetup) {
				//we go through all aspects of each market:
				for (const aspect of marketSetup.aspects) {
					//then we search for the aspect where the selection belongs to based on the `type`:
					if (selection.type === aspect.type) {
						console.debug(`[NewsActions.GET_ASPECT_FOR_SELECTIONS] aspect '${aspect.title}' found by type '${aspect.type}' selection for selection (${JSON.stringify(selection, null, 4)})`);
						return aspect;
					}
				}
			}
		}
		console.error(`[NewsActions.GET_ASPECT_FOR_SELECTIONS] selection for selectionId '${selectionId}' is not found`);
		return {} as IMarketAspectSetup;
	}

	@Action({ rawError: true })
	async [NewsActions.GET_MARKET_FOR_SELECTIONS](selectionId: string): Promise<IMarket> {
		// console.debug(`[NewsActions.GET_MARKET_FOR_SELECTIONS] selectionId = ${selectionId}`);

		const marketsSetup: IMarketSetup[] = (this.context.state as any)?.markets.marketsSetup;
		const selection: ISelection | undefined = StoreNewsMethods.getSelectionById(this.context.state as IStateNewsTotal, selectionId);
		if (selection) {
			// console.debug(`[NewsActions.GET_MARKET_FOR_SELECTIONS] selection (${JSON.stringify(selection, null, 4)}) is found`);
			//we go through all markets:
			for (const marketSetup of marketsSetup) {
				//we go through all aspects of each market:
				for (const aspect of marketSetup.aspects) {
					//then we search for the aspect where the selection belongs to based on the `type`:
					if (selection.type === aspect.type) {
						// console.debug(`[NewsActions.GET_MARKET_FOR_SELECTIONS] market '${marketSetup.market.title}' found by type '${aspect.type}' selection for selection (${JSON.stringify(selection, null, 4)})`);
						return marketSetup.market;
					}
				}
			}
		}
		console.error(`[NewsActions.GET_MARKET_FOR_SELECTIONS] selection for selectionId '${selectionId}' is not found`);
		return {} as IMarket;
	}
}
