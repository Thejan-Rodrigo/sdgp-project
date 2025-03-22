import multer from "multer";
import path from "path";
import fs from "fs";
import logger from "./logger.js";
// import logger from "./logger.js";

const uploadDir = "uploads/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg"; 
    const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export const uploadImage = async (imagePath) => {
  return new Promise((resolve, reject) => {
    if (!imagePath || typeof imagePath !== "string") {
      logger.error("[imageUploader] Invalid image path received");
      // logger.error("[imageUploader] Invalid image path received");
      return reject(new Error("Invalid image path"));
    }

    
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        logger.error("[imageUploader] File not found: " + imagePath);
        // logger.error("[imageUploader] File not found: " + imagePath);
        return reject(new Error("Image file not found"));
      }

      
      const fullPath = `/${path.basename(imagePath)}`;
      resolve(fullPath);
    });
  });
};

export default upload;
