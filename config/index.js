import dotenv from "dotenv";

dotenv.config(
  process.env.NODE_ENV === "production" ? { path: ".env" } : { path: ".env" }
);

export const {
  PORT,
  NODE_ENV,
  DB_URL,
  TEST_DB_URL,
  JWT_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  WEB3_STORAGE,
} = process.env;
