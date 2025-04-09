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

        // Check for navigation-related questions
        const isNavigationQuestion = /navigation|where can|how.*find|how.*see|how.*check|features?|menu|sidebar|announcements?|meetings?|profile|progress|calendar|attendance|q&a|chat|learning|tips/i.test(parentInput.toLowerCase());

        if (isNavigationQuestion) {
            const navigationPrompt = `
                You're a kindergarten system navigation assistant. A parent asks: "${parentInput}"

                Here are the 5 main features in the sidebar:
                1. Announcements - Shows all announcements you've received
                2. Meetings - Displays all meetings posted by teachers
                3. Student Profile - Contains:
                   - All student details
                   - Progress reports from teachers
                   - Attendance calendar (visual representation)
                4. Q&A - Lets you chat directly with teachers
                5. Learning - Shows educational tips posted by administrators

                Respond specifically about where to find what they're asking for:
                - Be extremely concise (1 sentence if possible)
                - Use simple language
                - Example: "You can find meetings in the Meetings section of the sidebar"
                - Never mention progress unless specifically asked
                - No signatures or greetings
            `;
            return await askAI(navigationPrompt);
        }

        // Check if question is about progress
        const isProgressQuestion = /progress|how.*doing|performance|report|grades?|learning|development|behavior|improve/i.test(parentInput);

        if (!isProgressQuestion) {
            // For general questions
            const generalPrompt = `
                You are a friendly kindergarten assistant chatbot. A parent asks: "${parentInput}"

                Respond helpfully and concisely (1-2 sentences max).
                If mentioning features, refer to the 5 sidebar options.
                Never include signatures or team names.
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
            You are a kindergarten progress assistant. A parent asks: "${parentInput}"

            Student: ${student.firstName} ${student.lastName}

            Recent Progress Reports:
            ${progressList.map(progress => `
                - Notes: ${progress.notes}
                  (From ${progress.teacher} on ${progress.createdAt})
            `).join("\n")}

            Guidelines:
            1. Directly answer the progress question
            2. Summarize key points from reports
            3. Provide 3-4 actionable suggestions if needed
            4. Keep response professional but friendly (1-2 paragraphs max)
            5. No signatures/greetings
            6. If no data: "No progress reports available yet"
            
            Start response directly with the answer.
        `;

        const aiResponse = await askAI(prompt);
        return aiResponse.replace(/Warm regards,.*$/i, '').trim();

    } catch (error) {
        throw new Error(`Error in chatbotService: ${error.message}`);
    }
}