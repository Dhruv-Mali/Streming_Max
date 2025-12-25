# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup
```bash
# Run the setup script (Windows)
setup.bat

# OR manually:
cd video_straming_system-main && npm install
cd ../stremify-FE-main && npm install
```

### Step 2: Start MongoDB
```bash
# Option A: Docker (Recommended)
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Option B: Local MongoDB
mongod
```

### Step 3: Run the App
```bash
# Terminal 1 - Backend
cd video_straming_system-main
npm run dev

# Terminal 2 - Frontend
cd stremify-FE-main
npm run dev
```

**Open:** http://localhost:3000

---

## 🐳 Docker (Production)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

---

## 📁 Project Structure

```
Streming_max/
├── video_straming_system-main/  # Backend API (Port 3001)
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   ├── models/              # Database schemas
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth, etc.
│   │   └── utils/               # Helpers
│   └── uploads/                 # File storage
│
├── stremify-FE-main/            # Frontend (Port 3000)
│   └── src/
│       ├── app/                 # Next.js pages
│       ├── components/          # React components
│       └── utils/               # API client
│
└── docker-compose.yml           # Full-stack setup
```

---

## 🔑 Key Files

### Backend
- `.env` - Configuration
- `src/routes/index.js` - All routes
- `src/models/` - Database schemas

### Frontend
- `.env.local` - Configuration
- `src/utils/api.ts` - API client
- `src/app/` - Pages

---

## 🛠️ Common Commands

### Backend
```bash
npm run dev    # Development
npm start      # Production
```

### Frontend
```bash
npm run dev    # Development
npm run build  # Build
npm start      # Production
```

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/stream_db
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📡 API Endpoints

### Auth
- POST `/api/v1/auth/signup` - Register
- POST `/api/v1/auth/login` - Login
- GET `/api/v1/auth/me` - Get user

### Movies
- GET `/api/v1/content/movies/all` - List movies
- POST `/api/v1/content/movies` - Create movie
- GET `/api/v1/content/movies/:id` - Get movie

### Subscription
- GET `/api/v1/sub-info` - Get subscription
- POST `/api/v1/sub-info` - Create subscription

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
docker ps
# OR
mongod --version
```

### Port Already in Use
```bash
# Kill process on port 3000/3001
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Error
- Check FRONTEND_URL in backend .env
- Check NEXT_PUBLIC_API_URL in frontend .env.local

---

## 📚 Documentation

- **README.md** - Full documentation
- **API_DOCUMENTATION.md** - API reference
- **PRODUCTION_CHECKLIST.md** - Deployment guide
- **CHANGES_SUMMARY.md** - What was fixed

---

## 🎯 Next Steps

1. ✅ Run the app locally
2. ✅ Create a user account
3. ✅ Add some movies (admin panel)
4. ✅ Test subscription features
5. 🚀 Deploy to production

---

## 💡 Tips

- Use **Docker** for easiest setup
- Check **logs** if something fails
- Read **API_DOCUMENTATION.md** for API details
- Follow **PRODUCTION_CHECKLIST.md** before deploying

---

## 🆘 Need Help?

1. Check the logs
2. Read the documentation
3. Verify environment variables
4. Ensure MongoDB is running
5. Check port availability

---

**Happy Coding! 🎉**
