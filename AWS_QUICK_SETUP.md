# AWS Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd video_straming_system-main
npm install
```

This installs:
- `@aws-sdk/client-s3` - S3 file storage
- `@aws-sdk/lib-storage` - S3 multipart upload
- `@aws-sdk/client-ses` - Email service (already installed)

### Step 2: Get AWS Credentials

#### Option A: AWS Console (Easiest)
1. Go to https://console.aws.amazon.com
2. Sign in or create account
3. Go to **IAM** → **Users** → **Create user**
4. Username: `stremify-user`
5. Click **Next** → Attach policies:
   - `AmazonSESFullAccess`
   - `AmazonS3FullAccess`
6. Click **Create user**
7. Click on user → **Security credentials** → **Create access key**
8. Choose **Application running outside AWS**
9. **Copy** Access Key ID and Secret Access Key

### Step 3: Configure SES Email

1. Go to **SES Console**: https://console.aws.amazon.com/ses
2. Click **Verified identities** → **Create identity**
3. Select **Email address**
4. Enter: `noreply@yourdomain.com` (or your email)
5. Click **Create identity**
6. **Check your email** and click verification link

### Step 4: Create S3 Bucket (Optional)

1. Go to **S3 Console**: https://s3.console.aws.amazon.com
2. Click **Create bucket**
3. Bucket name: `stremify-uploads-YOUR-NAME` (must be unique)
4. Region: `us-east-1`
5. **Uncheck** "Block all public access"
6. Check "I acknowledge..."
7. Click **Create bucket**
8. Click on bucket → **Permissions** → **Bucket policy**
9. Paste this (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

### Step 5: Update .env File

Edit `video_straming_system-main/.env`:

```env
# AWS SES (Email) - REQUIRED
AWS_SES_USER_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_SES_USER_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SES_REGION=us-east-1
SENDER_EMAIL=noreply@yourdomain.com

# AWS S3 (File Storage) - OPTIONAL
USE_S3=false
AWS_S3_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_S3_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=stremify-uploads-YOUR-NAME
```

**Note:** Set `USE_S3=true` to enable S3 storage

### Step 6: Test Email

```bash
cd video_straming_system-main
npm run dev
```

In another terminal:
```bash
curl -X POST http://localhost:3001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"your-verified-email@example.com","password":"password123"}'
```

Check your email for welcome message!

---

## 📋 Configuration Options

### Local Storage (Default)
```env
USE_S3=false
```
- Files stored in `/uploads` folder
- Good for development
- No AWS costs

### S3 Storage (Production)
```env
USE_S3=true
AWS_S3_ACCESS_KEY=your_key
AWS_S3_SECRET_KEY=your_secret
AWS_S3_BUCKET=your-bucket
```
- Files stored in AWS S3
- Better for production
- Scalable and reliable

---

## 🧪 Testing

### Test Email Sending

Create `test-email.js`:
```javascript
import mailHelper from "./src/utils/mailHelper.js";

await mailHelper({
  email: "your-verified-email@example.com",
  subject: "Test Email",
  text: "Hello from Stremify!"
});

console.log("Email sent!");
```

Run:
```bash
node test-email.js
```

### Test S3 Upload

1. Set `USE_S3=true` in `.env`
2. Start backend: `npm run dev`
3. Upload a movie with images via frontend
4. Check S3 bucket for uploaded files

---

## 💰 Cost Estimate

### Free Tier (First 12 Months)
- **SES**: 62,000 emails/month (from EC2)
- **S3**: 5GB storage, 20,000 GET, 2,000 PUT requests
- **Total**: $0/month for small apps

### After Free Tier
- **SES**: $0.10 per 1,000 emails
- **S3**: $0.023 per GB/month
- **Example**: 1000 users, 100 movies = ~$5/month

---

## 🔐 Security Tips

1. **Never commit credentials** to git
2. **Use IAM roles** when deploying to EC2/ECS
3. **Rotate keys** every 90 days
4. **Use least privilege** - only grant needed permissions
5. **Enable MFA** on AWS account

---

## 🐛 Troubleshooting

### Email Not Sending
- ✅ Check email is verified in SES
- ✅ Check credentials in .env
- ✅ Check AWS region matches
- ✅ Request production access (if in sandbox)

### S3 Upload Failing
- ✅ Check bucket exists
- ✅ Check bucket policy allows public read
- ✅ Check credentials have S3 permissions
- ✅ Check bucket name in .env

### "Access Denied" Error
- ✅ Check IAM user has correct policies
- ✅ Check access keys are correct
- ✅ Check region matches

---

## 📞 Need Help?

- **Full Guide**: See `AWS_INTEGRATION_GUIDE.md`
- **AWS Docs**: https://docs.aws.amazon.com
- **AWS Support**: https://console.aws.amazon.com/support

---

**You're ready to use AWS! 🎉**
