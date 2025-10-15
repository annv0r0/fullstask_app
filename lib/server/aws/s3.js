// import 'server-only';

import { NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const config = { region: process.env.AWS_REGION };
// create S3 client
const s3 = new S3Client(config);

export async function getPresignedURL(req) {
  try {
    const { filename, contentType } = await req.json();
    if (!filename) return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });

    const key = `${Date.now()}-${filename}`;
    const input = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType,
    };
    // request: PUT
    const command = new PutObjectCommand(input);
    // response: presigned URL
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({ url, key });
  } catch (err) {
    console.error('\nS3 Presign error:', err);
    return NextResponse.json({ error: '\nS3 Presign failed\n' }, { status: 500 });
  }
}

export async function getObjectStream(key) {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    })
  );
  // stream
  return response.Body;
}

// upload CSV without presigned URL

/* export async function addCsvToS3(file) {
  const bufferedCSV = await file.arrayBuffer();
  const body = Buffer.from(bufferedCSV);

  const name = file.name || 'upload.csv';
  const key = `${Date.now()}-${name}`;

  const config = { region: process.env.AWS_REGION };
  const s3 = new S3Client(config);
  const input = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: 'text/csv',
  };

  if (!file || !(file instanceof File)) {
    throw new Error('\nCSV file is missing\n');
  }
  const command = new PutObjectCommand(input);
  const response = await s3.send(command);
}

export async function parseCsvFromS3(file) {
  const bufferedCSV = await file.arrayBuffer();
  const body = Buffer.from(bufferedCSV);

  const name = file.name || 'upload.csv';
  const key = `${Date.now()}-${name}`;

  const config = { region: 'ap-south-1' };
  const s3 = new S3Client(config);
  const input = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: 'text/csv',
  };

  if (!file || !(file instanceof File)) {
    throw new Error('\nCSV file is missing\n');
  }
  const command = new PutObjectCommand(input);
  const response = await s3.send(command);
}
 */
