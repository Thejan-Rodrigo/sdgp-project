import mongoose from "mongoose";
import Learning from "../models/Learning.js";
import logger from "../utils/logger.js";
import ApiError from "../utils/ApiError.js";

const addLearningMaterial = async ({ title, description, duration, audience, image }) => {
  if (!title || !description || !duration || !image) {
    logger.error("[learningService] All fields including image are required");
    throw new ApiError(400, "All fields including image are required");
  }

  try {
    const imageUrl = image; 

    const newLearning = new Learning({ title, description, duration, audience, image: imageUrl });

    await newLearning.save();
    logger.info("[learningService] New learning material added");

    return newLearning;
  } catch (error) {
    logger.error("[learningService] Error saving learning material: " + error.message);
    throw new ApiError(500, "Error saving learning material");
  }
};

const getAllLearningMaterials = async (filter = {}) => {
  try {
    const materials = await Learning.find(filter); 
    return materials;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw new ApiError(500, "Failed to fetch materials");
  }
};

const deleteLearningMaterialById = async (learningId) => {
  console.log("in this")
  
  const objectId = (learningId);


  const learningMaterial = await Learning.findById(objectId);
  if (!learningMaterial) {
    logger.error(`[learningService] Learning material with ID: ${learningId} not found`);
    throw new ApiError(404, "Learning material not found");
  }

  await Learning.findByIdAndDelete(objectId);
  logger.info(`[learningService] Learning material with ID: ${learningId} deleted successfully`);
};


export default { addLearningMaterial, getAllLearningMaterials, deleteLearningMaterialById };



