import mongoose, { Schema } from "mongoose";
import { SubjectType } from "../shared/types";

const SubjectSchema: Schema<SubjectType> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    backgroundUrl: { type: String, required: true },
    text: { type: String, required: true },
    pdf: { type: String, required: true },
    url: { type: [String], default: [] }, // Default to empty array
    channelName: { type: [String], default: [] }, // Default to empty array
    videoLink: { type: [String], default: [] }, // Default to empty array
  },
  { timestamps: true }
);

const Subjects = mongoose.model("Subjects", SubjectSchema);

export default Subjects;
