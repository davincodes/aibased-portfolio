"use client";
import type { Metadata } from "next";
import type React from "react";
import { ClerkProvider } from "@clerk/nextjs"; // 1. Add this import

export const metadata: Metadata = {
  title: "NextGen Portfolio Studio",
  description: "Sanity Studio for Next.js Portfolio",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      {" "}
      {/* 2. Wrap everything here */}
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

export default Layout;
