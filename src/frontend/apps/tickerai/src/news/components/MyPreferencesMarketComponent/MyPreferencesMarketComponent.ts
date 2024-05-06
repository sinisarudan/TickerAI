import { IMarketsAspectsSelection } from "@tickerai-news/f-store";
import { Component, Prop, Vue } from "vue-property-decorator";
import MyPreferencesAspectComponent from "../MyPreferencesAspectComponent/MyPreferencesAspectComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { ISelection } from "@tickerai-news/i-core";

@Component({
	components: {
		MyPreferencesAspectComponent,
		ColaboMaterial,
	},
})
export class MyPreferencesMarketComponent extends Vue {
	protected selectedSelections: ISelection[] = [];
	@Prop() public marketsAspectsSelection!: IMarketsAspectsSelection;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		// console.log("this.marketAspectSetup", this.marketAspectSetup);
	}
}

export default MyPreferencesMarketComponent;
