import { GlobalStoreWithModules } from "@/store";
import { IMarketsAspectsSelection } from "@tickerai-news/f-store";
import { Component, Prop, Vue } from "vue-property-decorator";
import MyPreferencesMarketComponent from "../MyPreferencesMarketComponent/MyPreferencesMarketComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { VsaList, VsaItem, VsaHeading, VsaContent, VsaIcon } from "vue-simple-accordion";
import "vue-simple-accordion/dist/vue-simple-accordion.css";

@Component({
	components: {
		MyPreferencesMarketComponent,
		ColaboMaterial,
		VsaList,
		VsaItem,
		VsaHeading,
		VsaContent,
		VsaIcon,
	},
})
export class MyPreferencesComponent extends Vue {
	@Prop() public marketsAspectsSelections!: IMarketsAspectsSelection[];

	private store: GlobalStoreWithModules = this["$store"] as GlobalStoreWithModules;

	public _selectedMarket: string = "406bd9f172a103093eb50211";

	public get whose(): string {
		return this.isUserLoggedIn ? JSON.parse(localStorage.loggedInUser).dataContent?.firstName + "'s" : "My";
	}

	public get isUserLoggedIn(): boolean {
		return (this.store.state as any).rima.currentUserId || (localStorage.loggedInUser && localStorage.loggedInUser !== "null");
		//originally it was from store as below, but for some reason it is not triggered so we try in above direct manner:
		// return this.store.getters.isUserLoggedIn;
	}

	public set selectedMarket(value: string) {
		this._selectedMarket = value;
	}

	public get selectedMarket(): string {
		return this._selectedMarket;
	}

	public get marketsAspectsSelectionActive(): IMarketsAspectsSelection {
		return this.marketsAspectsSelections.find((mas: IMarketsAspectsSelection) => mas.market.id === this._selectedMarket) as IMarketsAspectsSelection;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		console.log("[MyPreferencesComponent] this.marketsAspectsSelections:", this.marketsAspectsSelections);
	}

	closeMyPreferences(): void {
		this.$emit("closed", true);
	}

	editMyPreferences(): void {
		this.$emit("edit", true);
	}

	protected async cleanMyPreferences(): Promise<void> {
		this.$emit("clean", true);
	}

	// goToAccount(): void {
	// 	this.$emit("closed", true);
	// 	this.$router.push({ name: "account" });
	// }
}

export default MyPreferencesComponent;
