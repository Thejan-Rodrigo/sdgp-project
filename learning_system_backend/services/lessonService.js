import Lesson from "../models/Lesson.js";
import ApiError from "../utils/ApiError.js";

const addLesson = async ({grade, title, description, image }) =>{
    // Add lesson logic here   
    if(!grade || !title ||!description || !image){
        throw new ApiError(400, "All fields are required");
    } 

    try {
        const imageUrl = image; 
    
        const newLesson = new Lesson({ grade, title, description, image: imageUrl });
    
        await newLesson.save();
    
        return newLesson;
    
    } catch (error) {
        
        throw new ApiError(500, "Error saving lessons");
    }
}
export default {addLesson};