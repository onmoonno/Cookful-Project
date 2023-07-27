require('dotenv').config();

var express = require('express');
//var mysql = require('mysql3');
const cors = require('cors')
var app = express();
//CORS is a security feature implemented by web browsers that 
//restricts webpages from making requests to a different domain 
//than the one serving the web page.
app.use(cors());

var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD, 
  database: 'recipe', 
});

// Establish the connection
connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to MySQL:', error);
    return;
  }

  console.log('Connected to MySQL database');
});


app.get('/api/data', function (req, res) {
  const searchQ = req.query.search; // Retrieve the 'search' query parameter from the request

  // Split the searchQ into individual ingredients
  const ingredients = searchQ.split(',');
  // Create an array to store the conditions for each ingredient
  const conditions = [];
  // Iterate through each ingredient and add a condition for the SQL query
  ingredients.forEach((ingredient) => {
    const condition = `Ingredients LIKE '%${ingredient.trim()}%'`;
    conditions.push(condition);
  });
  // Join the conditions with and to create a dynamic WHERE clause for the SQL query
  const whereClause = conditions.join(' AND ');
  // Example MySQL query with the dynamic WHERE clause to filter by the 'name' column
  const query = `SELECT * FROM recipes WHERE ${whereClause}`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;

    // Send pretty JSON with 2-space indentation
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results, null, 2));
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

