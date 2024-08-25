

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
        <SignIn />
    </div>
  );
}

// This function is required for static site generation with dynamic routes,
// but since this page doesn't use any dynamic params, it returns an empty array.
export async function generateStaticParams() {
  return [];
}
