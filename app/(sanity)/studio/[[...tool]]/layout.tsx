import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "NextGen Portfolio Studio",
  description: "Sanity Studio for Next.js Portfolio",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default Layout;
