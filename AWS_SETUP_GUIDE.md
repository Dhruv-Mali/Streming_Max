# AWS Services Integration Guide for Stremify

This guide will help you integrate AWS services (S3, SES, CloudFront) into your Stremify streaming platform.

---

## 📋 Table of Contents
1. [AWS Account Setup](#1-aws-account-setup)
2. [AWS S3 (File Storage)](#2-aws-s3-file-storage)
3. [AWS SES (Email Service)](#3-aws-ses-email-service)
4. [AWS CloudFront (CDN - Optional)](#4-aws-cloudfront-cdn-optional)
5. [Backend Configuration](#5-backend-configuration)
6. [Testing](#6-testing)

---

## 1. AWS Account Setup

### Step 1.1: Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Click **Create an AWS Account**
3. Follow the registration process (requires credit card)
4. Complete email and phone verification

### Step 1.2: Create IAM User (Security Best Practice)
1. Login to [AWS Console](https://console.aws.amazon.com/)
2. Search for **IAM** in the search bar
3. Click **Users** → **Create user**
4. Enter username: `stremify-app-user`
5. Click **Next**
6. Select **Attach policies directly**
7. Add these policies:
   - `AmazonS3FullAccess` (for file storage)
   - `AmazonSESFullAccess` (for emails)
8. Click **Next** → **Create user**

### Step 1.3: Generate Access Keys
1. Click on the created user (`stremify-app-user`)
2. Go to **Security credentials** tab
3. Scroll to **Access keys** section
4. Click **Create access key**
5. Select **Application running outside AWS**
6. Click **Next** → **Create access key**
7. **IMPORTANT**: Copy and save:
   - Access Key ID
   - Secret Access Key
   ⚠️ You won't be able to see the secret key again!

---

## 2. AWS S3 (File Storage)

S3 will store movie posters, backdrops, and video files.

### Step 2.1: Create S3 Bucket
1. Go to [S3 Console](https://s3.console.aws.amazon.com/)
2. Click **Create bucket**
3. Configure:
   - **Bucket name**: `stremify-media-uploads` (must be globally unique)
   - **Region**: `us-east-1` (or your preferred region)
   - **Block Public Access**: Uncheck "Block all public access"
   - Check the acknowledgment box
4. Click **Create bucket**

### Step 2.2: Configure Bucket Policy (Public Read Access)
1. Click on your bucket name
2. Go to **Permissions** tab
3. Scroll to **Bucket policy** → Click **Edit**
4. Paste this policy (replace `YOUR-BUCKET-NAME`):

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

5. Click **Save changes**

### Step 2.3: Enable CORS (for web uploads)
1. In your bucket, go to **Permissions** tab
2. Scroll to **Cross-origin resource sharing (CORS)**
3. Click **Edit** and paste:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

4. Click **Save changes**

---

## 3. AWS SES (Email Service)

SES will send welcome emails, password resets, and subscription notifications.

### Step 3.1: Verify Email Address (Sandbox Mode)
1. Go to [SES Console](https://console.aws.amazon.com/ses/)
2. Select your region (e.g., `us-east-1`)
3. Click **Verified identities** → **Create identity**
4. Select **Email address**
5. Enter your email: `noreply@yourdomain.com` (or personal email for testing)
6. Click **Create identity**
7. Check your email and click the verification link

### Step 3.2: Verify Recipient Emails (Sandbox Mode)
In sandbox mode, you can only send to verified emails:
1. Repeat Step 3.1 for test recipient emails
2. Or request production access (see Step 3.3)

### Step 3.3: Request Production Access (Optional)
To send emails to any address:
1. In SES Console, click **Account dashboard**
2. Click **Request production access**
3. Fill out the form:
   - **Mail type**: Transactional
   - **Website URL**: Your app URL
   - **Use case description**: 
     ```
     Sending transactional emails for Stremify video streaming platform:
     - Welcome emails for new users
     - Password reset emails
     - Subscription confirmation emails
     - Account notifications
     ```
4. Submit and wait for approval (usually 24-48 hours)

---

## 4. AWS CloudFront (CDN - Optional)

CloudFront speeds up content delivery globally.

### Step 4.1: Create CloudFront Distribution
1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click **Create distribution**
3. Configure:
   - **Origin domain**: Select your S3 bucket
   - **Origin access**: Public
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Cache policy**: CachingOptimized
4. Click **Create distribution**
5. Wait 5-10 minutes for deployment
6. Copy the **Distribution domain name** (e.g., `d1234abcd.cloudfront.net`)

### Step 4.2: Update Backend to Use CloudFront
Replace S3 URLs with CloudFront URLs in your backend code.

---

## 5. Backend Configuration

### Step 5.1: Update Environment Variables
Edit `video_straming_system-main/.env`:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/stream_db
JWT_SECRET=your_strong_jwt_secret_change_in_production
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000

# AWS SES (Email Service)
AWS_SES_USER_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_SES_USER_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SES_REGION=us-east-1
SENDER_EMAIL=noreply@yourdomain.com

# AWS S3 (File Storage)
USE_S3=true
AWS_S3_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_S3_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=stremify-media-uploads

# AWS CloudFront (Optional)
CLOUDFRONT_URL=https://d1234abcd.cloudfront.net
```

### Step 5.2: Create S3 Upload Utility
Create `video_straming_system-main/src/utils/s3Upload.js`:

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';
import path from 'path';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

export const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const fileName = `${Date.now()}-${file.originalname}`;
  
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileStream,
      ContentType: file.mimetype,
    },
  });

  await upload.done();
  
  // Return public URL
  const cloudFrontUrl = process.env.CLOUDFRONT_URL;
  if (cloudFrontUrl) {
    return `${cloudFrontUrl}/${fileName}`;
  }
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
};
```

### Step 5.3: Create SES Email Utility
Create `video_straming_system-main/src/utils/sesEmail.js`:

```javascript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_USER_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_USER_SECRET_ACCESS_KEY,
  },
});

export const sendEmail = async ({ to, subject, htmlBody, textBody }) => {
  const params = {
    Source: process.env.SENDER_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
        Text: {
          Data: textBody,
          Charset: 'UTF-8',
        },
      },
    },
  };

  const command = new SendEmailCommand(params);
  return await sesClient.send(command);
};

// Welcome email template
export const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to Stremify! 🎬';
  const htmlBody = `
    <h1>Welcome to Stremify, ${userName}!</h1>
    <p>Thank you for joining our streaming platform.</p>
    <p>Start exploring thousands of movies and shows today!</p>
    <a href="${process.env.FRONTEND_URL}/movies">Browse Movies</a>
  `;
  const textBody = `Welcome to Stremify, ${userName}! Start exploring movies at ${process.env.FRONTEND_URL}/movies`;
  
  return await sendEmail({ to: userEmail, subject, htmlBody, textBody });
};
```

---

## 6. Testing

### Test S3 Upload
```bash
# In backend directory
cd video_straming_system-main
npm start

# Upload a test image via your API
curl -X POST http://localhost:3001/api/v1/content/movies \
  -F "title=Test Movie" \
  -F "poster=@/path/to/image.jpg"
```

### Test SES Email
```javascript
// Add to your signup route
import { sendWelcomeEmail } from './utils/sesEmail.js';

// After user creation
await sendWelcomeEmail(user.email, user.name);
```

---

## 💰 Cost Estimation

### Free Tier (First 12 months)
- **S3**: 5GB storage, 20,000 GET requests, 2,000 PUT requests/month
- **SES**: 62,000 emails/month (if sending from EC2)
- **CloudFront**: 1TB data transfer out, 10M HTTP/HTTPS requests/month

### After Free Tier
- **S3**: ~$0.023/GB/month + $0.0004 per 1,000 GET requests
- **SES**: $0.10 per 1,000 emails
- **CloudFront**: ~$0.085/GB for first 10TB

**Estimated monthly cost for small app**: $5-20/month

---

## 🔒 Security Best Practices

1. **Never commit AWS keys to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables

2. **Use IAM roles with minimal permissions**
   - Create separate users for dev/prod
   - Rotate access keys regularly

3. **Enable S3 bucket versioning**
   - Protects against accidental deletions

4. **Use HTTPS only**
   - Enable SSL/TLS for all connections

5. **Monitor AWS costs**
   - Set up billing alerts in AWS Console

---

## 🆘 Troubleshooting

### S3 Upload Fails
- Check IAM user has S3 permissions
- Verify bucket name and region in `.env`
- Check bucket policy allows uploads

### SES Email Not Sending
- Verify sender email in SES Console
- Check you're in the correct region
- Verify recipient email (if in sandbox mode)
- Check AWS credentials

### CORS Errors
- Update S3 CORS policy with your frontend URL
- Check bucket is publicly accessible

---

## 📚 Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/)

---

## ✅ Checklist

- [ ] AWS account created
- [ ] IAM user created with access keys
- [ ] S3 bucket created and configured
- [ ] SES email verified
- [ ] Environment variables updated
- [ ] S3 upload utility created
- [ ] SES email utility created
- [ ] Test upload successful
- [ ] Test email sent successfully
- [ ] CloudFront configured (optional)

---

**Need Help?** Check the AWS documentation or contact AWS support.
