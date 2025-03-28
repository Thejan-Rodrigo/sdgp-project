import Student from "../models/Student.js";
import Progress from "../models/Progress.js";
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

        // Check if question is about progress (using simple keyword matching)
        const isProgressQuestion = /progress|how.*doing|performance|report|grades?|learning|development|behavior|improve/i.test(parentInput);

        if (!isProgressQuestion) {
            // For general questions, use a simple chatbot response
            const generalPrompt = `
                You are a friendly kindergarten assistant chatbot. A parent is asking: "${parentInput}"

                Respond to this question helpfully and concisely, but do NOT mention student progress or reports.
                Keep your response brief (1-2 sentences maximum).
                Do NOT include any signatures like "Warm regards" or team names.
            `;
            return await askAI(generalPrompt);
        }

        // For progress questions, fetch and format data
        const progressRecords = await Progress.find({ studentId: parent.student });

        const progressList = await Promise.all(progressRecords.map(async (progress) => {
            const teacher = progress.teacherId ? await User.findById(progress.teacherId).select("firstName lastName") : null;
            return {
                notes: progress.notes || "No notes available",
                teacher: teacher ? `${teacher.firstName} ${teacher.lastName}` : "Unknown",
                createdAt: progress.createdAt || "Date not available"
            };
        }));

        // Generate prompt for progress-related questions
        const prompt = `
            You are a kindergarten progress assistant. A parent is asking about their child's progress: "${parentInput}"

            Student: ${student.firstName} ${student.lastName}

            Recent Progress Reports:
            ${progressList.map(progress => `
                - Notes: ${progress.notes}
                  (From ${progress.teacher} on ${progress.createdAt})
            `).join("\n")}

            Guidelines for your response:
            1. Directly answer the specific question about progress
            2. Summarize key points from the progress reports
            3. If improvement is needed, provide 3-4 specific, actionable suggestions
            4. Keep response professional but friendly (1-2 paragraphs max)
            5. NEVER include signatures, greetings, or team names
            6. If no progress data exists, say "No progress reports available yet"

            Response should begin directly with the answer, no introductions.
        `;

        const aiResponse = await askAI(prompt);
        // Remove any residual signatures or greetings
        return aiResponse.replace(/Warm regards,.*$/i, '').trim();

    } catch (error) {
        throw new Error(`Error in chatbotService: ${error.message}`);
    }
}