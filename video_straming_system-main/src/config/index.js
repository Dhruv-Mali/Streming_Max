import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/stream_db",
  JWT_SECRET: process.env.JWT_SECRET || "change_this_please",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
  AWS_SES_USER_ACCESS_KEY: process.env.AWS_SES_USER_ACCESS_KEY,
  AWS_SES_USER_SECRET_ACCESS_KEY: process.env.AWS_SES_USER_SECRET_ACCESS_KEY,
  AWS_SES_REGION: process.env.AWS_SES_REGION,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  // AWS S3 Configuration
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION || "us-east-1",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  USE_S3: process.env.USE_S3 === "true", // Toggle between local and S3 storage
};

export default config;
