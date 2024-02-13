import aboutView from './views/about.js';
import countryView from './views/country.js';

const addLoader = () => {
	console.log('Loading...')
	const main = document.querySelector('main');
	const loader = document.createElement('div');
	loader.classList.add('loader');
	main.appendChild(loader);
}

let personalInfo = {};

//Get personal data
const getInfo = async () => {

	const request = new Request('/info.json');

	return await fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			} else {
				return response.json();
			}
		});
};

//Source: https://developer.mozilla.org/en-US/docs/Web/API/fetch

const firstLetterUppercase = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const nav = document.querySelector('nav');

const createNavTitle = (title) => {
	let element = document.createElement('h2');
	element.textContent = title;
	return element;
}

const createNavItem = (url, linkText, imgUrl) => {
	let element = document.createElement('li');
	let link = document.createElement('a');
	let img = document.createElement('img');
	let span = document.createElement('span');
	link.setAttribute('data-link', '');
	link.href = url;
	span.textContent = linkText;
	img.src = imgUrl;
	link.appendChild(span);
	link.appendChild(img);
	element.appendChild(link);
	return element;
}

const buildNav = () => {
	nav.innerHTML = '';

	nav.appendChild(createNavTitle('About'));

	let aboutList = document.createElement('ul');
	aboutList.appendChild(createNavItem('/', personalInfo.firstName + personalInfo.lastName, personalInfo.avatar_url));
	nav.appendChild(aboutList);

	nav.appendChild(createNavTitle('Visited Countries'));

	let visitedCountriesList = document.createElement('ul');
	personalInfo.visitedCountries.forEach(country => {
		visitedCountriesList.appendChild(createNavItem('/visited-countries/' + country.country.toLowerCase(), country.country, country.imgUrl));
	});
	nav.appendChild(visitedCountriesList);

	nav.appendChild(createNavTitle('Bucketlist Countries'));

	let bucketlistCountriesList = document.createElement('ul');
	personalInfo.bucketList.forEach(country => {
		bucketlistCountriesList.appendChild(createNavItem('/bucketlist-countries/' + country.country.toLowerCase(), country.country, country.imgUrl));
	});
	nav.appendChild(bucketlistCountriesList);
}

//Frontend routing

/*

Tutorials used for routing:
https://www.youtube.com/watch?v=6BozpmSjk-Y
https://www.youtube.com/watch?v=OstALBk-jTc

*/

// Make regular expression from path to match to the url
const pathToRegex = (path) => {
	return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
};

// Create an object from all the parameters in the url
const getParams = (match) => {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

	return Object.fromEntries(keys.map((key, i) => {
		return [key, values[i]];
	}));
};

// Function to update the active page in the navigation menu
const changeActivePage = (pathname) => {
	const navLinks = Array.from(document.querySelectorAll('nav a'));
	navLinks.forEach((navLink) => navLink.removeAttribute('aria-current'));
	navLinks.find(navLink => navLink.href.includes(pathname)).setAttribute('aria-current', 'page');
};

// Add url to browser history so navigation like the back and next button still work
const navigateTo = (url) => {
	history.pushState( /*state*/ null, /*title*/ null, /*url*/ url);
	router();
};

const router = async () => {

	//array of all the routes with their view class and parameters
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

	//test each route if it matches the pathname/url
	const potentialMatches = routes.map(route => {
		// return object with all routes and if they match the pathname
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path))
		};
	});

	//find what route matched
	let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

	//if no match is found (match = undefined), go to the homepage (the first route)
	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname]
		};
	}

	// Change the menu link that gets the active style
	changeActivePage(location.pathname);

	// Make new instance of the routes' view
	const view = new match.route.view(getParams(match), personalInfo);

	// Add the HTML from the view in the main
	document.querySelector('main').innerHTML = await view.getHtml();

};

// Event listener for handling browser navigation events
window.addEventListener('popstate', router);

// Event listener for DOMContentLoaded event, initializes routing and retrieves personal data
document.addEventListener('DOMContentLoaded', async () => {

	addLoader();

	// Fetch personal data before the first page loads so the data is available
	// After fist page load the data stays the same
	personalInfo = await getInfo();

	buildNav();

	// Add click event to all links with data-link attribute to prevent them from reloading the page
	document.addEventListener('click', e => {
		if (e.target.matches('[data-link]')) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});

	//Load the first page after the DOM has loaded
	router();
});


// Navigation menu toggle

const navButton = document.querySelector('header input[type="checkbox"]');

// Function to toggle aria values of the navigation menu
// The actual visibility is done with a checkbox and :has selector in CSS
const toggleMobileNav = () => {

	if (navButton.checked) {
		navButton.setAttribute('aria-expanded', 'true');
		nav.setAttribute('aria-hidden', 'false');
	} else {
		navButton.setAttribute('aria-expanded', 'false');
		nav.setAttribute('aria-hidden', 'true');
	}
};

// Event listener for toggling mobile navigation menu
navButton.addEventListener('click', toggleMobileNav);

// Close nav menu on first page load because it is open by default in case the javascript is disabled
toggleMobileNav();