# AWS Quick Setup - 15 Minutes ⚡

Fast track guide to get AWS services running for Stremify.

---

## 🚀 Quick Steps

### 1. AWS Account (2 min)
```
1. Go to aws.amazon.com → Create Account
2. Verify email and add payment method
```

### 2. Create IAM User (3 min)
```
1. AWS Console → IAM → Users → Create user
2. Name: stremify-app-user
3. Attach policies: AmazonS3FullAccess, AmazonSESFullAccess
4. Create access key → Copy Access Key ID & Secret Key
```

### 3. Setup S3 Bucket (5 min)
```
1. S3 Console → Create bucket
2. Name: stremify-media-uploads
3. Region: us-east-1
4. Uncheck "Block all public access"
5. Permissions → Bucket Policy:
```

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::stremify-media-uploads/*"
  }]
}
```

### 4. Setup SES Email (3 min)
```
1. SES Console → Verified identities → Create identity
2. Email address: your@email.com
3. Check email → Click verification link
4. Done! (Sandbox mode - can send to verified emails only)
```

### 5. Update Backend .env (2 min)
```env
# AWS S3
USE_S3=true
AWS_S3_ACCESS_KEY=AKIA...
AWS_S3_SECRET_KEY=wJal...
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=stremify-media-uploads

# AWS SES
AWS_SES_USER_ACCESS_KEY=AKIA...
AWS_SES_USER_SECRET_ACCESS_KEY=wJal...
AWS_SES_REGION=us-east-1
SENDER_EMAIL=your@email.com
```

---

## 📝 Copy-Paste Code

### S3 Upload Utility
Create: `video_straming_system-main/src/utils/s3.js`

```javascript
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

export const uploadToS3 = async (file) => {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${Date.now()}-${file.originalname}`,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
    },
  });
  
  const result = await upload.done();
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${result.Key}`;
};
```

### SES Email Utility
Create: `video_straming_system-main/src/utils/email.js`

```javascript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_USER_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_USER_SECRET_ACCESS_KEY,
  },
});

export const sendEmail = async (to, subject, html) => {
  await ses.send(new SendEmailCommand({
    Source: process.env.SENDER_EMAIL,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Html: { Data: html } },
    },
  }));
};
```

---

## ✅ Test It

### Test S3
```javascript
import { uploadToS3 } from './utils/s3.js';

// In your upload route
const url = await uploadToS3(req.file);
console.log('Uploaded:', url);
```

### Test SES
```javascript
import { sendEmail } from './utils/email.js';

await sendEmail(
  'user@example.com',
  'Welcome to Stremify!',
  '<h1>Welcome!</h1><p>Start streaming now!</p>'
);
```

---

## 💡 Tips

- **Free Tier**: 5GB S3 storage + 62K emails/month FREE for 12 months
- **Sandbox Mode**: SES can only send to verified emails initially
- **Production**: Request SES production access to send to any email
- **Security**: Never commit `.env` file to Git!

---

## 🆘 Common Issues

**S3 403 Error**: Check bucket policy allows public read
**SES Not Sending**: Verify sender email in SES console
**Invalid Credentials**: Double-check access keys in `.env`

---

**Full Guide**: See `AWS_SETUP_GUIDE.md` for detailed instructions.
