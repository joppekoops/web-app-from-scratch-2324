export default class {
	constructor(params, data) {
		this.params = params;
		this.data = data;
	}

	setTitle(title) {
		document.title = title;
	}

	async getHtml() {
		return "";
	}
}