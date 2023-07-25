const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'do not know yet',
    host: 'do not know yet',
    database: 'do not know yet',
    password: 'do not know yet',
    port: 5432,
});

const getRecipesByIngredients = (request, response) => {
    const { ingredients } = request.query;

    // Check if ingredients contains a comma

        // Split the ingredients string into an array
    const ingredientList = ingredients.split(',');

    // Construct the SQL query to search for recipes containing all of the specified ingredients
    const query = `
        SELECT *
        FROM recipes
        WHERE ${ingredientList
        .map((ingredient, index) => `"Ingredients" ILIKE $${index + 1}`)
        .join(' AND ')}
    `;

    pool.query(query, ingredientList.map(ingredient => `%${ingredient}%`), (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            response.status(500).json({ error: 'Internal server error' });
        } else {
            response.status(200).json(results.rows);
        }
    });

};


module.exports = {
    getRecipesByIngredients,
};