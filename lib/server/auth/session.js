import 'server-only';

import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { addCookie, getCookie, deleteCookie, updateCookie } from '@/lib/server/db/session_cookies';

const COOKIE_NAME = 'session_id';
const SECRET = process.env.SESSION_SECRET;
const TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const RENEW_THRESHOLD = 24 * 60 * 60 * 1000; // 1 day

const hmac = (m) => crypto.createHmac('sha256', SECRET).update(m).digest('hex');

export async function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const hashedId = hmac(sessionId);
  const expiresAt = new Date(Date.now() + TTL);

  await addCookie(hashedId, userId, expiresAt);

  const jar = await cookies();
  jar.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });
}

export async function validateSession() {
  const jar = await cookies();

  // isExist in browser
  const sessionId = jar.get(COOKIE_NAME)?.value;

  if (!sessionId) return { authenticated: false };

  // isExist in DB
  const hashedId = hmac(sessionId);
  const result = await getCookie(hashedId);

  if (!result) return { authenticated: false };

  const now = Date.now();
  const expiresAt = new Date(result?.expiresAt);

  // isFresh in DB
  if (expiresAt <= now) {
    return { authenticated: false };
  }

  // update required
  if (expiresAt - now < RENEW_THRESHOLD) {
    const newExpires = new Date(now + TTL);
    const result = await updateCookie(hashedId, newExpires);
    jar.set(COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: newExpires,
    });
    return { authenticated: true };
    // return { authenticated: true, info: { status: 'refresh', sessionId, hashedId, newExpires } };
  }

  return { authenticated: true };
}

export async function deleteSession() {
  const jar = await cookies();
  const sessionId = jar.get(COOKIE_NAME)?.value;

  if (!sessionId) return;

  const hashedId = hmac(sessionId);
  await deleteCookie(hashedId);

  jar.delete(COOKIE_NAME);

  return { authenticated: false };
}
