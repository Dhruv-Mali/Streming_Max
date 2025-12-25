# Stremify - Premium Video Streaming Platform 🎬

A modern, full-stack video streaming platform with a beautiful UI, built with Next.js 14 and Node.js/Express.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)
![AWS](https://img.shields.io/badge/AWS-S3%20%7C%20SES-orange?logo=amazon-aws)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful gradient designs, animations, and glassmorphism effects
- 🎬 **Movie Browsing** - Interactive movie cards with hover effects and play buttons
- 🔐 **Authentication** - Secure JWT-based auth with bcrypt password hashing
- 💳 **Subscription System** - Manage user subscriptions and access control
- 📧 **Email Notifications** - AWS SES integration for transactional emails
- ☁️ **Cloud Storage** - AWS S3 for scalable media storage
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🌙 **Dark Mode** - Built-in theme support

## 🏗️ Project Structure

```
Streming_max/
├── Frontend/                   # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # Reusable components
│   │   ├── stores/            # Zustand state management
│   │   └── utils/             # Utility functions
│   └── package.json
├── video_straming_system-main/ # Node.js Backend API
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   └── middleware/        # Auth & validation
│   └── package.json
├── AWS_SETUP_GUIDE.md         # Complete AWS integration guide
├── AWS_QUICK_START.md         # 15-minute AWS setup
└── README.md
```

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+ 
- MongoDB (running locally or Docker)
- npm/yarn/pnpm

### Option 1: Docker (Recommended) 🐳

```bash
# Clone repository
git clone https://github.com/Dhruv-Mali/Streming_Max.git
cd Streming_Max

# Configure environment
cp .env.docker .env
# Edit .env with your values

# Start all services
docker-compose up -d
```

Access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017

**See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for complete Docker documentation**

### Option 2: Manual Setup

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
cd Frontend
npm install
cp .env.example .env.local
# Edit .env.local if needed
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017

## 🎨 UI/UX Highlights

### Homepage
- Animated gradient hero section
- Smooth fade-in animations
- Feature cards with hover effects
- Call-to-action buttons with gradients

### Movie Browsing
- Interactive movie cards
- Play button overlay on hover
- Smooth scale animations
- Responsive grid layout (2-6 columns)

### Navigation
- Glassmorphism navbar with backdrop blur
- Gradient logo and branding
- Smooth transitions

### Forms
- Modern input styling with focus states
- Loading spinners
- Error validation with icons
- Gradient submit buttons

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

**Quick Setup**: See [AWS_QUICK_START.md](AWS_QUICK_START.md) - 15 minutes
**Full Guide**: See [AWS_SETUP_GUIDE.md](AWS_SETUP_GUIDE.md) - Complete documentation

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Animations
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Components**: Radix UI + shadcn/ui

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB 7.0 + Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer
- **Email**: AWS SES SDK
- **Storage**: AWS S3 SDK
- **Validation**: Custom middleware

### Cloud Services (AWS)
- **S3**: Media storage (images, videos)
- **SES**: Transactional emails
- **CloudFront**: CDN (optional)

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

### Docker Deployment (Recommended) 🐳

```bash
# Build and run with docker-compose
docker-compose up -d --build
```

This will start:
- MongoDB on port 27017
- Backend API on port 3001
- Frontend on port 3000

**Complete Guide**: See [DOCKER_GUIDE.md](DOCKER_GUIDE.md)

### Manual Deployment

1. **Build Backend**
```bash
cd video_straming_system-main
npm install --production
```

2. **Build Frontend**
```bash
cd Frontend
npm install
npm run build
npm start
```

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild images
docker-compose up -d --build
```

### Environment Setup for Production
- Set strong JWT_SECRET
- Configure production MongoDB URI
- Update FRONTEND_URL and NEXT_PUBLIC_API_URL
- Configure AWS SES for email (optional)
- Use reverse proxy (Nginx) for SSL/TLS

## 🎯 Key Features Implemented

### Frontend
✅ Modern, animated homepage with hero section
✅ Interactive movie browsing with hover effects
✅ Glassmorphism navbar with gradient branding
✅ Enhanced authentication forms (signin/signup)
✅ Responsive design (mobile, tablet, desktop)
✅ Dark mode support
✅ Custom animations (fade-in, float, glow)
✅ Loading states and error handling

### Backend
✅ RESTful API with Express.js
✅ JWT authentication & authorization
✅ Movie management (CRUD operations)
✅ Subscription system
✅ File upload with Multer
✅ AWS S3 integration for cloud storage
✅ AWS SES for email notifications
✅ MongoDB database with Mongoose
✅ CORS & security middleware

### Documentation
✅ Comprehensive README
✅ AWS setup guides (quick & detailed)
✅ API documentation
✅ Environment configuration examples

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or Docker container
- Check MONGODB_URI in .env
- Verify port 27017 is not in use

### CORS Error
- Verify FRONTEND_URL in backend .env matches frontend URL
- Check NEXT_PUBLIC_API_URL in frontend .env.local
- Ensure backend is running on correct port

### File Upload Error
- Ensure `uploads/` directory exists in backend
- Check file permissions (read/write)
- Verify Multer configuration

### Next.js Build Error
- Delete `.next` folder: `rmdir /s /q .next` (Windows) or `rm -rf .next` (Mac/Linux)
- Clear node_modules and reinstall: `npm install`
- Check for styled-jsx usage (use CSS instead)

### AWS Integration Issues
- Verify AWS credentials in .env
- Check IAM user has correct permissions
- Ensure S3 bucket exists and is accessible
- Verify SES email is verified (sandbox mode)

See [FIX_GUIDE.md](FIX_GUIDE.md) for more solutions.

## 📸 Screenshots

### Homepage
- Modern hero section with gradient background
- Animated feature cards
- Call-to-action buttons

### Movie Browsing
- Grid layout with hover effects
- Play button overlays
- Responsive design

### Authentication
- Clean, modern forms
- Gradient backgrounds
- Loading states

## 🚀 Future Enhancements

- [ ] Video player integration
- [ ] User watchlist and favorites
- [ ] Movie recommendations
- [ ] Search and filtering
- [ ] User reviews and ratings
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Social sharing features

## 📚 Documentation

- [Docker Guide](DOCKER_GUIDE.md) - Complete Docker deployment guide
- [AWS Setup Guide](AWS_SETUP_GUIDE.md) - Complete AWS integration
- [AWS Quick Start](AWS_QUICK_START.md) - 15-minute setup
- [Fix Guide](FIX_GUIDE.md) - Common issues and solutions
- [Project Structure](STRUCTURE.md) - Detailed file structure

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Dhruv Mali** - Cloud Backend Development 
- **Jay Bhogayata** - Full Stack Development

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for beautiful components
- AWS for cloud services
- MongoDB for the database

---

⭐ Star this repo if you find it helpful!
