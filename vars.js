import path from "path";
import dotenv from "dotenv-safe";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "./.env"),
  example: path.join(__dirname, "./.env.example"),
});

export default {
  jwtSecret: process.env.JWT_SECRET,
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  goong: process.env.GOONG_API_KEY,
  cdnUrl: process.env.CDN_URL,
  // s3AccessKey: process.env.S3_ACCESS_KEY,
  // s3SecretKey: process.env.S3_SECRET_KEY,
  // s3Url: process.env.S3_URL,
  // s3Bucket: process.env.S3_BUCKET_NAME,
  // firebaseApiKey: process.env.FIREBASE_API_KEY,
  baseUrl: process.env.BASE_URL,
};
