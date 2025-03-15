import express from "express";
import { getStudent} from "../controllers/studentController.js";

const router = express.Router();

router.get("/:id", getStudent);


export default router;