"use server";

import { auth } from "@clerk/nextjs/server";
import { WORKFLOW_ID } from "@/lib/config";

export async function createSession() {
  try {
    const { userId } = await auth();

    // Instead of throwing, we return null so the UI can handle it gracefully
    if (!userId) {
      console.error("Auth Error: No userId found");
      return null;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Config Error: OPENAI_API_KEY is missing in Vercel");
      return null;
    }

    if (!WORKFLOW_ID) {
      console.error("Config Error: WORKFLOW_ID is missing in Vercel");
      return null;
    }

    // Create ChatKit session
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "chatkit_beta=v1",
      },
      body: JSON.stringify({
        workflow: { id: WORKFLOW_ID },
        user: userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API Error:", errorData);
      return null;
    }

    const data = await response.json();
    return data.client_secret as string;
  } catch (error) {
    console.error("Unexpected Session Error:", error);
    return null;
  }
}
