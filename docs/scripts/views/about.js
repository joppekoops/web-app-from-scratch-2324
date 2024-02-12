import abstractView from "./abstractView.js";

export default class extends abstractView {
	constructor(params, data) {
		super(params, data);
		this.setTitle("About Me");
	}

	async getHtml() {
		return `
			<h1>About Me</h1>
			<p>My name is ${this.data.firstName}</p>
			<img src="${this.data.avatar_url}" alt="">
		`;
	}
}