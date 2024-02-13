import abstractView from './abstractView.js';

export default class extends abstractView {
	constructor(params, data) {
		super(params, data);
		this.setTitle('About Me');
	}

	async getHtml() {

		return `<h1>About Me</h1> 
				<div class="profile">
					<p>${this.data.firstName} ${this.data.lastName}</p> 
					<p>📍<adress>${this.data.city}<adress></p>
					<img src="${this.data.avatar_url}" alt="">
				</div>
				<h2>Bio</h2>
				<p>${this.data.bio}</p>
				<h2>Hobbies</h2>
				${this.arrayToList(this.data.hobbies)}
		`;
	}
}