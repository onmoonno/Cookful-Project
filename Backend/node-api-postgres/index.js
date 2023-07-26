const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries'); // Import the db object from queries.js
const app = express();
const port = 3000;

const cors = require('cors');


// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/recipes', db.getRecipesByIngredients); // Use the getUsers function from db object

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

