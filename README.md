# Full-stack Training App

> Version **v0.1.0** — October 15th 2025

A compact **training project** that exercises a real full-stack flow: auth, file uploads, background parsing, and dashboard UI. You can sign up, upload a **CSV** to **S3**, parse it on the server, and store normalized **Items** in **MongoDB**. Items render in a list and detail pages; simple cart actions are included.

## Features

- **Auth (stateful sessions)**

  - Email/password with secure hashing (`scrypt`) and **DB-backed sessions** (HMAC’d `session_id` cookie).
  - Server actions + API routes for `signin / signup / logout`.
  - Custom sessions
  - Session renewal + validation on protected pages.

- **CSV → S3 → MongoDB pipeline**

  - Client uploads file → presigned S3 POST.
  - Server fetches S3 object stream, **parses CSV**, normalizes rows, and inserts into Mongo (`Items`).
  - Generates stable string `article` IDs when missing.

- **UI (Next.js App Router)**

  - Pages: `/`, `/auth?mode=signin|signup`, `/dashboard`, `/upload`, `/items/[id]`.
  - Simple cart add/remove actions, responsive styling (SCSS modules).

- **Tech stack**

  - **Next.js 15** (App Router, Server Components, Server Actions)
  - **MongoDB** (Sessions, Items)
  - **AWS S3** (presigned upload, server-side parsing)
  - **Node crypto** (HMAC, IDs), **csv-parse**
  - CSS Modules / SCSS

## How it works (high level)

1. **Auth**

   - On signup/signin, create a random `session_id`, hash with HMAC, store in `Sessions` collection with expiry, and set an **httpOnly** cookie.
   - Protected routes call a server validator; expired/missing DB session → redirect to `/auth`.

2. **Upload**

   - `/upload` requests a presigned POST → browser uploads to S3.
   - Server action reads the S3 object stream, parses CSV, and writes normalized `Items` to Mongo.

3. **Browse**

   - `/dashboard` lists items; `/items/[id]` fetches by `article` (string) and renders details.

## Data model (simplified)

- **Users**: `{ _id, email, passwordHash }`
- **Sessions**: `{ hashedId, userId, expiresAt, createdAt, updatedAt }`
- **Items**:

  ```json
  {
    "article": "173956012345_1234",
    "title": "Bananas",
    "description": "Fresh",
    "weight": "1",
    "unit": "kg",
    "price": 2.99,
    "availible": "TRUE",
    "raiting": 4.5,
    "image": "https://…/banana.jpg",
    "date": "2025-10-12T00:00:00.000Z"
  }
  ```

## Quick start

```bash
npm i
npm run dev
```

### Required env vars

```bash
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SESSION_SECRET=super-long-random-string

# Mongo
DB_URI=mongodb+srv://...
DB_NAME=fullstack_app

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=your-bucket
```

## Routes

- **Pages:** `/`, `/auth?mode=signin|signup`, `/dashboard`, `/upload`, `/items/[id]`
- **API:**

  - `POST /api/auth/logout`
  - `GET  /api/s3/presign` (presigned upload)

## CSV expectations

Headers like: `title,description,weight,unit,price,availible,raiting,image,date,article?`
