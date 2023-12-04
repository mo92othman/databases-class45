const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'databaseWeek4';

async function transfer(fromAccount, toAccount, amount, remark) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Start a transaction
    const session = client.startSession();
    session.startTransaction();

    try {
      // Update balance and add changes for the "from" account
      const fromAccountResult = await db
        .collection('accounts')
        .findOneAndUpdate(
          { account_number: fromAccount },
          {
            $inc: { balance: -amount },
            $push: {
              account_changes: {
                change_number: { $inc: 1 },
                amount: -amount,
                changed_date: new Date(),
                remark,
              },
            },
          },
          { session, returnDocument: 'after' },
        );

      // Update balance and add changes for the "to" account
      const toAccountResult = await db.collection('accounts').findOneAndUpdate(
        { account_number: toAccount },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: { $inc: 1 },
              amount,
              changed_date: new Date(),
              remark,
            },
          },
        },
        { session, returnDocument: 'after' },
      );

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      console.log(
        `Transaction successful. From Account: ${fromAccount}, To Account: ${toAccount}`,
      );
    } catch (error) {
      // Abort the transaction if an error occurs
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    console.error('Error during transfer:', error);
  } finally {
    await client.close();
  }
}

// Example usage:
transfer(101, 102, 1000, 'Transfer from Account 101 to Account 102');
