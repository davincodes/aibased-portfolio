"use server";

import { auth } from "@clerk/nextjs/server";
import { WORKFLOW_ID } from "@/lib/config";

export async function createSession() {
  try {
    const { userId } = await auth();

    if (!userId) return null;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || !WORKFLOW_ID) {
      console.error("Missing API Key or Workflow ID in Production");
      return null;
    }

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
      const errorText = await response.text();
      console.error("OpenAI Session Error:", errorText);
      return null;
    }

    const data = await response.json();
    return data.client_secret as string;
  } catch (e) {
    console.error("Internal Server Error in createSession:", e);
    return null;
  }
}
