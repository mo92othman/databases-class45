import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = 'databaseWeek4';

let client;

export const connectToDatabase = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
    }
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB');
    throw error;
  }
};

export const closeConnection = () => {
  if (client) {
    client.close();
    console.log('MongoDB connection closed.');
  }
};
