import abstractView from "./abstractView.js";

export default class extends abstractView {
	constructor(params) {
		super(params);
		this.setTitle("Country");
	}

	async getHtml() {
		console.log(this.params.id)
		return `
			<h1>About Me</h1>
		`;
	}
}