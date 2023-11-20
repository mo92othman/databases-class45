import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
});

// Database name
const databaseName = 'academic_database';

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Connection successful
  console.log('Connected to the database');

  // Drop the database if it exists
  connection.query(`DROP DATABASE IF EXISTS ${databaseName}`, (error) => {
    if (error) {
      console.error('Error dropping database:', error);
      connection.end();
      return;
    }

    // Create the database
    connection.query(`CREATE DATABASE ${databaseName}`, (error) => {
      if (error) {
        console.error('Error creating database:', error);
        connection.end();
        return;
      }

      console.log('Database dropped and created successfully');
      connection.end();
    });
  });
});
