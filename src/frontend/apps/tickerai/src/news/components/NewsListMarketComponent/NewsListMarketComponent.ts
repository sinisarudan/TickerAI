import { IMarketAspectSelections } from "@tickerai-news/f-store";
import { Component, Prop, Vue } from "vue-property-decorator";
import NewsListAspectComponent from "../NewsListAspectComponent/NewsListAspectComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { VsaList, VsaItem, VsaHeading, VsaContent, VsaIcon } from "vue-simple-accordion";
import { INews } from "@tickerai-news/i-core";

@Component({
	components: {
		ColaboMaterial,
		NewsListAspectComponent,
		VsaList,
		VsaItem,
		VsaHeading,
		VsaContent,
		VsaIcon,
	},
})
export class NewsListMarketComponent extends Vue {
	// protected selectedSelections: ISelection[] = [];
	@Prop() protected newsList!: INews[];
	// protected _marketAspectSelections!: IMarketAspectSelections[];
	@Prop() public marketsAspectSelection!: IMarketAspectSelections[];
	// @Prop() public set marketAspectSelections(val: IMarketAspectSelections[]) {
	// 	this._marketAspectSelections = val;
	// }

	// public get marketAspectSelections(): IMarketAspectSelections[] {
	// 	return this._marketAspectSelections;
	// }

	public expansionPanel: number = 0;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		console.log(`[NewsListMarketComponent] newsList (${this.newsList.length}): ${JSON.stringify(this.newsList, null, 4)}`);
	}

	public newsListForAspect(aspect: IMarketAspectSelections): INews[] {
		return this.newsList.filter((news: INews) => news.selection?.type === aspect.aspect.type);
	}
}

export default NewsListMarketComponent;
