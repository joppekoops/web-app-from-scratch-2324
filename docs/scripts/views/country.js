import abstractView from "./abstractView.js";

export default class extends abstractView {
	constructor(params, data) {
		super(params, data);
		this.setTitle(this.params.id);
	}

	async getHtml() {
		const countryName = this.params.id.charAt(0).toUpperCase() + this.params.id.slice(1);
		const country = this.data.visitedCountries.find(country => country.country === countryName);

		const ratingToStars = (rating) => {
			let element = '<div class="rating">';

			for (let i = 0; i < 5; i++) {
				if (i < rating) {
					element += '<img src="/images/star-solid.svg" alt""/>';
				} else {
					element += '<img src="/images/star-regular.svg" alt=""/>';
				}
			}

			element += '</div>';

			return element;
		}

		return `
			<h1>${country.country}</h1>
			<h2>Experience</h2>
			${ratingToStars(country.rating)}
			<p>${country.experience}</p>
		`;
	}
}