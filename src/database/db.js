import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

try {
    await client.connect();
    console.log('MongoDB connected!');
  } catch (err) {
    console.log('err.message');
  }
  

  const db = client.db('drivencracy');
  export const polls = db.collection("polls")
  export const options = db.collection("options")
  export const votes = db.collection("votes")