import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "../src/router/auth";
import mongoose from "mongoose";
const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "test data" });
});

app.listen(8000, () => {
  console.log("server running on http://localhost:8000");
});
