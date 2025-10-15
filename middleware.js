import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

const COOKIE_NAME = process.env.COOKIE_NAME;
const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const protectedRoutes = ['/dashboard', '/upload'];

export default async function authMiddleware(req) {
  // jose authentication check
  /*
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    if (isProtectedRoute && !payload?.userId) {
      return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }
  } catch {
    console.log('JWT verification failed');
  }
 
  return NextResponse.next();
  */
}
