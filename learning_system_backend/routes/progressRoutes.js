import express from "express";
import { getProgress} from "../controllers/studentProgress.js";

const router = express.Router();

router.get("/:id", getProgress);


export default router;
