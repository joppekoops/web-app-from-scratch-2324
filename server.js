//Node.js backend doesn't do more than sending all urls to the index if they are not a static file.

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve files like images, css and scripts static
app.use('/images', express.static(path.resolve(__dirname, 'docs', 'images')));
app.use('/scripts', express.static(path.resolve(__dirname, 'docs', 'scripts')));
app.use('/styles', express.static(path.resolve(__dirname, 'docs', 'styles')));

// Serve json file with cors allowed so the teams app can get the data
app.get("/info.json", cors(), (req, res) => {
	res.sendFile(path.resolve(__dirname, 'docs', 'info.json'));
})

// Serve index.html for all other roots, since routing his handled in the frontend
app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, 'docs', 'index.html'));
})

// Serve app on port 3000 or on the port specified by app engine (process.env.PORT)
app.listen(process.env.PORT || 3000, () => console.log('Server running...'));