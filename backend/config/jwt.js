import dotenv from "dotenv";
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET_NEWS;
export const JWT_EXPIRES_IN = "1h";
