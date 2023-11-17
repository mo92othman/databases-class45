import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'RecipesDatabase',
});

const recipeQueries = [
  {
    description: 'Vegetarian recipes with potatoes',
    query:
      "SELECT R.name AS recipe_name FROM Recipes R JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id JOIN Categories C ON RC.category_id = C.category_id WHERE C.name = 'Vegetarian' AND R.ingredients LIKE '%Potatoes%';",
  },
  {
    description: 'Cakes that do not need baking',
    query:
      "SELECT r.name FROM Recipes r JOIN RecipeCategories rc ON r.recipe_id = rc.recipe_id JOIN Categories c ON rc.category_id = c.category_id WHERE c.name = 'No-Bake' AND R.steps NOT LIKE '%Bake%';",
  },
  {
    description: 'Vegan and Japanese recipes',
    query:
      "SELECT r.name FROM Recipes r JOIN RecipeCategories rc ON r.recipe_id = rc.recipe_id JOIN Categories c ON rc.category_id = c.category_id WHERE c.name IN ('Vegan', 'Japanese');",
  },
];

// Loop through each query in your array
for (const { description, query } of recipeQueries) {
  connection.query(query, (err, results) => {
    if (err) {
      console.error(`Error executing query (${description}):`, err);
      return;
    }

    console.log(`* ${description}? ----> results:`);

    // Extract and log only the names
    const recipeNames = results.map((result) => result.name);

    // Check if there are any names
    if (recipeNames.length > 0) {
      console.log(recipeNames.join(', '));
    } else {
      console.log('No recipes found');
    }

    // Add a separator for better readability between query results
    console.log('\n');
  });
}

// Close the connection when all queries are done
connection.end();
