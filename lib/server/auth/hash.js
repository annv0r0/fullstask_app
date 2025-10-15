import crypto from 'node:crypto';

export function hashUserPswrd(s) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(s, salt, 64).toString('hex');

  return hashedPassword + ':' + salt;
}

export function verifyUserPswrd(storedPassword, suppliedPassword) {
  const [hashedPassword, salt] = storedPassword.split(':');
  const hashedPasswordBuff = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuff = crypto.scryptSync(suppliedPassword, salt, 64);

  return crypto.timingSafeEqual(hashedPasswordBuff, suppliedPasswordBuff);
}
