import express from 'express';
import lessonsController from '../controllers/lessonsController.js';
import fs from "fs";
import path from "path";
import upload from "../utils/imageUploader.js"; 
const router = express.Router();

// Get all lessons
router.get('/getall', lessonsController.getAllLessons);
//add new lesson
router.post('/add', upload.single("image"), lessonsController.addLessons);
//get image from the selected path
router.get("/image/:filename", (req, res) => {
    //get file name
    const { filename } = req.params;
    //create a new image path
    const imagePath = path.join(process.cwd(), "uploads/images", filename);
    // read the image file
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return res.status(404).json({ message: "Image not found" });
      }
      //set the response header as image
      res.setHeader("Content-Type", "image/jpeg"); 
      // send image data
      res.send(data);
    });
  });

export default router; 