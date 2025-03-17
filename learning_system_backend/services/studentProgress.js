// import Progress from "../models/progressModel.js";

// // Get progress by student ID
// export const getProgressByStudentId = async (studentId) => {
//   try {
//     const progress = await Progress.find({ studentId });
//     if (!progress || progress.length === 0) {
//       throw new Error("Progress records not found");
//     }
//     return progress;
//   } catch (error) {
//     throw new Error("Error retrieving progress: " + error.message);
//   }
// };

// export default getProgressByStudentId;
