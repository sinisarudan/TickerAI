/* eslint-disable no-case-declarations */
import { EPrefCFlowState, ISelection } from "@tickerai-news/i-core";
import { IMarket, IMarketsAspectsSelection, IMarketSetup, IMarketAspectSelections, MyPreferencesMutations, NewsActions, TNewsStoreWrapper } from "@tickerai-news/f-store";
import { Component, Vue } from "vue-property-decorator";
// import NewsComponent from "../NewsComponent/NewsComponent.vue";
import MarketsSelectionComponent from "../MarketsSelectionComponent/MarketsSelectionComponent.vue";
import MarketsSetUpComponent from "../MarketsSetUpComponent/MarketsSetUpComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { threadId } from "worker_threads";
import { MUST_REGISTER_FOR_PREFERENCES } from "@colabo-rima/f-core";
import { ErrorColabo, ErrorColaboLevel, IMarketAspectSetup } from "../../../../../../puzzles/news/store/store-news-vos";

export interface ISnackBarOptions {
	duration: number;
	show: boolean;
	text: string;
	btn: string;
}

enum EPreferencesInnerState {
	SELECT_MARKETS = "SELECT_MARKETS",
	SETUP_MARKET = "SETUP_MARKET",
}

@Component({
	components: {
		ColaboMaterial,
		MarketsSelectionComponent,
		MarketsSetUpComponent,
	},
})
export class NewsPreferencesComponent extends Vue {
	// @Prop() protected newsPreferences!: INews[];
	// @Prop() protected options!: INewsPreferencesComponentOptions;

	public activeBookSavedSnackbar: boolean = false;

	public innerState: EPreferencesInnerState = EPreferencesInnerState.SELECT_MARKETS;

	public snBar: ISnackBarOptions = {
		duration: 3,
		show: false,
		text: "",
		btn: "OK",
	};

	public get showPref(): boolean {
		return !this.preferencesFinished;
	}

	showComp(compName: string): boolean {
		switch (compName) {
			case "MarketsSetUpComponent":
				return this.innerState === EPreferencesInnerState.SETUP_MARKET;
				break;
			case "MarketsSelectionComponent":
			default:
				return this.innerState === EPreferencesInnerState.SELECT_MARKETS;
				break;
		}
	}

	public get isTheLastStepInTheFlow(): boolean {
		// TODO: temp fix
		return this.store.state.newsStore.myPreferences.preferencesManagement.preferencesStatus === EPrefCFlowState.FINISHED_SETUP;
		// return this.state === EPrefCFlowState.FINISH;
	}

	public get preferencesFinished(): boolean {
		return this.isTheLastStepInTheFlow;
	}

	protected setStatus(status: EPrefCFlowState): void {
		this.store.commit(MyPreferencesMutations.SET_PREFERENCES_STATUS, status);
	}

	// protected pushPreferences(): void {
	// 	console.log("[pushPreferences] myPreferences:", JSON.stringify(this.marketsAspectsSelections));
	// }

	public marketToggled(market: IMarket): void {
		console.log("[NewsPreferencesComponent::marketToggled]", market);
		this.store.commit(MyPreferencesMutations.TOGGLE_MARKET_SELECTION, market);
	}

	public selectionToggled(selection: ISelection): void {
		console.log("[News view::selectionToggled]", selection);
		this.store.commit(MyPreferencesMutations.TOGGLE_PREFERENCES_INDIVIDUAL_SELECTION, selection);
	}

	public selectionsSelected(selections: ISelection[]): void {
		// console.log("[News view::selectionsSelected]", selections);
		this.store.commit(MyPreferencesMutations.SELECT_PREFERENCES_SELECTIONS, selections);
	}

	public selectionsDeSelected(selections: ISelection[]): void {
		// console.log("[News view::selectionsDeSelected]", selections);
		this.store.commit(MyPreferencesMutations.DESELECT_PREFERENCES_SELECTIONS, selections);
	}

	/* not used any more - titles are arrows now:
	public get prev_title(): string {
		let text: string = "Previous";
		if (this.innerState === EPreferencesInnerState.SETUP_MARKET) {
			if (this.activeMarketIndex > 0) {
				text = "Previous Market";
			}
		}
		return text;
	}

	public get next_title(): string {
		let text: string = "Next";
		if (this.innerState === EPreferencesInnerState.SETUP_MARKET) {
			if (this.activeMarketIndex < this.store.state.newsStore.myPreferences.preferencesPersistent.markets.length - 1) {
				text = "Next Market";
			} else {
				text = "Finish Personalization";
			}
		}
		return text;
	}

		*/

	public get prev_subtitle(): string {
		let text: string = "";
		if (this.innerState === EPreferencesInnerState.SETUP_MARKET) {
			if (this.activeMarketIndex > 0) {
				text = this.store.state.newsStore.myPreferences.preferencesPersistent.markets[this.activeMarketIndex - 1].title;
			} else {
				text = "Change Markets";
			}
		}
		return text;
	}

	public get next_subtitle(): string {
		const text: string = "";
		/*let text: string = "";
		if (this.innerState === EPreferencesInnerState.SELECT_MARKETS) {
			text = "Setup your Markets";
		}
		if (this.innerState === EPreferencesInnerState.SETUP_MARKET) {
			if (this.activeMarketIndex < this.store.state.newsStore.myPreferences.preferencesPersistent.markets.length - 1) {
				text = this.store.state.newsStore.myPreferences.preferencesPersistent.markets[this.activeMarketIndex + 1].title;
			} else {
				text = "Finish";
			}
		}*/
		return text;
	}

	public get ifPrev(): boolean {
		return this.innerState !== EPreferencesInnerState.SELECT_MARKETS && !this.preferencesFinished;
	}

	public get ifNext(): boolean {
		return !this.isTheLastStepInTheFlow;
	}

	/**
	 * @returns undefined if all the aspects of the `marketToCheck` are set (having at least one selection / subfilter chosen). Otherwise it return the the array containing first of all of the aspects that are identified not being set. If the array is EMPTY it means that the market HAS unset aspects but we haven't identified which one precisely
	 */
	protected async hasAnyMarketAspectNotSet(marketToCheck: IMarket): Promise<IMarketAspectSetup[] | undefined> {
		if (!marketToCheck) {
			return [];
		}
		console.log(`[hasAnyMarketAspectNotSet](${marketToCheck.title})`);
		let unsetAspects: IMarketAspectSetup[] = [];

		const marketSetup: IMarketSetup = this.store.state.newsStore.markets.marketsSetup.find((ms: IMarketSetup) => ms.market.id === marketToCheck.id) as IMarketSetup;
		if (!marketSetup) {
			const error: ErrorColabo = {
				code: "NO_MARKET_SETUP_FOUND",
				level: ErrorColaboLevel.ERROR,
				origin: "hasAnyMarketAspectNotSet",
			};
			await this.store.dispatch(NewsActions.LOG_ERROR, error);
			return unsetAspects;
		}

		if (!this.marketsAspectsSelections || this.marketsAspectsSelections.length === 0) {
			//if the `marketsAspectsSelections` is not set at all, that means that no market aspect is set, i.e. no selection is made yet
			unsetAspects = [...marketSetup.aspects];
			return unsetAspects;
		}

		const marketAspectsSelections: IMarketsAspectsSelection | undefined = this.marketsAspectsSelections.find((ma: IMarketsAspectsSelection) => ma.market.id === marketToCheck.id);
		if (!marketAspectsSelections) {
			unsetAspects = [...marketSetup.aspects];
			return unsetAspects;
		}

		const myAspects: IMarketAspectSelections[] = marketAspectsSelections.marketsAspectSelection;
		// we are going through all the aspects of the market in its setup to check if there is some aspect that is not yet added to `myPreferences`,
		// meaning, none of its selections/subfilters has been chosen:
		for (const setupAspect of marketSetup.aspects) {
			if (!myAspects.find((mas: IMarketAspectSelections) => mas.aspect.id === setupAspect.id)) {
				//add it if not already added:
				if (!unsetAspects.find((aspect: IMarketAspectSetup) => aspect.id === setupAspect.id)) {
					unsetAspects.push(setupAspect);
				}
			}
		}

		//checking if there is any aspect of those in `myPreferences` that has NO selections:
		for (const aspect of myAspects) {
			if (aspect.selections.length === 0) {
				//add it if not already added:
				if (!unsetAspects.find((a: IMarketAspectSetup) => a.id === aspect.aspect.id)) {
					unsetAspects.push(aspect.aspect);
				}
			}
		}
		return unsetAspects.length > 0 ? unsetAspects : undefined;
	}

	protected noMarketSelectedWarning(): void {
		/*
		//TODO: SnackBar is not working so far so we use dialog:
		this.snBar.text = "You'd choose one market at least";
		this.snBar.show = true;
		*/
		this.$root.$emit("MSG_CS_DIALOG", {
			title: "No market selected ...",
			text: "You should select one market at least",
			btn1Msg: "OK",
			type: "INFO",
			persistent: false,
		});
	}

	protected cancel(): void {
		this.$emit("canceled");
	}

	public skipClicked(): void {
		switch (this.innerState) {
			case EPreferencesInnerState.SELECT_MARKETS:
				this.cancel();
				break;
			case EPreferencesInnerState.SETUP_MARKET:
				this.nextClicked(true);
				break;
		}
	}

	public get skipText(): string {
		return this.innerState === EPreferencesInnerState.SELECT_MARKETS ? "DO IT LATER" : "SKIP";
	}

	public async nextClicked(noCheck: boolean = true): Promise<void> {
		console.log("nextClicked");
		switch (this.innerState) {
			case EPreferencesInnerState.SELECT_MARKETS:
				if (this.selectedMarkets.length === 0) {
					this.noMarketSelectedWarning();
				} else {
					this.innerState = EPreferencesInnerState.SETUP_MARKET;
				}
				break;
			case EPreferencesInnerState.SETUP_MARKET:
				//warning if some market aspect is left without any subfilter (`ISelection`) selected:
				const marketToCheck: IMarket = this.store.state.newsStore.myPreferences.preferencesPersistent.markets[this.activeMarketIndex];
				const unsetAspects: IMarketAspectSetup[] | undefined = await this.hasAnyMarketAspectNotSet(marketToCheck);
				if (unsetAspects) {
					/* OLD code - to remove:
					let marketStr: string = "this";
					if (this.marketsAspectsSelections && this.marketsAspectsSelections.length !== 0) {
						const marketsAspectsSelection: IMarketsAspectsSelection = this.marketsAspectsSelections[this.activeMarketIndex];
						if (marketsAspectsSelection) {
							const market: IMarket = marketsAspectsSelection.market;
							if (market) {
								marketStr = '"' + market.title + '"';
							}
						}
					}
					*/
					// console.warn(`Are you sure you want to continue without setting all the aspects of ${marketStr} market?`);
					const unsetAspectsStrPart: string = unsetAspects.reduce((previousValue: string, currentValue: IMarketAspectSetup) => previousValue + ` "${currentValue.title}", `, "");
					const unsetAspectsStr: string = unsetAspects.length === 0 ? "all the aspects" : unsetAspectsStrPart.substring(0, unsetAspectsStrPart.length - 2) + (unsetAspects.length > 1 ? "aspects" : "aspect");

					if (!noCheck && marketToCheck && !(await this.confirmDialogNotSetAll(`Are you sure you want to continue without setting ${unsetAspectsStr} of the ${marketToCheck.title} market?`))) {
						return;
					}
					// if (!confirm(`Are you sure you want to continue without setting all the aspects of ${marketStr} market?`)) {
					// 	return;
					// }
				}
				if (this.activeMarketIndex < this.store.state.newsStore.myPreferences.preferencesPersistent.markets.length - 1) {
					this.activeMarketIndex++;
				} else {
					await this.actionsOnPreferenceFinishing();
				}
				break;
		}
		window.scrollTo(0, 0);
	}

	protected async actionsOnPreferenceFinishing(): Promise<void> {
		this.setStatus(EPrefCFlowState.FINISHED_SETUP);
		this.store.commit(MyPreferencesMutations.PREFERENCES_SETTING_FINISHED_ONCE, true);
		// this.pushPreferences();
		this.$emit("preferencesSettingFinished");
	}

	protected async confirmDialogNotSetAll(msg: string): Promise<boolean> {
		const promise: Promise<boolean> = new Promise<boolean>((resolve) => {
			this.$root.$emit("MSG_CS_DIALOG", {
				title: "Warning ...",
				text: msg,
				btn1Msg: "No",
				btn2Msg: "Yes",
				callback: (btnNo: number) => {
					resolve(btnNo === 2);
				},
				type: "WARNING",
				persistent: true,
			});
		});
		return promise;
	}

	public toTitleCase(str: string): string {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
		});
	}

	public prefsBack(): void {
		console.log("prefsBack");
		switch (this.innerState) {
			case EPreferencesInnerState.SETUP_MARKET:
				//if we've setting up the first market we go to previous step, selecting the markets. If we're setting up other than the first market, we shift to the previous market to set it up:
				if (this.activeMarketIndex > 0) {
					this.activeMarketIndex--;
				} else {
					this.innerState = EPreferencesInnerState.SELECT_MARKETS;
				}
				break;
		}
		window.scrollTo(0, 0);
	}

	public get marketsSetup(): IMarketSetup[] {
		return this.store.state.newsStore.markets.marketsSetup;
	}

	public isActive(marketId: string, markInd: number): boolean {
		console.log("isActive", marketId, markInd);
		return marketId === this.store.state.newsStore.myPreferences.preferencesPersistent.markets[this.activeMarketIndex].id;
	}

	public isDone(markInd: number): boolean {
		console.log("isDone", markInd);
		return markInd < this.activeMarketIndex;
	}

	public get activeMarketIndex(): number {
		return this.store.state.newsStore.myPreferences.preferencesManagement.activeMarketIndex;
	}

	public set activeMarketIndex(index: number) {
		this.store.commit(MyPreferencesMutations.SET_ACTIVE_MARKET_INDEX, index);
	}

	public get marketsAspectsSelections(): IMarketsAspectsSelection[] {
		return this.store.state.newsStore.myPreferences.preferencesPersistent.marketsAspectsSelections;
	}

	private store: TNewsStoreWrapper = this["$store"] as TNewsStoreWrapper;

	/**
	 *
	 * @returns Promise resolved to `true` if user wants to proceed, and `false` if wants to Login/Register
	 */
	protected async confirmNotHavingAccount(): Promise<boolean> {
		const promise: Promise<boolean> = new Promise<boolean>((resolve) => {
			this.$root.$emit("MSG_CS_DIALOG", {
				title: "Account for Preferences",
				text: "If you already have or want to create an account, please login/register first. If not, proceed with setting up your preferences",
				btn1Msg: "Proceed",
				btn2Msg: "Login/Register",
				callback: (btnNo: number) => {
					resolve(btnNo === 1);
				},
				type: "WARNING",
				persistent: true,
			});
		});
		return promise;
	}

	async mounted(): Promise<void> {
		// console.log("mounted", this.store.state.newsStore.myPreferences.preferencesManagement.preferencesStatus);
		// default state: covering the case user came directly to the pref view by a url, and not being guided by clicking buttons (so that the state is not fixed)
		if (this.store.state.newsStore.myPreferences.preferencesManagement.preferencesStatus === EPrefCFlowState.NON_INITIATED) {
			this.setStatus(EPrefCFlowState.SETTING_UP);
		}
		if (!this.isUserLoggedIn) {
			//if `!MUST_REGISTER_FOR_PREFERENCES` then the parent `Preferences.ts` component takes care of this and turns user back to the account or home page:
			if (!MUST_REGISTER_FOR_PREFERENCES && !(await this.confirmNotHavingAccount())) {
				this.setStatus(EPrefCFlowState.NON_INITIATED);
				this.$router.push({ name: "account" });
			}
			// if (!this.store.state.rima.currentUserId && !(await this.confirmNotHavingAccount())) {
		}
	}

	public get isUserLoggedIn(): boolean {
		// return this.store.getters.isUserLoggedIn; this getter from store was cached and not checked for changes, so we had to do it here in the code
		let userId: string | undefined = (this.store.state as any).rima.currentUserId;
		if (!userId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
			userId = JSON.parse(localStorage.loggedInUser)._id;
		}
		return !!userId;
	}

	protected get markets(): IMarket[] {
		return this.store.getters.marketsOrdered;
	}

	protected get selectedMarkets(): IMarket[] {
		return this.store.state.newsStore.myPreferences.preferencesPersistent.markets;
	}

	public get showBreadCrumbs(): boolean {
		return this.innerState === EPreferencesInnerState.SETUP_MARKET;
	}

	// protected status(): EPrefCFlowState {
	// 	return EPrefCFlowState.SELECT_MARKETS;
	// }
}

export default NewsPreferencesComponent;
