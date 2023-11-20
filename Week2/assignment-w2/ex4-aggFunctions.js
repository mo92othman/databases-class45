import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'academic_database',
});

const queries = [
  `SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors FROM research_papers rp LEFT JOIN authors_papers ap ON rp.paper_id = ap.paper_id GROUP BY rp.paper_id;`,

  `SELECT a.gender, SUM(ap.paper_id IS NOT NULL) AS num_papers_published FROM authors a LEFT JOIN authors_papers ap ON a.author_id = ap.author_id GROUP BY a.gender HAVING a.gender = 'F';`,

  `SELECT university, AVG(h_index) AS avg_h_index FROM authors GROUP BY university;`,

  `SELECT a.university, COUNT(ap.paper_id) AS num_papers FROM authors a LEFT JOIN authors_papers ap ON a.author_id = ap.author_id GROUP BY a.university;`,

  `SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index FROM authors GROUP BY university;`,
];

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Connection successful
  console.log('Connected to the database');

  // Execute queries
  for (const query of queries) {
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
      } else {
        console.log('Query results:', results);
      }
    });
  }

  // Close the connection
  connection.end();
});
