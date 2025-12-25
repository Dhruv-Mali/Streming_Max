# AWS Services Integration Guide

## 🔧 AWS Services Used in Stremify

1. **AWS SES (Simple Email Service)** - Email notifications ✅ Already configured
2. **AWS S3 (Simple Storage Service)** - File storage (recommended for production)
3. **AWS CloudFront** - CDN for faster content delivery (optional)

---

## 📧 1. AWS SES (Email Service) - Already Configured

### Current Setup
Your project already has AWS SES configured for sending emails.

### Step 1: Get AWS Credentials

1. **Login to AWS Console**: https://console.aws.amazon.com
2. **Go to IAM** → Users → Create User
3. **Attach Policy**: `AmazonSESFullAccess`
4. **Create Access Key** → Save credentials

### Step 2: Verify Email Address

1. Go to **AWS SES Console**: https://console.aws.amazon.com/ses
2. Click **Verified identities** → **Create identity**
3. Choose **Email address**
4. Enter your email (e.g., noreply@yourdomain.com)
5. Check your email and click verification link

### Step 3: Configure Environment Variables

Update `video_straming_system-main/.env`:

```env
AWS_SES_USER_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_SES_USER_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SES_REGION=us-east-1
SENDER_EMAIL=noreply@yourdomain.com
```

### Step 4: Use Email Service

The email helper is already configured. Use it in your controllers:

```javascript
import mailHelper from "../utils/mailHelper.js";

// Send welcome email
await mailHelper({
  email: user.email,
  subject: "Welcome to Stremify!",
  text: `Hi ${user.name}, welcome to Stremify!`
});

// Send subscription confirmation
await mailHelper({
  email: user.email,
  subject: "Subscription Activated",
  text: "Your premium subscription is now active!"
});
```

### Step 5: Move Out of SES Sandbox (Production)

By default, SES is in sandbox mode (can only send to verified emails).

1. Go to **SES Console** → **Account dashboard**
2. Click **Request production access**
3. Fill the form:
   - Mail type: Transactional
   - Website URL: Your domain
   - Use case: User notifications
4. Wait for approval (usually 24 hours)

---

## 📦 2. AWS S3 (File Storage) - Recommended for Production

Currently, files are stored locally in `/uploads`. For production, use S3.

### Step 1: Create S3 Bucket

1. Go to **S3 Console**: https://s3.console.aws.amazon.com
2. Click **Create bucket**
3. Bucket name: `stremify-uploads` (must be globally unique)
4. Region: `us-east-1` (or your preferred region)
5. **Block Public Access**: Uncheck (we'll use bucket policy)
6. Click **Create bucket**

### Step 2: Configure Bucket Policy

1. Go to your bucket → **Permissions** → **Bucket Policy**
2. Add this policy (replace `stremify-uploads` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::stremify-uploads/*"
    }
  ]
}
```

### Step 3: Configure CORS

1. Go to **Permissions** → **CORS**
2. Add this configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### Step 4: Create IAM User for S3

1. Go to **IAM** → **Users** → **Create user**
2. Username: `stremify-s3-user`
3. **Attach policies**: `AmazonS3FullAccess`
4. **Create access key** → Save credentials

### Step 5: Install AWS SDK

```bash
cd video_straming_system-main
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

### Step 6: Update Environment Variables

Add to `video_straming_system-main/.env`:

```env
# AWS S3 Configuration
AWS_S3_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_S3_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=stremify-uploads
```

### Step 7: Create S3 Upload Utility

Create `video_straming_system-main/src/utils/s3Upload.js`:

```javascript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import config from "../config/index.js";
import fs from "fs";

const s3Client = new S3Client({
  region: config.AWS_S3_REGION,
  credentials: {
    accessKeyId: config.AWS_S3_ACCESS_KEY,
    secretAccessKey: config.AWS_S3_SECRET_KEY,
  },
});

export const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const fileName = `${Date.now()}-${file.originalname}`;

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: config.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: "public-read",
    },
  });

  const result = await upload.done();
  
  // Delete local file after upload
  fs.unlinkSync(file.path);
  
  return {
    url: result.Location,
    key: fileName,
  };
};

export const deleteFromS3 = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: config.AWS_S3_BUCKET,
    Key: key,
  });
  
  await s3Client.send(command);
};
```

### Step 8: Update Config

Update `video_straming_system-main/src/config/index.js`:

```javascript
const config = {
  // ... existing config
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION || "us-east-1",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
};
```

### Step 9: Update Movie Controller

Update `video_straming_system-main/src/controllers/movie.controller.js`:

```javascript
import { uploadToS3 } from "../utils/s3Upload.js";

export const createMovie = asyncHandler(async (req, res) => {
  const { title, releaseYear, duration, synopsis, ageRating, genre, actors, warnings } = req.body;

  if (!title || !releaseYear || !duration || !synopsis || !ageRating || !genre || !actors || !warnings) {
    throw new CustomError("All fields are required", 400);
  }

  const images = [];
  
  // Upload files to S3
  if (req.files && req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const s3Result = await uploadToS3(file);
      
      images.push({
        image_url: s3Result.url,
        image_type: i === 0 ? "poster" : "backdrop",
      });
    }
  }

  const movie = await Movie.create({
    title,
    release_year: releaseYear,
    duration,
    synopsis,
    age_rating: ageRating,
    genre,
    actors,
    warnings,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Movie created successfully",
    movie,
  });
});
```

---

## 🚀 3. AWS CloudFront (CDN) - Optional

For faster content delivery worldwide.

### Step 1: Create CloudFront Distribution

1. Go to **CloudFront Console**: https://console.aws.amazon.com/cloudfront
2. Click **Create distribution**
3. **Origin domain**: Select your S3 bucket
4. **Origin access**: Public
5. **Viewer protocol policy**: Redirect HTTP to HTTPS
6. Click **Create distribution**
7. Wait for deployment (15-20 minutes)

### Step 2: Update Image URLs

After CloudFront is deployed, you'll get a domain like `d1234567890.cloudfront.net`

Update your S3 upload utility to use CloudFront URL:

```javascript
export const uploadToS3 = async (file) => {
  // ... upload code
  
  return {
    url: `https://d1234567890.cloudfront.net/${fileName}`, // Use CloudFront URL
    key: fileName,
  };
};
```

---

## 🔐 Security Best Practices

### 1. Use IAM Roles (Recommended for EC2/ECS)

Instead of access keys, use IAM roles when deploying to AWS:

```javascript
// No credentials needed when using IAM roles
const s3Client = new S3Client({
  region: config.AWS_S3_REGION,
});
```

### 2. Restrict IAM Permissions

Create custom IAM policy with minimal permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::stremify-uploads/*"
    },
    {
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "*"
    }
  ]
}
```

### 3. Use Environment Variables

Never commit AWS credentials to git. Always use environment variables.

### 4. Enable S3 Versioning

1. Go to S3 bucket → **Properties**
2. Enable **Versioning** (protects against accidental deletion)

---

## 💰 Cost Estimation

### AWS SES
- **Free Tier**: 62,000 emails/month (if sending from EC2)
- **After Free Tier**: $0.10 per 1,000 emails

### AWS S3
- **Free Tier**: 5GB storage, 20,000 GET requests, 2,000 PUT requests
- **After Free Tier**: 
  - Storage: $0.023 per GB/month
  - Requests: $0.0004 per 1,000 GET, $0.005 per 1,000 PUT

### AWS CloudFront
- **Free Tier**: 1TB data transfer out, 10,000,000 HTTP requests
- **After Free Tier**: $0.085 per GB (varies by region)

**Estimated Monthly Cost for Small App**: $5-20/month

---

## 🧪 Testing AWS Integration

### Test SES Email

```bash
# In your backend
cd video_straming_system-main
node
```

```javascript
import mailHelper from "./src/utils/mailHelper.js";

await mailHelper({
  email: "your-verified-email@example.com",
  subject: "Test Email",
  text: "This is a test email from Stremify!"
});
```

### Test S3 Upload

Create a test file and upload:

```javascript
import { uploadToS3 } from "./src/utils/s3Upload.js";

const testFile = {
  path: "./test-image.jpg",
  originalname: "test.jpg",
  mimetype: "image/jpeg"
};

const result = await uploadToS3(testFile);
console.log("Uploaded:", result.url);
```

---

## 📋 Quick Setup Checklist

### AWS SES Setup
- [ ] Create AWS account
- [ ] Create IAM user with SES permissions
- [ ] Get access key and secret key
- [ ] Verify sender email address
- [ ] Update .env with credentials
- [ ] Test email sending
- [ ] Request production access (for production)

### AWS S3 Setup (Optional but Recommended)
- [ ] Create S3 bucket
- [ ] Configure bucket policy (public read)
- [ ] Configure CORS
- [ ] Create IAM user with S3 permissions
- [ ] Install AWS SDK (`@aws-sdk/client-s3`)
- [ ] Create S3 upload utility
- [ ] Update movie controller
- [ ] Update .env with S3 credentials
- [ ] Test file upload

### AWS CloudFront Setup (Optional)
- [ ] Create CloudFront distribution
- [ ] Point to S3 bucket
- [ ] Wait for deployment
- [ ] Update image URLs to use CloudFront

---

## 🔄 Migration from Local to S3

If you already have files in `/uploads`, migrate them:

```javascript
import fs from "fs";
import path from "path";
import { uploadToS3 } from "./src/utils/s3Upload.js";

const migrateFiles = async () => {
  const uploadsDir = "./uploads";
  const files = fs.readdirSync(uploadsDir);
  
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const fileData = {
      path: filePath,
      originalname: file,
      mimetype: "image/jpeg"
    };
    
    const result = await uploadToS3(fileData);
    console.log(`Migrated: ${file} -> ${result.url}`);
  }
};

migrateFiles();
```

---

## 📞 Support

- **AWS Documentation**: https://docs.aws.amazon.com
- **AWS SES**: https://docs.aws.amazon.com/ses
- **AWS S3**: https://docs.aws.amazon.com/s3
- **AWS Support**: https://console.aws.amazon.com/support

---

**Your AWS services are ready to use! 🚀**
