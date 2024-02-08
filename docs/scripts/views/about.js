import abstractView from "./abstractView.js";

export default class extends abstractView {
	constructor() {
		super();
		this.setTitle("About Me");
	}

	async getHtml() {
		return `
			<h1>About Me</h1>
		`;
	}
}