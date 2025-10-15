import { logout } from '@/actions/auth';
import { NextResponse } from 'next/server';

// logout
export async function GET(req) {
  const data = await logout();
  return NextResponse.json({ ok: true, info: 'User is logged out' });
}
