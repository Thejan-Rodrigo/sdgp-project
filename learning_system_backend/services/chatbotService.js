import Student from "../models/Student.js";
import Progress from "../models/progress.js";
import User from "../models/User.js";
import { askAI } from "../utils/openai.js";

// Function to retrieve student progress and generate AI response
export async function getStudentProgress(parentId, parentInput) {
    try {
        // Fetch parent and student data
        const parent = await User.findOne({ _id: parentId, role: "parent" }).select("student");
        if (!parent) throw new Error("No parent found.");

        const student = await Student.findById(parent.student).select("firstName lastName");
        if (!student) throw new Error("No student found for this parent.");

        // Fetch progress records for the student
        const progressRecords = await Progress.find({ studentId: parent.student });

        // Format progress data
        const progressList = await Promise.all(progressRecords.map(async (progress) => {
            const teacher = progress.teacherId ? await User.findById(progress.teacherId).select("firstName lastName") : null;
            return {
                notes: progress.notes || "No notes available",
                teacher: teacher ? `${teacher.firstName} ${teacher.lastName}` : "Unknown",
                createdAt: progress.createdAt || "Date not available"
            };
        }));

        // Generate prompt for the LLM
        const studentData = {
            studentName: `${student.firstName} ${student.lastName}`,
            progress: progressList
        };

        const prompt = `
            You are a chatbot for a kindergarten learning management system. Your role is to respond to parents' questions about their kindergarten children. Here is the student's data:

            Student Name: ${studentData.studentName}

            Progress Reports:
            ${studentData.progress.map(progress => `
                - Notes: ${progress.notes}
                  Teacher: ${progress.teacher}
                  Posted Date: ${progress.createdAt}
            `).join("\n")}

            Parent's Question: ${parentInput}

            Your task is to:
            1. Answer the parent's question based on the student's progress reports.
            2. If the question is about the student's progress, provide a summary of how the student is doing so far.
            3. If there is anything to improve, provide at least 4-5 actionable tips for the parent to help the student improve.
            Be concise, professional, and empathetic in your response.
        `;

        console.log(prompt)

        // Get AI response
        const aiResponse = await askAI(prompt);
        console.log(aiResponse)
        return aiResponse;

    } catch (error) {
        throw new Error(`Error in chatbotService: ${error.message}`);
    }
}