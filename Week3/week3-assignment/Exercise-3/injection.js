// In the original function: a value that can be passed as name and code that would take advantage of SQL-injection and ( fetch all the records in the database):

getPopulation('Country', "' OR '1'='1' --", "' OR '1'='1' --", callback);
// This would modify the SQL query to : SELECT Population FROM Country WHERE Name = '' OR '1'='1' --' and code = '' OR '1'='1' --'

// The improved function that is no longer vulnerable to SQL injection:
function getPopulation(Country, name, code, cb) {
  const query = 'SELECT Population FROM ?? WHERE Name = ? and code = ?';
  const values = [Country, name, code];

  conn.query(query, values, function (err, result) {
    if (err) {
      cb(err);
    } else {
      if (result.length === 0) {
        cb(new Error('Not found'));
      } else {
        cb(null, result[0].Population);
      }
    }
  });
}
