import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";

// Metadata can ONLY be exported from a Server Component
export const metadata: Metadata = {
  title: "NextGen Portfolio Studio",
  description: "Sanity Studio for Next.js Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
