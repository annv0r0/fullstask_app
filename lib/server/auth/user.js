import { getDB } from '@/lib/server/db/get_db.js';
import { verifyUserPswrd } from './hash.js';

export async function createUser(email, password) {
  const db = await getDB();

  if (!db) throw new Error('Database connection failed');
  const collection = await db.collection('Users');
  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = { email, password };
  const result = await collection.insertOne(newUser);

  if (!result.acknowledged) {
    return new Error('Failed to create user');
  }

  return result.insertedId;
}

export async function getUser(email, password) {
  const db = await getDB();

  if (!db) throw new Error('Database connection failed');
  const collection = await db.collection('Users');
  const user = await collection.findOne({ email });

  if (!user) {
    throw new Error('No such user');
  }

  const verify = verifyUserPswrd(user?.password, password);

  if (!verify) {
    return new Error('Failed to get user');
  }

  return user._id;
}
