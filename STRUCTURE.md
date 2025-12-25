# Stremify - Project Structure

```
Streming_max/
├── Frontend/                          # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                      # Next.js App Router Pages
│   │   │   ├── admin/               # Admin dashboard pages
│   │   │   ├── movies/              # Movie listing & detail pages
│   │   │   ├── profile/             # User profile page
│   │   │   ├── signin/              # Sign in page
│   │   │   ├── signup/              # Sign up page
│   │   │   ├── pricing/             # Subscription pricing page
│   │   │   ├── completion/          # Payment completion page
│   │   │   ├── verifyuser/          # Email verification page
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Home page
│   │   │   └── globals.css          # Global styles
│   │   ├── components/              # React Components
│   │   │   ├── ui/                  # UI components (shadcn)
│   │   │   ├── AuthProvider.tsx    # Auth state provider
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── SignupForm.tsx      # Signup form
│   │   │   ├── SigninForm.tsx      # Signin form
│   │   │   └── ...                 # Other components
│   │   ├── lib/                     # Utility libraries
│   │   ├── stores/                  # Zustand state stores
│   │   │   └── authStore.ts        # Authentication store
│   │   ├── utils/                   # Utility functions
│   │   │   └── api.ts              # Axios API client
│   │   ├── middleware.ts            # Next.js middleware
│   │   └── types.ts                 # TypeScript types
│   ├── .env.local                   # Frontend environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Frontend dependencies
│   ├── next.config.mjs              # Next.js configuration
│   ├── tailwind.config.ts           # Tailwind CSS config
│   └── tsconfig.json                # TypeScript config
│
├── video_straming_system-main/      # Node.js Backend API
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   ├── index.js            # Main config
│   │   │   └── transporter.config.js # Email config
│   │   ├── controllers/             # Route controllers
│   │   │   ├── auth.controller.js  # Authentication logic
│   │   │   ├── auth.controller.simple.js # Simple auth (no OTP)
│   │   │   ├── movie.controller.js # Movie CRUD operations
│   │   │   └── subscription.controller.js # Subscription logic
│   │   ├── middleware/              # Express middleware
│   │   │   └── auth.middlerware.js # JWT authentication
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── user.schema.js      # User model
│   │   │   ├── movie.schema.js     # Movie model
│   │   │   └── subscription.schema.js # Subscription model
│   │   ├── routes/                  # API routes
│   │   │   ├── index.js            # Main router
│   │   │   ├── auth.routes.js      # Auth endpoints
│   │   │   ├── content.routes.js   # Content endpoints
│   │   │   ├── movie.routes.js     # Movie endpoints
│   │   │   └── subscription.routes.js # Subscription endpoints
│   │   ├── utils/                   # Utility functions
│   │   │   ├── asyncHandler.js     # Async error handler
│   │   │   ├── CustomError.js      # Custom error class
│   │   │   ├── mailHelper.js       # Email helper
│   │   │   ├── s3Upload.js         # AWS S3 upload
│   │   │   ├── AuthRoles.js        # User roles enum
│   │   │   └── SubTypes.js         # Subscription types
│   │   ├── app.js                   # Express app setup
│   │   └── index.js                 # Server entry point
│   ├── uploads/                     # Uploaded files storage
│   ├── .env                         # Backend environment variables
│   ├── .env.example                 # Environment template
│   └── package.json                 # Backend dependencies
│
├── .env                             # Root environment file
├── LICENSE                          # Project license
└── README.md                        # Project documentation
```

## Key Files

### Frontend
- **src/app/page.tsx** - Home page
- **src/app/signin/page.tsx** - Login page
- **src/app/signup/page.tsx** - Registration page
- **src/stores/authStore.ts** - Authentication state management
- **src/utils/api.ts** - API client configuration
- **.env.local** - Frontend environment variables

### Backend
- **src/index.js** - Server entry point
- **src/app.js** - Express app configuration
- **src/routes/auth.routes.js** - Authentication routes
- **src/controllers/auth.controller.simple.js** - Simple signup/login
- **src/models/user.schema.js** - User database model
- **.env** - Backend environment variables

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/stream_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000
```

## Running the Project

### Start Backend
```bash
cd video_straming_system-main
npm install
npm run dev
```

### Start Frontend
```bash
cd Frontend
npm install
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: mongodb://localhost:27017
