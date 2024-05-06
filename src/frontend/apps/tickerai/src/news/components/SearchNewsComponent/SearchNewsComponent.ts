import { Component, Prop, Vue } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
// import moment from "moment";
import { TNewsStoreWrapper } from "@tickerai-news/f-store";
import { INews, ITag } from "@tickerai-news/i-core";

const ALLOW_EMPTY_SEARCH: boolean = true;
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
export class SearchNewsComponent extends Vue {
	/** the news item to display */
	@Prop() public news!: INews;
	@Prop() public setup!: INewsSetup;
	public search: string = "";
	// public lastSearch: string | undefined = undefined;

	private store: TNewsStoreWrapper = this["$store"] as TNewsStoreWrapper;

	public shortenedText(text: string, max: number): string {
		if (text.length < max) {
			return text;
		} else {
			return text.substr(0, Math.trunc(max / 2) - 2) + "..." + text.substr(text.length - Math.trunc(max / 2));
		}
	}

	public doSearch(): void {
		console.log("doSearch", this.search);
		if (ALLOW_EMPTY_SEARCH || this.search !== "") {
			this.$emit("doSearch", this.search);
		}
	}

	/* LEGACY
	public hide(): void {
		this.$emit("hidden", this.news);
	}

	get tagInfo(): ITag | undefined {
		return this.news?.tags?.[0] ? this.store.state.newsStore.news.tags[this.news.tags[0]] : undefined;
	}*/
}

export default SearchNewsComponent;
