// // import catchAsync from "../utils/catchAsync.js";
// // import { successResponse } from "../utils/responseHandler.js";
// // import learningService from "../services/learningService.js";
// // import logger from "../utils/logger.js";

// // const learningController = {
// //   addLearningMaterial: catchAsync(async (req, res) => {
// //   const { title, description, duration } = req.body;
// //   const image = req.file; // Correct way to access uploaded file

// //   if (!image) {
// //     logger.error("[learningController] Image file is missing");
// //     return res.status(400).json({ message: "Image file is required" });
// //   }

// //   logger.info("[learningController] Received new learning material");

// //   const newLearningMaterial = await learningService.addLearningMaterial({
// //     title,
// //     description,
// //     duration,
// //     image, // Pass file object, not req.body.image
// //   });

// //   successResponse(res, 201, { newLearningMaterial }, "Learning material added successfully");
// // }),


// //   getAllLearningMaterials: catchAsync(async (req, res) => {
// //     logger.info("[learningController] Fetching all learning materials");
// //     const materials = await learningService.getAllLearningMaterials();
// //     logger.info("[learningController] Successfully fetched all learning materials");
// //     successResponse(res, 200, { materials }, "All learning materials retrieved successfully");
// //   }),

// //   deleteLearningMaterialById: catchAsync(async (req, res) => {
// //     const learningId = req.params.id; // Get the learning material ID from the request parameters
// //     logger.info(`[learningController] Deleting learning material with ID: ${learningId}`);
// //     await learningService.deleteLearningMaterialById(learningId);
// //     logger.info(`[learningController] Learning material with ID: ${learningId} deleted successfully`);
// //     successResponse(res, null, "Learning material deleted successfully");
// //   }),
// // };

// // export default learningController;

// import catchAsync from "../utils/catchAsync.js";
// import { successResponse } from "../utils/responseHandler.js";
// import learningService from "../services/learningService.js";
// import logger from "../utils/logger.js";
// import path from "path";

// const learningController = {
//   addLearningMaterial: catchAsync(async (req, res) => {
//     const { title, description, duration } = req.body;
//     const image = req.file; // Correct way to access uploaded file

//     if (!image) {
//       logger.error("[learningController] Image file is missing");
//       return res.status(400).json({ message: "Image file is required" });
//     }

//     // Get the relative path for frontend access
//     const imagePath = `/${path.basename(image.path)}`;

//     logger.info("[learningController] Received new learning material");

//     const newLearningMaterial = await learningService.addLearningMaterial({
//       title,
//       description,
//       duration,
//       image: imagePath, // Pass only the image URL or relative path
//     });

//     successResponse(res, 201, { newLearningMaterial }, "Learning material added successfully");
//   }),

//   getAllLearningMaterials: catchAsync(async (req, res) => {
//     logger.info("[learningController] Fetching all learning materials");
//     const materials = await learningService.getAllLearningMaterials();
//     logger.info("[learningController] Successfully fetched all learning materials");
//     successResponse(res, 200, { materials }, "All learning materials retrieved successfully");
//   }),

//   deleteLearningMaterialById: catchAsync(async (req, res) => {
//     const learningId = req.params.id; // Get the learning material ID from the request parameters
//     logger.info(`[learningController] Deleting learning material with ID: ${learningId}`);
//     await learningService.deleteLearningMaterialById(learningId);
//     logger.info(`[learningController] Learning material with ID: ${learningId} deleted successfully`);
//     successResponse(res, null, "Learning material deleted successfully");
//   }),
// };

// export default learningController;

import catchAsync from "../utils/catchAsync.js";
import { successResponse } from "../utils/responseHandler.js";
import learningService from "../services/learningService.js";
import logger from "../utils/logger.js";
import path from "path";

const learningController = {
  
  addLearningMaterial: catchAsync(async (req, res) => {
    const { title, description, duration, audience } = req.body; 
    const image = req.file; 

    if (!image) {
      logger.error("[learningController] Image file is missing");
      return res.status(400).json({ message: "Image file is required" });
    }

    
    if (!audience || !['teacher', 'parent'].includes(audience)) {
      logger.error("[learningController] Invalid audience");
      return res.status(400).json({ message: "Audience must be either 'teacher' or 'parent'" });
    }

    
    const imagePath = `/${path.basename(image.path)}`;

    logger.info("[learningController] Received new learning material");

    const newLearningMaterial = await learningService.addLearningMaterial({
      title,
      description,
      duration,
      audience, 
      image: imagePath, 
    });

    successResponse(res, 201, { newLearningMaterial }, "Learning material added successfully");
  }),

  
  getAllLearningMaterials: catchAsync(async (req, res) => {
    const { audience } = req.query; 

    logger.info("[learningController] Fetching all learning materials");

    const filter = audience ? { audience } : {}; 

    const materials = await learningService.getAllLearningMaterials(filter);
    logger.info("[learningController] Successfully fetched all learning materials");
    successResponse(res, 200, { materials }, "All learning materials retrieved successfully");
  }),

  deleteLearningMaterialById: catchAsync(async (req, res) => {
    const learningId = req.params.id; 
    logger.info(`[learningController] Deleting learning material with ID: ${learningId}`);
    await learningService.deleteLearningMaterialById(learningId);
    logger.info(`[learningController] Learning material with ID: ${learningId} deleted successfully`);
    successResponse(res, 200,  "", "Learning material deleted successfully");
  }),
};

export default learningController;

