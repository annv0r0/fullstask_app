import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/server/auth/session';
import { updateCookie } from '@/lib/server/db/session_cookies';

// check cookie
export async function GET() {
  const session = await validateSession();

  const response = NextResponse.json(session);

  return response;
}
