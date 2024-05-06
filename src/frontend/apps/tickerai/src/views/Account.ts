import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { IKNode } from "@colabo-knalledge/i-core";
import { Component, Vue } from "vue-property-decorator";
import _store from "../store";
import { RimaMutations } from "@colabo-rima/f-core";
import { MyPreferencesActions, NewsActions } from "@tickerai-news/f-store";
import { MUST_REGISTER_FOR_PREFERENCES } from "@colabo-rima/f-core";
import DialogCS from "@/util/DialogCS/DialogCS.vue";
import { EDialogType, IDialogOptions, MSG_CS_DIALOG, MSG_CS_DIALOG_CLOSE } from "@/util/DialogCS/DialogCS";

enum EUserState {
	LOGGED_IN = "LOGGED_IN",
	LOGGED_OUT = "LOGGED_OUT",
}

interface IUserData {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
}

interface IUserStateEventObj {
	userData: IUserData;
	apiKey: string;
	state: EUserState;
}

@Component({
	components: {
		DialogCS,
		ColaboMaterial,
	},
})
export default class AccountComponent extends Vue {
	public dialogOptions: IDialogOptions = {};

	private store = _store;
	protected firstOnUserStateEvent: boolean = true;

	protected get currentUserId(): string | undefined {
		// return this.store.getters.currentUser?.id;
		return this.store.state.rima.currentUserId;
	}

	protected waitLoading(): void {
		this.$root.$emit(MSG_CS_DIALOG, {
			title: "Setting Up Preferences...",
			text: "Please wait",
			type: EDialogType.INFO,
			persistent: true,
		});
	}

	protected closeWaitLoading(): void {
		this.$root.$emit(MSG_CS_DIALOG_CLOSE);
	}

	public backToNews(): void {
		this.$router.push({ name: "Default" });
	}

	public get isUserLoggedIn(): boolean {
		return localStorage.loggedInUser && localStorage.loggedInUser !== "null";
	}

	protected async onUserStateEvent(event: CustomEvent): Promise<void> {
		// https://vuejs.org/v2/guide/events.html#Listening-to-Events
		// https://v3.vuejs.org/guide/web-components.html#definecustomelement
		// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
		// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail

		const userStateEventObj: IUserStateEventObj = event.detail as IUserStateEventObj;

		this.store.commit(RimaMutations.SET_CURRENT_USER_ID, userStateEventObj.userData._id);

		console.log(`"[Account] onUserState" event from the "colabo-rima-account-component" Angular component: ${JSON.stringify(event.detail)}`);
		console.log(`localStorage.loggedInUser: ${localStorage.loggedInUser}`);
		console.log(`(this.context.state as any).rima.currentUserId: ${(this.store.state as any).rima.currentUserId}`);
		if (!this.firstOnUserStateEvent) {
			//we use `firstOnUserStateEvent` bc want to go back to home only after login/register/logout change, but the event is fired even when we just open the account view and we don't want to react like this on the first event/entrance:
			if (localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
				// if (this.isUserLoggedIn) { TODO: for some reason this always returns false even though its inner condition evaluates to true?!
				await this.doLoginActions();
				this.returnBack(); //after login/register we want user to go back to main page
			} else {
				await this.doLogOutActions();
			}
		}
		this.firstOnUserStateEvent = false;
	}

	protected async doLoginActions(): Promise<void> {
		this.waitLoading();
		if (MUST_REGISTER_FOR_PREFERENCES) {
			await this.store.dispatch(NewsActions.INITIALIZE);
		} else {
			//TODO:
			await this.savePersonalizationIntoDB(); //intended to save anonymous personalization as user's ones after registering (//now we SAVE personalization for the case that user has just made his preferences on preferences-view/page and decided to register/login to save them in DB:)
		}
		this.closeWaitLoading();
	}

	protected async doLogOutActions(): Promise<void> {
		this.waitLoading();
		await this.store.dispatch(MyPreferencesActions.CLEAN_PERSONALIZATION, true);
		await this.store.dispatch(NewsActions.INITIALIZE); //to reset the news etc for non-loggedIn user
		this.closeWaitLoading();
	}

	protected async savePersonalizationIntoDB(): Promise<void> {
		this.store.dispatch(MyPreferencesActions.SERIALIZE_PERSONALIZATION);
		this.store.dispatch(MyPreferencesActions.SAVE_PERSONALIZATION_INTO_DB);
	}

	returnBack(): void {
		// https://router.vuejs.org/guide/essentials/named-routes.html
		this.$router.push({ name: "Default" });
	}

	public mounted(): void {
		console.log("[AccountComponent::mounted] this.$router.currentRoute.path", this.$router.currentRoute.path);
		if (localStorage.loggedInUser && localStorage.loggedInUser !== "null") {
			const localUser: IKNode = JSON.parse(localStorage.loggedInUser);
			// if (localUser.dataContent?.type === "rima.user.anonymous"; //TODO: use constant
		}
	}
}
