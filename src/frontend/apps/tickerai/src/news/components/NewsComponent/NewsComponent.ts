import { Component, Prop, Vue } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
// import moment from "moment";
import { TNewsStoreWrapper } from "@tickerai-news/f-store";
import { ITag } from "@tickerai-news/i-core";
import { INews, NEWS_SELECTION_UNCATEGORIZED } from "@tickerai-news/i-core";

export enum EDisplay {
	COMPACT = "COMPACT",
	MEDIUM = "MEDIUM",
	EXPANDED = "EXPANDED",
}
export interface INewsSetup {
	display?: EDisplay;
	showSubfilter: boolean;
}
@Component({
	components: {
		ColaboMaterial,
	},
})
// export default class RimaCommentComponent extends Vue {
export class NewsComponent extends Vue {
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
		return this.news?.title?.charAt(0)?.toUpperCase() + this.news?.title?.slice(1);
	}

	protected limitWords(text: string, maxWords: number): string {
		const cleanedExtraSpaces: string = text?.replace(/\s+/g, " ");

		const words: string[] = cleanedExtraSpaces?.split(" ");

		const numberOfWords = words?.length;

		if (numberOfWords > maxWords) {
			words.splice(maxWords, numberOfWords - maxWords);
			return words.join(" ") + " ...";
		} else {
			return cleanedExtraSpaces;
		}
	}

	public newsText(maxWords: number): string {
		const shortenedText: string = this.limitWords(this.news.text, maxWords);
		const cleanedNL: string = shortenedText?.replace(/\\n/g, "<br>");

		return cleanedNL;
	}

	get newsTime(): string {
		return !this.news.time || this.news.time === ""
			? "RECENT"
			: new Date(this.news.time).toLocaleTimeString("en-us", {
					// weekday: "long",
					// year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
			  }); //toLocaleString();
	}

	public hide(): void {
		this.$emit("hidden", this.news);
	}
	public get selectionTitle(): string {
		return this.news.selection ? this.news.selection?.title : NEWS_SELECTION_UNCATEGORIZED;
	}

	public showDetails(): void {
		console.log("showDetails");
	}

	get tagInfo(): ITag | undefined {
		return this.news?.tags?.[0] ? this.store.state.newsStore.news.tags[this.news.tags[0]] : undefined;
	}

	// get date(): string {
	// 	return "";
	// }
}

export default NewsComponent;
