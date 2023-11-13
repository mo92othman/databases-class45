import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
});

const databaseName = 'meetup';

const meetupDatabaseQueries = [
  `DROP DATABASE IF EXISTS ${databaseName};`,
  `CREATE DATABASE ${databaseName};`,
  `USE ${databaseName} ;`,
  `
  CREATE TABLE Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255)
  );
  `,
  `
  CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    floor_number TINYINT
  );
  `,
  `
  CREATE TABLE Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );
  `,
  `
  INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Mohammed Ot', 'John Smith'),
    ('Bob Miller', 'Laura White'),
    ('Charlie Brown', 'Eva Davis'),
    ('Diana Johnson', 'Erik Adams'),
    ('Eva Martin', 'Chris Harris');
  `,
  `
  INSERT INTO Room (room_name, floor_number) VALUES
    ('Conference Room A', 6),
    ('Boardroom B', 7),
    ('Innovation Lab', 2),
    ('Training Room D', 3),
    ('Executive Suite', 9);
  `,
  `
  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Project Kickoff', '2023-09-10 09:30:00', '2023-09-10 11:00:00', 1),
    ('Team Building Workshop', '2023-09-11 14:00:00', '2023-09-11 16:30:00', 2),
    ('Product Demo', '2023-09-12 10:00:00', '2023-09-12 11:30:00', 3),
    ('Quarterly Review', '2023-09-13 15:00:00', '2023-09-13 17:00:00', 4),
    ('Strategic Planning Session', '2023-09-14 11:30:00', '2023-09-14 13:00:00', 5);
  `,
];

const executeQueries = () => {
  for (let i = 0; i < meetupDatabaseQueries.length; i++) {
    connection.query(meetupDatabaseQueries[i], (err) => {
      if (err) {
        console.error(`Error executing query ${i}:`, err);
      }

      console.log(`Query ${i} executed successfully.`);

      if (i === meetupDatabaseQueries.length - 1) {
        console.log('All queries executed successfully.');
        connection.end();
      }
    });
  }
};

// Call the function to execute the queries
executeQueries();
