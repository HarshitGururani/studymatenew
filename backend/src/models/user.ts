import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/types";
export const userSchema: Schema<UserType> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);
export default User;
