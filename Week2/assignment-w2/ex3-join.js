import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'academic_database',
});

// Query to get authors and mentors
const getAuthorsAndMentorsQuery = `
    SELECT a.author_name,
      m.author_name AS mentor_name
    FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
  `;

// Query to get authors and papers
const getAuthorsAndPapersQuery = `
    SELECT a.*,
      rp.paper_title
    FROM authors a
      LEFT JOIN authors_papers ap ON a.author_id = ap.author_id
      LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;
  `;

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Connection successful
  console.log('Connected to the database');

  // Execute the first query
  connection.query(getAuthorsAndMentorsQuery, (error, results) => {
    if (error) {
      console.error('Error executing the first query:', error);
      // Close the connection
      connection.end();
      return;
    }

    console.log('Authors and their mentors:', results);

    // Execute the second query
    connection.query(getAuthorsAndPapersQuery, (error, results) => {
      if (error) {
        console.error('Error executing the second query:', error);
      } else {
        console.log('Authors and their published paper titles:');
        console.table(results);
      }

      // Close the connection
      connection.end();
    });
  });
});
