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
const body = document.querySelector('body');



navButton.onclick = () => {

	body.classList.toggle('menu-open');

}