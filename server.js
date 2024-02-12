const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

//app.use(express.static(path.resolve(__dirname, 'docs', 'static')))

app.use('/images', express.static(path.resolve(__dirname, 'docs', 'images')));
app.use('/scripts', express.static(path.resolve(__dirname, 'docs', 'scripts')));
app.use('/styles', express.static(path.resolve(__dirname, 'docs', 'styles')));

app.get("/info.json", cors(), (req, res) => {
	res.sendFile(path.resolve(__dirname, 'docs', 'info.json'));
})

app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, 'docs', 'index.html'));
})

app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'))