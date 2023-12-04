const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'databaseWeek4';

async function setup() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Clean up the accounts collection
    await db.collection('accounts').deleteMany({});

    // Fill the accounts collection with sample data
    const sampleData = [
      { account_number: 101, balance: 1000, account_changes: [] },
      { account_number: 102, balance: 2000, account_changes: [] },
    ];

    await db.collection('accounts').insertMany(sampleData);

    console.log('Setup completed successfully.');
  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    await client.close();
  }
}

setup();
