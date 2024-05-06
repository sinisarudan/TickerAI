import { Component, Prop, Vue } from "vue-property-decorator";
import NewsComponent from "../NewsComponent/NewsComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { INews } from "@tickerai-news/i-core";
import { IMarketAspectSelections, NewsMutations, TNewsStoreWrapper } from "@tickerai-news/f-store";

const SORT_BY_TITLE: boolean = true;

@Component({
	components: {
		ColaboMaterial,
		NewsComponent,
	},
})
export class NewsListAspectComponent extends Vue {
	// protected selectedSelections: ISelection[] = [];
	@Prop() public newsList!: INews[];
	public showSubfilters: Record<string, boolean> = {};
	private store: TNewsStoreWrapper = this["$store"] as TNewsStoreWrapper;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		// console.debug("this.marketAspectSetup", this.marketAspectSetup);
		// setTimeout(this.settingUpNews, 500);
		this.settingUpNews();
		// if (!this.isSortedArray()) {
		// 	console.error(`the newsList is NOT sorted after sorting!: ${JSON.stringify(this.newsList)}`);
		// }
		console.debug(`[NewsListAspectComponent] newsList (${this.newsList.length}): ${JSON.stringify(this.newsList, null, 4)}`);
	}

	// protected isSortedArray(): boolean {
	// 	let sorted: boolean = true;
	// 	for (let i: number = 0; i < this.newsList.length - 1; i++) {
	// 		const aSortingId: string = this.getNewsSortingId(this.newsList[i], SORT_BY_TITLE);
	// 		const bSortingId: string = this.getNewsSortingId(this.newsList[i + 1], SORT_BY_TITLE);

	// 		if (aSortingId > bSortingId) {
	// 			sorted = false;
	// 			break;
	// 		}
	// 	}
	// 	return sorted;
	// }


	protected settingUpNews(): void {
		console.debug("this.newsList [before]", this.newsList);
		// we've done sorting directly in the `NewsActions.GET_PERSONALIZED_NEWS_LIST`:
		// this.store.commit(NewsMutations.ORDER_NEWS_LIST, this.newsList);

		//setting up `showSubfilters` for the first news of any specific `subfilters`:
		let subfilter: string = "";
		for (let ni = 0; ni < this.newsList.length; ni++) {
			const news = this.newsList[ni];
			if (news.subfilter !== subfilter) {
				Vue.set(this.showSubfilters, news.id, true);
				// this.showSubfilters[news.id] = true;
				subfilter = news.subfilter as string;
			} else {
				Vue.set(this.showSubfilters, news.id, false);
				// this.showSubfilters[news.id] = false;
			}
		}
		console.debug("showSubfilters", this.showSubfilters);
	}
}

export default NewsListAspectComponent;
