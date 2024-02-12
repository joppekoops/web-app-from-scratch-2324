import aboutView from "./views/about.js";
import countryView from "./views/country.js";

let personalInfo = {};

//Get personal data
const getInfo = async () => {
	const request = new Request("/info.json");

	console.log('Getting data...')

	return await fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			} else {
				console.log('Done!')
				return response.json();
			}
		});
};


//Frontend routing
const pathToRegex = (path) => {
	return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
};

const getParams = (match) => {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

	return Object.fromEntries(keys.map((key, i) => {
		return [key, values[i]];
	}));
};

const changeActivePage = (pathname) => {
	const navLinks = Array.from(document.querySelectorAll("nav a"));
	navLinks.forEach((navLink) => navLink.removeAttribute("aria-current"));
	navLinks.find(navLink => navLink.href.includes(pathname)).setAttribute("aria-current", "page");
}

const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

const router = async () => {


	const routes = [{
			path: '/',
			view: aboutView
		},
		{
			path: '/visited-countries/:id',
			view: countryView
		},
		{
			path: '/bucketlist-countries/:id',
			view: countryView
		}
	];

	const potentialMatches = routes.map(route => {
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path))
		};
	});

	let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname]
		};
	}

	changeActivePage(location.pathname);

	const view = new match.route.view(getParams(match), personalInfo);

	document.querySelector('main').innerHTML = await view.getHtml();

};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', async () => {
	document.addEventListener('click', e => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});

	personalInfo = await getInfo();

	router();
});


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
};

navButton.addEventListener('click', toggleMobileNav);

toggleMobileNav();