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

  connection.beginTransaction((err) => {
    if (err) throw err;

    const transferAmount = 1000.0;

    const deductQuery = `
      UPDATE account
      SET balance = balance - ${transferAmount}
      WHERE account_number = 101
    `;

    const addQuery = `
      UPDATE account
      SET balance = balance + ${transferAmount}
      WHERE account_number = 102
    `;

    const logQuery = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES
        (101, -${transferAmount}, 'Transfer to account 102'),
        (102, ${transferAmount}, 'Transfer from account 101')
    `;

    connection.query(deductQuery, (err) => {
      if (err) {
        handleRollbackAndThrow(err);
      }

      connection.query(addQuery, (err) => {
        if (err) {
          handleRollbackAndThrow(err);
        }

        connection.query(logQuery, (err) => {
          if (err) {
            handleRollbackAndThrow(err);
          }

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              handleRollbackAndThrow(err);
            }
            console.log('Transaction completed successfully!');
            connection.end();
          });
        });
      });
    });
  });
});

function handleRollbackAndThrow(err) {
  connection.rollback(() => {
    console.error('Error performing transaction:', err.message);
    throw err;
  });
}
