'use server';
import { hashUserPswrd, verifyUserPswrd } from '@/lib/server/auth/hash';
import { createUser } from '@/lib/server/auth/user.js';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/server/auth/session.js';
import { getUser } from '@/lib/server/auth/user.js';

export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirm = formData.get('confirm');

  let errors = {};
  if (password === '') {
    errors.password_empty = 'Password is missing';
  }
  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }
  if (password.trim().length < 8) {
    errors.password_length = 'Password must be at least 8 characters long';
  }
  if (password !== confirm) {
    errors.password_match = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) return { errors };

  const hashedPassword = hashUserPswrd(password);

  try {
    const id = await createUser(email, hashedPassword);
    await createSession(id);
  } catch (e) {
    errors.email_exists = 'User with this email already exists';
    return { errors };
  }
  redirect('/dashboard');
}

export async function signin(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // input validation
  let errors = {};
  if (password === '') {
    errors.password_empty = 'Password is missing';
  }
  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }
  if (password.trim().length < 8) {
    errors.password_length = 'Password must be at least 8 characters long';
  }

  if (Object.keys(errors).length > 0) return { errors };

  // auth
  try {
    const id = await getUser(email, password);
    await deleteSession();
    await createSession(id);
  } catch (e) {
    errors.incorrect = 'Login or password is incorrect';
    return { errors };
  }
  // implement: redirect to desired page
  redirect('/dashboard');
}

export async function logout(prevState, formData) {
  await deleteSession();
  redirect('/auth');
}
