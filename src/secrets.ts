import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-default-jwt-secret';
export const START_PRISMA_STUDIO = process.env.START_PRISMA_STUDIO === 'true';
export const PRISMA_STUDIO_PORT = process.env.PRISMA_STUDIO_PORT || 9090;