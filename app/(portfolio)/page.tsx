import type { Metadata } from "next";
import PortfolioContent from "@/components/PortfolioContent";

export const metadata: Metadata = {
  title: "Davincodes",
  description:
    "Passionate developer creating practical solutions through web development and AI.",
};

export default async function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioContent />
    </main>
  );
}
