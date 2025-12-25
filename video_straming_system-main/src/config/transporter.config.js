import nodemailer from "nodemailer";
import { SESClient } from "@aws-sdk/client-ses";
import config from "./index.js";

const ses = new SESClient({
  region: config.AWS_SES_REGION,
  credentials: {
    accessKeyId: config.AWS_SES_USER_ACCESS_KEY,
    secretAccessKey: config.AWS_SES_USER_SECRET_ACCESS_KEY,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses },
});

export default transporter;