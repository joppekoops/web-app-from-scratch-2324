import abstractView from './abstractView.js';

export default class extends abstractView {
	constructor(params, data) {
		super(params, data);
		this.setTitle(this.params.id);
	}

	async getHtml() {
		//Make the frist letter uppercase
		const countryName = this.params.id.charAt(0).toUpperCase() + this.params.id.slice(1);

		//Find the country with the same name as the parameter in the URL
		const country = this.data.visitedCountries.find(country => country.country === countryName);

		//Function for creating a div with stars from the rating
		const ratingToStars = (rating) => {
			let element = '<div class="rating">';

			for (let i = 0; i < 5; i++) {
				if (i < rating) { //add as many filled stars as the rating
					element += '<img src="/images/star-solid.svg" alt=""/>';
				} else { //complement with empty stars until there are five
					element += '<img src="/images/star-regular.svg" alt=""/>';
				}
			}

			element += '</div>';

			return element;
		};

		return `
			<h1>${country.country}</h1>
			<section class="experience">
				<div class="title-bar">
					<h2>My experience</h2>
					${ratingToStars(country.rating)}
				</div>
				<p>${country.experience}</p>
				<img src="${country.imgUrl}" alt=""/>
			</section>
			<section class="recommendations">
				<h2>Recommendations</h2>
				${this.arrayToList(country.recommendations)}
			</section>
		`;
	}
}