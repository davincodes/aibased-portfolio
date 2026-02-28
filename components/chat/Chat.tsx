"use client";

import { useState, useEffect } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createSession } from "@/actions/create-session";
import { useSidebar } from "../ui/sidebar";
import { CHAT_PROFILE_QUERYResult } from "@/sanity.types";

export function Chat({
  profile,
}: {
  profile: CHAT_PROFILE_QUERYResult | null;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const { toggleSidebar } = useSidebar();

  // This effect only runs on the client after the first render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { control } = useChatKit({
    api: {
      getClientSecret: async (_existingSecret) => {
        // Prevents the API call from firing during the Next.js build process
        if (typeof window === "undefined") return "";
        return createSession();
      },
    },
    theme: {},
    header: {
      title: {
        text: `Chat with ${profile?.firstName || "Me"} `,
      },
      leftAction: {
        icon: "close",
        onClick: () => {
          toggleSidebar();
        },
      },
    },
    startScreen: {
      greeting: (() => {
        if (!profile?.firstName) {
          return "Hi there! Ask me anything about my work, experience, or projects.";
        }
        const fullName = [profile.firstName, profile.lastName]
          .filter(Boolean)
          .join(" ");
        return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
      })(),
      prompts: [
        {
          icon: "suitcase",
          label: "What's your experience?",
          prompt:
            "Tell me about your professional experience and previous roles",
        },
        {
          icon: "square-code",
          label: "What skills do you have?",
          prompt:
            "What technologies and programming languages do you specialize in?",
        },
        {
          icon: "cube",
          label: "What have you built?",
          prompt: "Show me some of your most interesting projects",
        },
        {
          icon: "profile",
          label: "Who are you?",
          prompt: "Tell me more about yourself and your background",
        },
      ],
    },
    composer: {
      models: [
        { id: "crisp", label: "Crisp", description: "Concise and factual" },
        { id: "clear", label: "Clear", description: "Focused and helpful" },
        {
          id: "chatty",
          label: "Chatty",
          description: "Conversational companion",
        },
      ],
    },
    disclaimer: {
      text: "Disclaimer: This is my AI-powered twin. It may not be 100% accurate and should be verified for accuracy.",
    },
  });

  // If we are server-side (building), return nothing to avoid the Clerk context error
  if (!hasMounted) {
    return null;
  }

  return <ChatKit control={control} className="h-full w-full z-50" />;
}

export default Chat;
