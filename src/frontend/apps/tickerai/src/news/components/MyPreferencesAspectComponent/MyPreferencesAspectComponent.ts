import { IMarketAspectSelections } from "@tickerai-news/f-store";
import { Component, Prop, Vue } from "vue-property-decorator";
// import NewsComponent from "../NewsComponent/NewsComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { ISelection } from "@tickerai-news/i-core";

@Component({
	components: {
		ColaboMaterial,
	},
})
export class MyPreferencesAspectComponent extends Vue {
	protected selectedSelections: ISelection[] = [];
	@Prop() public marketsAspectsSelection!: IMarketAspectSelections;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		// console.log("this.marketAspectSetup", this.marketAspectSetup);
	}

	get selections(): ISelection[] {
		return this.marketsAspectsSelection.selections;
	}

	get getMarketAspect(): string {
		console.log("marketsAspectsSelection:", JSON.stringify(this.marketsAspectsSelection, null, 2));
		return "test";
	}
}

export default MyPreferencesAspectComponent;
