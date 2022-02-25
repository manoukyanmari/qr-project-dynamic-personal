const express = require('express');
const app = express();
const helpers = require('./src/helpers');
const routes = require('./src/routes')(app, helpers)

// Listen to the App Engine-specified port, or 8080 otherwise
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});