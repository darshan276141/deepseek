export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with your API key and the base URL for DeepSeek
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
    try {
        const{userId}= getAuth(req)

        //Extract the chatId and message from the request body
        const { chatId, prompt } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }

        //Find the chat document in the databse based on userId and chatId
        await connectDB();
        const data = await Chat.findOne({userId,  _id: chatId  })

        //Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };

        data.messages.push(userPrompt);

        //Call the DEEPSEEK API to get a response
         const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
    store: true,
    });

    const message = completion.choices[0].message;
    message.timestamp=Date.now()
    data.messages.push(message);
    data.save();

    return NextResponse.json({success: true, data:message})

    } catch (error) {
        return NextResponse.json({success: false, error: error.message});
    }
}