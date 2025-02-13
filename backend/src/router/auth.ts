import express, { Request, Response } from "express";
import { registerValidator } from "../validators/SignInValidation";
import { validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();

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

export default router;
