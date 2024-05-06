import { Component, Prop, Vue } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
// import moment from "moment";
import { TNewsStoreWrapper } from "@tickerai-news/f-store";
import { INews, ITag } from "@tickerai-news/i-core";

export enum EDisplay {
	COMPACT = "COMPACT",
	MEDIUM = "MEDIUM",
	EXPANDED = "EXPANDED",
}
export interface INewsSetup {
	display: EDisplay;
}
@Component({
	components: {
		ColaboMaterial,
	},
})
// export default class RimaCommentComponent extends Vue {
export class HeadingNewsComponent extends Vue {
	/** the news item to display */
	@Prop() public news!: INews;
	@Prop() public setup!: INewsSetup;

	private store: TNewsStoreWrapper = this["$store"] as TNewsStoreWrapper;

	public shortenedText(text: string, max: number): string {
		if (text.length < max) {
			return text;
		} else {
			return text.substr(0, Math.trunc(max / 2) - 2) + "..." + text.substr(text.length - Math.trunc(max / 2));
		}
	}

	public get newsTitle(): string {
		return this.news.title.charAt(0).toUpperCase() + this.news.title.slice(1);
	}

	public hide(): void {
		this.$emit("hidden", this.news);
	}

	public showDetails(): void {
		console.log("showDetails");
	}

	get tagInfo(): ITag | undefined {
		return this.news?.tags?.[0] ? this.store.state.newsStore.news.tags[this.news.tags[0]] : undefined;
	}
}

export default HeadingNewsComponent;
