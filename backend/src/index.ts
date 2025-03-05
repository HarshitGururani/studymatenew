import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth";
import mongoose from "mongoose";
import semstersRouter from "./router/subjects";
import { createServer } from "http";
import { Server } from "socket.io";
import { GoogleGenerativeAI } from "@google/generative-ai";
const app = express();
const server = createServer(app);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://studymate-eight.vercel.app"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://studymate-eight.vercel.app"],
    credentials: true,
  },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on(
    "chatMessage",
    async ({ message, subject }: { message: string; subject: string }) => {
      try {
        if (!message.trim()) return;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a knowledgeable tutor in **${subject}**. Explain concepts **clearly and concisely** for students.Break down complex ideas into **simple steps** with examples when needed.If relevant, briefly mention **real-world applications**.For errors, **identify the mistake and suggest a fix**.Now, answer the question in **5-6 sentences**:${message}`,
                },
              ],
            },
          ],
        });

        const reply =
          result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't generate a response.";
        socket.emit("chatMessage", { sender: "bot", text: reply });
      } catch (error) {
        console.error("Gemini API error:", error);
        socket.emit("chatMessage", {
          sender: "bot",
          text: "Sorry, I couldn't generate a response.",
        });
      }
    }
  );

  socket.on("disconnect", () => {
    console.log(`User disconnected`, socket.id);
  });
});

app.use("/api/auth", authRouter);
app.use("/api/semesters", semstersRouter);
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "test data" });
});
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
