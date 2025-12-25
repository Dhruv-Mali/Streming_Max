# Admin Access Guide 👨‍💼

Guide to access and use the admin dashboard in Stremify.

---

## 🔐 How to Access Admin Site

### Step 1: Create Admin User in Database

You need to manually set a user's role to "ADMIN" in MongoDB.

#### Option A: Using MongoDB Compass (GUI)

1. **Open MongoDB Compass**
2. **Connect** to `mongodb://localhost:27017`
3. **Navigate** to `stream_db` → `users` collection
4. **Find your user** by email
5. **Edit** the document
6. **Change** `role` field from `"USER"` to `"ADMIN"`
7. **Save** the changes

#### Option B: Using MongoDB Shell (CLI)

```bash
# Connect to MongoDB
mongosh

# Switch to database
use stream_db

# Update user role to ADMIN (replace with your email)
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "ADMIN" } }
)

# Verify the change
db.users.findOne({ email: "your@email.com" })
```

#### Option C: Using Docker (if using Docker setup)

```bash
# Access MongoDB container
docker exec -it stremify-mongodb mongosh

# Switch to database
use stream_db

# Update user role
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "ADMIN" } }
)
```

---

## 🚀 Access Admin Dashboard

### Step 2: Login and Access

1. **Logout** if currently logged in
2. **Login** with the admin user credentials
3. **Navigate** to: `http://localhost:3000/admin`

---

## 📋 Admin Features

### Current Admin Pages:

- **Admin Dashboard**: `/admin`
  - Overview of admin functions
  - Link to manage movies

- **Manage Movies**: `/admin/movie`
  - Add new movies
  - Edit existing movies
  - Delete movies
  - Upload movie posters and backdrops

---

## 🔒 User Roles

The system has 3 roles:

1. **USER** (default)
   - Browse movies
   - View movie details
   - Manage profile
   - Subscribe to plans

2. **MODERATOR**
   - All USER permissions
   - (Can be extended for content moderation)

3. **ADMIN**
   - All USER permissions
   - Access admin dashboard
   - Manage movies (CRUD operations)
   - Manage users (can be extended)

---

## 🛡️ Admin Protection

The admin routes are protected by middleware:

```typescript
// Checks in middleware.ts:
1. User must be logged in
2. User role must be "ADMIN"
3. Otherwise, redirect to signin or profile
```

---

## 🎯 Quick Setup Script

Create an admin user quickly:

### Create: `create-admin.js` in backend root

```javascript
import mongoose from 'mongoose';
import User from './src/models/user.schema.js';
import config from './src/config/index.js';

async function createAdmin() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    
    const adminEmail = 'admin@stremify.com';
    const adminPassword = 'Admin@123456';
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      // Update existing user to admin
      existingAdmin.role = 'ADMIN';
      existingAdmin.verified = true;
      await existingAdmin.save();
      console.log('✅ Existing user updated to ADMIN');
    } else {
      // Create new admin user
      const admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'ADMIN',
        verified: true,
      });
      console.log('✅ Admin user created successfully');
    }
    
    console.log(`
    📧 Email: ${adminEmail}
    🔑 Password: ${adminPassword}
    🔗 Admin URL: http://localhost:3000/admin
    `);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
```

### Run the script:

```bash
cd video_straming_system-main
node create-admin.js
```

---

## 🧪 Testing Admin Access

### Test Flow:

1. **Create admin user** (using any method above)
2. **Logout** from current session
3. **Login** with admin credentials
4. **Visit** `http://localhost:3000/admin`
5. **You should see**: Admin Dashboard
6. **Click** "Manage Movies" to add/edit movies

### Expected Behavior:

✅ **As Admin**: Can access `/admin` and `/admin/movie`
❌ **As Regular User**: Redirected to `/profile`
❌ **Not Logged In**: Redirected to `/signin`

---

## 🔧 Troubleshooting

### Can't Access Admin Page

**Problem**: Redirected to profile or signin

**Solutions**:
1. Check user role in database:
   ```bash
   mongosh
   use stream_db
   db.users.findOne({ email: "your@email.com" })
   ```

2. Verify role is exactly `"ADMIN"` (case-sensitive)

3. Clear browser cache and session storage:
   ```javascript
   // In browser console
   sessionStorage.clear();
   localStorage.clear();
   ```

4. Logout and login again

### Role Not Updating

**Problem**: Changed role in DB but still can't access

**Solution**:
1. Logout completely
2. Clear session storage
3. Login again
4. The new role will be loaded

### Middleware Not Working

**Problem**: Admin check not working

**Solution**:
Check `middleware.ts` has correct role check:
```typescript
if (user.role !== "ADMIN") {  // Should be "ADMIN" not "admin"
```

---

## 📝 Admin User Credentials (Default)

After running the setup script:

```
Email: admin@stremify.com
Password: Admin@123456
URL: http://localhost:3000/admin
```

⚠️ **Important**: Change the default password after first login!

---

## 🚀 Future Admin Features

Planned enhancements:

- [ ] User management (view, edit, delete users)
- [ ] Subscription management
- [ ] Analytics dashboard
- [ ] Content moderation
- [ ] System settings
- [ ] Email templates management
- [ ] Bulk movie import
- [ ] Reports and statistics

---

## 🔐 Security Best Practices

1. **Strong Passwords**: Use strong passwords for admin accounts
2. **Limited Access**: Only give admin role to trusted users
3. **Regular Audits**: Review admin actions regularly
4. **2FA**: Consider adding two-factor authentication
5. **Session Timeout**: Implement session timeout for admins
6. **Audit Logs**: Log all admin actions

---

## 📚 Related Files

- **Frontend Middleware**: `Frontend/src/middleware.ts`
- **User Schema**: `video_straming_system-main/src/models/user.schema.js`
- **Auth Roles**: `video_straming_system-main/src/utils/AuthRoles.js`
- **Admin Pages**: `Frontend/src/app/admin/`

---

## 🆘 Need Help?

If you're still having issues:

1. Check MongoDB connection
2. Verify user exists in database
3. Check browser console for errors
4. Check backend logs
5. Ensure middleware is running

---

**Happy Administrating! 👨‍💼**
