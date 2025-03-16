import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Function to send prompt to OpenRouter API
export async function askAI(prompt) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-r1:free",
                messages: [
                    { role: "system", content: "You are an assistant helping parents with their kindergarten children's progress." },
                    { role: "user", content: prompt }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        throw new Error(`Error calling OpenRouter API: ${error.message}`);
    }
}