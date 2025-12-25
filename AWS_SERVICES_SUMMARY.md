# AWS Services - Summary

## ✅ What's Configured

Your Stremify project now supports these AWS services:

### 1. AWS SES (Simple Email Service) ✅
**Status**: Fully configured and ready to use

**What it does**:
- Sends welcome emails to new users
- Sends password reset emails
- Sends subscription notifications

**Files**:
- `src/config/transporter.config.js` - SES client setup
- `src/utils/mailHelper.js` - Email sending utility

**Usage**:
```javascript
import mailHelper from "./utils/mailHelper.js";

await mailHelper({
  email: "user@example.com",
  subject: "Welcome!",
  text: "Welcome to Stremify!"
});
```

### 2. AWS S3 (Simple Storage Service) ✅
**Status**: Configured with toggle (USE_S3)

**What it does**:
- Stores movie posters and backdrops
- Provides public URLs for images
- Scalable file storage

**Files**:
- `src/utils/s3Upload.js` - S3 upload/delete utilities
- `src/controllers/movie.controller.js` - Uses S3 when enabled

**Usage**:
```javascript
// Automatic - just set USE_S3=true in .env
// Files will be uploaded to S3 instead of local storage
```

---

## 🚀 Quick Setup

### For Development (Local Storage)
```env
USE_S3=false
```
No AWS S3 setup needed. Files stored in `/uploads`.

### For Production (S3 Storage)
```env
USE_S3=true
AWS_S3_ACCESS_KEY=your_key
AWS_S3_SECRET_KEY=your_secret
AWS_S3_BUCKET=your-bucket
```

**Setup Guide**: [AWS_QUICK_SETUP.md](AWS_QUICK_SETUP.md)

---

## 📋 Setup Checklist

### AWS SES (Email)
- [ ] Create AWS account
- [ ] Create IAM user with SES permissions
- [ ] Get access key and secret key
- [ ] Verify sender email in SES console
- [ ] Update .env with credentials
- [ ] Test email sending
- [ ] Request production access (optional)

### AWS S3 (File Storage)
- [ ] Create S3 bucket
- [ ] Configure bucket policy (public read)
- [ ] Create IAM user with S3 permissions
- [ ] Update .env with S3 credentials
- [ ] Set USE_S3=true
- [ ] Test file upload

---

## 💡 How It Works

### Email Flow
```
User Action → Backend Controller → mailHelper() → AWS SES → User's Email
```

### File Upload Flow (S3 Enabled)
```
User Upload → Multer (temp) → uploadToS3() → AWS S3 → Public URL → Database
```

### File Upload Flow (S3 Disabled)
```
User Upload → Multer → /uploads folder → Local URL → Database
```

---

## 🔄 Switching Between Local and S3

### Use Local Storage (Development)
```env
USE_S3=false
```
- Files in `/uploads` folder
- No AWS costs
- Faster for development

### Use S3 Storage (Production)
```env
USE_S3=true
```
- Files in AWS S3
- Scalable and reliable
- Better for production

**No code changes needed!** Just toggle the environment variable.

---

## 💰 Cost Breakdown

### Free Tier (12 months)
- **SES**: 62,000 emails/month (from EC2)
- **S3**: 5GB storage, 20,000 GET, 2,000 PUT
- **Total**: $0/month

### After Free Tier
- **SES**: $0.10 per 1,000 emails
- **S3**: $0.023 per GB/month
- **Example**: 100 movies (500MB) + 1000 emails = ~$2/month

---

## 📁 File Structure

```
video_straming_system-main/
├── src/
│   ├── config/
│   │   └── transporter.config.js    # AWS SES setup
│   ├── utils/
│   │   ├── mailHelper.js            # Email utility
│   │   └── s3Upload.js              # S3 upload utility (NEW)
│   └── controllers/
│       └── movie.controller.js      # Uses S3 when enabled
└── .env                             # AWS credentials
```

---

## 🧪 Testing

### Test Email
```bash
cd video_straming_system-main
node
```
```javascript
import mailHelper from "./src/utils/mailHelper.js";
await mailHelper({
  email: "your-verified-email@example.com",
  subject: "Test",
  text: "Hello!"
});
```

### Test S3 Upload
1. Set `USE_S3=true` in `.env`
2. Start backend: `npm run dev`
3. Upload movie via frontend
4. Check S3 bucket for files

---

## 🔐 Security

### Best Practices
✅ Never commit credentials to git
✅ Use environment variables
✅ Rotate keys every 90 days
✅ Use IAM roles on EC2/ECS
✅ Enable MFA on AWS account

### IAM Permissions
Minimum required permissions:
- **SES**: `ses:SendEmail`
- **S3**: `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`

---

## 🐛 Common Issues

### Email Not Sending
**Problem**: Email verification pending
**Solution**: Check email and click verification link

**Problem**: Sandbox mode
**Solution**: Request production access in SES console

### S3 Upload Failing
**Problem**: Access denied
**Solution**: Check bucket policy allows public read

**Problem**: Invalid credentials
**Solution**: Verify access keys in .env

---

## 📚 Documentation

- **Quick Setup**: [AWS_QUICK_SETUP.md](AWS_QUICK_SETUP.md) - 5 minute setup
- **Full Guide**: [AWS_INTEGRATION_GUIDE.md](AWS_INTEGRATION_GUIDE.md) - Complete guide
- **Main README**: [README.md](README.md) - Project overview

---

## 🎯 What You Can Do Now

### With AWS SES
✅ Send welcome emails
✅ Send password reset emails
✅ Send subscription notifications
✅ Send promotional emails

### With AWS S3
✅ Store unlimited movie images
✅ Serve images globally
✅ Scale automatically
✅ Reduce server load

---

## 🚀 Next Steps

1. **Setup AWS SES** (5 minutes)
   - Follow [AWS_QUICK_SETUP.md](AWS_QUICK_SETUP.md)
   - Verify your email
   - Test email sending

2. **Setup AWS S3** (Optional, 10 minutes)
   - Create S3 bucket
   - Configure bucket policy
   - Set USE_S3=true
   - Test file upload

3. **Deploy to Production**
   - Follow [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)
   - Use S3 for file storage
   - Request SES production access

---

**Your AWS services are ready! 🎉**

For detailed setup instructions, see:
- [AWS_QUICK_SETUP.md](AWS_QUICK_SETUP.md) - Quick start
- [AWS_INTEGRATION_GUIDE.md](AWS_INTEGRATION_GUIDE.md) - Full guide
