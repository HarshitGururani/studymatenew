import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth";
import mongoose from "mongoose";
import semstersRouter from "./router/subjects";
const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Allow local development
      "https://studymate-eight.vercel.app", // Allow deployed frontend
    ],
    credentials: true, // Allow cookies and authentication headers
  })
);

app.use("/api/auth", authRouter);
app.use("/api/semesters", semstersRouter);
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "test data" });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
