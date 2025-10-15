// SERVER
import { getPresignedURL } from '@/lib/server/aws/s3';

export const runtime = 'nodejs';

export async function POST(req) {
  const res = await getPresignedURL(req);

  return res;
}
