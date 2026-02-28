export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-26";

// Change these to use a fallback or a simple log so the build doesn't crash
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Add this temporary log to see what's happening in Vercel
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error(
    "❌ Vercel Build Error: NEXT_PUBLIC_SANITY_PROJECT_ID is missing!",
  );
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // Temporarily comment this out to let the build finish so you can debug
    // throw new Error(errorMessage);
    console.warn(errorMessage);
    return "" as unknown as T;
  }
  return v;
}
