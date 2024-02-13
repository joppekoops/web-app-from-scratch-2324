export default class {
	constructor(params, data) {
		this.params = params;
		this.data = data;
	}

	setTitle(title) {
		document.title = title;
	}

	arrayToList(array) {
		let element = '<ul>';
		array.forEach(item => element += `<li>${item}</li>`);
		element += '</ul>';
		return element;
	}

	async getHtml() {
		return '';
	}
}