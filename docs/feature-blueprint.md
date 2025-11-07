# Feature Blueprint — Aplikasi Microblogging (seperti X / Twitter)

Dokumen ini menjabarkan secara rinci fitur-fitur aplikasi microblogging (MVP hingga fitur lanjutan), struktur folder dan file yang disarankan, integrasi backend, kontrak input/output, serta edge-cases penting. Semua ditulis dalam Bahasa Indonesia dan ditujukan sebagai blueprint pengembangan untuk tim atau pengembang tunggal.

---

## Ringkasan Tujuan

Tujuan: membangun blueprint untuk aplikasi microblogging publik.
Prioritas awal: fokus pada fitur utama (core) supaya dapat cepat memiliki MVP yang bisa dipakai dan diuji.

Konvensi struktur repository yang digunakan dalam blueprint ini:

- `src/<domain>/` — setiap domain (auth, users, posts, media, feeds, dm, notifications, search, analytics) memiliki module sendiri.
- Di dalam tiap `src/<domain>/` minimal ada:
  - `<domain>.module.ts`
  - `<domain>.controller.ts`
  - `<domain>.service.ts`
  - `dto/` (request/response shapes)
  - `entities/` atau `schemas/` (depend on ORM: TypeORM / Mongoose)
- Cross-cutting: `src/common/` untuk guards, pipes, interceptors, helpers.
- Config: `src/config/` (env reading, feature flags).

Catatan: contoh endpoint ditulis singkat untuk memberi gambaran kontrak API.

---

## Daftar Isi

1. Fitur Utama (Core)
   - Autentikasi & Profil
   - Posting & Interaksi
   - Timeline & Feed
   - Notifikasi
   - Pesan Langsung (DM)
   - Keamanan & Privasi
2. Fitur Pendukung (Supporting)
3. Fitur Premium / Monetisasi
4. Fitur Eksperimen / Pengembangan Lanjutan
5. Cross-cutting / Infrastruktur
6. Prioritas Implementasi (Roadmap MVP)
7. Next Steps & Checklist

---

## 1. FITUR UTAMA (CORE)

Bagian ini menjabarkan setiap sub-fitur utama: deskripsi, entitas DB, file/folder yang disarankan, integrasi eksternal, kontrak API singkat, dan edge-cases.

### 1.1 Autentikasi & Profil

- Deskripsi singkat:
  - Menangani registrasi/login (email/username/password), autentikasi OAuth (Google, Apple, dsb.), manajemen profil pengguna (avatar, header, bio), edit profil, dan proses verifikasi (email).

- Entitas DB (contoh tabel untuk RDBMS):
  - `users` (id, email, username, password_hash, created_at, is_active, is_verified, last_login)
  - `profiles` (id, user_id FK, display_name, bio, avatar_url, header_url, website, location, settings JSON)
  - `oauth_accounts` (id, provider, provider_user_id, user_id, created_at)
  - `auth_refresh_tokens` (id, user_id, token_hash, expires_at)

- Folder/File (rekomendasi):
  - `src/auth/`
    - `auth.module.ts`
    - `auth.controller.ts` — endpoints: `POST /auth/signup`, `POST /auth/login`, `POST /auth/oauth/:provider`, `POST /auth/refresh`, `POST /auth/logout`, `POST /auth/password-reset` (opsional)
    - `auth.service.ts` — logika register, login, token issuance
    - `strategies/` — `jwt.strategy.ts`, `local.strategy.ts`, `oauth-google.strategy.ts`
    - `dto/` — `signup.dto.ts`, `login.dto.ts`, `oauth.dto.ts`
  - `src/users/`
    - `users.module.ts`, `users.service.ts`, `users.controller.ts` — endpoints publik `GET /users/:username`, `PUT /users/me` (edit) dll.
    - `dto/update-profile.dto.ts`
    - `entities/user.entity.ts`, `entities/profile.entity.ts`
  - `src/email/` — service untuk verifikasi email dan template
  - `src/common/guards/jwt-auth.guard.ts`

- Integrasi eksternal:
  - Email provider (SendGrid, Mailgun, SMTP)
  - OAuth providers (Google, Apple, Facebook) — client id/secret
  - Hashing password: bcrypt / argon2
  - Token storage: JWT (access + refresh) atau session store (Redis)

- Kontrak singkat:
  - `POST /auth/signup` input: `{email, username, password}`; output: `201 { user, accessToken, refreshToken }` atau `202` if need email verification.
  - `POST /auth/login` input: `{emailOrUsername, password}`; output: `{ user, accessToken, refreshToken }`.

- Edge cases / catatan implementasi:
  - Duplikasi email/username: return `409 Conflict`.
  - OAuth user with email that already exists: link accounts flow.
  - Rate limit pada endpoint auth (throttling).
  - Email verification flow (token expiry, resend).
  - Password reset (token-based, expire, audit).
  - MFA (opsional) di masa lanjut.

- Tests minimal:
  - Unit tests untuk `auth.service` (hashing dan verifikasi), `users.service` (create/get/update).
  - E2E: happy path signup->verify->login.

### 1.2 Posting & Interaksi

- Deskripsi singkat:
  - Pengguna dapat membuat posting (teks, gambar, video, link), mengedit/hapus posting, reply (komentar), membuat thread, melakukan repost (retweet) / quote, like, mention, hashtag, dan melihat posting penuh beserta komentar.

- Entitas DB utama:
  - `posts` (id, author_id, content, created_at, updated_at, reply_to_id NULLABLE, thread_root_id NULLABLE, visibility ENUM(public/followers/private/mentioned), is_pinned Boolean, metadata JSON)
  - `media` (id, post_id, url, type, width, height, size, uploaded_by)
  - `likes` (id, user_id, post_id, created_at)
  - `reposts` (id, user_id, post_id, type(enum: repost/quote), text)
  - `mentions` (id, post_id, mentioned_user_id)
  - `hashtags` (id, tag), `post_hashtags` (post_id, hashtag_id)

- Folder/File:
  - `src/posts/`
    - `posts.module.ts`
    - `posts.controller.ts` — endpoints: `POST /posts`, `GET /posts/:id`, `PUT /posts/:id`, `DELETE /posts/:id`, `GET /posts/:id/replies`
    - `posts.service.ts` — create, edit, delete, get thread
    - `dto/create-post.dto.ts`, `dto/edit-post.dto.ts`
    - `entities/post.entity.ts`, `entities/media.entity.ts`, `entities/like.entity.ts`
  - `src/media/`
    - `media.controller.ts` — endpoints untuk signed upload URL atau upload proxy
    - `media.service.ts` — adapter ke S3/MinIO/local
    - `src/media/storage/` — `s3.adapter.ts`, `local.adapter.ts`
  - `src/search/` — indexing posts for search/trending (Meili/Elastic)

- Integrasi eksternal:
  - Object Storage (S3, MinIO) untuk file media
  - CDN fronting storage
  - Background workers (FFmpeg) untuk video processing
  - Virus/malware scanning (opsional)

- Kontrak singkat:
  - `POST /posts` body `{content, mediaIds[], replyTo?, visibility}` -> response created post or queued if moderation required.
  - `GET /posts/:id` -> full post with author, media, replies count, liked boolean (for caller), reposted boolean.

- Edge cases:
  - Media orphaned jika upload gagal setelah post dibuat -> worker untuk garbage collect.
  - Rate limit posting (anti-spam).
  - Mentions to nonexistent users -> validation / silent ignore.
  - Post edits: audit trail (optional) or store previous versions.

### 1.3 Timeline & Feed

- Deskripsi singkat:
  - Dua feed utama: "Following" (post dari akun yang diikuti) dan "For You" (rekomendasi). Trending topics dan pencarian juga termasuk di sini.

- Data/Arsitektur:
  - Relationship `follows` (follower_id, followee_id)
  - Feed storage: bisa dibangun dua pendekatan:
    - Fan-out-on-write: push post ke feed cache followers (Redis lists / per-user feed table)
    - Pull-on-request: query posts by followees ordered by time (simpler, skalabilitas menurun saat banyak followees)
  - Index untuk search/trending: Meili/Elastic

- Folder/File:
  - `src/feeds/`
    - `feeds.service.ts` — build feed, cache layer
    - `feeds.controller.ts` — `GET /feeds/following`, `GET /feeds/for-you`
    - `jobs/` — feed generation jobs
  - `src/follows/`
    - `follows.service.ts`, `follows.controller.ts`

- Integrasi eksternal:
  - Redis + BullMQ untuk queue
  - Meilisearch/Elastic untuk trending/search
  - recommendation engine (simple heuristics first; ML later)

- Kontrak API:
  - Cursor-based pagination: `GET /feeds/following?cursor=<cursor>&limit=20`
  - Response includes per-item `post`, `author`, `cursor`, and `meta` (liked boolean, reposted boolean)

- Edge cases:
  - Cold-start (user baru) => fallback to trending topics / recommended accounts
  - Stale cache when post edited/deleted
  - Feed consistency when user unfollows or post removed

### 1.4 Notifikasi

- Deskripsi:
  - Notifikasi untuk like, reply, repost, follow, mention. Push notifications via FCM/OneSignal.

- Entitas:
  - `notifications` (id, user_id(recipient), actor_id, type, subject_id, metadata JSON, read boolean, created_at)

- Folder/File:
  - `src/notifications/` — `notifications.service.ts`, `notifications.controller.ts`, `gateways/notifications.gateway.ts` (WebSocket)
  - `src/push/` — `fcm.service.ts` or `onesignal.service.ts`

- Integrasi:
  - Socket.IO / WebSocket (in-app real-time)
  - Push provider for device push (FCM/OneSignal)
  - Queue system for sending pushes (BullMQ)

- Kontrak:
  - Create notification on event (synchronous DB create + async push)
  - `GET /notifications?limit=20&cursor=` -> list notifikasi

- Edge cases:
  - Deduplication (e.g., banyak likes in short period)
  - User opt-out/push preferences
  - Respecting Do Not Disturb windows

### 1.5 Pesan Langsung (DM)

- Deskripsi:
  - Chat 1-on-1 realtime, kirim teks dan media.

- Entitas:
  - `conversations` (id, participant_ids[])
  - `messages` (id, conversation_id, sender_id, content, media_id, created_at, read_at)

- Folder/File:
  - `src/dm/` — `dm.gateway.ts` (WebSocket gateway), `dm.service.ts`, `dm.controller.ts`, `dto/send-message.dto.ts`

- Integrasi:
  - Socket.IO (rooms per conversation)
  - Push for offline notifications

- Kontrak:
  - WebSocket event `message:send` payload `{conversationId, content, mediaIds[]}` -> server persist then broadcast to room

- Edge cases:
  - Ordering & duplicate messages (idempotency keys)
  - Media handling (same as post media)
  - Encryption (E2EE) jika perlu (kompleksitas tinggi)

### 1.6 Keamanan & Privasi

- Deskripsi:
  - Fitur block/mute, report (laporan), pengaturan privasi (akun private), aturan visibilitas posting.

- Entitas:
  - `blocks` (blocker_id, blocked_id)
  - `reports` (reporter_id, subject_type, subject_id, reason, status)
  - `user_settings` (privacy flags)

- Folder/File:
  - `src/moderation/`, `src/blocks/`, `src/common/guards/privacy.guard.ts`

- Integrasi:
  - Admin dashboard untuk review content
  - Optional automated moderation API (OpenAI moderation, Google Perspective)

- Kontrak:
  - Visibility middleware: when fetching a post, check author and current user's relationship + visibility rules

- Edge cases:
  - Replying to private accounts, retweeting content of private accounts, reporting false positives

---

## 2. FITUR PENDUKUNG (SUPPORTING FEATURES)

Fitur-fitur di bawah ini meningkatkan keterlibatan pengguna dan kenyamanan penggunaan. Bisa diimplementasikan setelah MVP core stabil.

### 2.1 Polling, Lokasi, GIF, Penjadwalan Posting

- Folder: `src/polls/`, `src/scheduler/`, `src/media/gif.service.ts`
- Polls: `polls.controller.ts`, `polls.service.ts`, `poll.entity.ts` -> opsi voting, expiry, hasil.
- Scheduler: gunakan Bull/BullMQ untuk scheduled posts. `scheduler.service.ts` enqueue job at desired time.
- GIF: integrasi Giphy/Tenor via `gif.service.ts` untuk embed.

### 2.2 Verifikasi Email / Nomor HP

- Folder: `src/verification/` atau extend `src/auth/`
- Workflow: issue token (short-lived), send via email or SMS (Twilio), verify endpoint.

### 2.3 Bookmark & Share

- Entities: `bookmarks(user_id, post_id)`
- Folder: `src/bookmarks/`.
- Share: public permalink for posts, OpenGraph/oEmbed metadata embedded in server-side rendered pages.

### 2.4 Kontrol Visibilitas & Pengaturan Balasan

- Implementasi: `visibility` on posts and `reply_policy` attributes. Enforce in `privacy.guard.ts`.

### 2.5 Komunitas / Group / Spaces

- Folder: `src/communities/`.
- Entities: `communities`, `community_members`, `community_posts`.
- Features: join requests, admin/moderator roles, community rules.

### 2.6 Statistik & Analytics (untuk kreator)

- Folder: `src/analytics/`.
- Implementasi: event ingest (Kafka / queue) -> batch aggregation -> store aggregates in `post_stats`.

### 2.7 Koleksi & Bookmarking Lanjutan

- `src/collections/` untuk saved collections by user.

---

## 3. FITUR PREMIUM / MONETISASI

### 3.1 Paket Langganan (Subscription)

- Folder: `src/payments/`, `src/subscriptions/`.
- Integrasi: Stripe (subscriptions), webhooks handler (`/payments/webhook`).
- Entitas: `subscriptions`, `invoices`, `payment_methods`.
- Fitur: tanpa iklan, upload video lebih panjang, posting expansion.

### 3.2 Monetisasi Kreator

- Folder: `src/creator/`.
- Fitur: subscription to creator, tipping (payments), creator dashboard with analytics.

### 3.3 Iklan (Ads)

- Folder: `src/ads/`.
- Track impressions, clicks; expose placements in feed via ad-serving logic.

---

## 4. FITUR EKSPERIMEN / PENGEMBANGAN LANJUTAN

Beberapa ide lanjutan:

- Reactions (beyond like), read mode, moderator tools, auto-moderation via ML, search cerdas autocomplete, tab video pendek, live audio (spaces), audio/video call di DM, API publik.
- Folder: `src/ai/`, `src/live/`, `src/reactions/`.

---

## 5. CROSS-CUTTING & INFRASTRUKTUR

Catatan arsitektur yang penting untuk mendukung performa, skalabilitas, dan keamanan.

### 5.1 Database

- RDBMS (Postgres) recommended untuk relasi kuat (follows, likes). Use TypeORM or Prisma.
- Alternatif: MongoDB untuk fleksibilitas, tapi joins lebih sulit.
- Migrations directory: `src/database/migrations/`.

### 5.2 Cache & Queue

- Redis untuk cache, rate-limiting, session store.
- BullMQ untuk job queue (background tasks: media processing, push notifications, feed fan-out).

### 5.3 Object Storage & CDN

- S3 / MinIO for media; signed URL upload to avoid proxying large files.
- CDN front for public assets.

### 5.4 Realtime

- WebSocket (Socket.IO) for in-app notifications and DM.
- Gateways under `src/gateways/` with JWT auth.

### 5.5 Search & Trending

- Meilisearch (simple, fast) or Elasticsearch for advanced search and trending calculations.

### 5.6 Monitoring, Logging, Error Tracking

- Sentry for errors, Prometheus + Grafana for metrics, structured logs (Winston).

### 5.7 Security

- Rate limiting, input validation (`class-validator`), Helmet, CSP, CORS configuration, sanitization.

### 5.8 DevOps

- Docker compose for local dev: Postgres, Redis, MinIO, Meili
- CI pipeline: lint, test, build, docker image push

---

## 6. PRIORITAS IMPLEMENTASI (ROADMAP MVP)

Rekomendasi prioritas agar cepat mendapatkan MVP yang layak:

1. Autentikasi & Profil (user account, login/signup, JWT, edit profile)
2. Posting dasar (create text posts, read post, reply) dan media minimal (gambar) via S3 signed URLs
3. Follow & simple feed (pull by followees sorted by time)
4. Like & Repost (basic engagement)
5. In-app notifications (WebSocket) for likes/replies
6. Moderation basic (reporting) and privacy (public/private accounts)

Setelah MVP:

- Improve feeds: fan-out or recommendation ML, implement trending, search indexing
- DM (realtime), scheduled posts, polls, bookmarks
- Monetization and analytics

---

## 7. NEXT STEPS & CHECKLIST

Jika Anda ingin saya scaffold kode dasar untuk memulai, rekomendasi awal:

- Scaffold `src/auth/` + `src/users/` + `src/posts/` modules (controllers, services, dtos, entities)
- Tambah docker-compose minimal (Postgres + Redis + MinIO)
- Setup `src/config/` env
- Add basic tests and CI job

Checklist teknis sebelum pengembangan:

- Tentukan DB: Postgres vs Mongo
- Pilih ORM (TypeORM/Prisma/Mongoose)
- Tentukan strategi media upload (signed URL vs proxy)
- Putuskan model feed (pull vs fan-out)

---

## Lampiran: Contoh struktur folder minimal untuk MVP

```text
src/
  auth/
    auth.module.ts
    auth.controller.ts
    auth.service.ts
    strategies/
    dto/
  users/
    users.module.ts
    users.service.ts
    users.controller.ts
    dto/
    entities/
  posts/
    posts.module.ts
    posts.controller.ts
    posts.service.ts
    dto/
    entities/
  media/
    media.module.ts
    media.service.ts
    storage/
  feeds/
    feeds.service.ts
    feeds.controller.ts
  notifications/
    notifications.service.ts
    gateways/
  dm/
    dm.gateway.ts
    dm.service.ts
  common/
    guards/
    interceptors/
  config/
  database/

Docker-Compose (dev): postgres, redis, minio, meilisearch (optional)
```

---

Jika Anda ingin saya lanjutkan dengan: scaffolding modul (`src/auth`, `src/users`, `src/posts`) atau membuat `docker-compose` minimal untuk development, pilih salah satu dan saya akan langsung buatkan file yang diperlukan serta menjalankan tipe-check singkat.

Dokumen ini lengkap untuk blueprint; bila mau, saya bisa perinci tiap endpoint secara OpenAPI/Swagger.

---

File dibuat oleh agen untuk keperluan dokumentasi pengembangan.

---

## Addendum: Saran Pengembangan (rangkuman dari masukan)

Berikut adalah rangkuman terstruktur dari saran pengembangan yang Anda kirim—disesuaikan agar mudah diimplementasikan di atas `src/modules/` pada boilerplate.

### 🧱 1. Tambahan Dasar (Core Expansion)

Modul yang disarankan untuk ditambahkan segera (fungsi inti microblog):

- `users`: perpanjang entitas `UserEntity` untuk menambah `bio`, `avatar`, `banner`, `location`, dan relasi ke post/follow.
- `posts`: inti microblog (teks + media). Tambahkan `PostEntity`, `PostController`, `PostService`, `CreatePostDto`. Gunakan adapter untuk Cloudinary/S3.
- `follows`: follow/unfollow antar user. `FollowEntity`, `FollowService` (many-to-many User↔User).
- `feed`: menampilkan post dari akun yang diikuti (`FeedService` yang query join posts + follows, cursor pagination).
- `likes`: like/unlike posting (`LikeEntity`, `LikeService`).
- `comments`/`replies`: balasan ke posting (`CommentEntity`, `CommentService`).
- `bookmarks`: simpan posting untuk nanti (`BookmarkEntity`, `BookmarkService`).

Catatan: modul-modul ini bisa cepat dibuat dengan `nest g resource <module> --no-spec` lalu kustomisasi DTO dan entitas.

### 💬 2. Tambahan Interaksi & Engagement (Social Layer)

Untuk meningkatkan engagement dan monitoring platform:

- `notifications`: buat notifikasi untuk like/reply/follow/mention. Implementasi: emit event dari `posts`/`follows` service dan proses via queue (BullMQ).
- `mentions`: parser @username pada `PostService` yang membuat entri mention.
- `hashtags`: parser # untuk menyusun topik; `HashtagEntity` dan indexing di `search` service.
- `search`: endpoint untuk user/post/hashtag; bisa pakai Elastic/Meili atau query DB awalnya.
- `analytics`: hitung view/like/repost melalui event ingestion atau middleware.
- `reports` + `moderation`: report content & moderation workflow (admin UI + queue review).

### 💎 3. Fitur Lanjutan & Monetisasi

- `media`: upload video/gambar besar (Cloudinary atau S3, signed URL).
- `subscription`: langganan kreator (Stripe integration, webhook).
- `verification`: centang biru / verifikasi user (flag di `User` dan flow approval).
- `ads`: AdEntity + ad-serving di feed.
- `chat` (DM): realtime via WebSocket + Redis pub/sub.
- `spaces`: audio/video live room (WebRTC / media server jika advanced).
- `ai-assistant`: integrasi OpenAI/HuggingFace untuk summarizer/chatbot.
- `wallet/payment`: tip antar user atau virtual balance.

### ⚙️ 4. Tambahan Teknis (Infrastructure Upgrade)

- File storage: AWS S3, Cloudinary, atau Supabase Storage.
- Realtime feed: Redis + WebSocket (socket.io gateway), multi-instance via Redis pub/sub.
- Queue/job: BullMQ (Redis) untuk notif, media processing, feed fan-out.
- Search engine: Elasticsearch atau MeiliSearch untuk search & trending.
- Analytics: ClickHouse atau table khusus untuk event aggregation.
- Caching: Redis untuk feed caching & trending.
- Rate limiting: NestJS ThrottlerGuard.
- CI/CD: GitHub Actions + Docker + host (Railway/Render/Vercel).
- Monitoring: Sentry + Prometheus/Grafana.

### 🧠 5. Struktur Folder Rekomendasi (penyempurnaan)

Gunakan `src/modules/` untuk memisahkan domain:

```text
src/
 ├── common/
 │   ├── decorators/
 │   ├── exceptions/
 │   ├── interceptors/
 │   ├── guards/
 │   └── utils/
 ├── config/
 ├── modules/
 │   ├── auth/
 │   ├── users/
 │   ├── posts/
 │   ├── follows/
 │   ├── comments/
 │   ├── notifications/
 │   ├── chat/
 │   ├── analytics/
 │   ├── media/
 │   └── admin/
 ├── database/
 ├── main.ts
 └── app.module.ts
```

### 🪄 6. Langkah Aman Mulainya (urutan implementasi rekomendasi)

1. Pastikan boilerplate berjalan normal (auth + users core working).
2. Tambah modul `posts` dulu (inti microblog). Implementasi minimal: create/read posts, reply.
3. Tambah `follows` lalu `feed` (implementasi awal: pull-based feed).
4. Tambah `notifications`, `likes`, `comments` untuk engagement.
5. Setelah stabil, tambahkan `media` upload (signed URL), background jobs, dan monitoring.
6. Lanjut ke monetisasi/ads/chat setelah kestabilan dan testing.

Tips: buat migration dan unit tests untuk tiap modul; gunakan feature flags untuk rollout bertahap.

---

Saya sudah menambahkan saran ini ke dokumen; jika Anda mau, saya bisa langsung scaffold modul prioritas (mis. `posts`, `follows`, `feed`) atau membuat `docker-compose` dev (Postgres + Redis + MinIO) untuk pengembangan lokal.
