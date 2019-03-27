const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const www = process.env.WWW || './';
const bodyParser = require('body-parser');
const router = require('./blog-post-router');
let jsonParser = bodyParser.json();

app.use(express.static(www));
console.log(`serving ${www}`);

app.use('/blog/api', jsonParser, router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));