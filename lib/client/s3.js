async function uploadToS3(file, url) {
  const put = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/csv' },
    body: file,
  });
  if (!put.ok) throw new Error('Failed S3 file upload');
}

async function getS3presignedURL(file) {
  const parameters = { filename: file.name, contentType: 'text/csv' };

  const res = await fetch('/api/s3/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parameters),
  });

  if (!res.ok) throw new Error('Failed to get S3 presigned URL');

  // returns file key (name)
  return res.json();
}

export async function uploadFileToS3(file) {
  const { url, key } = await getS3presignedURL(file);
  await uploadToS3(file, url);

  return { key };
}
