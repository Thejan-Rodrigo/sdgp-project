
import express from "express";
import path from "path";
import fs from "fs";
import upload from "../utils/imageUploader.js"; 
import learningController from "../controllers/learningController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, upload.single("image"), learningController.addLearningMaterial);

router.get("/getall", learningController.getAllLearningMaterials);

router.delete("/:id", authMiddleware, learningController.deleteLearningMaterialById);


router.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(process.cwd(), "uploads/images", filename);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.setHeader("Content-Type", "image/jpeg"); 
    res.send(data);
  });
});

export default router;
