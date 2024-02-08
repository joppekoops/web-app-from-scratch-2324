import about from "./views/about.js";

const pathToRegex = (path) => {
	return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
}

const getParams = (match) => {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

	console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)))
}

const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
}

const router = async () => {


	const routes = [{
			path: '/',
			view: about
		},
		{
			path: '/visited-countries/:id',
			view: about
		}
		// {
		// 	path: '/visited-countries',
		// 	view: () => console.log("viewing visited")
		// },
		// {
		// 	path: '/bucketlist-countries',
		// 	view: () => console.log("viewing bucketlist")
		// }
	];

	const potentialMatches = routes.map(route => {
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path))
		}
	});

	let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

	if (!match) {
		match = {
			route: routes[0],
			isMatch: true
		}
	}

	const view = new match.route.view(getParams(match));

	document.querySelector('main').innerHTML = await view.getHtml();

}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', e => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	})
	router()
})

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