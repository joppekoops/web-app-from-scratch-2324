import abstractView from './abstractView.js';

export default class extends abstractView {
	constructor(params, data) {
		super(params, data);
		this.setTitle(this.params.id);
	}

	async getHtml() {
		//Make the frist letter uppercase
		const countryName = this.params.id.replace('-', ' ');

		//Find the country with the same name as the parameter in the URL
		const country = this.data.bucketList.find(country => country.country.toLowerCase() === countryName);

		return `
			<h1>${country.country}</h1>
			<section class="experience">
				<div class="title-bar">
					<h2>Reason</h2>
				</div>
				<p>${country.reason}</p>
				<img src="${country.imgUrl}" alt="${country.imgAlt}"/>
			</section>
		`;
	}
}