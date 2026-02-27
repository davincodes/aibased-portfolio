import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export { metadata, viewport } from "next-sanity/studio";

// Generate the base studio route for static generation
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
