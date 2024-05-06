import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import HeadingNewsComponent from "../HeadingNewsComponent/HeadingNewsComponent.vue";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
import { INews } from "@tickerai-news/i-core";
// import { Splide, SplideSlide } from "@splidejs/vue-splide";
// import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export interface IHeadingNewsListComponentOptions {
	newsLoaded: boolean;
}

@Component({
	components: {
		ColaboMaterial,
		HeadingNewsComponent,
		// Splide,
		// SplideSlide,
	},
})
export class HeadingNewsListComponent extends Vue {
	@Prop() protected newsList!: INews[];
	@Prop() protected options!: IHeadingNewsListComponentOptions;
	protected firstNews: INews | null = null;
	protected firstNewsIndex: number = 0;
	protected newsListRotating: INews[] = [];

	@Watch("newsList")
	newsListChanged(newsList: INews[]): void {
		this.firstNewsIndex = 0;
		this.firstNews = this.newsList[this.firstNewsIndex];
		this.newsListRotating = newsList.slice();
	}
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted(): void {
		this.newsListChanged(this.newsList);

		// by redesign UX.2.0 Joey didn't want 3 news (rotating) but only one:
		// setInterval(async () => {
		// 	if (this?.newsListRotating.length) {
		// 		// this.firstNewsIndex = ++this.firstNewsIndex % this.newsListOrdered.length;
		// 		this.firstNews = this.newsListRotating[this.firstNewsIndex];
		// 		if (this.firstNews) {
		// 			this.newsListRotating.push(this.firstNews);
		// 		}
		// 		this.newsListRotating.splice(0, 1);
		// 		// await this.$nextTick();
		// 		// console.warn(`this.newsListOrdered: ${JSON.stringify(this.newsListRotating, null, 4)}`);
		// 	}
		// }, 2000);
	}

	// public splideOptions: any = {
	// 	rewind: true,
	// 	width: 800,
	// 	gap: "1rem",
	// };
}

export default HeadingNewsListComponent;
