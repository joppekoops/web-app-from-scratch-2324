const getInfo = () => {
	const request = new Request("../data.json");

	fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then((response) => {
			console.log(response);
		})

}

getInfo();

// mobile nav menu

const navButton = document.querySelector('header button');
const nav = document.querySelector('nav');
const body = document.querySelector('body');

const toggleMobileNav = () => {

	body.classList.toggle('menu-open');

	if (body.classList.contains('menu-open')) {
		nav.setAttribute('aria-hidden', 'false');
		navButton.setAttribute('aria-expanded', 'true')
	} else {
		nav.setAttribute('aria-hidden', 'true');
		navButton.setAttribute('aria-expanded', 'false')
	}

}

navButton.addEventListener('click', toggleMobileNav);
toggleMobileNav();