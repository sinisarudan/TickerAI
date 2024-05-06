import { Component, Vue } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import NewsPreferencesComponent from "@/news/components/NewsPreferencesComponent/NewsPreferencesComponent.vue";
// import _store from "@/store";
import { GlobalStoreWithModules } from "@/store";
import { EPrefCFlowState, INews } from "@tickerai-news/i-core";
import { MyPreferencesMutations, MyPreferencesActions, NewsMutations, NewsActions, IMarket } from "@tickerai-news/f-store";

import DialogCS from "@/util/DialogCS/DialogCS.vue";
import { EDialogType, IDialogOptions, MSG_CS_DIALOG } from "@/util/DialogCS/DialogCS";
import { KnalledgeActions } from "@colabo-knalledge/f-core";
import { KNode, IKNode, KnAlledgeNodeOperators } from "@colabo-knalledge/i-core";
import { MUST_REGISTER_FOR_PREFERENCES, RimaActions } from "@colabo-rima/f-core";
@Component({
	components: {
		ColaboMaterial,
		NewsPreferencesComponent,
		DialogCS,
	},
})
class Preferences extends Vue {
	// public preferencesDialog: boolean = true; //controlling visibility of the dialogue for news preferences setting

	public showWarning: boolean = false;

	public dialogOptions: IDialogOptions = {};

	private store: GlobalStoreWithModules = this["$store"] as GlobalStoreWithModules;

	public get preferencesFinished(): boolean {
		return this.store.state.newsStore.myPreferences.preferencesManagement.preferencesStatus === EPrefCFlowState.FINISHED_SETUP;
	}

	/** TODO:! */
	public get arePreferencesSaved(): boolean {
		//TODO: temp mockup:
		return this.isUserLoggedIn;
	}

	public get isUserLoggedIn(): boolean {
		return (this.store.state as any).rima.currentUserId || (localStorage.loggedInUser && localStorage.loggedInUser !== "null");
		//originally it was from store as below, but for some reason it is not triggered so we try in above direct manner:
		// return this.store.getters.isUserLoggedIn;
	}

	warnCancel(msg: string, callback: (btnNo: number) => void): void {
		this.$root.$emit(MSG_CS_DIALOG, {
			title: "Warning ...",
			text: msg,
			btn1Msg: "No",
			btn2Msg: "Yes",
			callback: callback,
			type: EDialogType.WARNING,
			persistent: true,
		});
	}

	warnClose(msg: string, callback: (btnNo: number) => void): void {
		this.$root.$emit(MSG_CS_DIALOG, {
			title: "Not registered",
			text: msg,
			btn1Msg: "Register",
			btn2Msg: "Later",
			callback: callback,
			type: EDialogType.WARNING,
			persistent: true,
		});
	}

	public canceled(): void {
		this.cancelPrefSetting();
	}

	public cancelPrefSetting(): void {
		this.warnCancel("Do you want to quit setting your News Preferences?", this.warnCancelClicked);
	}

	public closePreferences(): void {
		if (!this.isUserLoggedIn) {
			this.warnClose("To keep your preferences safe and to be able to use them on other devices, we strongly suggest to create an account", this.warnCloseClicked);
		} else {
			this.backToHome();
		}
	}

	protected backToHome(): void {
		this.$router.push({ name: "Default" });
	}

	// protected get selectedMarkets(): IMarket[] {
	// 	return this.store.state.newsStore.myPreferences.preferencesPersistent.markets;
	// }

	// public get activeMarketIndex(): number {
	// 	return this.store.state.newsStore.myPreferences.preferencesManagement.activeMarketIndex;
	// }

	// public isActive(marketId: string): boolean {
	// 	return marketId === this.store.state.newsStore.myPreferences.preferencesPersistent.markets[this.activeMarketIndex].id;
	// }

	protected async warnCloseClicked(btnNo: number): Promise<void> {
		//user wants to register:
		if (btnNo === 1) {
			// this.preferencesDialog = false;
			this.$router.push({ name: "account" });
		}
		//user will register later:
		if (btnNo === 2) {
			// this.preferencesDialog = false;
			const kNodeCreated: IKNode = await this.createAnonymousUser();
			console.log("kNodeCreated", kNodeCreated);
			//additional checking if after `createAnonymousUser()` the (anonymous) user is really created:
			if (this.isUserLoggedIn) {
				await this.savePersonalizationIntoDB();
			}
			this.backToHome();
		}
	}

	/** its side-effect is that the user is saved in `localStorage.loggedInUser` too and rima-store.currentUserId */
	protected async createAnonymousUser(): Promise<IKNode> {
		const userKNode: IKNode = await this.store.dispatch(RimaActions.CREATE_ANONYMOUS_USER);
		return userKNode;
	}

	public async preferencesSettingFinished(): Promise<void> {
		await this.store.dispatch(MyPreferencesActions.CLEAN_EMPTY_MARKETS_AND_ASPECTS);
		await this.store.dispatch(MyPreferencesActions.ORDER_MARKETS_AND_ASPECTS_AND_SELECTIONS);
		if (this.isUserLoggedIn) {
			await this.savePersonalizationIntoDB();
		}
		this.store.commit(NewsMutations.SET_NEWS_SEARCH, "");
		//`NewsActions.GET_PERSONALIZED_NEWS_LIST` serializes personalization internally and gets newslist based on it:
		const newsList: INews[] = await this.store.dispatch(NewsActions.GET_PERSONALIZED_NEWS_LIST);
		console.log(`[NewsPreferencesComponent.nextClicked] newsList: ${newsList}`);
	}

	protected async savePersonalizationIntoDB(): Promise<void> {
		this.store.dispatch(MyPreferencesActions.SERIALIZE_PERSONALIZATION);
		this.store.dispatch(MyPreferencesActions.SAVE_PERSONALIZATION_INTO_DB);
	}

	protected warnCancelClicked(btnNo: number): void {
		if (btnNo === 2) {
			// this.preferencesDialog = false;
			this.store.commit(MyPreferencesMutations.SET_PREFERENCES_STATUS, EPrefCFlowState.NON_INITIATED);
			this.$router.push({ name: "Default" });
			// this.store.commit(MyPreferencesMutations.PREFERENCES_SETTING_CANCELED, true);
		}
	}

	protected enforceAccountForPreferences(): void {
		this.$root.$emit(MSG_CS_DIALOG, {
			title: "Not registered",
			text: "You have to be logged in to set up your preferences",
			btn1Msg: "Login/Register",
			btn2Msg: "Back",
			callback: (btn: number) => {
				if (btn === 1) {
					this.$router.push({ name: "account" });
				} else {
					this.$router.push({ name: "Default" });
				}
			},
			type: EDialogType.WARNING,
			persistent: true,
		});
	}

	mounted(): void {
		console.log("[Preferences_VIEW]::mounted");
		// option while avoiding ANONYMOUS:
		if (MUST_REGISTER_FOR_PREFERENCES && !this.isUserLoggedIn) {
			this.store.commit(MyPreferencesMutations.SET_PREFERENCES_STATUS, EPrefCFlowState.NON_INITIATED);
			this.enforceAccountForPreferences();
		}
	}

	/******************************
	 * Preferences
	 * ***************************/
}

export default Preferences;
