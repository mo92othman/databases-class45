const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'sql_transactions',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // Insert sample data into the account table
  const insertAccountData = `
    INSERT INTO account (account_number, balance)
    VALUES
      (101, 8000.00),
      (102, 4000.00)
  `;

  connection.query(insertAccountData, (err) => {
    if (err) {
      console.error('Error inserting data into account table:', err.message);
      connection.end();
      return;
    }
    console.log('Inserted data into account table');

    // Insert sample data into the account_changes table
    const insertAccountChangesData = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES
        (101, 8000.00, 'Initial deposit'),
        (102, 4000.00, 'Initial deposit')
    `;

    connection.query(insertAccountChangesData, (err) => {
      if (err) {
        console.error(
          'Error inserting data into account_changes table:',
          err.message,
        );
      } else {
        console.log('Inserted data into account_changes table');
      }

      // Close the connection
      connection.end();
    });
  });
});
