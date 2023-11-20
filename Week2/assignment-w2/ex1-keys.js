import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'academic_database',
});

// SQL queries
const createAuthorsTableQuery = `
  CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(1)
  );
`;

const addMentorColumnQuery = `
  ALTER TABLE authors
  ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
`;

// Connect to the database adn execute the queries
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Connection successful
  console.log('Connected to the database');

  // Execute the queries
  connection.query(createAuthorsTableQuery, (createErr) => {
    if (createErr) {
      console.error('Error creating authors table:', createErr);
    } else {
      console.log('Authors table created successfully');
    }

    // Add the mentor column and foreign key constraint
    connection.query(addMentorColumnQuery, (addMentorErr) => {
      if (addMentorErr) {
        console.error(
          'Error adding mentor column and foreign key:',
          addMentorErr,
        );
      } else {
        console.log('Mentor column and foreign key added successfully');
      }

      // Close the database connection
      connection.end(() => {
        console.log('Database connection closed');
      });
    });
  });
});
