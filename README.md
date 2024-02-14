# Web App From Scratch @cmda-minor-web 2023 - 2024

## Beschrijving
Ik heb een ***single page application (SPA)*** gemaakt, met de focus op *front-end JavaScript*. Centraal staat de ***front-end router***, die in de achtergrond de nieuwe pagina ophaald, waardoor de website niet hoeft te herladen.

In de applicatie is informatie over mijzelf te zien, een aantal landen waar ik geweest ben en een aantal landen waar ik nog graag heen wil. Per land staat mijn beleving en aanbevelingen of de reden waarom ik er graag heen wil.

Ja kan mijn wep app *live* vinden op https://wafs-dot-erudite-imprint-214919.ew.r.appspot.com/

## *Features*
- ### ***Frond-end routing***
In plaats van dat de *routing* door de *back-end* wordt gedaan, zoals meestal het geval is, wordt in deze app alle *routing* in de *front-end* gedaan. Behalve dan dat in de *back-end* alle pagina's naar ```index.html``` worden gestuurd.

Het **voordeel** hiervan is dat de pagina niet hoeft te herladen om nieuwe data voor de pagina op te halen.

Een **nadeel** is wel dat het niet *progressively enhanced* is en dus niet werkt als de *JavaScript* niet wordt geladen.

Alle *routes* worden aangegeven in een *array*. Daarbij kunnen parameters aangegeven worden met een ```:```. Bij elke *route* staat een bijhorende view die bestaat uit een *JavaScript class*.

*Array*:

```js
const routes = [{
			path: '/',
			view: aboutView
		},
		{
			path: '/visited-countries/:id',
			view: visitedCountryView
		},
		{
			path: '/bucketlist-countries/:id',
			view: bucketlistCountryView
		}
	];
```

Voorbeeld *class*:

```js
import abstractView from './abstractView.js';

export default class extends abstractView {
	constructor(params, data) {
		super(params, data);
		this.setTitle(this.params.id);
	}

	// HTML toevoegen aan de main

	async getHtml() {
		return `
			<h1>${this.data.title}</h1>
			<p>${this.data.text}</p>
		`;
	}
}
```

- ### **Dynamische navigatie opbouw**
De navigatie colom aan de linkerkant van de pagina word door de *JavaScript* opgebouwd op basis van welke data er beschikbaar is. Hierdoor kan er gemakkelijk een pagina worden toegevoegd of verwijderd in de `info.json`. Die verschijnt dan vanzelf op de pagina.

De structuur van de pagina wordt wel bepaald in de *JavaScript*. Hier zijn een aantal functies om bijvoorbeeld een titel toe te voegen of een lijstje met navigatie onderdelen.

```js
const buildNav = () => {
	
	//Titel toevoegen

	nav.appendChild(createNavTitle('Visited Countries'));

	//Lijst maken met alle bezochte landen

	let visitedCountriesList = document.createElement('ul');
	personalInfo.visitedCountries.forEach(country => {
		visitedCountriesList.appendChild(createNavItem('/visited-countries/' + country.country.toLowerCase(), country.country, country.imgUrl));
	});
	nav.appendChild(visitedCountriesList);
}
```

- ### *Progressively enhanced* navigatie met *checkbox*
Op kleinere schermen schuift de navigatie aan de linker kant een stukje het scherm uit zodat er genoeg ruimte is voor de inhoud. Dit gebeurt doormiddel van een *checkbox*. Op deze manier is er geen *JavaScript* nodig om deze functionaliteit te laten werken.
Als de *checkbox* in de main een ```:checked``` status heeft, wordt de navigatie open geklapt. De standaard *checkbox* vormgeving is verwijderd met ```appearance: none;```;

## Data
Alle data is opgeslagen in `docs/info.json`. Hierdoor staat alle content bij elkaar. De data wordt in een keer opgehaald als je app voor de eerste keer wordt geladen. De data wordt dan opgeslagen in de variable ```personalInfo```. In plaats van elke keer de data opnieuw van de server op te vragen, is het veel sneller om deze variabele te gebruiken.

## Installatie
Mijn app gebruikt een beetje *Node.js* in de *back-end*. Om de app de draaien zal je dus Node geinstalleerd moeten hebben. https://nodejs.org/en/download

*Clone* de app van *Github* met:
```
git clone https://github.com/joppekoops/web-app-from-scratch-2324.git
```

Installeer de *node packages* met:
```
npm i
```

En start vervolgens de app met:
```
npm start
```

## Proces

## Wensen lijst

## Bronnen

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->