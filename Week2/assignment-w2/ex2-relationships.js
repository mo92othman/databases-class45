import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'academic_database',
  multipleStatements: true,
});

const createResearchPapersTable = `
CREATE TABLE IF NOT EXISTS research_papers (
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE
);`;

const authorsPapersTable = `
CREATE TABLE IF NOT EXISTS authors_papers (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);`;

const insertAuthors = `INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
VALUES
(1, 'Author1', 'University1', '1990-01-01', 10, 'M', NULL),
(2, 'Author2', 'University2', '1992-03-15', 8, 'F', 1),
(3, 'Author3', 'University3', '1985-07-22', 12, 'M', 2),
(4, 'Author4', 'University4', '1995-05-30', 6, 'F', 1),
(5, 'Author5', 'University5', '1988-11-12', 15, 'M', 3),
(6, 'Author6', 'University6', '1993-09-05', 9, 'F', 2),
(7, 'Author7', 'University7', '1982-04-18', 11, 'M', 4),
(8, 'Author8', 'University8', '1997-12-03', 7, 'F', 3),
(9, 'Author9', 'University9', '1986-08-28', 13, 'M', 5),
(10, 'Author10', 'University10', '1994-06-10', 8, 'F', 2),
(11, 'Author11', 'University11', '1984-02-14', 14, 'M', 3),
(12, 'Author12', 'University12', '1996-10-25', 6, 'F', 6),
(13, 'Author13', 'University13', '1989-09-08', 12, 'M', 4),
(14, 'Author14', 'University14', '1991-07-01', 9, 'F', 7),
(15, 'Author15', 'University15', '1983-03-20', 11, 'M', 8);
`;
const insertPapers = `INSERT INTO research_papers (paper_title, conference, publish_date)
VALUES ('Paper1', 'ConferenceA', '2022-05-10'),
  ('Paper2', 'ConferenceB', '2022-06-20'),
  ('Paper3', 'ConferenceC', '2022-07-15'),
  ('Paper4', 'ConferenceD', '2022-08-05'),
  ('Paper5', 'ConferenceE', '2022-09-12'),
  ('Paper6', 'ConferenceF', '2022-10-30'),
  ('Paper7', 'ConferenceG', '2022-11-18'),
  ('Paper8', 'ConferenceH', '2022-12-25'),
  ('Paper9', 'ConferenceI', '2023-01-08'),
  ('Paper10', 'ConferenceJ', '2023-02-14'),
  ('Paper11', 'ConferenceK', '2023-03-22'),
  ('Paper12', 'ConferenceL', '2023-04-05'),
  ('Paper13', 'ConferenceM', '2023-05-16'),
  ('Paper14', 'ConferenceN', '2023-06-28'),
  ('Paper15', 'ConferenceO', '2023-07-10'),
  ('Paper16', 'ConferenceP', '2023-08-20'),
  ('Paper17', 'ConferenceQ', '2023-09-03'),
  ('Paper18', 'ConferenceR', '2023-10-15'),
  ('Paper19', 'ConferenceS', '2023-11-02'),
  ('Paper20', 'ConferenceT', '2023-12-12'),
  ('Paper21', 'ConferenceU', '2024-01-25'),
  ('Paper22', 'ConferenceV', '2024-02-08'),
  ('Paper23', 'ConferenceW', '2024-03-18'),
  ('Paper24', 'ConferenceX', '2024-04-30'),
  ('Paper25', 'ConferenceY', '2024-05-12'),
  ('Paper26', 'ConferenceZ', '2024-06-24'),
  ('Paper27', 'ConferenceAA', '2024-07-07'),
  ('Paper28', 'ConferenceBB', '2024-08-19'),
  ('Paper29', 'ConferenceCC', '2024-09-01'),
  ('Paper30', 'ConferenceDD', '2024-10-13');`;
const insertAuthorsPapers = `INSERT INTO authors_papers (author_id, paper_id)
VALUES (1, 1),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 8),
  (5, 9),
  (6, 10),
  (7, 11),
  (8, 12),
  (11, 27),
  (13, 28),
  (14, 29),
  (15, 20);`;

// Connect to the database and execute queries using forEach and async/await
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Connection successful
  console.log('Connected to the database');

  // Execute queries
  executeQuery(createResearchPapersTable)
    .then(() => executeQuery(authorsPapersTable))
    .then(() => executeQuery(insertAuthors))
    .then(() => executeQuery(insertPapers))
    .then(() => executeQuery(insertAuthorsPapers))
    .then(() => {
      console.log('All queries executed successfully');
      // Close the connection
      connection.end();
    })
    .catch((error) => {
      console.error('Error executing queries:', error);
      // Close the connection
      connection.end();
    });
});
