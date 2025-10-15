import { cookies } from 'next/headers';

export async function verifySessionCookie() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
    cache: 'no-store',
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  const data = res.json();
  return data;
}
