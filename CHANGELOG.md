# 🧾 Changelog — TOR (Full-stack Training App)

All notable changes to this project will be documented here.  
This project follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).

---

## [v0.1.0] — 2025-10-15

### Initial MVP

- Implemented custom **auth system** with email/password, secure hashing, and session cookies.
- Added **server-only session validation** (HMAC-based `session_id` + DB check).
- Built **file upload pipeline**:
  - CSV upload → AWS S3 → server parsing → MongoDB insert.
- Created dashboard and item list/detail views.
- Environment configuration and working Next.js 15 setup.

---

## [v0.2.0] — planned

### Auth Revamp (Cognito / Federated)

- Replace custom auth with **Amazon Cognito**.
- Add federated logins (Google, Facebook, Yandex).
- Keep session validation and cookies consistent with new provider.

---

## [v0.3.0] — planned

### NextAuth / Auth.js migration

- Replace Cognito with NextAuth.js for local + OAuth.
- Simplify session handling with NextAuth adapter for MongoDB.

---

## [v0.4.0] — planned

### JWT-based custom auth

- Stateless auth with JWT access & refresh tokens.
- Secure cookie rotation and revocation logic.

---

## [v0.5.0] — planned

### Database Migration

- Move from MongoDB to PostgreSQL (via Prisma ORM).
- Normalize tables (Users, Items, Sessions, Uploads).
- Data migration script.

---

## [v0.6.0] — planned

### GraphQL Layer

- Add Apollo Server + GraphQL API for Items.
- Replace REST endpoints with typed schema.

---

## [v0.7.0] — planned

### Caching & Scaling

- Integrate Redis for session cache and query speed.
- Add Docker-based local dev environment.

---

## [v0.8.0] — planned

### S3 Optimization

- Stream large CSVs directly to parser.
- Add presigned PUT URLs.
- Improve upload status tracking.

---

## [v0.9.0] — planned

### Background Jobs

- Add SQS / BullMQ worker for async parsing.
- Retry and error handling system.

---

## [v1.0.0] — planned

### Stable Release

- Feature complete: Auth + DB + Storage.
- CI/CD ready (GitHub Actions / Vercel).
- Tagged as **v1.0.0**.

---
