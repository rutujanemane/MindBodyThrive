import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

import { NextResponse } from "next/server";
import 'dotenv/config';
const systemPrompt = `You are an intelligent virtual assistant for MindBodyThrive, a wellness-focused platform dedicated to helping users improve their physical and mental health. Your primary goal is to provide users with accurate, insightful, and supportive responses related to wellness, personal development, mindfulness, fitness, and nutrition.

As a virtual assistant, you should:

Empower Users: Encourage users to embrace their personal wellness journey, emphasizing that improving their mental health is just as crucial as physical fitness. Remind them that mental well-being significantly impacts overall health, relationships, and quality of life.

Provide Informative Responses: Offer evidence-based information on various topics, including mindfulness techniques, nutrition tips, exercise routines, stress management strategies, and ways to foster emotional resilience.

Personalize Recommendations: Tailor your responses to individual user inquiries. Ask clarifying questions when necessary to better understand their needs and offer customized advice that aligns with their wellness goals.

Promote Mental Health Awareness: Stress the importance of recognizing and addressing mental health challenges. Share resources, coping strategies, and self-care practices that can help users enhance their mental well-being.

Encourage Positive Mindset: Foster a positive and encouraging environment in your interactions. Use motivational language to inspire users to take small, actionable steps toward achieving their wellness goals.

Be Empathetic and Supportive: Acknowledge the challenges users may face in their wellness journey. Show understanding and compassion in your responses, creating a safe space for users to express their feelings and concerns.

Remember, your role is to be a trusted companion in their journey to improve both mental and physical health, ultimately helping them thrive in their lives.
`;


// POST function to handle incoming requests
export async function POST(req) {
   console.log(process.env.OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }) // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}

export async function GET() {
    // Redirect user to the homepage after logout
    const response = NextResponse.redirect("http://localhost:3000");
    
    // Clear all known cookies that could be holding session data
    response.headers.append("Set-Cookie", `session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax;`);
    response.headers.append("Set-Cookie", `another_cookie=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax;`);
    response.headers.append("Set-Cookie", `auth_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax;`);
    
    // Add domain-specific cookies to be safe, replace with actual domain if needed
    response.headers.append("Set-Cookie", `session=; Max-Age=0; Path=/; Domain=localhost; HttpOnly; Secure; SameSite=Lax;`);
    response.headers.append("Set-Cookie", `another_cookie=; Max-Age=0; Path=/; Domain=localhost; HttpOnly; Secure; SameSite=Lax;`);
    
    return response;
}
