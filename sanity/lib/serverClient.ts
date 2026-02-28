import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_SERVER_API_TOKEN;

// This will print to your Vercel Build Logs so you can verify it
if (!token) {
  console.error(
    "❌ ERROR: SANITY_SERVER_API_TOKEN is undefined in the current environment.",
  );
}

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Changed to false: Tokens and CDN don't mix well
  token: token,
});
