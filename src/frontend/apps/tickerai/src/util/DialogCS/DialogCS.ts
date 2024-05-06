import { Component, Vue, Watch } from "vue-property-decorator";
import { ColaboMaterial } from "@colabo-headless/f-components-vue";
// import moment from "moment";

export enum EDialogType {
	INFO = "INFO",
	WARNING = "WARNING",
	ERROR = "ERROR",
}

export const MSG_CS_DIALOG: string = "MSG_CS_DIALOG";
export const MSG_CS_DIALOG_CLOSE: string = "MSG_CS_DIALOG_CLOSE";
export interface IDialogOptions {
	type?: EDialogType;
	title?: string;
	text?: string;
	/** at least btn1 should be set up */
	btn1Msg?: string;
	btn2Msg?: string;
	persistent?: boolean;
	/** called upon button clicked - with `btnNo` parameter equal to order of the button */
	callback?: (btnNo: number) => void;
}
@Component({
	components: {
		ColaboMaterial,
	},
})
// export default class RimaCommentComponent extends Vue {
export class DialogCS extends Vue {
	/** the news item to display */

	/* not used any more, now through events is sent:
	// @Watch("options", { immediate: true })
	@Watch("options")
	optionsChanged(options: IDialogOptions): void {
		console.log("optionsChanged", options);
		this.showDialog = true;
	}
	*/

	// @Prop() public options!: IDialogOptions;
	public options: IDialogOptions = {};

	public showDialog: boolean = false;

	public btnClicked(btnNo: number): void {
		// this.$emit("clicked", btnNo);
		if (this.options && this.options.callback) {
			this.options.callback(btnNo);
		}
		this.showDialog = false;
	}

	mounted(): void {
		this.$root.$on(MSG_CS_DIALOG, (options: IDialogOptions) => {
			this.options = options;
			this.showDialog = true;
		});
		this.$root.$on(MSG_CS_DIALOG_CLOSE, () => {
			this.showDialog = false;
		});
	}
}

export default DialogCS;
