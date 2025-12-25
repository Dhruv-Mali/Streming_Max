# Stremify Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (Next.js)                            │
│                      Port: 3000                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Pages:                                                   │  │
│  │  - Home (/)                                               │  │
│  │  - Movies (/movies)                                       │  │
│  │  - Movie Detail (/movies/[id])                           │  │
│  │  - Sign In/Up (/signin, /signup)                         │  │
│  │  - Profile (/profile)                                     │  │
│  │  - Admin (/admin)                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  State Management (Zustand):                             │  │
│  │  - Auth Store (user, isLoggedIn)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Client (Axios):                                      │  │
│  │  - Base URL: NEXT_PUBLIC_API_URL                         │  │
│  │  - Credentials: true (cookies)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API
                             │ /api/v1/*
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   BACKEND (Node.js/Express)                      │
│                      Port: 3001                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Routes:                                                  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  /api/v1/auth                                       │  │  │
│  │  │  - POST /signup                                     │  │  │
│  │  │  - POST /login                                      │  │  │
│  │  │  - POST /logout                                     │  │  │
│  │  │  - GET  /me                                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  /api/v1/content/movies                            │  │  │
│  │  │  - GET    /all                                      │  │  │
│  │  │  - GET    /:id                                      │  │  │
│  │  │  - POST   / (with file upload)                     │  │  │
│  │  │  - PUT    /:id                                      │  │  │
│  │  │  - DELETE /:id                                      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  /api/v1/sub-info                                   │  │  │
│  │  │  - GET  /                                           │  │  │
│  │  │  - POST /                                           │  │  │
│  │  │  - POST /cancel                                     │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware:                                              │  │
│  │  - CORS (credentials enabled)                            │  │
│  │  - Cookie Parser                                          │  │
│  │  - Body Parser (JSON, URL-encoded)                       │  │
│  │  - Morgan (Logging)                                       │  │
│  │  - Auth Middleware (JWT verification)                    │  │
│  │  - Multer (File Upload)                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Controllers:                                             │  │
│  │  - auth.controller.js                                     │  │
│  │  - movie.controller.js                                    │  │
│  │  - subscription.controller.js                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      DATABASE (MongoDB)                          │
│                      Port: 27017                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Collections:                                             │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  users                                              │  │  │
│  │  │  - _id, name, email, password (hashed)             │  │  │
│  │  │  - role (USER, ADMIN)                              │  │  │
│  │  │  - createdAt, updatedAt                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  movies                                             │  │  │
│  │  │  - _id, title, release_year, duration              │  │  │
│  │  │  - synopsis, age_rating, genre                     │  │  │
│  │  │  - actors, warnings                                │  │  │
│  │  │  - images[] (poster, backdrop)                     │  │  │
│  │  │  - createdAt, updatedAt                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  subscriptions                                      │  │  │
│  │  │  - _id, userId (ref: User)                         │  │  │
│  │  │  - status, planId                                  │  │  │
│  │  │  - currentPeriodStart, currentPeriodEnd            │  │  │
│  │  │  - cancelAtPeriodEnd, canceledAt                   │  │  │
│  │  │  - createdAt, updatedAt                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FILE STORAGE (Local/S3)                       │
│                    /uploads directory                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  - Movie posters (*.jpg, *.png)                          │  │
│  │  - Movie backdrops (*.jpg, *.png)                        │  │
│  │  - Served via Express static middleware                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow
```
User → Frontend (Login Form)
     → POST /api/v1/auth/login
     → Backend (Verify credentials)
     → MongoDB (Check user)
     → Backend (Generate JWT)
     → Frontend (Store in cookie)
     → Redirect to Profile
```

### 2. Movie Creation Flow
```
Admin → Frontend (Add Movie Form)
      → POST /api/v1/content/movies (multipart/form-data)
      → Backend (Multer processes files)
      → Save files to /uploads
      → Backend (Create movie record)
      → MongoDB (Store movie data)
      → Response with movie data
      → Frontend (Redirect to admin panel)
```

### 3. Movie Listing Flow
```
User → Frontend (Movies Page)
     → GET /api/v1/content/movies/all
     → Backend (Fetch all movies)
     → MongoDB (Query movies collection)
     → Backend (Return movies array)
     → Frontend (Render movie grid)
```

### 4. Subscription Flow
```
User → Frontend (Profile Page)
     → GET /api/v1/sub-info
     → Backend (Check auth)
     → MongoDB (Find subscription by userId)
     → Backend (Return subscription data)
     → Frontend (Display subscription info)
```

## Docker Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Docker Compose                              │
│                                                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   Frontend     │  │    Backend     │  │    MongoDB     │   │
│  │   Container    │  │   Container    │  │   Container    │   │
│  │                │  │                │  │                │   │
│  │  Next.js       │  │  Node.js       │  │  mongo:7.0     │   │
│  │  Port: 3000    │  │  Port: 3001    │  │  Port: 27017   │   │
│  └────────┬───────┘  └────────┬───────┘  └────────┬───────┘   │
│           │                   │                   │             │
│           └───────────────────┴───────────────────┘             │
│                    stremify-network                             │
│                                                                   │
│  Volumes:                                                        │
│  - mongodb-data (persistent)                                    │
│  - uploads (shared with backend)                                │
└─────────────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Security Layers                             │
│                                                                   │
│  1. CORS Protection                                              │
│     - Origin: FRONTEND_URL only                                 │
│     - Credentials: Enabled                                       │
│                                                                   │
│  2. Authentication                                               │
│     - JWT tokens (httpOnly cookies)                             │
│     - Password hashing (bcrypt)                                 │
│     - Session management                                         │
│                                                                   │
│  3. Authorization                                                │
│     - Protected routes (isLoggedIn middleware)                  │
│     - Role-based access (USER, ADMIN)                           │
│                                                                   │
│  4. Input Validation                                             │
│     - Zod schemas (frontend)                                    │
│     - Mongoose validation (backend)                             │
│                                                                   │
│  5. File Upload Security                                         │
│     - Multer file type validation                               │
│     - File size limits                                           │
│     - Secure file storage                                        │
└─────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS (443)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    Reverse Proxy (Nginx)                         │
│                    - SSL/TLS Termination                         │
│                    - Load Balancing                              │
│                    - Static File Caching                         │
└────────────┬───────────────────────────────┬────────────────────┘
             │                               │
             │ :3000                         │ :3001
             │                               │
┌────────────▼────────────┐    ┌────────────▼────────────┐
│   Frontend (Next.js)    │    │   Backend (Node.js)     │
│   - Vercel/EC2          │    │   - EC2/Railway         │
│   - Static Generation   │    │   - PM2 Process Manager │
└─────────────────────────┘    └────────────┬────────────┘
                                            │
                                            │ :27017
                                            │
                               ┌────────────▼────────────┐
                               │   MongoDB Atlas         │
                               │   - Managed Database    │
                               │   - Auto Backups        │
                               └─────────────────────────┘

                               ┌─────────────────────────┐
                               │   AWS S3 / CloudFlare   │
                               │   - File Storage        │
                               │   - CDN                 │
                               └─────────────────────────┘
```

## Technology Stack Summary

```
Frontend:
├── Framework: Next.js 14 (React 18)
├── Language: TypeScript
├── Styling: Tailwind CSS
├── State: Zustand
├── Forms: React Hook Form + Zod
├── HTTP: Axios
└── UI: Radix UI + Shadcn

Backend:
├── Runtime: Node.js
├── Framework: Express.js
├── Database: MongoDB + Mongoose
├── Auth: JWT + bcrypt
├── Upload: Multer
├── Email: Nodemailer + AWS SES
└── Logging: Morgan

DevOps:
├── Containerization: Docker + Docker Compose
├── CI/CD: GitHub Actions
├── Deployment: DigitalOcean / Vercel / Railway
└── Monitoring: PM2 (recommended)
```

---

**This architecture supports:**
- ✅ Scalability (horizontal scaling)
- ✅ Security (JWT, CORS, validation)
- ✅ Performance (caching, CDN)
- ✅ Maintainability (modular structure)
- ✅ Deployment (Docker, cloud-ready)
