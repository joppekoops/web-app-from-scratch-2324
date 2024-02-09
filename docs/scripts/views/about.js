import abstractView from "./abstractView.js";

export default class extends abstractView {
	constructor(params) {
		super(params);
		this.setTitle("About Me");
	}

	async getHtml() {
		return `
			<h1>About Me</h1>
		`;
	}
}