import express, { Request, Response } from "express";
import { registerValidator } from "../validators/SignInValidation";
import { validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { loginValidation } from "../validators/LoginValidation";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

interface ValidateUser {
  userId: string;
}

router.post(
  "/register",
  registerValidator,
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const { email } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({ message: "SignIn successful" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  loginValidation,
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({ userId: user.id });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // This must match login settings
    path: "/", // Ensures cookie is cleared globally
  });

  res.status(200).json({ message: "Logged out successfully" });
});

router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      res.status(200).json({ userId: req.userId });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
