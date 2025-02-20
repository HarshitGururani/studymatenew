import express, { Request, Response } from "express";
import Subjects from "../models/subjects";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/subjects/:sem", async (req: Request, res: Response) => {
  try {
    const sem = parseInt(req.params.sem);

    if (isNaN(sem) || sem < 1) {
      res.status(400).json({ error: "Invalid semester number" });
      return;
    }
    const skipCount = (sem - 1) * 4;
    const semData = await Subjects.find()
      .skip(skipCount)
      .limit(4)
      .select("_id backgroundUrl title");

    res.status(200).json(semData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch semester data" });
  }
});

router.get("/subject/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await Subjects.findById(id);
    if (!data) {
      res.status(404).json({ message: "Subject not found" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
