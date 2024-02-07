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

const navButton = document.querySelector('header input[type="checkbox"]');
const nav = document.querySelector('nav');

const toggleMobileNav = () => {

	if (navButton.checked) {
		navButton.setAttribute('aria-expanded', 'true');
		nav.setAttribute('aria-hidden', 'false');
	} else {
		navButton.setAttribute('aria-expanded', 'false');
		nav.setAttribute('aria-hidden', 'true');
	}

}

navButton.addEventListener('click', toggleMobileNav);

toggleMobileNav();