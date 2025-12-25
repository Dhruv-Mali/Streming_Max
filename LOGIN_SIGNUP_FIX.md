# Login & Signup Fix Guide

## Issues Fixed:

### 1. **API Endpoint Mismatch**
   - Frontend was calling `/auth/signup` but backend expected OTP flow
   - Added simple signup endpoint without OTP verification
   - Added missing `/auth/me` and `/auth/updateSession` endpoints

### 2. **Authentication Flow**
   - Backend now supports both simple signup (direct) and OTP-based signup
   - Login no longer requires OTP verification
   - Session management endpoints added

## Changes Made:

### Backend Files Modified:
1. `video_straming_system-main/src/routes/auth.routes.js`
   - Added `/auth/signup` for simple signup (no OTP)
   - Added `/auth/signupVerify` for OTP-based signup
   - Added `/auth/me` endpoint
   - Added `/auth/updateSession` endpoint

2. `video_straming_system-main/src/controllers/auth.controller.js`
   - Modified login to allow users without OTP verification

3. `video_straming_system-main/src/controllers/auth.controller.simple.js` (NEW)
   - Created simple signup controller without OTP

## How to Test:

### Step 1: Start Backend Server
```bash
cd video_straming_system-main
npm run dev
```

Or use the provided script:
```bash
start-backend.bat
```

### Step 2: Verify Backend is Running
Open browser and go to: http://localhost:3001/health

You should see:
```json
{
  "message": "backend is working fine..."
}
```

### Step 3: Start Frontend
```bash
cd Frontend
npm run dev
```

### Step 4: Test Signup
1. Go to http://localhost:3000/signup
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Sign up"
4. Should see success message

### Step 5: Test Login
1. Go to http://localhost:3000/signin
2. Fill in:
   - Email: test@example.com
   - Password: password123
3. Click "Sign in"
4. Should redirect to profile page

## API Endpoints Available:

### Simple Signup (No OTP):
```
POST /api/v1/auth/signup
Body: { "name": "John", "email": "john@example.com", "password": "password123" }
```

### OTP-Based Signup (Optional):
```
POST /api/v1/auth/signupOtpSend
Body: { "name": "John", "email": "john@example.com", "password": "password123" }

POST /api/v1/auth/signupVerify
Body: { "email": "john@example.com", "otp": "123456" }
```

### Login:
```
POST /api/v1/auth/login
Body: { "email": "john@example.com", "password": "password123" }
```

### Get User Profile:
```
GET /api/v1/auth/me
GET /api/v1/auth/profile
GET /api/v1/auth/updateSession
(All require authentication cookie)
```

## Troubleshooting:

### Issue: "Cannot POST /api/v1/auth/signup"
**Solution**: Backend server is not running. Start it with `npm run dev`

### Issue: "Network Error" or "CORS Error"
**Solution**: 
1. Check backend .env file has: `FRONTEND_URL=http://localhost:3000`
2. Check frontend .env.local has: `NEXT_PUBLIC_API_URL=http://localhost:3001`
3. Restart both servers

### Issue: "MongoDB connection error"
**Solution**: 
1. Check if MongoDB is running: `tasklist | findstr mongod`
2. If not running, start MongoDB service or run: `mongod`

### Issue: "User already exists"
**Solution**: 
1. Either login with existing credentials
2. Or delete the user from MongoDB:
   ```bash
   mongosh
   use stream_db
   db.users.deleteOne({ email: "test@example.com" })
   ```

### Issue: Login redirects but shows "Not authenticated"
**Solution**: 
1. Clear browser cookies
2. Check browser console for errors
3. Verify backend is sending cookies properly

## Testing with cURL:

### Test Signup:
```bash
curl -X POST http://localhost:3001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Test Login:
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Test Get Profile:
```bash
curl -X GET http://localhost:3001/api/v1/auth/me \
  -b cookies.txt
```

## Notes:

- The simple signup flow auto-verifies users (sets `verified: true`)
- OTP-based signup is still available via `/auth/signupOtpSend` and `/auth/signupVerify`
- Cookies are used for authentication (httpOnly, 3-day expiry)
- JWT tokens are also returned in login response for flexibility
