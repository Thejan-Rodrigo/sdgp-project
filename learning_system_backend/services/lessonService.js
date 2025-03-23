import Lesson from "../models/Lesson.js";
import ApiError from "../utils/ApiError.js";

const addLesson = async ({grade, title, description, image }) =>{
    // Validate fields
    if(!grade || !title ||!description || !image){
        throw new ApiError(400, "All fields are required");
    } 

    //exception handing
    try {
        const imageUrl = image; 
    
        // create new lesson instance from the lesson model
        const newLesson = new Lesson({ grade, title, description, image: imageUrl });
    
        //save the new lesson and return it
        await newLesson.save();
    
        return newLesson;
    
    } catch (error) {
        // error handling
        throw new ApiError(500, "Error saving lessons");
    }
}
export default {addLesson};