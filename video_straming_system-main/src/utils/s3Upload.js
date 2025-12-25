import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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
  try {
    const fileStream = fs.createReadStream(file.path);
    const fileName = `movies/${Date.now()}-${file.originalname}`;

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

    // Delete local file after successful upload
    fs.unlinkSync(file.path);

    return {
      url: result.Location,
      key: fileName,
    };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
};

export const deleteFromS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: config.AWS_S3_BUCKET,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new Error("Failed to delete file from S3");
  }
};

export default { uploadToS3, deleteFromS3 };
