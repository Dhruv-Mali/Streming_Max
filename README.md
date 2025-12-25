# Stremify - Video Streaming Platform

A full-stack video streaming platform built with Next.js (Frontend) and Node.js/Express (Backend).

## 🏗️ Project Structure

```
Streming_max/
├── stremify-FE-main/          # Next.js Frontend
├── video_straming_system-main/ # Node.js Backend API
└── docker-compose.yml          # Full-stack Docker setup
```

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+ 
- MongoDB (running locally or Docker)
- npm/yarn/pnpm

### 1. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# OR install MongoDB locally and run
mongod
```

### 2. Setup Backend
```bash
cd video_straming_system-main
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Backend runs on: `http://localhost:3001`

### 3. Setup Frontend
```bash
cd stremify-FE-main
npm install
cp .env.example .env.local
# Edit .env.local if needed
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🐳 Docker Deployment (Production)

### Using Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 3001
- Frontend on port 3000

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

## 📋 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/auth/updateSession` - Update session

### Movies (Content)
- `GET /api/v1/content/movies/all` - Get all movies
- `GET /api/v1/content/movies/:id` - Get movie by ID
- `POST /api/v1/content/movies` - Create movie (Auth required)
- `PUT /api/v1/content/movies/:id` - Update movie (Auth required)
- `DELETE /api/v1/content/movies/:id` - Delete movie (Auth required)

### Subscription
- `GET /api/v1/sub-info` - Get user subscription info (Auth required)
- `POST /api/v1/sub-info` - Create subscription (Auth required)
- `POST /api/v1/sub-info/cancel` - Cancel subscription (Auth required)

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/stream_db
JWT_SECRET=your_secure_secret_key
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000

# AWS SES (Email Service)
AWS_SES_USER_ACCESS_KEY=your_aws_key
AWS_SES_USER_SECRET_ACCESS_KEY=your_aws_secret
AWS_SES_REGION=us-east-1
SENDER_EMAIL=your@email.com

# AWS S3 (File Storage) - Optional
USE_S3=false
AWS_S3_ACCESS_KEY=your_s3_key
AWS_S3_SECRET_KEY=your_s3_secret
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=stremify-uploads
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## ☁️ AWS Services Integration

This project supports AWS services for production:

### AWS SES (Email Service) ✅ Configured
- Send welcome emails
- Password reset emails
- Subscription notifications

### AWS S3 (File Storage) ✅ Optional
- Store movie posters and backdrops
- Scalable and reliable
- Toggle with `USE_S3=true`

**Quick Setup**: See [AWS_QUICK_SETUP.md](AWS_QUICK_SETUP.md)
**Full Guide**: See [AWS_INTEGRATION_GUIDE.md](AWS_INTEGRATION_GUIDE.md)

## 📦 Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Axios
- React Hook Form + Zod

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File Upload)
- bcrypt

## 🔐 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Cookie-based sessions
- Protected routes

## 📁 File Upload
Movies support image uploads (poster & backdrop). Files are stored in `/uploads` directory.

## 🛠️ Development Scripts

### Backend
```bash
npm run dev    # Development with hot reload
npm start      # Production
```

### Frontend
```bash
npm run dev    # Development
npm run build  # Production build
npm start      # Production server
npm run lint   # Lint code
```

## 🚢 Production Deployment

### Manual Deployment

1. **Build Backend**
```bash
cd video_straming_system-main
npm install --production
```

2. **Build Frontend**
```bash
cd stremify-FE-main
npm install
npm run build
npm start
```

### Docker Deployment

```bash
# Build and run with docker-compose
docker-compose up -d --build
```

### Environment Setup for Production
- Set strong JWT_SECRET
- Configure production MongoDB URI
- Update FRONTEND_URL and NEXT_PUBLIC_API_URL
- Configure AWS SES for email (optional)
- Use reverse proxy (Nginx) for SSL/TLS

## 📝 Missing Features Added

✅ Movie Management API (CRUD operations)
✅ Subscription Management API
✅ File Upload Support (Multer)
✅ Environment Variable Configuration
✅ Docker Support
✅ Production-Ready Setup
✅ Comprehensive Documentation

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env

### CORS Error
- Verify FRONTEND_URL in backend .env
- Check NEXT_PUBLIC_API_URL in frontend .env.local

### File Upload Error
- Ensure `uploads/` directory exists
- Check file permissions

## 📄 License
ISC

## 👥 Author
Jay Bhogayata
