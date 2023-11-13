import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const queries = [
  {
    description: 'Countries with population greater than 8 million',
    query: 'SELECT Name FROM country WHERE Population > 8000000',
  },
  {
    description: 'Countries with "land" in their names',
    query: 'SELECT Name FROM country WHERE Name LIKE "%land%"',
  },
  {
    description: 'Cities with population between 500,000 and 1 million',
    query: 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000',
  },
  {
    description: 'Countries in Europe',
    query: 'SELECT Name FROM country WHERE Continent = "Europe"',
  },
  {
    description: 'Countries in descending order of surface area',
    query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC',
  },
  {
    description: 'Cities in the Netherlands',
    query: 'SELECT Name FROM city WHERE CountryCode = "NLD"',
  },
  {
    description: 'Population of Rotterdam',
    query: 'SELECT Population FROM city WHERE Name = "Rotterdam"',
  },
  {
    description: 'Top 10 countries by Surface Area',
    query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  },
  {
    description: 'Top 10 most populated cities',
    query: 'SELECT Name FROM city ORDER BY Population DESC LIMIT 10',
  },
  {
    description: 'Population number of the world',
    query: 'SELECT SUM(Population) as TotalPopulation FROM country',
  },
];

// Loop through each query in your array
for (const { description, query } of queries) {
  connection.query(query, (err, results) => {
    if (err) {
      console.error(`Error executing query (${description}):`, err);
      return;
    }

    // Log or handle the results with improved formatting
    console.log(`* ${description}? ----> results:`);

    // Check if there are any results
    if (results.length > 0) {
      // Log each result with specific properties
      results.forEach((row) => {
        console.log(`- ${row.Name || row.Population || row.TotalPopulation}`);
      });
    } else {
      console.log('No results found');
    }

    // Add a separator for better readability between query results
    console.log('\n');
  });
}

// Close the connection when all queries are done
connection.end();
