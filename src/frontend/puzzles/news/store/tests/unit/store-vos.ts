export enum GlobalMutations {}

export interface StateType {
	settings: {
		advancedSettings: boolean;
	};
	app: {
		name: string;
		description: string;
	};
}
