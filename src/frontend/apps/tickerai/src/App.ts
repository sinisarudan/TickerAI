import { Component, Vue, Watch } from "vue-property-decorator";
import NewsPreferencesComponent from "./news/components/NewsPreferencesComponent/NewsPreferencesComponent.vue";
import MyPreferencesComponent from "./news/components/MyPreferencesComponent/MyPreferencesComponent.vue";
// import _store from "@/store";
import LogoMottoComponent from "./components/LogoMottoComponent/LogoMottoComponent.vue";
import DebugConsoleComponent from "@colabo-dev/f-debug/lib/components/debug-console/debug-console-component.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { IMarketsAspectsSelection, NewsActions, MyPreferencesMutations, MyPreferencesActions, NewsMutations } from "@tickerai-news/f-store";
import { EPrefCFlowState, IHeadings } from "@tickerai-news/i-core";
import { GlobalStoreWithModules } from "./store";
import { RimaMutations } from "@colabo-rima/f-core";
import { KNode, IKNode, IApiRequest, KNODE_API_TYPE } from "@colabo-knalledge/i-core";
import { KnalledgeActions } from "@colabo-knalledge/f-core";

@Component({
	components: {
		ColaboMaterial,
		LogoMottoComponent,
		NewsPreferencesComponent,
		MyPreferencesComponent,
		DebugConsoleComponent,
	},
})
export default class App extends Vue {
	// private store = _store;
	public myNewsPrefDrawerOpen: boolean = false;

	public get snackbar(): boolean {
		return !!this.snackbarMsg && this.snackbarMsg !== "";
	}

	public set snackbar(value: boolean) {
		if (!value) this.snackbarMsg == "";
	}

	public snackbarMsg: string = "";
	public snackbarTimeout: number = 3000;

	public snackbarClose(): void {
		this.snackbarMsg = "";
	}

	protected isOnAccountPage: boolean = false;
	/* NOT WORKING:
	public get isOnAccountPage(): boolean {
		return this.$router.currentRoute.path === "/account";
	}*/

	private store: GlobalStoreWithModules = this["$store"] as GlobalStoreWithModules;

	get appName(): string {
		return this.store.state.app.name;
	}

	get appDesc(): string {
		return this.store.state.app.description;
	}

	get headings(): IHeadings {
		return this.store.state.newsStore.headings;
	}

	public parseHeading(headingStr: string): string[] {
		const HEADING_PART_SEPARATOR: string = "|";
		headingStr = headingStr.trim();
		if (headingStr.charAt(headingStr.length - 1) === HEADING_PART_SEPARATOR) {
			headingStr = headingStr.substring(0, headingStr.length - 1);
		}
		if (headingStr.charAt(0) === HEADING_PART_SEPARATOR) {
			headingStr = headingStr.substring(1, headingStr.length);
		}
		return headingStr.split(HEADING_PART_SEPARATOR);
		/*
		id: "6243869049d7b15ef9aa773e"
		mainHeadline: "HIRING BOOM TURNS TO BUST...WALL STREET LAYOFFS LIKELY AHEAD"
		mainHeadlineLink: "https://www.cnbc.com/2022/06/27/wall-street-layoffs-are-coming-as-deals-boom-turns-to-bust-insiders-say.html"
		topEarnings: "NKE|IDEX|LEGH|LWAY|BCAC|EYES|OMEX|"
		topMovers: "RCL|CCL|DVN|NRSN|AXSM|BOXD|CLNN|MMLP"
		topTechnicals: "BULLISH: USO, ADMA; BEARISH: QQQ, AXP"
		*/
	}

	protected get marketsAspectsSelections(): IMarketsAspectsSelection[] {
		return this.store.getters.marketsAspectsSelectionsOrdered;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async mounted(): Promise<void> {
		this.$router.afterEach((to, from) => {
			console.log(`WATCH:this.$router.afterEach(${to.name}: ${to}, ${from})`);
			this.isOnAccountPage = to.name === "account";
			return true;
		});
		this.store.commit(NewsMutations.ORDER_SELECTIONS);
		await this.store.dispatch(NewsActions.INITIALIZE);
		console.warn("APP Mounted: now initializing redirecting");

		// setTimeout(this.redirectToPersonalize, 10000);

		/* NewsActions.INITIALIZE replaces the following activities:
		this.updateRimaUserIdToLocalStoreUserId();
		await this.store.dispatch(MyPreferencesActions.CLEAN_PERSONALIZATION, true); //just in case
		await this.store.dispatch(MyPreferencesActions.LOAD_PERSONALIZATION_FROM_DB);
		await this.store.dispatch(NewsActions.GET_PERSONALIZED_NEWS_LIST);
		const headings: IHeadings = await this.store.dispatch(NewsActions.GET_HEADINGS);
		console.log(`[App.ts:mounted] headings: ${JSON.stringify(headings, null, 4)}`);
		*/
	}

	protected redirectToPersonalize(): void {
		//TODO: redirect only if not personalized, etc
		console.warn("redirecting: redirectToPersonalize");
		this.openPreferences();
		// this.snackbarMsg = "You've been redirected to personalization";
	}

	// protected updateRimaUserIdToLocalStoreUserId(): void {
	// 	if (!(this.store.state as any).rima.currentUserId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
	// 		const localStoreUserId: string = JSON.parse(localStorage.loggedInUser)._id;
	// 		this.store.commit(RimaMutations.SET_CURRENT_USER_ID, localStoreUserId);
	// 		console.log(`[App::mounted] set (this.store.state as any).rima.currentUserId ${(this.store.state as any).rima.currentUserId} to the val of localStorage.loggedInUser ${localStoreUserId}`);
	// 	}
	// }

	/*
	protected testCoount: number = 0;

	public get test(): string {
		return ++this.testCoount + " : " + (Math.random() > 0.5 ? "bigger" : "less");
	}
	*/

	public get showPreferencesSettingsBtn(): boolean {
		return this.store.getters.showPreferencesSettingsBtn && !this.isOnAccountPage;
	}

	public get showDailyRundown(): boolean {
		return !(this.isOnAccountPage || this.store.getters.arePreferencesBeingEdited);
	}

	public get showMyNewsPortfolioBtn(): boolean {
		return this.store.getters.showMyNewsPortfolioBtn && !this.isOnAccountPage;
	}

	public get showLoginRegisterBtn(): boolean {
		return !(this.isOnAccountPage || this.store.getters.arePreferencesBeingEdited); //we've removed this condition `&& !this.store.getters.isUserLoggedIn`, bc we want user always to have access to his account;
	}

	public get isUserLoggedIn(): boolean {
		// return this.store.getters.isUserLoggedIn; this getter from store was cached and not checked for changes, so we had to do it here in the code
		let userId: string | undefined = (this.store.state as any).rima.currentUserId;
		if (!userId && localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
			userId = JSON.parse(localStorage.loggedInUser)._id;
		}
		return !!userId;
	}

	public get accountText(): string {
		return "LOGIN/REGISTER"; // OLD UX.1: this.isUserLoggedIn ? "ACCOUNT" : "LOGIN/REGISTER";
	}

	public get userInitials(): string {
		if (this.isUserLoggedIn) {
			const loggedInUser = JSON.parse(localStorage.loggedInUser);
			const firstName: string = loggedInUser.dataContent?.firstName as string;
			const lastName: string = loggedInUser.dataContent?.lastName as string;
			return (!!firstName && firstName.length > 0 ? firstName.charAt(0) : "-") + (!!lastName && lastName.length > 0 ? lastName.charAt(0) : "-");
		} else {
			return "N/A";
		}
	}

	public personalizeNews(): void {
		this.openPreferences();
	}

	public openPreferences(): void {
		// this.store.commit(MyPreferencesMutations.PREFERENCES_SETTING_CANCELED, false); //TODO: check if this is needed
		this.store.commit(MyPreferencesMutations.SET_PREFERENCES_STATUS, EPrefCFlowState.SETTING_UP);
		this.$router.push({ name: "my-preferences" });
	}

	protected async cleanMyPreferences(): Promise<boolean> {
		this.myNewsPrefDrawerOpen = false;
		const result: boolean = await this.store.dispatch(MyPreferencesActions.CLEAN_PERSONALIZATION, false);
		await this.store.dispatch(NewsActions.GET_PERSONALIZED_NEWS_LIST);
		await this.store.dispatch(NewsActions.GET_HEADINGS);
		this.snackbarMsg = "Your preferences are cleaned";
		return result;
	}

	editMyPreferences(): void {
		this.myNewsPrefDrawerOpen = false;
		// TODO: temp fix
		if (this.store.state.newsStore.myPreferences.preferencesManagement.isPrefSettingUpFinishedOnce) {
			// if (this.store.state.newsStore.myPreferences.preferencesStatus === EPrefCFlowState.FINISH) {
			//we reset the PREF component ONLY if preferences setting was FINISHED, otherwise, if it was cancelled, we want the user continues where he left:
			this.store.commit(MyPreferencesMutations.SET_PREFERENCES_STATUS, EPrefCFlowState.RESETTING_UP);

			this.store.state.newsStore.myPreferences.preferencesManagement.activeMarketIndex = 0;
		}
		this.openPreferences();
		// this.storeNews.state.newsStore.myPreferences.finishedSettingUp = false;
	}

	bottomBarItemSelected?: string;
	bottomBarItemChanged(activeItem: string): void {
		this.bottomBarItemSelected = activeItem;
	}
}
