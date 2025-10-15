import { getDB } from './get_db';

export async function addCookie(hashedId, userId, expiresAt) {
  const db = await getDB();
  const sessions = db.collection('Sessions');

  // replaces cookie if exists
  const record = await sessions.replaceOne(
    { userId },
    {
      hashedId,
      userId,
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { upsert: true }
  );

  return record;
}

export async function getCookie(hashedId) {
  const db = await getDB();
  const sessions = db.collection('Sessions');
  const record = await sessions.findOne({ hashedId });

  return record;
}

export async function updateCookie(hashedId, newExpires) {
  const db = await getDB();
  const sessions = db.collection('Sessions');

  const record = sessions.updateOne({ hashedId }, { $set: { expiresAt: newExpires, updatedAt: new Date() } });

  return record;
}

export async function deleteCookie(hashedId) {
  const db = await getDB();
  const sessions = db.collection('Sessions');
  const record = await sessions.deleteOne({ hashedId });

  return record;
}
